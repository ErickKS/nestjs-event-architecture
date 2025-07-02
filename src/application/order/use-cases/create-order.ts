import { Order } from '@/domain/order/order'
import { Injectable } from '@nestjs/common'
import { OrderRepository } from '../repositories/order-repository'
import { DomainEventPublisher } from '@/shared/events/domain-event-publisher'
import { OrderCreatedEvent } from '@/domain/order/events/order-created-envent'

interface CreateOrderInput {
  total: number
}

interface CreateOrderOutput {
  order: Order
}

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const order = Order.create(input)
    await this.orderRepository.save(order)
    DomainEventPublisher.instance.publishAggregateEvents(order)
    return {
      order,
    }
  }

  private createOrderCreatedEvent(order: Order) {
    return new OrderCreatedEvent({
      orderId: order.id,
      total: order.total,
    })
  }
}
