import { DomainEvent } from '@/shared/events/domain-event'
import { EVENTS } from '@/shared/events/events'
import { PaymentStatusEnum } from '../payment'

export interface PaymentUpdatedEventProps {
  paymentId: string
  orderId: string
  status: PaymentStatusEnum
}

export class PaymentUpdatedEvent extends DomainEvent<PaymentUpdatedEventProps> {
  payload: PaymentUpdatedEventProps

  constructor(props: PaymentUpdatedEventProps) {
    super(EVENTS.PAYMENT_UPDATED)
    this.payload = props
  }
}
