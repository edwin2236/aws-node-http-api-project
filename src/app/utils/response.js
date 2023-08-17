const response = ({ status, body }) => {
  return {
    statusCode: status ?? 200,
    body: body ? JSON.stringify({ ...body }, null, 2) : null
  }
}

module.exports = { response }
