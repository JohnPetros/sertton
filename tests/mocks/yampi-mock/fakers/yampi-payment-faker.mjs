import { faker } from "@faker-js/faker"

export class YampiPaymentFaker {
  static create(overrides = {}) {
    const id = overrides.id ?? faker.number.int({ min: 1, max: 9999 })

    return {
      id,
      name: "Cartão de crédito",
      alias: "credit_card",
      icon_url: `https://placehold.co/96x64/png?text=Pay+${id}`,
      payment_method: "credit_card",
      payment_method_name: "Cartão de crédito",
      payment_method_icon_url: null,
      billet_url: null,
      pix_qr_code_url: null,
      status: "credit_card",
      ...overrides,
    }
  }
}
