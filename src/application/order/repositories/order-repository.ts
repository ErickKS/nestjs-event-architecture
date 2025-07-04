import { Order } from '@/domain/order/order'

export abstract class OrderRepository {
  abstract findById(id: string): Promise<Order | null>
  abstract save(order: Order): Promise<void>
  abstract update(order: Order): Promise<void>
}
