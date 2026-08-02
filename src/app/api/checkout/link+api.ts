import { z } from "zod"
import { FetchCheckoutLinkController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiCheckoutService } from "@/rest/yampi/server-services"

export const POST = ExpoRoute(
  z.object({
    body: z
      .object({
        skuTokens: z.array(z.string()).min(1),
        quantities: z.array(z.number().int().positive()).min(1),
      })
      .refine(
        ({ quantities, skuTokens }) => quantities.length === skuTokens.length,
        "The checkout arrays must have the same length",
      ),
  }),
  FetchCheckoutLinkController(createYampiCheckoutService()),
)
