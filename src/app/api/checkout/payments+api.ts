import { z } from "zod"
import { FetchPaymentsController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCheckoutService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(z.object({}), FetchPaymentsController(createYampiCheckoutService()))
