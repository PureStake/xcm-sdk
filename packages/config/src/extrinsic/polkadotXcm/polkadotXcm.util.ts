import { ChainConfig, MoonChainConfig } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';
import {
  PolkadotXcmAssetParam,
  PolkadotXcmPallet,
} from './polkadotXcm.interfaces';

export function getCreateExtrinsic(
  extrinsic: PolkadotXcmExtrinsic,
  event: PolkadotXcmExtrinsicSuccessEvent,
  config: MoonChainConfig,
  origin: ChainConfig,
) {
  return (
    getAsset: (amount: bigint) => PolkadotXcmAssetParam,
  ): PolkadotXcmPallet => ({
    pallet: ExtrinsicPallet.PolkadotXcm,
    extrinsic,
    successEvent: event,
    getParams: (account, amount) => [
      {
        V1: {
          parents: 1,
          interior: {
            X1: {
              Parachain: config.parachainId,
            },
          },
        },
      },
      {
        V1: {
          parents: 0,
          interior: {
            X1: {
              AccountKey20: {
                network: 'Any',
                key: account,
              },
            },
          },
        },
      },
      getAsset(amount),
      0,
      {
        Limited: origin.weight,
      },
    ],
  });
}
