import { toDecimal } from '@moonbeam-network/xcm-utils';
import Big, { RoundingMode } from 'big.js';
import { Asset, AssetConstructorParams } from './Asset';

Big.NE = -18;

export interface AssetAmountParams {
  amount: bigint;
  decimals: number;
  symbol?: string;
  address?: string;
}

export interface AssetAmountConstructorParams
  extends AssetConstructorParams,
    AssetAmountParams {}

export class AssetAmount extends Asset {
  readonly amount: bigint;

  readonly decimals: number;

  readonly symbol: string;

  readonly address?: string;

  constructor({
    amount,
    decimals,
    symbol,
    address,
    ...other
  }: AssetAmountConstructorParams) {
    super(other);

    this.amount = BigInt(amount);
    this.decimals = decimals;
    this.symbol = symbol || this.originSymbol;
    if (address) this.address = address;
  }

  static fromAsset(asset: Asset, params: AssetAmountParams) {
    return new AssetAmount({
      ...asset,
      ...params,
    });
  }

  isSame(asset: AssetAmount): boolean {
    return super.isEqual(asset) && this.decimals === asset.decimals;
  }

  isEqual(asset: AssetAmount): boolean {
    return this.isSame(asset) && this.amount === asset.amount;
  }

  copyWith(params: Partial<AssetAmountConstructorParams>) {
    return new AssetAmount({
      ...this,
      ...params,
    });
  }

  toBig(): Big {
    return Big(this.amount.toString());
  }

  toBigDecimal(maxDecimal?: number, roundType?: RoundingMode): Big {
    return Big(this.toDecimal(maxDecimal, roundType));
  }

  toDecimal(maxDecimal?: number, roundType?: RoundingMode): string {
    return toDecimal(this.amount, this.decimals, maxDecimal, roundType);
  }
}
