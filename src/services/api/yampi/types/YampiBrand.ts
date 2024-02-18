type CreatedUpdatedAt = {
  date: string
  timezone_type: number
  timezone: string
}

export type YampiBrand = {
  id: number
  active: boolean
  featured: boolean
  name: string
  description: string | null
  logo_url: string
  created_at: CreatedUpdatedAt
  updated_at: CreatedUpdatedAt
}
