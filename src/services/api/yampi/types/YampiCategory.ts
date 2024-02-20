type CreatedAtUpdatedAt = {
  date: string
  timezone: string
  timezone_type: number
}

export type YampiCategory = {
  active: boolean
  canonical_url: string | null
  category_cover: string | null
  created_at: CreatedAtUpdatedAt
  description: string
  external_url: string | null
  featured: boolean
  filters_values_ids: number[]
  id: number
  is_parent: boolean
  merchant_id: number
  ml_category: string | null
  name: string
  order: number
  parent_id: number | null
  price_factor: string
  slug: string
  slug_path: string
  sort_by: string
  total_banners: number
  updated_at: CreatedAtUpdatedAt
  url: string
  url_path: string
}
