export interface YampiCategory {
  readonly id: number
  readonly name: string
  readonly description: string | null
  readonly active: boolean
  readonly parent_id: number | null
  readonly slug: string
}
