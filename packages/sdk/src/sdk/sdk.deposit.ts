import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  DepositConfig,
  MoonChain,
  PolkadotXcmExtrinsicSuccessEvent,
} from '@moonbeam-network/xcm-config';
import { Signer as PolkadotSigner } from '@polkadot/api/types';
import { IKeyringPair, ISubmittableResult } from '@polkadot/types/types';
import { isUndefined } from '@polkadot/util';
import { PolkadotService } from '../polkadot';
import {
  DepositTransferData,
  ExtrinsicEventsCallback,
  ExtrinsicStatus,
} from './sdk.interfaces';

export function createExtrinsicEventHandler<Symbols extends AssetSymbol>(
  config: DepositConfig<Symbols>,
  cb: ExtrinsicEventsCallback,
) {
  return ({ events = [], status, txHash }: ISubmittableResult) => {
    const hash = txHash.toHex();

    if (status.isReady) {
      cb({ status: ExtrinsicStatus.Sent, txHash: hash });
    }

    if (status.isInBlock) {
      const block = status.asInBlock.toString();

      events.forEach(({ event: { data, method, section } }) => {
        if (
          section === config.extrinsic.pallet &&
          method === config.extrinsic.successEvent
        ) {
          if (method === PolkadotXcmExtrinsicSuccessEvent.Attempted) {
            const eventData = data.at(0) as any;

            if (eventData.isIncomplete) {
              cb({
                status: ExtrinsicStatus.Failed,
                blockHash: block,
                txHash: hash,
                message: eventData.asIncomplete.toHuman().join('; '),
              });

              return;
            }
          }

          cb({
            status: ExtrinsicStatus.Success,
            blockHash: block,
            txHash: hash,
          });
        }

        if (section === 'system' && method === 'ExtrinsicFailed') {
          cb({
            status: ExtrinsicStatus.Failed,
            blockHash: block,
            txHash: hash,
            message: data.join('; '),
          });
        }
      });
    }
  };
}

export interface CreateExtrinsicOptions<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  config: DepositConfig<Symbols>;
  fee?: bigint;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  primaryAccount?: string;
}

export function getCreateExtrinsic<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  account,
  config,
  foreignPolkadot,
  primaryAccount,
  fee,
}: CreateExtrinsicOptions<Symbols, ChainKeys>) {
  return (amount: bigint) =>
    foreignPolkadot.getXcmExtrinsic(
      account,
      amount,
      config.extrinsic,
      fee,
      primaryAccount,
    );
}

export interface GetDepositDataParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  asset: Asset<Symbols>;
  config: DepositConfig<Symbols>;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  moonChain: MoonChain;
  nativeAsset: Asset<Symbols>;
  origin: MoonChain | Chain<ChainKeys>;
  polkadot: PolkadotService<Symbols, ChainKeys>;
  polkadotSigner?: PolkadotSigner;
  primaryAccount?: string;
  sourceAccount: string | IKeyringPair;
}

export async function getDepositData<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  account,
  asset,
  config,
  foreignPolkadot,
  moonChain,
  nativeAsset,
  origin,
  polkadot,
  polkadotSigner,
  primaryAccount,
  sourceAccount,
}: GetDepositDataParams<Symbols, ChainKeys>): Promise<
  DepositTransferData<Symbols>
> {
  const sourceAddress =
    typeof sourceAccount === 'string' ? sourceAccount : sourceAccount.address;
  const meta = foreignPolkadot.getMetadata();

  const [
    assetDecimals,
    sourceBalance,
    existentialDeposit,
    sourceFeeBalance,
    xcmFee,
    xcmFeeDecimals,
    sourceMinBalance = 0n,
  ] = await Promise.all([
    // assetDecimals
    polkadot.getAssetDecimals(asset),
    // sourceBalance
    foreignPolkadot.getGenericBalance(
      primaryAccount || sourceAddress,
      config.balance,
    ),
    // existentialDeposit
    foreignPolkadot.getExistentialDeposit(),
    // sourceFeeBalance
    config.sourceFeeBalance
      ? foreignPolkadot.getGenericBalance(
          sourceAddress,
          config.sourceFeeBalance,
        )
      : undefined,
    // xcmFee
    config.xcmFeeAsset
      ? polkadot.getAssetFee(
          config.xcmFeeAsset.asset,
          config.source.weight,
          moonChain,
        )
      : undefined,
    // xcmFeeDecimals
    config.xcmFeeAsset
      ? polkadot.getAssetDecimals(config.xcmFeeAsset.asset)
      : undefined,
    // sourceMinBalance
    config.sourceMinBalance
      ? foreignPolkadot.getAssetMinBalance(config.sourceMinBalance)
      : undefined,
  ]);

  // Min is basically the XCM fee. If less is sent then Moon* won't process
  // the message.
  const min =
    (config.sourceFeeBalance && config.xcmFeeAsset) || !xcmFee ? 0n : xcmFee;
  const createExtrinsic = getCreateExtrinsic({
    account,
    config,
    foreignPolkadot,
    primaryAccount,
    fee: xcmFee,
  });

  return {
    asset: { ...asset, decimals: assetDecimals },
    existentialDeposit,
    min,
    // TODO make this not undefinable
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    moonChainDepositFee: getXcmAssetBalance({
      xcmFeeAsset: config.xcmFeeAsset?.asset,
      xcmFee,
      xcmFeeDecimals,
      nativeDecimals: meta.decimals,
    }),
    native: { ...nativeAsset, decimals: meta.decimals },
    origin,
    source: config.source,
    sourceBalance,
    sourceFeeBalance: !isUndefined(sourceFeeBalance)
      ? { ...meta, balance: sourceFeeBalance }
      : undefined,
    sourceMinBalance,
    // xcmFeeAsset: config.xcmFeeAsset?.asset,
    // // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // xcmFeeAssetBalance: getXcmAssetBalance({
    //   xcmFeeAsset: config.xcmFeeAsset?.asset,
    //   xcmFee,
    //   xcmFeeDecimals,
    //   nativeDecimals: meta.decimals,
    // }),
    getFee: async (amount = sourceBalance): Promise<bigint> => {
      const extrinsic = await createExtrinsic(amount);
      const info = await extrinsic.paymentInfo(sourceAccount);

      return info.partialFee.toBigInt();
    },
    send: async (
      amount: bigint,
      cb?: ExtrinsicEventsCallback,
    ): Promise<string> => {
      const extrinsic = await createExtrinsic(amount);
      const hash = await extrinsic.signAndSend(
        sourceAccount,
        {
          signer: polkadotSigner,
        },
        cb && createExtrinsicEventHandler(config, cb),
      );

      return hash.toString();
    },
  };
}

interface GetXcmAssetBalanceParams<Symbols extends AssetSymbol> {
  xcmFeeAsset?: Asset<Symbols>;
  xcmFee?: bigint;
  xcmFeeDecimals?: number;
  nativeDecimals: number;
}

function getXcmAssetBalance<Symbols extends AssetSymbol>({
  xcmFee,
  xcmFeeDecimals,
  xcmFeeAsset,
  nativeDecimals,
}: GetXcmAssetBalanceParams<Symbols>) {
  return !isUndefined(xcmFee) &&
    !isUndefined(xcmFeeAsset) &&
    !isUndefined(xcmFeeDecimals)
    ? {
        balance: xcmFee,
        decimals: xcmFeeAsset.isNative ? nativeDecimals : xcmFeeDecimals,
        symbol: xcmFeeAsset.originSymbol,
      }
    : undefined;
}
