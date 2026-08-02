import type { Installment } from "@/core/checkout/entities"
import type { YampiInstallment } from "@/rest/yampi/types"

export const YampiInstallmentMapper = () => ({
  toDomain(input: YampiInstallment): Installment {
    return {
      number: input.installment,
      value: input.installment_value_formated,
      totalValue: input.amount_formated,
      text: input.text,
      interestFree: input.tax_value === 0,
    }
  },
})
