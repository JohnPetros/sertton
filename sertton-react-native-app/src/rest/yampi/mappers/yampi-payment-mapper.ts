import { type Payment, PaymentMethod } from "@/core/checkout/entities"
import type { YampiPayment } from "@/rest/yampi/types"

export const YampiPaymentMapper = () => ({
  toDomain(input: YampiPayment): Payment {
    const method = input.payment_method ?? input.status ?? input.alias
    return {
      id: String(input.id),
      name: input.name ?? input.payment_method_name ?? "Pagamento",
      icon: input.icon_url ?? input.payment_method_icon_url ?? "",
      pdf: input.billet_url ?? input.pix_qr_code_url ?? undefined,
      method: method.includes("pix")
        ? PaymentMethod.pix
        : method.includes("credit_card")
          ? PaymentMethod.creditCard
          : PaymentMethod.boleto,
    }
  },
})
