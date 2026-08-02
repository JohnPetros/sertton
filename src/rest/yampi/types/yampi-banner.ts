export interface YampiBanner {
  readonly id: number
  readonly product_id: number | null
  readonly type: string
  readonly active: boolean
  readonly home: boolean
  readonly name: string
  readonly slug: string
  readonly image_url: string
  readonly mobile_image_url: string | null
  readonly link: string | null
  readonly expired: boolean
}
