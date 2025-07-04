import { Order, OrderStatusEnum } from '@/domain/order/order'
import { PaymentStatusEnum } from '@/domain/payment/payment'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { UpdateOrderStatusByPaymentStatusUseCase } from './update-order-status-by-payment-status'

let orderRepository: InMemoryOrderRepository
let sut: UpdateOrderStatusByPaymentStatusUseCase

describe('Update Order Status Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository()
    sut = new UpdateOrderStatusByPaymentStatusUseCase(orderRepository)
  })

  it('should update order status from PAYMENT_PENDING -> PAID -> PREPARING', async () => {
    const order = Order.create(
      {
        total: 10,
      },
      'order-1'
    )
    await orderRepository.save(order)
    await sut.execute({ orderId: 'order-1', paymentStatus: PaymentStatusEnum.APPROVED })
    const orderUpdated = await orderRepository.findById('order-1')
    expect(orderUpdated?.status).toBe(OrderStatusEnum.PAID)
  })
})
