


import { OrderRepository } from '@/application/order/repositories/order-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaOrderRepository } from './prisma/repositories/prisma-order-repository'
import { PaymentRepository } from '@/application/payment/repositories/order-repository'
import { PrismaPaymentRepository } from './prisma/repositories/prisma-payment-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
  ],
  exports: [PrismaService, OrderRepository, PaymentRepository],
})
export class DatabaseModule {}
