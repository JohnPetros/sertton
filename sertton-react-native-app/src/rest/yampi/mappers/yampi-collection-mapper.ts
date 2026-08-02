import type { Collection } from "@/core/catalog/entities"
import type { YampiCollection } from "@/rest/yampi/types"

export const YampiCollectionMapper = () => ({
  toDomain(input: YampiCollection): Collection {
    return { id: String(input.id), name: input.name }
  },
})
