import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { Asset } from '../constants';
import { BalanceFunction, BalancePallet } from './balance.constants';
import {
  MinBalanceConfig,
  AssetsBalanceConfig,
  SystemBalanceConfig,
  TokensBalanceConfig,
  TokensPalletAccountData,
} from './balance.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function createBalanceBuilder<Assets extends Asset>() {
  return {
    assets,
    min,
    system,
    tokens: (asset: number | bigint | Assets | 'MOVR' | 'KUSD' | 'AUSD') =>
      tokens<Assets>(asset),
  };
}

function assets(asset: number | bigint): AssetsBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Account,
    path: ['balance'],
    getParams: (account: string) => [asset, account],
  };
}

function min(asset: number): MinBalanceConfig {
  return {
    pallet: BalancePallet.Assets,
    function: BalanceFunction.Asset,
    path: ['minBalance'],
    getParams: () => [asset],
  };
}

function system(): SystemBalanceConfig {
  return {
    pallet: BalancePallet.System,
    function: BalanceFunction.Account,
    path: ['data'],
    getParams: (account: string) => [account],
    calc: ({ free, miscFrozen }: PalletBalancesAccountData) =>
      BigInt(free.sub(miscFrozen).toString()),
  };
}

function tokens<Assets extends Asset>(
  asset: number | bigint | Assets | 'MOVR' | 'KUSD' | 'AUSD',
): TokensBalanceConfig<Assets> {
  return {
    pallet: BalancePallet.Tokens,
    function: BalanceFunction.Accounts,
    getParams: (account: string) => [
      account,
      Number.isInteger(asset)
        ? { ForeignAsset: asset as number }
        : { Token: asset as Assets },
    ],
    calc: ({ free, frozen }: TokensPalletAccountData) =>
      BigInt(free.sub(frozen).toString()),
  };
}
