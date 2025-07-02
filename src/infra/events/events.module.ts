import { OrderCreatedHandler } from '@/application/order/events/order-created-handler'
import { OnOrderCreatedPaymentSubscriber } from '@/application/payment/subscribers/on-order-created'
import { CreatePaymentUseCase } from '@/application/payment/use-cases/create-payment'
import { Module } from '@nestjs/common'
import { EventDispatcherService } from './event.dispatcher.service'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OrderCreatedHandler,
    OnOrderCreatedPaymentSubscriber,
    EventDispatcherService,
    CreatePaymentUseCase,
  ],
})
export class EventsModule {}
