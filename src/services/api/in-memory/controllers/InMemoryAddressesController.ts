import { addressesMock } from '@/_tests_/mocks/core/addressesMock'
import { IAddressesController } from '../../interfaces/IAddressesController'

import type { Address } from '@/@types/Address'

export function InMemoryAddressesController(): IAddressesController {
  const addresses: Address[] = addressesMock

  return {
    async getAddressByZipcode(
      zipcode: string,
    ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null> {
      const address = addresses.find((address) => address.zipcode === zipcode)

      if (address)
        return {
          zipcode: address.zipcode,
          street: address.street,
          neighborhood: address.neighborhood,
          complement: address.complement,
          city: address.city,
          uf: address.uf,
        }

      return null
    },
  }
}
