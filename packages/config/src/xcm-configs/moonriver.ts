import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  aseed,
  bnc,
  crab,
  csm,
  kar,
  kbtc,
  kint,
  kma,
  ksm,
  lit,
  mgx,
  movr,
  pha,
  pica,
  rmrk,
  sdn,
  teer,
  tnkr,
  tur,
  usdt,
  vbnc,
  vksm,
  vmovr,
  xrt,
} from '../assets';
import {
  bifrostKusama,
  calamari,
  crustShadow,
  darwiniaCrab,
  integritee,
  karura,
  khala,
  kintsugi,
  kusama,
  kusamaAssetHub,
  litmus,
  mangataKusama,
  moonriver,
  picasso,
  robonomics,
  shiden,
  tinkernet,
  turing,
} from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonriverRoutes = new ChainRoutes({
  chain: moonriver,
  routes: [
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.0008544,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: calamari,
      destinationFee: {
        amount: 0.001,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: crustShadow,
      destinationFee: {
        amount: 0.0002,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0.001,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: khala,
      destinationFee: {
        amount: 0.0002,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: mangataKusama,
      destinationFee: {
        amount: 0.002,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: shiden,
      destinationFee: {
        amount: 0.0002,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: turing,
      destinationFee: {
        amount: 0.004,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: picasso,
      destinationFee: {
        amount: 0.001,
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: aseed,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0.256,
        asset: aseed,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: bnc,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.0256,
        asset: bnc,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: crab,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: darwiniaCrab,
      destinationFee: {
        amount: 4,
        asset: crab,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: csm,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: crustShadow,
      destinationFee: {
        amount: 0.004,
        asset: csm,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: kar,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0.032,
        asset: kar,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: kbtc,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kintsugi,
      destinationFee: {
        amount: 0.00000428,
        asset: kbtc,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: kint,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kintsugi,
      destinationFee: {
        amount: 0.00084,
        asset: kint,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: kma,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: calamari,
      destinationFee: {
        amount: 0.000004,
        asset: kma,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: ksm,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusama,
      destinationFee: {
        amount: 0.00168,
        asset: ksm,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: lit,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: litmus,
      destinationFee: {
        amount: 0.0032,
        asset: lit,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: mgx,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: mangataKusama,
      destinationFee: {
        amount: 5.5,
        asset: mgx,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: pha,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: khala,
      destinationFee: {
        amount: 0.32,
        asset: pha,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: pica,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: picasso,
      destinationFee: {
        amount: 0.001,
        asset: pica,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: rmrk,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusamaAssetHub,
      destinationFee: {
        amount: 0.0000504,
        asset: rmrk,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: sdn,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: shiden,
      destinationFee: {
        amount: 0.032,
        asset: sdn,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: teer,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: integritee,
      destinationFee: {
        amount: 0.004,
        asset: teer,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: tnkr,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: tinkernet,
      destinationFee: {
        amount: 0.4,
        asset: tnkr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: tur,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: turing,
      destinationFee: {
        amount: 0.2,
        asset: tur,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusamaAssetHub,
      destinationFee: {
        amount: 0.00504,
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: xrt,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: robonomics,
      destinationFee: {
        amount: 0.000032,
        asset: xrt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: vbnc,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.0001,
        asset: vbnc,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: vksm,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.0001,
        asset: vksm,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: vmovr,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.00000001,
        asset: vmovr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
});
