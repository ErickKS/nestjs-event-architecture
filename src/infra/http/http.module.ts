import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { CreateOrderUseCase } from '@/application/order/use-cases/create-order'
import { GetOrderByIdUseCase } from '@/application/order/use-cases/get-order-by-id'
import { HealthCheckController } from './crontrollers/app/health-check.controller'
import { CreateOrderController } from './crontrollers/order/create-order.controller'
import { GetOrderByIdController } from './crontrollers/order/get-order-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [HealthCheckController, CreateOrderController, GetOrderByIdController],
  providers: [CreateOrderUseCase, GetOrderByIdUseCase],
})
export class HttpModule {}
