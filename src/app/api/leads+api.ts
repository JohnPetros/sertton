import { z } from "zod"
import { SaveLeadController } from "@/rest/controllers"
import { ExpoRoute } from "@/rest/expo/route"
import { createYampiMarketingService } from "@/rest/yampi/server-services"

export const POST = ExpoRoute(
  z.object({
    body: z.object({ email: z.string().email(), name: z.string().trim().min(1).optional() }),
  }),
  SaveLeadController(createYampiMarketingService()),
)
