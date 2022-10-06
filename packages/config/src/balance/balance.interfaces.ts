import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { AssetSymbol } from '../constants';
import { AssetId } from '../types';
import { BalanceFunction, BalancePallet } from './balance.constants';

export type BalanceConfig<Symbols extends AssetSymbol = AssetSymbol> =
  | SystemBalanceConfig
  | AssetsBalanceConfig
  | OrmlTokensBalanceConfig
  | TokensBalanceConfig<Symbols>;

export interface SystemBalanceConfig {
  pallet: BalancePallet.System;
  function: BalanceFunction.Account;
  path: ['data'];
  getParams: (account: string) => [string];
  calc: (data: PalletBalancesAccountData) => bigint;
}

export interface AssetsBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Account;
  path: ['balance'];
  getParams: (account: string) => [number | bigint | string, string];
  calc: (balance: u128) => bigint;
}

export interface TokensPalletAccountData {
  free: u128;
  reserved: u128;
  frozen: u128;
}

export interface OrmlTokensBalanceConfig {
  pallet: BalancePallet.OrmlTokens;
  function: BalanceFunction.Accounts;
  path: [];
  getParams: (account: string) => [string, { ForeignAsset: AssetId }];
  calc: (data: TokensPalletAccountData) => bigint;
}

export interface TokensBalanceConfig<
  Symbols extends AssetSymbol = AssetSymbol,
> {
  pallet: BalancePallet.Tokens;
  function: BalanceFunction.Accounts;
  path: [];
  getParams: (account: string) => [
    string,
    (
      | {
          Token: Symbols | 'MOVR' | 'KUSD';
        }
      | { ForeignAsset: AssetId }
    ),
  ];
  calc: (data: TokensPalletAccountData) => bigint;
}

export interface MinBalanceConfig {
  pallet: BalancePallet.Assets;
  function: BalanceFunction.Asset;
  path: ['minBalance'];
  params: [AssetId];
}
