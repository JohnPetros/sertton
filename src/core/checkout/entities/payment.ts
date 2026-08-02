export enum PaymentMethod {
  boleto = "boleto",
  creditCard = "creditCard",
  pix = "pix",
}

export interface Payment {
  readonly icon: string
  readonly id: string
  readonly method: PaymentMethod
  readonly name: string
  readonly pdf?: string
}
