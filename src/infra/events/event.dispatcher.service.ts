import { OrderCreatedHandler } from '@/application/order/events/order-created-handler'
import { OnOrderCreatedPaymentSubscriber } from '@/application/payment/subscribers/on-order-created'
import { OrderCreatedEvent } from '@/domain/order/events/order-created-envent'
import { DomainEventPublisher } from '@/shared/events/domain-event-publisher'
import { EVENTS } from '@/shared/events/events'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class EventDispatcherService implements OnModuleInit {
  constructor(
    private readonly orderCreatedHandler: OrderCreatedHandler,
    private readonly onOrderCreatedPaymentSubscriber: OnOrderCreatedPaymentSubscriber
  ) {}

  onModuleInit() {
    DomainEventPublisher.instance.subscribe<OrderCreatedEvent>(EVENTS.ORDER_CREATED, domainEvent =>
      this.orderCreatedHandler.handle(domainEvent)
    )

    DomainEventPublisher.instance.subscribe<OrderCreatedEvent>(EVENTS.ORDER_CREATED, domainEvent =>
      this.onOrderCreatedPaymentSubscriber.handle(domainEvent)
    )
  }
}
