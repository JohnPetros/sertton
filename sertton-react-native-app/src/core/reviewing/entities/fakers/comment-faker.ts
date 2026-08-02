import { faker } from "@faker-js/faker"
import type { Comment } from "../comment"
import { AuthorFaker } from "./author-faker"

export class CommentFaker {
  static fake(comment?: Partial<Comment>): Comment {
    return {
      author: AuthorFaker.fake(),
      message: faker.lorem.sentence(),
      parentCommentId: faker.datatype.boolean() ? faker.string.uuid() : undefined,
      productId: faker.string.uuid(),
      ...comment,
    }
  }

  static fakeMany(count = 10, comment?: Partial<Comment>): Comment[] {
    return Array.from({ length: count }, () => CommentFaker.fake(comment))
  }
}
