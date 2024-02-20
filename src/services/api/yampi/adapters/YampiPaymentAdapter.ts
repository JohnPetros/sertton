import type { YampiPayment } from '../types/YampiPayment'

import type { Payment } from '@/@types/Payment'

export const YampiPaymentAdapter = (yampiPayment: YampiPayment) => {
  const payment: Payment = {
    id: String(yampiPayment.id),
    name: yampiPayment.alias,
    icon: yampiPayment.icon_url,
    isCreditCard: yampiPayment.is_credit_card,
    isActive: yampiPayment.active_config,
  }

  return payment
}
