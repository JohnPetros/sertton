import { z } from "zod"

import { RestResponse } from "@/core/shared/responses/rest-response"
import { ExpoRoute } from "@/rest/expo/route"

export const GET = ExpoRoute(z.object({}), {
  handle: async () => new RestResponse({ body: { status: "ok" } }),
})
