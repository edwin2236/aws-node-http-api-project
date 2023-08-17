const personsData = require('../mock/persons.json')
const { addS3Object, listOfS3Object } = require('./services/s3_bucket_service')
const { response } = require('./utils/response')

const home = async (event) => {
  return response({
    body: {
      message: 'Go Serverless v3.0! Your function executed successfully!',
      input: event
    }
  })
}

const path = async (event) => {
  return response({ body: { message: 'Hello from path!' } })
}

const persons = async (event) => {
  return response({ body: { persons: personsData } })
}

const listOfBucketObjects = async (event) => {
  console.log('works...')
  try {
    const res = await listOfS3Object()
    return response({ body: res })
  } catch (err) {
    console.log({ err, env: process.env })
    return response({ status: 500, body: { error: err.message } })
  }
}

const addObjectToBucket = async ({ queryStringParameters: queryParams }) => {
  if (!queryParams?.key || !queryParams?.content) {
    return response({ status: 500, body: { error: { message: 'key and content are required' } } })
  }

  try {
    const res = await addS3Object({ key: queryParams.key, content: queryParams.content })
    return response({ body: res })
  } catch (error) {
    return response({ status: 500, body: { error } })
  }
}

module.exports = { home, path, persons, listOfBucketObjects, addObjectToBucket }
