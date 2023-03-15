import * as fs from 'fs/promises';

type Contract = {
  name: string;
  id: string;
  status: 'not_verified' | 'in_review';
};

type CreateContractCommand = {
  name: string;
};

interface ContractRepositoryPort {
  save(contract: Contract): Promise<void>;
  getById(id: string): Promise<Contract>;
}

class FakeContractRepository implements ContractRepositoryPort {
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

const createContract = async (cmd: CreateContractCommand, contractRepository: ContractRepositoryPort) => {
  const contract: Contract = {
    name: cmd.name,
    id: '123',
    status: 'not_verified',
  };
  await contractRepository.save(contract);
};

test('should create a contract', async () => {
  // arrange
  // act
  const contractRepository = new FakeContractRepository();
  const cmd = { name: 'new nda' };
  await createContract(cmd, contractRepository);
  // assert
  const contract = await contractRepository.getById('123');
  expect(contract!.id).toEqual('123');
  expect(contract!.name).toEqual('new nda');
  expect(contract!.status).toEqual('not_verified');
});

xtest('should not find the contract if it has not been created', async () => {
  // arrange
  // act
  const contractRepository = new FakeContractRepository();
  // assert
  const contract = await contractRepository.getById('123');
  expect(contract).toEqual(undefined);
});

class PgContractRepository implements ContractRepositoryPort {
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

test('should save and get a contract from database', async () => {
  const contractRepository = new PgContractRepository();
  await contractRepository.save({
    name: 'new_nda',
    id: '123',
    status: 'not_verified',
  });
  const contract = await contractRepository.getById('123');
  expect(contract!.id).toEqual('123');
  expect(contract!.name).toEqual('new_nda');
  expect(contract!.status).toEqual('not_verified');
});
