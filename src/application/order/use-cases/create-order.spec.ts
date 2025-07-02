import { OrderStatusEnum } from '@/domain/order/order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { CreateOrderUseCase } from './create-order'

let orderRepository: InMemoryOrderRepository
let sut: CreateOrderUseCase

describe('Create Order Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(orderRepository)
  })

  it('should create an order', async () => {
    const input = {
      total: 100,
    }
    const result = await sut.execute(input)
    expect(orderRepository.orders).toHaveLength(1)
    expect(result.order.id).toBeDefined()
    expect(result.order.status).toBe(OrderStatusEnum.PAYMENT_PENDING)
    expect(result.order.total).toBe(100)
  })
})
