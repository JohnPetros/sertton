import type { Banner } from "@/core/marketing/entities"
import type { YampiBanner } from "@/rest/yampi/types"

export const YampiBannerMapper = () => ({
  toDomain(input: YampiBanner): Banner {
    return {
      id: String(input.id),
      imageUrl: input.image_url.startsWith("//") ? `https:${input.image_url}` : input.image_url,
    }
  },
})
