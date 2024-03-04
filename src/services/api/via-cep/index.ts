import { useMemo } from 'react'

import { useHttp } from '../http'
import { IAddressesController } from '../interfaces/IAddressesController'

import { Address } from '@/@types/Address'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'
import { ViaCepAddress } from './types/ViaCepAddress'

const BASE_URL = process.env.EXPO_PUBLIC_VIA_CEP_BASE_URL

export function useViaCepApi(): IAddressesController {
  if (!BASE_URL) throw new Error('Ivalid Via Cep Base Url')

  const http = useHttp()

  return useMemo(() => {
    http.start()
    http.setBaseUrl(BASE_URL)

    return {
      async getAddressByZipcode(
        zipcode: string
      ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null> {
        const data = await http.get<ViaCepAddress>(`/${zipcode}/json/`)

        if (data.erro) return null

        return {
          uf: data.uf,
          city: data.localidade,
          street: data.logradouro,
          neighborhood: data.bairro,
          zipcode: getOnlyNumbers(data.cep),
        }
      },
    }
  }, [http])
}
