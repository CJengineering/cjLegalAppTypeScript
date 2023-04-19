import { Module } from '@nestjs/common';

import { ContractController } from './app.controller';
@Module({
  imports: [],
  controllers: [ContractController],
})
export class AppModule {}
