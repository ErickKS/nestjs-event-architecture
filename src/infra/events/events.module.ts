import { OnPaymentUpdatedOrderSubscriber } from '@/application/order/subscribers/on-payment-updated'
import { UpdateOrderStatusByPaymentStatusUseCase } from '@/application/order/use-cases/update-order-status-by-payment-status'
import { OnOrderCreatedPaymentSubscriber } from '@/application/payment/subscribers/on-order-created'
import { CreatePaymentUseCase } from '@/application/payment/use-cases/create-payment'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { EventDispatcherService } from './event.dispatcher.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    EventDispatcherService,

    OnOrderCreatedPaymentSubscriber,
    OnPaymentUpdatedOrderSubscriber,

    CreatePaymentUseCase,
    UpdateOrderStatusByPaymentStatusUseCase,
  ],
})
export class EventsModule {}
