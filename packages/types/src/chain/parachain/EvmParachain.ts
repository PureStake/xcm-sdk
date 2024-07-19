import { Address } from 'viem';
import { Chain } from 'viem/chains';
import { Parachain, ParachainConstructorParams } from './Parachain';
import { getViemChain } from '../Chain.utils';

export interface EvmParachainConstructorParams
  extends ParachainConstructorParams {
  id: number;
  rpc: string;
  isEvmSigner?: boolean;
  contracts?: Contracts;
}

type Contracts = {
  Xtokens?: Address;
};

export class EvmParachain extends Parachain {
  readonly id: number;

  readonly rpc: string;

  readonly isEvmSigner: boolean;

  readonly contracts?: Contracts;

  static is(obj: unknown): obj is EvmParachain {
    return obj instanceof EvmParachain;
  }

  constructor({
    id,
    rpc,
    isEvmSigner = false,
    contracts,
    ...others
  }: EvmParachainConstructorParams) {
    super(others);

    this.contracts = contracts;
    this.id = id;
    this.rpc = rpc;
    this.isEvmSigner = isEvmSigner;
  }

  getViemChain(): Chain {
    return getViemChain(this);
  }
}
