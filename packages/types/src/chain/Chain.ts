import { EthereumChain } from './EthereumChain';
import { SubstrateChain } from './SubstrateChain';

export enum Ecosystem {
  Polkadot = 'Polkadot',
  Kusama = 'Kusama',
  AlphanetRelay = 'AlphanetRelay',
}

export enum ChainType {
  Ethereum = 'Ethereum',
  Substrate = 'Substrate',
}

export interface ChainConstructorProps {
  genesisHash?: string;
  id: string | number;
  isTestChain?: boolean;
  key: string;
  name: string;
  parachainId?: number;
  ecosystem?: Ecosystem;
  type: ChainType;
  ws: string;
}

export abstract class Chain {
  readonly genesisHash?: string;

  readonly id: string | number;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly parachainId?: number;

  readonly ecosystem?: Ecosystem;

  readonly type: ChainType;

  readonly ws: string;

  constructor({
    genesisHash,
    id,
    isTestChain = false,
    key,
    name,
    parachainId,
    ecosystem,
    type,
    ws,
  }: ChainConstructorProps) {
    this.genesisHash = genesisHash;
    this.id = id;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.parachainId = parachainId;
    this.ecosystem = ecosystem;
    this.type = type;
    this.ws = ws;
  }

  isEthereumChain(): this is EthereumChain {
    return this instanceof EthereumChain;
  }

  isSubstrateChain(): this is SubstrateChain {
    return this instanceof SubstrateChain;
  }
}