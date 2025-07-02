import { Order } from '@/domain/order/order'
import {
  Prisma,
  Order as PrismaOrder,
  OrderStatus as PrismaOrderStatus,
} from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.restore(
      {
        status: raw.status,
        total: raw.total,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id,
      status: order.status as PrismaOrderStatus,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
