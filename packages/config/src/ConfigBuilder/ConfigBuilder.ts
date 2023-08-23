/* eslint-disable sort-keys */
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService } from '../ConfigService';
import { TransferConfig } from './ConfigBuilder.interfaces';

export function ConfigBuilder(service?: ConfigService) {
  const config = service ?? new ConfigService();
  return {
    assets: (ecosystem?: Ecosystem) => {
      const assets = config.getEcosystemAssets(ecosystem);

      return {
        assets,
        asset: (keyOrAsset: string | Asset) => {
          const asset = config.getAsset(keyOrAsset);
          const sourceChains = config.getSourceChains(asset, ecosystem);

          return {
            sourceChains,
            source: (keyOrChain: string | AnyChain) => {
              const source = config.getChain(keyOrChain);
              const destinationChains = config.getDestinationChains(
                asset,
                source,
              );

              return {
                destinationChains,
                destination: (
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  keyOrChain: string | AnyChain,
                ) => {
                  const destination = config.getChain(keyOrChain);
                  const sourceConfig = config.getAssetDestinationConfig(
                    asset,
                    source,
                    destination,
                  );
                  const destinationConfig = config.getAssetDestinationConfig(
                    asset,
                    destination,
                    source,
                  );

                  return {
                    build: (): TransferConfig => ({
                      asset,
                      source: {
                        chain: source,
                        config: sourceConfig,
                      },
                      destination: {
                        chain: destination,
                        config: destinationConfig,
                      },
                    }),
                  };
                },
              };
            },
          };
        },
      };
    },
  };
}
