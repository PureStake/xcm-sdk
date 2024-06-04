import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { dai, glmr, peaq, usdcwh, usdtwh, wbtc, weth } from '../assets';
import { moonbeam, peaqChain } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const peaqConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: usdcwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: dai,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04, // TODO
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: wbtc,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04, // TODO
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: weth,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04, // TODO
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetConfig({
      asset: usdtwh,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04, // TODO
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: peaq,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: peaqChain,
});
