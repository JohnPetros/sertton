import { faker } from "@faker-js/faker"

const date = () => ({ date: "2026-01-01 00:00:00.000000", timezone: "UTC", timezone_type: 3 })

export class YampiCollectionFaker {
  static create(overrides = {}) {
    const id = overrides.id ?? faker.number.int({ min: 1, max: 9999 })
    const name = overrides.name ?? `Coleção ${id}`

    return {
      active: true,
      created_at: date(),
      description: null,
      end_at: date(),
      expired: false,
      featured: false,
      home: true,
      id,
      is_promotional: false,
      name,
      parent_id: null,
      path: `colecao-${id}`,
      show_banners: false,
      slug: `colecao-${id}`,
      start_at: date(),
      total_products: 2,
      updated_at: date(),
      url: `/colecoes/${id}`,
      visible_products: 2,
      ...overrides,
    }
  }
}
