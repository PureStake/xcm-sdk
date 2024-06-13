import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { movr, pha } from '../assets';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';
import { khala, moonriver } from '../xcmChains';

export const khalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0.001,
        asset: movr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
      fee: {
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: khala,
});
