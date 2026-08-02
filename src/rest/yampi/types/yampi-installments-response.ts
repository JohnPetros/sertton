import type { YampiInstallment } from "./yampi-installment"

export interface YampiInstallmentsResponse {
  readonly amount: number
  readonly installments: readonly YampiInstallment[]
  readonly max_installment: number
  readonly max_installment_value: number
  readonly text: string
  readonly text_with_tax: string
}
