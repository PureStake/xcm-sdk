import '@moonbeam-network/api-augment';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Asset,
  AssetConfig,
  BalanceConfig,
  Chain,
  ConfigGetter,
  ExtrinsicConfig,
  MinBalanceConfig,
} from '@moonbeam-network/xcm-config';
import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic, UnsubscribePromise } from '@polkadot/api/types';
import {
  MoonbeamRuntimeXcmConfigAssetType,
  PalletAssetsAssetAccount,
  PalletAssetsAssetMetadata,
} from '@polkadot/types/lookup';
import { get } from 'lodash';
import { getPolkadotApi } from './polkadot.api';
import { AssetBalanceInfo } from './polkadot.interfaces';
import { calculateMin, sortByBalanceAndChainName } from './polkadot.utils';

export class PolkadotService<Assets extends Asset, Chains extends Chain> {
  readonly #api: ApiPromise;

  constructor(api: ApiPromise) {
    this.#api = api;

    this.getGenericBalance.bind(this);
  }

  static async create<Assets extends Asset, Chains extends Chain>(
    ws: string,
  ): Promise<PolkadotService<Assets, Chains>> {
    return new PolkadotService(await getPolkadotApi(ws));
  }

  getMetadata() {
    return {
      decimals: this.#api.registry.chainDecimals.at(0) || 12,
      symbol: this.#api.registry.chainTokens.at(0) as Assets,
    };
  }

  getExistentialDeposit(): bigint {
    return this.#api.consts.balances?.existentialDeposit.toBigInt() || 0n;
  }

  async getAssetDecimals(assetId: string): Promise<number> {
    const meta = await this.getAssetMeta(assetId);

    return meta.decimals.toNumber();
  }

  async getAssetMeta(assetId: string): Promise<PalletAssetsAssetMetadata> {
    // TODO: how to fix any?
    return this.#api.query.assets.metadata(assetId) as any;
  }

  async getGenericBalance(
    account: string,
    { pallet, function: fn, getParams, path, calc }: BalanceConfig<Assets>,
  ): Promise<bigint> {
    const response = await this.#api.query[pallet][fn](...getParams(account));

    if (response.isEmpty) {
      return 0n;
    }

    // TODO: improve types here and in balance interfaces
    const unwrapped = (response as any).unwrap?.() || response;

    return calc(path.length ? get(unwrapped, path) : unwrapped);
  }

  async getAssetMinBalance({
    pallet,
    function: fn,
    params,
    path,
  }: MinBalanceConfig): Promise<bigint> {
    const details = await this.#api.query[pallet][fn](...params);

    if (details.isEmpty) {
      return 0n;
    }

    return get(details, path).toBigInt();
  }

  getXcmExtrinsic(
    account: string,
    amount: bigint,
    { pallet, extrinsic, getParams }: ExtrinsicConfig<Assets>,
    fee?: bigint,
    primaryAccount?: string,
  ): SubmittableExtrinsic<'promise'> {
    let transferExtrinsic = this.#api.tx[pallet][extrinsic](
      // TODO: check issue with types and if we can fix it
      // @ts-ignore
      ...getParams(account, amount, fee),
    );

    if (primaryAccount) {
      transferExtrinsic = this.#api.tx.proxy.proxy(
        primaryAccount,
        null,
        transferExtrinsic,
      );
    }

    return transferExtrinsic;
  }

  async getAssetFee(id: string, weight: number): Promise<bigint> {
    const type = await this.getAssetType(id);

    if (!type) {
      return 0n;
    }

    const unitsPerSecond =
      await this.#api.query.assetManager.assetTypeUnitsPerSecond(type);

    return calculateMin(weight, unitsPerSecond.unwrapOrDefault().toBigInt());
  }

  async getAssetType(
    id: string,
  ): Promise<MoonbeamRuntimeXcmConfigAssetType | undefined> {
    const type = await this.#api.query.assetManager.assetIdType(id);

    return type.unwrapOr(undefined);
  }

  async subscribeToAssetsBalanceInfo(
    account: string,
    configGetter: ConfigGetter<Assets, Chains>,
    callback: (data: AssetBalanceInfo<Assets>[]) => void,
  ): UnsubscribePromise {
    const assetsArray = Object.values<AssetConfig<Assets>>(configGetter.assets);
    const ids: string[] = assetsArray.map((asset) => asset.id);
    const meta: PalletAssetsAssetMetadata[] =
      (await this.#api.query.assets.metadata.multi(ids)) as any;

    return this.subscribeToAccountBalances(account, ids, (data) => {
      callback(
        data
          .map((balance, index): AssetBalanceInfo<Assets> => {
            const asset = assetsArray[index];
            const {
              chains: [chain],
              from,
            } = configGetter.deposit(asset.originSymbol);

            return {
              asset,
              balance,
              meta: meta[index],
              // TODO: remove as
              origin: from(chain.chain as Chains).origin,
            };
          })
          .sort(sortByBalanceAndChainName),
      );
    });
  }

  async subscribeToAccountBalances(
    account: string,
    ids: string[],
    callback: (balances: PalletAssetsAssetAccount[]) => void,
  ): UnsubscribePromise {
    const keys = ids.map((x) => [x, account]);

    return this.#api.query.assets.account.multi(keys, (res) => {
      const response = res.map((balance) => balance.unwrapOrDefault());

      callback(response);
    });
  }
}
