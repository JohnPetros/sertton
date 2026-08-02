export interface Pagination<Item> {
  readonly currentPage: number
  readonly items: readonly Item[]
  readonly itemsPerPage: number
  readonly totalItems: number
  readonly totalPages: number
}

export const createPagination = <Item>({
  currentPage = 0,
  items = [],
  itemsPerPage = 0,
  totalItems = 0,
}: Omit<Pagination<Item>, "totalPages"> & { readonly totalPages?: number }): Pagination<Item> => ({
  currentPage,
  items,
  itemsPerPage,
  totalItems,
  totalPages: itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 0,
})
