export enum PersonType {
  legal = "legal",
  natural = "natural",
}

export interface Customer {
  readonly cnpj?: string
  readonly cpf?: string
  readonly email: string
  readonly id: string
  readonly isActive: boolean
  readonly name?: string
  readonly personType: PersonType
  readonly phone?: string
  readonly razaoSocial?: string
  readonly selectedAddressZipcode?: string
}
