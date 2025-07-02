import { Payment } from '@/domain/payment/payment'
import {
  Prisma,
  Payment as PrismaPayment,
  PaymentStatus as PrismaPaymentStatus,
} from '@prisma/client'

export class PrismaPaymentMapper {
  static toDomain(raw: PrismaPayment): Payment {
    return Payment.restore(
      {
        orderId: raw.orderId,
        status: raw.status,
        amount: raw.amount,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    )
  }

  static toPrisma(payment: Payment): Prisma.PaymentUncheckedCreateInput {
    return {
      orderId: payment.orderId,
      id: payment.id,
      status: payment.status as PrismaPaymentStatus,
      amount: payment.amount,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }
  }
}
