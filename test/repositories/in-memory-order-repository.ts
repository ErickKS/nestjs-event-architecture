import { OrderRepository } from '@/application/order/repositories/order-repository'
import { Order } from '@/domain/order/order'

export class InMemoryOrderRepository implements OrderRepository {
  orders: Order[] = []

  async findById(id: string): Promise<Order | null> {
    return this.orders.find(order => order.id === id) || null
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

  async update(order: Order): Promise<void> {
    const index = this.orders.findIndex(i => i.id === order.id)
    if (index !== -1) this.orders[index] = order
  }
}
