import { z } from "zod"
import { FetchSimilarProductsController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCatalogService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(
  z.object({ params: z.object({ productId: z.string().min(1) }) }),
  FetchSimilarProductsController(createYampiCatalogService()),
  (request) => {
    const segments = new URL(request.url).pathname.split("/").filter(Boolean)
    return { productId: segments[segments.length - 2] }
  },
)
