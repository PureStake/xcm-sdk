import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ring } from '../assets';
import { darwinia, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const darwiniaRoutes = new ChainRoutes({
  chain: darwinia,
  routes: [
    {
      asset: ring,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: ring,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    },
  ],
});