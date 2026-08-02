export interface YampiPagination {
  readonly count: number
  readonly current_page: number
  readonly per_page: number
  readonly total: number
  readonly total_pages: number
}

export interface YampiResponse<Data> {
  readonly data: readonly Data[]
  readonly meta?: {
    readonly pagination?: YampiPagination
  }
}
