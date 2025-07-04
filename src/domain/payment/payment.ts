import { AggregateRoot } from '@/shared/entities/aggregate-root'
import { UniqueEntityID } from '@/shared/value-objects/unique-entity-id'
import { PaymentUpdatedEvent } from './events/payment-updated-event'

export enum PaymentStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface PaymentProps {
  orderId: UniqueEntityID
  amount: number
  status: PaymentStatusEnum
  createdAt: Date
  updatedAt: Date
}

export interface CreatePaymentProps {
  orderId: string
  amount: number
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RestorePaymentProps {
  orderId: string
  amount: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export class Payment extends AggregateRoot<PaymentProps> {
  get orderId(): string {
    return this.props.orderId.value
  }

  get amount(): number {
    return this.props.amount
  }

  get status(): PaymentStatusEnum {
    return this.props.status
  }

  private set status(status: PaymentStatusEnum) {
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

  static create(props: CreatePaymentProps, id?: string): Payment {
    const payment = new Payment(
      {
        orderId: UniqueEntityID.create(props.orderId),
        amount: props.amount,
        status: props.status ? Payment.parseStatus(props.status) : PaymentStatusEnum.PENDING,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      UniqueEntityID.create(id)
    )
    return payment
  }

  static restore(props: RestorePaymentProps, id: string): Payment {
    const payment = new Payment(
      {
        orderId: UniqueEntityID.restore(props.orderId),
        amount: props.amount,
        status: Payment.parseStatus(props.status),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      UniqueEntityID.restore(id)
    )
    return payment
  }

  private static parseStatus(aString: string): PaymentStatusEnum {
    const isValidPaymentStatus = Object.values(PaymentStatusEnum).includes(aString as PaymentStatusEnum)
    if (!isValidPaymentStatus) throw new Error(`Invalid payment status: ${aString}`)
    return aString as PaymentStatusEnum
  }

  updateStatus(status: PaymentStatusEnum) {
    if (this.status === status) return
    this.status = status
    this.addDomainEvent(Payment.createPaymentUpdatedEvent(this))
  }

  private static createPaymentUpdatedEvent(payment: Payment) {
    return new PaymentUpdatedEvent({
      paymentId: payment.id,
      orderId: payment.orderId,
      status: payment.status,
    })
  }
}
