export type PaymentMethod = 'credit-card' | 'ticket' | 'pix'

export type YampiPayment = {
  id: number
  name: string
  alias: string
  has_config: boolean
  active_config: boolean
  is_credit_card: boolean
  is_deposit: boolean
  is_billet: boolean
  is_pix: boolean
  is_pix_in_installments: boolean
  is_wallet: boolean
  icon_url: string
}
