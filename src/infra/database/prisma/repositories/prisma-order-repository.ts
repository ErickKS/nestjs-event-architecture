import { OrderRepository } from '@/application/order/repositories/order-repository'
import { Order } from '@/domain/order/order'
import { Injectable } from '@nestjs/common'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    })
    if (!order) return null
    return PrismaOrderMapper.toDomain(order)
  }

  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)
    await this.prisma.$transaction(async tx => {
      await tx.order.create({
        data,
      })
    })
  }
}
