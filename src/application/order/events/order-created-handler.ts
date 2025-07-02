import { OrderCreatedEvent } from '@/domain/order/events/order-created-envent'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderCreatedHandler {
  async handle(event: OrderCreatedEvent): Promise<void> {
    console.log('[OrderCreatedHandler] Event received')
  }
}
