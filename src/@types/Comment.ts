export type Comment = {
  id: string
  message: string
  productId: string
  parentCommentId: string
  author: {
    id: string
    email: string
    name: string
  }
}