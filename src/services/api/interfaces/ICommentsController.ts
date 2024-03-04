export interface ICommentsController {
  getCommentsByProductId(productId: string): Promise<void>
  postComment(comment: Comment): Promise<void>
}