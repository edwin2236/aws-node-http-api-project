import { getAllProducts } from '../services/product_service.js'
import { addS3Object, listOfS3Object } from '../services/s3_bucket_service.js'
import { publishItemToQueue } from '../services/sqs_service.js'
import { auditRequest, readJson, response } from '../utils/utilities.js'

const personsData = readJson('mock/persons.json')

export const home = async (event) => {
  try {
    await publishItemToQueue(auditRequest({ event }))

    return response({
      body: {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event
      }
    })
  } catch (error) {
    return response({ status: 500, body: { message: error.message } })
  }
}

export const path = async (event) => {
  try {
    await publishItemToQueue(auditRequest({ event }))

    return response({ body: { message: 'Hello from path!' } })
  } catch (error) {
    return response({
      status: 500,
      body: {
        message: error.message,
        stack: error.stack
      }
    })
  }
}

export const persons = async (event) => {
  try {
    await publishItemToQueue(auditRequest({ event }))
    return response({ body: { persons: personsData } })
  } catch (err) {
    return response({ status: 500, body: { error: err.message } })
  }
}

export const listOfBucketObjects = async (event) => {
  try {
    await publishItemToQueue(auditRequest({ event }))
    const res = await listOfS3Object()

    return response({ body: res })
  } catch (err) {
    return response({ status: 500, body: { error: err.message } })
  }
}

export const addObjectToBucket = async ({ body }) => {
  try {
    const { key, content } = JSON.parse(body)
    const res = await addS3Object({ key, content })
    return response({ body: res })
  } catch (error) {
    return response({
      status: 500,
      body: {
        message: error.message
      }
    })
  }
}

export const getProducts = async (event) => {
  try {
    await publishItemToQueue(auditRequest({ event }))
    const res = await getAllProducts()

    return response({ body: res })
  } catch (err) {
    return response({ status: 500, body: { error: err.message } })
  }
}
