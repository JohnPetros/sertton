import type { Variation } from "@/core/catalog/entities"
import type { YampiVariation } from "@/rest/yampi/types"

export const YampiVariationMapper = () => ({
  toDomain(input: YampiVariation): Variation {
    return { id: String(input.id), name: input.name, value: input.value }
  },
})
