import { faker } from "@faker-js/faker"

import type { Brand } from "../brand"

export class BrandFaker {
  static fake(brand?: Partial<Brand>): Brand {
    return { id: faker.string.uuid(), name: faker.company.name(), ...brand }
  }

  static fakeMany(count = 10, brand?: Partial<Brand>): Brand[] {
    return Array.from({ length: count }, () => BrandFaker.fake(brand))
  }
}
