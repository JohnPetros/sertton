export interface YampiAddress {
  readonly id: number
  readonly receiver: string
  readonly zipcode: string
  readonly street: string
  readonly number: string
  readonly neighborhood: string
  readonly complement: string | null
  readonly city: string
  readonly uf: string
  readonly state: string
}
