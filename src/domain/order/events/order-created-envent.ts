import { DomainEvent } from '@/shared/events/domain-event'
import { EVENTS } from '@/shared/events/events'

export interface OrderCreatedEventProps {
  orderId: string
  total: number
}

export class OrderCreatedEvent extends DomainEvent<OrderCreatedEventProps> {
  payload: OrderCreatedEventProps

  constructor(props: OrderCreatedEventProps) {
    super(EVENTS.ORDER_CREATED)
    this.payload = props
  }
}
