import { BalanceCurrencyTypes } from '../../../balance';
import { AssetSymbol, ChainKey } from '../../../constants';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonriver.common';
import { MoonriverXcmConfig } from '../moonriver.interfaces';

const asset = assets[AssetSymbol.AUSD];
const origin = chains[ChainKey.Karura];

export const AUSD: MoonriverXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.tokens({ [BalanceCurrencyTypes.Token]: 'KUSD' }),
      sourceFeeBalance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset({
          [XTokensExtrinsicCurrencyTypes.Token]: 'KUSD',
        }),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.tokens({ [BalanceCurrencyTypes.Token]: 'KUSD' }),
      destination: origin,
      feePerWeight: 64,
    }),
  },
};
