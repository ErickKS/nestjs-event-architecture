export const EVENTS = {
  ORDER_CREATED: 'order.created',
  PAYMENT_APPROVED: 'payment.approved',
  PAYMENT_REJECTED: 'payment.rejected',
} as const

export type EventTypes = (typeof EVENTS)[keyof typeof EVENTS]
