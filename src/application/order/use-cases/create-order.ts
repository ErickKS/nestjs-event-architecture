import { Order } from '@/domain/order/order'
import { Injectable } from '@nestjs/common'
import { OrderRepository } from '../repositories/order-repository'

interface CreateOrderInput {
  total: number
}

interface CreateOrderOutput {
  order: Order
}

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const order = Order.create(input)
    await this.orderRepository.save(order)
    return {
      order,
    }
  }
}
