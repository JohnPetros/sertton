import { faker } from "@faker-js/faker"

export class YampiBrandFaker {
  static create(overrides = {}) {
    const id = overrides.id ?? faker.number.int({ min: 1, max: 9999 })

    return {
      id,
      name: `Marca ${id}`,
      description: null,
      active: true,
      featured: false,
      logo_url: null,
      ...overrides,
    }
  }
}
