import { faker } from "@faker-js/faker"

import { type Payment, PaymentMethod } from "../payment"

export class PaymentFaker {
  static fake(payment?: Partial<Payment>): Payment {
    return {
      icon: faker.image.url(),
      id: faker.string.uuid(),
      method: faker.helpers.arrayElement(Object.values(PaymentMethod)),
      name: faker.finance.currencyName(),
      pdf: faker.internet.url(),
      ...payment,
    }
  }

  static fakeMany(count = 10, payment?: Partial<Payment>): Payment[] {
    return Array.from({ length: count }, () => PaymentFaker.fake(payment))
  }
}
