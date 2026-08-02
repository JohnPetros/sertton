export interface YampiDateTime {
  readonly date: string
  readonly timezone: string
  readonly timezone_type: number
}

export interface YampiCollection {
  readonly active: boolean
  readonly created_at: YampiDateTime
  readonly description: string | null
  readonly end_at: YampiDateTime
  readonly expired: boolean
  readonly featured: boolean
  readonly home: boolean
  readonly id: number
  readonly is_promotional: boolean
  readonly name: string
  readonly parent_id: number | null
  readonly path: string
  readonly show_banners: boolean
  readonly slug: string
  readonly start_at: YampiDateTime
  readonly total_products: number
  readonly updated_at: YampiDateTime
  readonly url: string
  readonly visible_products: number
}
