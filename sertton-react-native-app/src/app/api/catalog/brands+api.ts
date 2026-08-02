import { z } from "zod"
import { FetchBrandsController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCatalogService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(z.object({}), FetchBrandsController(createYampiCatalogService()))
