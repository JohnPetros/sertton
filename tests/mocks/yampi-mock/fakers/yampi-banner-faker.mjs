import { faker } from "@faker-js/faker"

export class YampiBannerFaker {
  static create(overrides = {}) {
    const id = overrides.id ?? faker.number.int({ min: 1, max: 9999 })

    return {
      id,
      product_id: null,
      type: "image",
      active: true,
      home: true,
      name: `Banner ${id}`,
      slug: `banner-${id}`,
      image_url: `https://placehold.co/1200x400/png?text=Banner+${id}`,
      mobile_image_url: null,
      link: null,
      expired: false,
      ...overrides,
    }
  }
}
