import { faker } from "@faker-js/faker"

import type { Collection } from "../collection"

export class CollectionFaker {
  static fake(collection?: Partial<Collection>): Collection {
    return { id: faker.string.uuid(), name: faker.commerce.productAdjective(), ...collection }
  }

  static fakeMany(count = 10, collection?: Partial<Collection>): Collection[] {
    return Array.from({ length: count }, () => CollectionFaker.fake(collection))
  }
}
