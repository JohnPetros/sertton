export interface YampiPayment {
  readonly id: number
  readonly name: string | null
  readonly alias: string
  readonly icon_url: string | null
  readonly payment_method?: string
  readonly payment_method_name?: string
  readonly payment_method_icon_url?: string
  readonly billet_url?: string | null
  readonly pix_qr_code_url?: string | null
  readonly status?: string
}
