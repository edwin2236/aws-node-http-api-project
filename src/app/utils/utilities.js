import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
export const readJson = (json) => require(`../../${json}`)

export const response = ({ status, body }) => {
  return {
    statusCode: status ?? 200,
    body: body ? JSON.stringify({ ...body }, null, 2) : null
  }
}

export const auditRequest = ({ event, queueName }) => {
  const { requestContext, headers } = event
  const { path, httpMethod, sourceIp } = requestContext
  const { Host: host, 'User-Agent': userAgent } = headers
  const { QUEUE_NAME } = process.env

  return {
    queueName: queueName ?? QUEUE_NAME,
    messageBody: {
      path,
      httpMethod,
      sourceIp,
      host,
      userAgent,
      date: new Date().toUTCString()
    }
  }
}
