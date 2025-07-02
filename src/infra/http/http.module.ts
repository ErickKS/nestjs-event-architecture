import { Module } from '@nestjs/common'

import { OrderRepository } from '@/application/order/repositories/order-repository'
import { CreateOrderUseCase } from '@/application/order/use-cases/create-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { HealthCheckController } from './crontrollers/app/health-check.controller'
import { CreateOrderController } from './crontrollers/order/create-order.controller'

@Module({
  controllers: [HealthCheckController, CreateOrderController],
  providers: [
    {
      provide: OrderRepository,
      useClass: InMemoryOrderRepository,
    },
    CreateOrderUseCase,
  ],
})
export class HttpModule {}
