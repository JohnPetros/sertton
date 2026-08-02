import type { Category } from "@/core/catalog/entities"
import type { YampiCategory } from "@/rest/yampi/types"

export const YampiCategoryMapper = () => ({
  toDomain(input: YampiCategory): Category {
    return { id: String(input.id), name: input.name, description: input.description ?? "" }
  },
})
