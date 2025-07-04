import { UpdatePaymentUseCase } from '@/application/payment/use-cases/update-payment'
import { PaymentStatusEnum } from '@/domain/payment/payment'
import { Body, Controller, HttpCode, Post, UnprocessableEntityException, UsePipes, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { zodToOpenAPI } from 'nestjs-zod'
import { z } from 'zod'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'

const updatePaymentBodySchema = z.object({
  paymentId: z.string().uuid(),
  status: z.nativeEnum(PaymentStatusEnum),
})
type UpdatePaymentBodySchema = z.infer<typeof updatePaymentBodySchema>

@Controller('webhook/payment-notification')
@ApiTags('Payments')
export class UpdatePaymentWebHookController {
  constructor(private readonly updatePayment: UpdatePaymentUseCase) {}

  @Post()
  @HttpCode(204)
  @UpdatePaymentWebHookController.swagger()
  @UsePipes(
    new ZodRequestValidationPipe({
      body: updatePaymentBodySchema,
    })
  )
  async handle(@Body() body: UpdatePaymentBodySchema) {
    try {
      await this.updatePayment.execute(body)
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Update payment webhook',
        description: 'This webhook updates a payment status based on notifications from external providers (e.g., Stripe, Cielo).',
      }),
      ApiBody({ schema: zodToOpenAPI(updatePaymentBodySchema) }),
      ApiResponse({ status: 204, description: 'No Content' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
