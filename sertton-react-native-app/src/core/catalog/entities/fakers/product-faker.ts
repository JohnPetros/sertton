import { faker } from "@faker-js/faker"

import type { Product } from "../product"

export class ProductFaker {
  static fake(product?: Partial<Product>): Product {
    return {
      brand: { id: faker.string.uuid(), name: faker.company.name() },
      description: faker.lorem.sentence(),
      id: faker.string.uuid(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      skuCode: faker.string.alphanumeric(8).toUpperCase(),
      skus: [],
      slug: faker.helpers.slugify(faker.commerce.productName()),
      specifications: faker.lorem.sentence(),
      ...product,
    }
  }

  static fakeMany(count = 10, product?: Partial<Product>): Product[] {
    return Array.from({ length: count }, () => ProductFaker.fake(product))
  }
}
