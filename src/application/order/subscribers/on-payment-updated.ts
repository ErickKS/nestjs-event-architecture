import { PaymentUpdatedEvent } from '@/domain/payment/events/payment-updated-event'
import { Injectable } from '@nestjs/common'
import { UpdateOrderStatusByPaymentStatusUseCase } from '../use-cases/update-order-status-by-payment-status'

@Injectable()
export class OnPaymentUpdatedOrderSubscriber {
  constructor(private readonly updateOrderStatusByPaymentStatusUseCase: UpdateOrderStatusByPaymentStatusUseCase) {}

  async handle(event: PaymentUpdatedEvent): Promise<void> {
    const input = {
      orderId: event.payload.orderId,
      paymentStatus: event.payload.status,
    }
    await this.updateOrderStatusByPaymentStatusUseCase.execute(input)
  }
}
