import { type MrlAssetRoute, getMoonChain } from '@moonbeam-network/xcm-config';
import { getBalance, getDestinationFee } from '@moonbeam-network/xcm-sdk';
import { EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto';
import type { MoonChainTransferData } from '../mrl.interfaces';

interface GetMoonChainDataParams {
  route: MrlAssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getMoonChainData({
  route,
  sourceAddress,
  destinationAddress,
}: GetMoonChainDataParams): Promise<MoonChainTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MRL config is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const moonChain = getMoonChain(route.source.chain);
  const moonChainAddress = getMoonChainAddress({
    route,
    sourceAddress,
    destinationAddress,
  });

  const fee = await getDestinationFee({
    address: moonChainAddress,
    asset: route.source.asset,
    destination: moonChain,
    fee: route.mrl.moonChain.fee.amount,
    feeAsset: route.mrl.moonChain.fee.asset,
  });

  const balance = await getBalance({
    address: moonChainAddress,
    asset: moonChain.getChainAsset(route.mrl.moonChain.asset),
    builder: route.mrl.moonChain.balance,
    chain: moonChain,
  });

  const feeBalance = await getBalance({
    address: moonChainAddress,
    asset: moonChain.getChainAsset(route.mrl.moonChain.fee.asset),
    builder: route.mrl.moonChain.fee.balance,
    chain: moonChain,
  });

  return {
    address: moonChainAddress,
    balance,
    feeBalance,
    chain: moonChain,
    fee,
  };
}

function getMoonChainAddress({
  route: { source, destination },
  sourceAddress,
  destinationAddress,
}: GetMoonChainDataParams): string {
  const moonChain = getMoonChain(source.chain);
  const isDestinationMoonChain = moonChain.isEqual(destination.chain);
  const isSourceMoonChain = moonChain.isEqual(source.chain);

  let moonChainAddress = isDestinationMoonChain
    ? destinationAddress
    : sourceAddress;

  // for Parachain to EVM transactions, we use the computed origin account in the moonchain
  if (Parachain.is(source.chain) && !isSourceMoonChain) {
    const isSourceEvmSigner =
      EvmParachain.is(source.chain) && source.chain.isEvmSigner;

    const { address20: computedOriginAccount } =
      getMultilocationDerivedAddresses({
        address: isSourceEvmSigner
          ? evmToAddress(sourceAddress)
          : sourceAddress,
        paraId: source.chain.parachainId,
        isParents: true,
      });

    moonChainAddress = computedOriginAccount;
  }

  return moonChainAddress;
}
