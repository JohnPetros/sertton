import type { Author } from "@/core/reviewing/entities/author"

export interface Comment {
  readonly author: Author
  readonly message: string
  readonly parentCommentId?: string
  readonly productId: string
}
