import { faker } from "@faker-js/faker"

import type { Author } from "../author"

export class AuthorFaker {
  static fake(author?: Partial<Author>): Author {
    return { email: faker.internet.email(), name: faker.person.fullName(), ...author }
  }

  static fakeMany(count = 10, author?: Partial<Author>): Author[] {
    return Array.from({ length: count }, () => AuthorFaker.fake(author))
  }
}
