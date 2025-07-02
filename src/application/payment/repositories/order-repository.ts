import { Payment } from '@/domain/payment/payment'

export abstract class PaymentRepository {
  abstract save(payment: Payment): Promise<void>
}
