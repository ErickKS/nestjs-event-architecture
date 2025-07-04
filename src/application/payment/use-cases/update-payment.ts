import { PaymentStatusEnum } from '@/domain/payment/payment'
import { DomainEventPublisher } from '@/shared/events/domain-event-publisher'
import { Injectable } from '@nestjs/common'
import { PaymentRepository } from '../repositories/order-repository'

interface UpdatePaymentInput {
  paymentId: string
  status: PaymentStatusEnum
}

@Injectable()
export class UpdatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({ paymentId, status }: UpdatePaymentInput): Promise<void> {
    const payment = await this.paymentRepository.findById(paymentId)
    if (!payment) throw new Error('Payment not found')
    payment.updateStatus(status)
    await this.paymentRepository.update(payment)
    DomainEventPublisher.instance.publishAggregateEvents(payment)
  }
}
