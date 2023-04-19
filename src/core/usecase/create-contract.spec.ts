import {
  FakeContractRepository,
  PgContractRepository,
} from '../../infrastructure/repository/contract';
import { createContract } from './create-contract';

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
