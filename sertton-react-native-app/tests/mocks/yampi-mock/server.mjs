import { createServer } from "node:http"

import { handleRequest } from "./handlers.mjs"

const port = Number(process.env.MOCK_YAMPI_PORT ?? 4010)
const host = process.env.MOCK_YAMPI_HOST ?? "127.0.0.1"

const server = createServer(async (request, response) => {
  try {
    await handleRequest(request, response)
  } catch (error) {
    console.error(error)
    response.writeHead(500, { "content-type": "application/json; charset=utf-8" })
    response.end(JSON.stringify({ message: "Mock Yampi internal error" }))
  }
})

server.listen(port, host, () => {
  console.log(`Mock Yampi listening on http://${host}:${port}`)
})

const shutdown = () => server.close(() => process.exit(0))
process.once("SIGINT", shutdown)
process.once("SIGTERM", shutdown)
