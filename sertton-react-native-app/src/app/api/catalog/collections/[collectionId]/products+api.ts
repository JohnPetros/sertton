import { z } from "zod"
import { FetchProductsByCollectionController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCatalogService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(
  z.object({ params: z.object({ collectionId: z.string().min(1) }) }),
  FetchProductsByCollectionController(createYampiCatalogService()),
  (request) => {
    const segments = new URL(request.url).pathname.split("/").filter(Boolean)
    return { collectionId: segments[segments.length - 2] }
  },
)
