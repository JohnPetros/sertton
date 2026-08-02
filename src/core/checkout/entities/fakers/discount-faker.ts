import { faker } from "@faker-js/faker"

import type { Discount } from "../discount"

export class DiscountFaker {
  static fake(discount?: Partial<Discount>): Discount {
    const minCost = faker.number.float({ fractionDigits: 2, min: 0, max: 500 })

    return {
      maxCost: minCost + faker.number.float({ fractionDigits: 2, min: 1, max: 500 }),
      minCost,
      percentage: faker.number.int({ min: 1, max: 50 }),
      ...discount,
    }
  }

  static fakeMany(count = 10, discount?: Partial<Discount>): Discount[] {
    return Array.from({ length: count }, () => DiscountFaker.fake(discount))
  }
}
