export const readJson = async (request) => {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  const body = Buffer.concat(chunks).toString("utf8")
  return body ? JSON.parse(body) : undefined
}

export const sendJson = (response, statusCode, body) => {
  response.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" })
  response.end(JSON.stringify(body))
}

export const sendEmpty = (response, statusCode = 204) => {
  response.writeHead(statusCode)
  response.end()
}
