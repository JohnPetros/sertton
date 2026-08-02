import { z } from "zod"

import { FetchBannersController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiMarketingService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(z.object({}), FetchBannersController(createYampiMarketingService()))
