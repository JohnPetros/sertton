export interface YampiBrand {
  readonly id: number
  readonly name: string
  readonly description: string | null
  readonly active: boolean
  readonly featured: boolean
  readonly logo_url: string | null
}
