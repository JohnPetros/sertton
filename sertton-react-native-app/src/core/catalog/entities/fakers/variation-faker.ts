import { faker } from "@faker-js/faker"

import type { Variation } from "../variation"

export class VariationFaker {
  static fake(variation?: Partial<Variation>): Variation {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productMaterial(),
      value: faker.commerce.productMaterial(),
      ...variation,
    }
  }

  static fakeMany(count = 10, variation?: Partial<Variation>): Variation[] {
    return Array.from({ length: count }, () => VariationFaker.fake(variation))
  }
}
