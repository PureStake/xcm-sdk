import { SetOptional } from 'type-fest';
import { Chain, ChainConstructorParams, ChainType } from './Chain';

export interface SubstrateChainConstructorParams
  extends SetOptional<Omit<ChainConstructorParams, 'type'>, 'id'> {
  genesisHash: string;
  parachainId: number;
  ss58Format: number;
}

export class SubstrateChain extends Chain {
  readonly genesisHash: string;

  readonly parachainId: number;

  readonly ss58Format: number;

  constructor({
    genesisHash,
    parachainId,
    ss58Format,
    id,
    ...other
  }: SubstrateChainConstructorParams) {
    super({ ...other, type: ChainType.Substrate, id: id || parachainId });

    this.genesisHash = genesisHash;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
  }
}
