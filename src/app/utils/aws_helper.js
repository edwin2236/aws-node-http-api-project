'use strict'

function SNS (topic) {
  if (!topic) throw new Error('Invalid topic')
  return Object.keys(this).reduce((proxy, key) => {
    proxy[key] = this[key].bind(SNS, topic) // eslint-disable-line no-param-reassign
    return proxy
  })
}

SNS.getFullTopic = function getFullTopic (topic) {
  const { SERVICE, NODE_ENV } = process.env

  if (!SERVICE || !NODE_ENV) {
    throw new Error('SERVICE or NODE_ENV is undefined')
  }

  return `${SERVICE}-${NODE_ENV}-sns-${topic}`
}

SNS.getArn = function getArn (topic) {
  const { AWS_DEPLOY_REGION, AWS_ACCOUNT_ID } = process.env

  if (!AWS_DEPLOY_REGION || !AWS_ACCOUNT_ID) {
    throw new Error('AWS_DEPLOY_REGION or AWS_ACCOUNT_ID is undefined or empty')
  }

  const fullTopic = this.getFullTopic(topic)
  return `arn:aws:sns:${AWS_DEPLOY_REGION}:${AWS_ACCOUNT_ID}:${fullTopic}`
}

function SQS (queueName) {
  if (!queueName) throw new Error('Invalid queue name')
  return Object.keys(this).reduce((proxy, key) => {
    proxy[key] = this[key].bind(SQS, queueName) // eslint-disable-line no-param-reassign
    return proxy
  })
}

SQS.getUrl = function getUrl (queueName) {
  const {
    NODE_ENV,
    AWS_DEPLOY_REGION,
    AWS_ACCOUNT_ID,
    SERVICE,
    SQS_URL
  } = process.env

  if (!NODE_ENV || !AWS_DEPLOY_REGION || !AWS_ACCOUNT_ID || !SERVICE || !SQS_URL) {
    throw new Error('Missing required environment variables')
  }

  if (!queueName || typeof queueName !== 'string' || queueName.trim().length === 0) {
    throw new Error('Invalid queueName parameter')
  }

  // const fullName = [SERVICE, NODE_ENV, 'sqs', queueName].join('-')
  const fullName = `${SERVICE}-${NODE_ENV}-sqs-${queueName}`

  if (NODE_ENV === 'development') {
    const url = new URL(`${SQS_URL}/queue/${fullName}`)
    return url.href
  }

  const url = new URL(`https://sqs.${AWS_DEPLOY_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/${fullName}`)
  return url.href
}

SQS.getFullTopic = function getFullTopic (queueName) {
  const { SERVICE, NODE_ENV } = process.env

  if (!SERVICE || !NODE_ENV) {
    throw new Error('SERVICE or NODE_ENV is undefined')
  }

  return `${SERVICE}-${NODE_ENV}-sqs-${queueName}`
}

function Lambda (functionName) {
  if (!functionName) throw new Error('Invalid topic')
  return Object.keys(this).reduce((proxy, key) => {
    proxy[key] = this[key].bind(Lambda, functionName)
    return proxy
  })
}

Lambda.getFullFunctionName = function getFullFunctionNames (functionName) {
  const { SERVICE, NODE_ENV } = process.env

  if (!SERVICE || !NODE_ENV) {
    throw new Error('SERVICE or NODE_ENV is undefined')
  }

  return `${SERVICE}-${NODE_ENV}-${functionName}`
}

export default {
  SNS,
  SQS,
  Lambda
}
