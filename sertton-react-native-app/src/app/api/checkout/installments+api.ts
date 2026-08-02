import { z } from "zod"
import { FetchInstallmentsController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCheckoutService } from "@/rest/yampi/server-services"

export const GET = ExpoRoute(
  z.object({
    query: z.object({
      paymentId: z.string(),
      productId: z.string(),
      productPrice: z.coerce.number().positive(),
    }),
  }),
  FetchInstallmentsController(createYampiCheckoutService()),
)
