import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, pha } from '../assets';
import { moonbeam, phala } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const phalaRoutes = new ChainRoutes({
  chain: phala,
  routes: [
    {
      asset: pha,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: pha,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTransfer().transfer().here(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: pha,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTransfer().transfer().X2(),
    },
  ],
});