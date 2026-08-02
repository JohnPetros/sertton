import { faker } from "@faker-js/faker"

import type { Sku } from "../sku"

export class SkuFaker {
  static fake(sku?: Partial<Sku>): Sku {
    const salePrice = faker.number.float({ fractionDigits: 2, min: 10, max: 1000 })

    return {
      costPrice: salePrice * 0.6,
      discountPrice: salePrice * 0.9,
      height: faker.number.float({ fractionDigits: 2, min: 1, max: 100 }),
      id: faker.string.uuid(),
      imageUrl: faker.image.url(),
      length: faker.number.float({ fractionDigits: 2, min: 1, max: 100 }),
      salePrice,
      skuCode: faker.string.alphanumeric(8).toUpperCase(),
      stock: faker.number.int({ min: 1, max: 100 }),
      variations: [],
      weight: faker.number.float({ fractionDigits: 2, min: 0.1, max: 50 }),
      width: faker.number.float({ fractionDigits: 2, min: 1, max: 100 }),
      yampiToken: faker.string.alphanumeric(20),
      ...sku,
    }
  }

  static fakeMany(count = 10, sku?: Partial<Sku>): Sku[] {
    return Array.from({ length: count }, () => SkuFaker.fake(sku))
  }
}
