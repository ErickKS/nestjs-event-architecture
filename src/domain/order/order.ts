import { AggregateRoot } from '@/shared/entities/aggregate-root'
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

export interface RestoreOrderProps {
  total: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export class Order extends AggregateRoot<OrderProps> {
  get total(): number {
    return this.props.total
  }

  get status(): string {
    return this.props.status
  }

  private set status(status: OrderStatusEnum) {
    this.props.status = status
    this.touch()
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
    order.addDomainEvent(this.createOrderCreatedEvent(order))
    return order
  }

  static restore(props: RestoreOrderProps, id: string): Order {
    const order = new Order(
      {
        total: props.total,
        status: Order.parseStatus(props.status),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      UniqueEntityID.restore(id)
    )
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

  updateStatus(status: OrderStatusEnum) {
    if (this.status === status) return
    this.status = status
  }
}
