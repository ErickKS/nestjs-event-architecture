import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/value-objects/unique-entity-id'

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

export class Payment extends Entity<PaymentProps> {
  get orderId(): string {
    return this.props.orderId.value
  }

  get total(): number {
    return this.props.amount
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

  private static parseStatus(aString: string): PaymentStatusEnum {
    const isValidPaymentStatus = Object.values(PaymentStatusEnum).includes(aString as PaymentStatusEnum)
    if (!isValidPaymentStatus) throw new Error(`Invalid payment status: ${aString}`)
    return aString as PaymentStatusEnum
  }
}
