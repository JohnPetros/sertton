import { readJson, sendEmpty, sendJson } from "./http.mjs"
import { getState, resetState, setScenario } from "./state.mjs"

const response = (data, pagination) => ({
  data,
  ...(pagination ? { meta: { pagination } } : {}),
})

const pagination = (total) => ({
  count: total,
  current_page: 1,
  per_page: total,
  total,
  total_pages: 1,
})

export const handleRequest = async (request, responseStream) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1")
  const { pathname } = requestUrl
  const state = getState()
  const { fixtures } = state

  if (request.method === "GET" && pathname === "/__test/health")
    return sendJson(responseStream, 200, { status: "ok", scenario: state.scenario })

  if (request.method === "POST" && pathname === "/__test/reset") {
    resetState()
    return sendJson(responseStream, 200, { status: "reset" })
  }

  if (request.method === "POST" && pathname === "/__test/scenario") {
    const body = await readJson(request)
    setScenario(body?.scenario ?? "default")
    return sendJson(responseStream, 200, { scenario: getState().scenario })
  }

  if (request.method === "GET" && pathname === "/marketing/banners")
    return sendJson(responseStream, 200, response(fixtures.banners))

  if (request.method === "GET" && pathname === "/catalog/collections")
    return sendJson(responseStream, 200, response(fixtures.collections))

  if (request.method === "GET" && pathname === "/catalog/products") {
    const query = requestUrl.searchParams.get("q") ?? ""
    const products = query.toLowerCase().includes("inexistente") ? [] : fixtures.products
    return sendJson(responseStream, 200, response(products, pagination(products.length)))
  }

  const collectionProducts = pathname.match(/^\/catalog\/collections\/(\d+)\/products$/)
  if (request.method === "GET" && collectionProducts) {
    const products = fixtures.productsByCollection.get(Number(collectionProducts[1])) ?? []
    return sendJson(responseStream, 200, response(products, pagination(products.length)))
  }

  if (request.method === "GET" && pathname === "/checkout/payments")
    return sendJson(responseStream, 200, response(fixtures.payments))

  if (request.method === "POST" && pathname === "/leads") {
    if (state.scenario === "lead-error") return sendJson(responseStream, 500, { message: "Mock lead error" })
    const body = await readJson(request)
    state.leads.push(body)
    return sendEmpty(responseStream)
  }

  return sendJson(responseStream, 404, { message: "Mock Yampi route not found" })
}
