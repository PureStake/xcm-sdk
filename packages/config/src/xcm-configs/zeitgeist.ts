import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, ztg } from '../assets';
import { moonbeam, zeitgeist } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const zeitgeistRoutes = new ChainRoutes({
  chain: zeitgeist,
  routes: [
    {
      asset: ztg,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: ztg,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: ztg,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.04,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
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