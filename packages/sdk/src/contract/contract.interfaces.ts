import type { TransactionResponse } from '@ethersproject/abstract-provider';

export interface ContractInterface {
  readonly address: string;
  transfer(): Promise<TransactionResponse>;
  getFee(): Promise<bigint>;
}
