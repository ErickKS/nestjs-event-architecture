import { PaymentRepository } from '@/application/payment/repositories/order-repository'
import { Payment } from '@/domain/payment/payment'

export class InMemoryPaymentRepository implements PaymentRepository {
  payments: Payment[] = []

  async save(payment: Payment): Promise<void> {
    this.payments.push(payment)
  }
}
