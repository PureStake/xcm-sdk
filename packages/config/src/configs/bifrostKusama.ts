import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { bnc, movr } from '../assets';
import { bifrostKusama, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const bifrostKusamaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0,
        asset: bnc,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: bnc,
        balance: BalanceBuilder().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    }),
  ],
  chain: bifrostKusama,
});
