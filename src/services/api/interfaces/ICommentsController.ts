import type { Comment } from '@/@types/Comment'

export interface ICommentsController {
  getCommentsByProductId(productId: string): Promise<Comment[]>
  postComment(comment: Comment): Promise<void>
}
