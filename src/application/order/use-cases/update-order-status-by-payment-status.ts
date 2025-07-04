import { OrderStatusEnum } from '@/domain/order/order'
import { PaymentStatusEnum } from '@/domain/payment/payment'
import { Injectable } from '@nestjs/common'
import { OrderRepository } from '../repositories/order-repository'

interface UpdateOrderStatusInput {
  orderId: string
  paymentStatus: PaymentStatusEnum
}

@Injectable()
export class UpdateOrderStatusByPaymentStatusUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ orderId, paymentStatus }: UpdateOrderStatusInput): Promise<void> {
    const order = await this.orderRepository.findById(orderId)
    if (!order) throw new Error('Order not found')
    const newStatus = this.mapPaymentStatusToOrderStatus(paymentStatus)
    order.updateStatus(newStatus)
    await this.orderRepository.update(order)
  }

  private mapPaymentStatusToOrderStatus(paymentStatus: PaymentStatusEnum): OrderStatusEnum {
    switch (paymentStatus) {
      case PaymentStatusEnum.APPROVED:
        return OrderStatusEnum.PAID
      case PaymentStatusEnum.PENDING:
        return OrderStatusEnum.PAYMENT_PENDING
      case PaymentStatusEnum.FAILED:
      case PaymentStatusEnum.REFUNDED:
        return OrderStatusEnum.CANCELED
      default:
        throw new Error(`Unhandled payment status: ${paymentStatus}`)
    }
  }
}
