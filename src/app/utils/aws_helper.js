'use strict'

import { GetQueueUrlCommand } from '@aws-sdk/client-sqs'
import { sqsClient } from './aws_config.js'

export const getSqsUrl = async (queueName) => {
  if (!queueName || typeof queueName !== 'string' || queueName.trim().length === 0) {
    throw new Error('Invalid queueName parameter')
  }

  const queueUrlCommand = new GetQueueUrlCommand({ QueueName: queueName })
  const res = await sqsClient.send(queueUrlCommand)
  return res.QueueUrl
}
