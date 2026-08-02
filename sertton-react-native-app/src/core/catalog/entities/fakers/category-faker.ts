import { faker } from "@faker-js/faker"

import type { Category } from "../category"

export class CategoryFaker {
  static fake(category?: Partial<Category>): Category {
    return {
      description: faker.lorem.sentence(),
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      ...category,
    }
  }

  static fakeMany(count = 10, category?: Partial<Category>): Category[] {
    return Array.from({ length: count }, () => CategoryFaker.fake(category))
  }
}
