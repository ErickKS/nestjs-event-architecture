import { OrderCreatedHandler } from '@/application/order/events/order-created-handler'
import { PaymentRepository } from '@/application/payment/repositories/order-repository'
import { OnOrderCreatedPaymentSubscriber } from '@/application/payment/subscribers/on-order-created'
import { CreatePaymentUseCase } from '@/application/payment/use-cases/create-payment'
import { Module } from '@nestjs/common'
import { InMemoryPaymentRepository } from 'test/repositories/in-memory-payment-repository'
import { EventDispatcherService } from './event.dispatcher.service'

@Module({
  providers: [
    OrderCreatedHandler,
    OnOrderCreatedPaymentSubscriber,
    EventDispatcherService,
    CreatePaymentUseCase,
    {
      provide: PaymentRepository,
      useClass: InMemoryPaymentRepository,
    },
  ],
})
export class EventsModule {}
