import { faker } from "@faker-js/faker"

import type { Lead } from "../lead"

export class LeadFaker {
  static fake(lead?: Partial<Lead>): Lead {
    return { email: faker.internet.email(), name: faker.person.fullName(), ...lead }
  }

  static fakeMany(count = 10, lead?: Partial<Lead>): Lead[] {
    return Array.from({ length: count }, () => LeadFaker.fake(lead))
  }
}
