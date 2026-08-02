import { faker } from "@faker-js/faker"

import { YampiBrandFaker } from "./yampi-brand-faker.mjs"

export class YampiProductFaker {
  static create(overrides = {}) {
    const id = overrides.id ?? faker.number.int({ min: 1, max: 9999 })
    const name = overrides.name ?? `Produto ${id}`
    const brand = overrides.brand ?? YampiBrandFaker.create({ id: id + 10000 })
    const sku = overrides.skus?.data?.[0]
    const skuCode = overrides.sku ?? sku?.sku ?? `SKU-${id}`

    return {
      id,
      name,
      slug: `produto-${id}`,
      sku: skuCode,
      brand: { data: brand },
      texts: {
        data: {
          description: `Descrição de ${name}`,
          specifications: "Produto de teste do mock Yampi.",
        },
      },
      images: {
        data: [
          {
            large: { url: `https://placehold.co/600x600/png?text=Produto+${id}` },
            medium: { url: `https://placehold.co/400x400/png?text=Produto+${id}` },
          },
        ],
      },
      skus: {
        data: [
          {
            id: id + 20000,
            sku: skuCode,
            title: name,
            token: `token-${id}`,
            price_cost: 20,
            price_sale: 49.9,
            price_discount: 0,
            total_in_stock: 10,
            weight: 1,
            height: 10,
            width: 10,
            length: 10,
            variations: [],
          },
        ],
      },
      ...overrides,
    }
  }
}
