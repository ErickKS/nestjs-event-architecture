import { Order } from '@/domain/order/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }

  static toMinimalHTTP(order: Order) {
    return {
      orderId: order.id,
    }
  }
}
