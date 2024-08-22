import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { kma, movr } from '../assets';
import { calamari, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const calamariRoutes = new ChainRoutes({
  chain: calamari,
  routes: [
    {
      asset: kma,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: kma,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: kma,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: 0.0001,
          asset: movr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assets().asset(),
    },
  ],
});
