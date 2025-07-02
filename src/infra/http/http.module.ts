import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { CreateOrderUseCase } from '@/application/order/use-cases/create-order'
import { HealthCheckController } from './crontrollers/app/health-check.controller'
import { CreateOrderController } from './crontrollers/order/create-order.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [HealthCheckController, CreateOrderController],
  providers: [
    CreateOrderUseCase,
  ],
})
export class HttpModule {}
