import type { Address } from "@/core/checkout/entities"
import type { YampiAddress } from "@/rest/yampi/types"

export const YampiAddressMapper = () => ({
  toDomain(input: YampiAddress): Address {
    return {
      id: String(input.id),
      receiver: input.receiver,
      zipcode: String(input.zipcode),
      street: input.street,
      number: String(input.number),
      neighborhood: input.neighborhood,
      complement: input.complement ?? "",
      city: input.city,
      uf: input.uf || input.state,
    }
  },
})
