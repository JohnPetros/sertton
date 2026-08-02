import { faker } from "@faker-js/faker"

import type { Installment } from "../installment"

export class InstallmentFaker {
  static fake(installment?: Partial<Installment>): Installment {
    const number = faker.number.int({ min: 1, max: 12 })
    const value = faker.number.float({ fractionDigits: 2, min: 10, max: 500 })

    return {
      interestFree: faker.datatype.boolean(),
      number,
      text: `${number}x de R$ ${value.toFixed(2)}`,
      totalValue: `R$ ${(value * number).toFixed(2)}`,
      value: `R$ ${value.toFixed(2)}`,
      ...installment,
    }
  }

  static fakeMany(count = 10, installment?: Partial<Installment>): Installment[] {
    return Array.from({ length: count }, () => InstallmentFaker.fake(installment))
  }
}
