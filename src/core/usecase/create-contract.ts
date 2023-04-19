import { Contract } from '../domain/model/contract';
import { ContractRepositoryPort } from '../domain/port/contract.repository';

export type CreateContractCommand = {
  name: string;
};

export const createContract = async (
  cmd: CreateContractCommand,
  contractRepository: ContractRepositoryPort
) => {
  const contract: Contract = {
    name: cmd.name,
    id: '123',
    status: 'not_verified',
  };
  await contractRepository.save(contract);
};
