import { PaymentRepository } from '@/application/payment/repositories/order-repository'
import { Payment } from '@/domain/payment/payment'
import { Injectable } from '@nestjs/common'
import { PrismaPaymentMapper } from '../mappers/prisma-payment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    })
    if (!payment) return null
    return PrismaPaymentMapper.toDomain(payment)
  }

  async save(payment: Payment): Promise<void> {
    const data = PrismaPaymentMapper.toPrisma(payment)
    await this.prisma.$transaction(async tx => {
      await tx.payment.create({
        data,
      })
    })
  }

  async update(payment: Payment): Promise<void> {
    const data = PrismaPaymentMapper.toPrisma(payment)
    await this.prisma.payment.update({
      where: { id: payment.id },
      data,
    })
  }
}
