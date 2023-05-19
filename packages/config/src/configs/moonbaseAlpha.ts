import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import { auq, dev, eq, eqd, lit, paring, tt1, unit } from '../assets';
import {
  alphanetRelay,
  darwiniaPangoro,
  equilibriumAlphanet,
  litentryAlphanet,
  moonbaseAlpha,
  statemineAlphanet,
  uniqueAlpha,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonbaseAlphaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: equilibriumAlphanet,
      destinationFee: {
        amount: 0,
        asset: dev,
      },
    }),
    new AssetConfig({
      asset: auq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: uniqueAlpha,
      destinationFee: {
        amount: 0,
        asset: auq,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: equilibriumAlphanet,
      destinationFee: {
        amount: 0,
        asset: eq,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: equilibriumAlphanet,
      destinationFee: {
        amount: 0,
        asset: eqd,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: litentryAlphanet,
      destinationFee: {
        amount: 0,
        asset: lit,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: paring,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: darwiniaPangoro,
      destinationFee: {
        amount: 0,
        asset: paring,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: statemineAlphanet,
      destinationFee: {
        amount: 0,
        asset: tt1,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: unit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destination: alphanetRelay,
      destinationFee: {
        amount: 0,
        asset: unit,
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: moonbaseAlpha,
});