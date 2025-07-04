import { randomUUID } from 'node:crypto'
import { Payment, PaymentStatusEnum } from '@/domain/payment/payment'
import { InMemoryPaymentRepository } from 'test/repositories/in-memory-payment-repository'
import { sleep } from 'test/utils/sleep'
import { UpdatePaymentUseCase } from './update-payment'

let paymentRepository: InMemoryPaymentRepository
let sut: UpdatePaymentUseCase

describe('Update Payment Use Case', () => {
  beforeEach(() => {
    paymentRepository = new InMemoryPaymentRepository()
    sut = new UpdatePaymentUseCase(paymentRepository)
  })

  it('should update an payment', async () => {
    const payment = Payment.create(
      {
        orderId: randomUUID(),
        amount: 10,
      },
      'payment-1'
    )
    await paymentRepository.save(payment)
    await sleep(10)
    const input = {
      paymentId: 'payment-1',
      status: PaymentStatusEnum.APPROVED,
    }
    await sut.execute(input)
    expect(paymentRepository.payments[0].status).toBe(PaymentStatusEnum.APPROVED)
    expect(paymentRepository.payments[0].updatedAt).not.toEqual(paymentRepository.payments[0].createdAt)
  })

  it('should throw if payment does not exist', async () => {
    await expect(() =>
      sut.execute({
        paymentId: 'non-existent',
        status: PaymentStatusEnum.APPROVED,
      })
    ).rejects.toThrowError('Payment not found')
  })
})
