import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { QueryConfig } from '../QueryConfig';

export interface AssetMinConfigBuilder {
  build: (params: AssetMinConfigBuilderPrams) => QueryConfig;
}

export interface AssetMinConfigBuilderPrams {
  asset: ChainAssetId;
}
