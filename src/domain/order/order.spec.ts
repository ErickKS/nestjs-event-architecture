import { faker } from '@faker-js/faker'
import { Order, OrderStatusEnum } from './order'

const makeValidProps = () => ({
  total: Number(faker.commerce.price()),
})

describe('Order Entity', () => {
  it('should create an order with valid properties', () => {
    const props = makeValidProps()
    const order = Order.create(props)
    expect(order.id).toBeDefined()
    expect(order.total).toBe(props.total)
    expect(order.status).toBe(OrderStatusEnum.PAYMENT_PENDING)
    expect(order.createdAt).toBeInstanceOf(Date)
    expect(order.updatedAt).toBeInstanceOf(Date)
  })

  it('should throw when creating an order with invalid status', () => {
    const props = makeValidProps()
    expect(() => Order.create({ ...props, status: 'INVALID_STATUS' })).toThrowError('Invalid order status: INVALID_STATUS')
  })
})
