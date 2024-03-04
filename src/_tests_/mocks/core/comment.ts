export type Comment = {
  productId: string
  parentCommentId: string | null
  message: string
  author: {
    name: string
    email: string
  }
}