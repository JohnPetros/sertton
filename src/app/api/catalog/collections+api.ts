import { z } from "zod"
import { FetchCollectionsController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCatalogService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(z.object({}), FetchCollectionsController(createYampiCatalogService()))
