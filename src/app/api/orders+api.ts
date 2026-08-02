import { z } from "zod"
import { FetchOrdersByCustomerController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCheckoutService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(
  z.object({ query: z.object({ customerDocument: z.string().min(11).max(18) }) }),
  FetchOrdersByCustomerController(createYampiCheckoutService()),
)
