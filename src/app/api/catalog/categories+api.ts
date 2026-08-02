import { z } from "zod"
import { FetchCategoriesController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCatalogService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(z.object({}), FetchCategoriesController(createYampiCatalogService()))
