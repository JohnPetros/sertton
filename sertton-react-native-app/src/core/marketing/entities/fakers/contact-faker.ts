import { faker } from "@faker-js/faker"

import { type Contact, ContactOrigin } from "../contact"

export class ContactFaker {
  static fake(contact?: Partial<Contact>): Contact {
    return {
      origin: faker.helpers.arrayElement(Object.values(ContactOrigin)),
      title: faker.lorem.words(3),
      url: faker.internet.url(),
      ...contact,
    }
  }

  static fakeMany(count = 10, contact?: Partial<Contact>): Contact[] {
    return Array.from({ length: count }, () => ContactFaker.fake(contact))
  }
}
