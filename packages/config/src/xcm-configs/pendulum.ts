import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, pen } from '../assets';
import { moonbeam, pendulum } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const pendulumRoutes = new ChainRoutes({
  chain: pendulum,
  routes: [
    {
      asset: pen,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: pen,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: pen,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
