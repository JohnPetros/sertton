import type { Address } from '@/@types/Address'

export interface IAddressesController {
  getAddressByZipcode(
    zipcode: string
  ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null>
}
