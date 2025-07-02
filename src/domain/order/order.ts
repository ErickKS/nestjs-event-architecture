import { Entity } from '@/shared/entities/entity'
import { DomainEventPublisher } from '@/shared/events/domain-event-publisher'
import { UniqueEntityID } from '@/shared/value-objects/unique-entity-id'
import { OrderCreatedEvent } from './events/order-created-envent'

export enum OrderStatusEnum {
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface OrderProps {
  total: number
  status: OrderStatusEnum
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrderProps {
  total: number
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get total(): number {
    return this.props.total
  }

  get status(): string {
    return this.props.status
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: CreateOrderProps, id?: string): Order {
    const order = new Order(
      {
        total: props.total,
        status: props.status ? Order.parseStatus(props.status) : OrderStatusEnum.PAYMENT_PENDING,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      UniqueEntityID.create(id)
    )
    DomainEventPublisher.instance.publish(this.createOrderCreatedEvent(order))
    return order
  }

  private static createOrderCreatedEvent(order: Order) {
    return new OrderCreatedEvent({
      orderId: order.id,
      total: order.total,
    })
  }

  private static parseStatus(aString: string): OrderStatusEnum {
    const isValidOrderStatus = Object.values(OrderStatusEnum).includes(aString as OrderStatusEnum)
    if (!isValidOrderStatus) throw new Error(`Invalid order status: ${aString}`)
    return aString as OrderStatusEnum
  }
}
