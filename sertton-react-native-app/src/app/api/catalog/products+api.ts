import { z } from "zod"
import { FetchProductsController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCatalogService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(
  z.object({
    query: z.object({
      page: z.coerce.number().int().positive().optional(),
      categoryId: z.string().optional(),
      query: z.string().optional(),
      brandsIds: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .transform((value) =>
          value === undefined ? undefined : Array.isArray(value) ? value : [value],
        ),
    }),
  }),
  FetchProductsController(createYampiCatalogService()),
)
