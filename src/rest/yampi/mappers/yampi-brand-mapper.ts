import type { Brand } from "@/core/catalog/entities"
import type { YampiBrand } from "@/rest/yampi/types"

export const YampiBrandMapper = () => ({
  toDomain(input: YampiBrand): Brand {
    return { id: String(input.id), name: input.name }
  },
})
