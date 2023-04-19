import * as fs from 'fs/promises';

import { Contract } from 'src/core/domain/model/contract';
import { ContractRepositoryPort } from 'src/core/domain/port/contract.repository';

export class FakeContractRepository implements ContractRepositoryPort {
  private contracts: Contract[] = [];

  async save(contract: Contract) {
    this.contracts.push(contract);
  }

  async getById(id: string) {
    const contract = this.contracts.find((contract) => contract.id === id);
    if (contract === undefined) {
      throw new Error('contract does not exist');
    }
    return contract;
  }
}

export class PgContractRepository implements ContractRepositoryPort {
  async save(contract: Contract) {
    const data = await fs.readFile('./db.txt', { encoding: 'utf8' });
    const jsonData = data ? JSON.parse(data) : {};
    jsonData[contract.id] = contract;
    await fs.writeFile('./db.txt', JSON.stringify(jsonData));
  }

  async getById(id: string) {
    const data = await fs.readFile('./db.txt', { encoding: 'utf8' });
    const jsonData = data ? JSON.parse(data) : {};
    return jsonData[id];
  }
}
