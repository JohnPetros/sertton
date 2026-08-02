import { faker } from "@faker-js/faker"

import type { Address } from "../address"

export class AddressFaker {
  static fake(address?: Partial<Address>): Address {
    return {
      city: faker.location.city(),
      complement: faker.location.secondaryAddress(),
      id: faker.string.uuid(),
      neighborhood: faker.location.county(),
      number: faker.string.numeric({ length: 3 }),
      receiver: faker.person.fullName(),
      street: faker.location.street(),
      uf: faker.location.state({ abbreviated: true }),
      zipcode: faker.location.zipCode("#####-###"),
      ...address,
    }
  }

  static fakeMany(count = 10, address?: Partial<Address>): Address[] {
    return Array.from({ length: count }, () => AddressFaker.fake(address))
  }
}
