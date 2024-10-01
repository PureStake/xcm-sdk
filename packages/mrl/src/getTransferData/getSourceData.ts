import {
  ContractConfig,
  type ExtrinsicConfig,
  WormholeConfig,
} from '@moonbeam-network/xcm-builder';
import {
  type AssetRoute,
  type FeeConfig,
  dev,
} from '@moonbeam-network/xcm-config';
import {
  type SourceChainTransferData,
  getAssetMin,
  getBalance,
  getContractFee,
  getDestinationFeeBalance,
  getExistentialDeposit,
  getExtrinsicFee,
  getMax,
} from '@moonbeam-network/xcm-sdk';
import {
  type AnyChain,
  type AnyParachain,
  AssetAmount,
  type EvmChain,
  type EvmParachain,
} from '@moonbeam-network/xcm-types';
import { WormholeService } from '../services/wormhole';
import { buildTransfer } from './getTransferData.utils';

export interface GetSourceDataParams {
  route: AssetRoute;
  destinationAddress: string;
  destinationFee: AssetAmount;
  sourceAddress: string;
}

export async function getSourceData({
  route,
  destinationAddress,
  destinationFee,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const source = route.source.chain;
  const asset = source.getChainAsset(route.source.asset);
  const feeAsset = route.source.fee
    ? source.getChainAsset(route.source.fee.asset)
    : asset;

  const balance = await getBalance({
    address: sourceAddress,
    asset,
    builder: route.source.balance,
    chain: source,
  });
  const feeBalance = route.source.fee
    ? await getBalance({
        address: sourceAddress,
        asset: feeAsset,
        builder: route.source.fee.balance,
        chain: source,
      })
    : balance;
  const destinationFeeBalance = await getDestinationFeeBalance({
    balance,
    feeBalance,
    route,
    sourceAddress,
  });

  const existentialDeposit = await getExistentialDeposit(source);
  const min = await getAssetMin({
    asset,
    builder: route.source.min,
    chain: source,
  });

  const transfer = await buildTransfer({
    asset: balance,
    destinationAddress,
    destinationFee,
    route,
    sourceAddress,
  });

  const fee = await getFee({
    balance,
    chain: source,
    destinationFee,
    transfer,
    feeBalance,
    feeConfig: route.source.fee,
    sourceAddress,
  });

  const max = getMax({
    balance,
    existentialDeposit,
    fee,
    min,
  });

  return {
    balance,
    chain: source,
    destinationFeeBalance,
    existentialDeposit,
    fee,
    feeBalance,
    max,
    min,
  };
}

export interface GetFeeParams {
  balance: AssetAmount;
  chain: AnyChain;
  destinationFee: AssetAmount;
  feeBalance: AssetAmount;
  feeConfig?: FeeConfig;
  sourceAddress: string;
  transfer: ContractConfig | ExtrinsicConfig | WormholeConfig;
}

export async function getFee({
  balance,
  feeBalance,
  chain,
  destinationFee,
  transfer,
  feeConfig,
  sourceAddress,
}: GetFeeParams): Promise<AssetAmount> {
  if (WormholeConfig.is(transfer)) {
    const wh = WormholeService.create(chain as EvmChain | EvmParachain);
    const fee = await wh.getFee(transfer);

    // TODO technically this is not the fee on source chain, it's relayer fee
    // source fee should be the fee paid to send the message in polkadot to eth or to sign the transaction in eth to polkadot
    console.log('fee in getFee', fee);

    return AssetAmount.fromChainAsset(chain.getChainAsset(dev), {
      // TODO not dev
      amount: fee.relayFee?.amount || 0n,
    });
  }

  if (ContractConfig.is(transfer)) {
    return getContractFee({
      address: sourceAddress,
      chain: chain as EvmChain | EvmParachain,
      contract: transfer,
      destinationFee,
      feeBalance,
      feeConfig,
    });
  }

  return getExtrinsicFee({
    address: sourceAddress,
    balance,
    chain: chain as AnyParachain,
    extrinsic: transfer as ExtrinsicConfig,
    feeBalance,
    feeConfig,
  });
}
