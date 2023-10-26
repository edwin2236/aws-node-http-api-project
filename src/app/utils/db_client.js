import vertica from 'vertica-nodejs'
const { Client } = vertica

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}
const dbClient = new Client(config)

export const query = async (query) => {
  await dbClient.connect()
  const result = await dbClient.query(query)
  await dbClient.end()

  return result
}
