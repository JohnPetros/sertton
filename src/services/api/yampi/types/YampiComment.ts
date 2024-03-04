export type YampiComment = {
  id: number
  product_id: number
  comment_id: number | null
  approved: boolean
  name: string
  email: string
  message: string
  answer: string | null
}