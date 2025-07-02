import { Order } from '@/domain/order/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      orderId: order.id,
      total: order.total,
    }
  }
}
