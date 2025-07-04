import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { CreateOrderUseCase } from '@/application/order/use-cases/create-order'
import { GetOrderByIdUseCase } from '@/application/order/use-cases/get-order-by-id'
import { UpdatePaymentUseCase } from '@/application/payment/use-cases/update-payment'
import { HealthCheckController } from './crontrollers/app/health-check.controller'
import { CreateOrderController } from './crontrollers/order/create-order.controller'
import { GetOrderByIdController } from './crontrollers/order/get-order-by-id.controller'
import { UpdatePaymentWebHookController } from './crontrollers/payment/update-payment-webhook.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [HealthCheckController, CreateOrderController, GetOrderByIdController, UpdatePaymentWebHookController],
  providers: [CreateOrderUseCase, GetOrderByIdUseCase, UpdatePaymentUseCase],
})
export class HttpModule {}
