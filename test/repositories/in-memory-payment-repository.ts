import { PaymentRepository } from '@/application/payment/repositories/order-repository'
import { Payment } from '@/domain/payment/payment'

export class InMemoryPaymentRepository implements PaymentRepository {
  payments: Payment[] = []

  async findById(id: string): Promise<Payment | null> {
    return this.payments.find(payment => payment.id === id) || null
  }

  async save(payment: Payment): Promise<void> {
    this.payments.push(payment)
  }

  async update(payment: Payment): Promise<void> {
    const index = this.payments.findIndex(i => i.id === payment.id)
    if (index !== -1) this.payments[index] = payment
  }
}
