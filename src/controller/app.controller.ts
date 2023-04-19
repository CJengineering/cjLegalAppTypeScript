import { Controller, Post } from '@nestjs/common';
import {
  CreateContractCommand,
  createContract,
} from 'src/core/usecase/create-contract';
import { PgContractRepository } from 'src/infrastructure/repository/contract';

@Controller('/contract')
export class ContractController {
  @Post()
  async create() {
    const cmd: CreateContractCommand = {
      name: 'new_contract',
    };
    const repo = new PgContractRepository();
    await createContract(cmd, repo);
  }
}
