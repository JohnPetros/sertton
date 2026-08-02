import { faker } from "@faker-js/faker"

import type { Banner } from "../banner"

export class BannerFaker {
  static fake(banner?: Partial<Banner>): Banner {
    return { id: faker.string.uuid(), imageUrl: faker.image.url(), ...banner }
  }

  static fakeMany(count = 10, banner?: Partial<Banner>): Banner[] {
    return Array.from({ length: count }, () => BannerFaker.fake(banner))
  }
}
