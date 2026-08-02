import { faker } from "@faker-js/faker"

import { type Customer, PersonType } from "../customer"

export class CustomerFaker {
  static fake(customer?: Partial<Customer>): Customer {
    return {
      email: faker.internet.email(),
      id: faker.string.uuid(),
      isActive: true,
      name: faker.person.fullName(),
      personType: PersonType.natural,
      phone: faker.phone.number(),
      selectedAddressZipcode: faker.location.zipCode("#####-###"),
      ...customer,
    }
  }

  static fakeMany(count = 10, customer?: Partial<Customer>): Customer[] {
    return Array.from({ length: count }, () => CustomerFaker.fake(customer))
  }
}
