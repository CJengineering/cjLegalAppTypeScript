import { Contract } from '../model/contract';

export interface ContractRepositoryPort {
  save(contract: Contract): Promise<void>;
  getById(id: string): Promise<Contract>;
}
