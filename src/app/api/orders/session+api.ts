import { z } from "zod"
import { RestResponse } from "@/core/shared/responses/rest-response"
import { ExpoRoute } from "@/rest/expo/route"

export const POST = ExpoRoute(
  z.object({ body: z.object({ customerDocument: z.string().min(11).max(18) }) }),
  {
    handle: async (http) => {
      const body = http.getBody() as { customerDocument: string }
      return http.send(new RestResponse({ body: { customerDocument: body.customerDocument } }))
    },
  },
)
