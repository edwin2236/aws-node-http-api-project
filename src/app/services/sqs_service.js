'use strict'

import {
  CreateQueueCommand,
  ReceiveMessageCommand,
  SendMessageCommand
} from '@aws-sdk/client-sqs'

import { sqsClient } from '../utils/aws_config.js'
import { getSqsUrl } from '../utils/aws_helper.js'

export const createQueue = async ({ queueName }) => {
  if (!queueName) {
    throw new Error('queueName is required')
  }

  const command = new CreateQueueCommand({ QueueName: queueName })
  return await sqsClient.send(command)
}

export const publishItemToQueue = async ({ queueName, messageBody }) => {
  if (!queueName || !messageBody) {
    throw new Error('queueName and messageBody are required')
  }

  const sendMessageCommand = new SendMessageCommand({
    QueueUrl: await getSqsUrl(queueName),
    MessageBody: JSON.stringify(messageBody)
  })
  return await sqsClient.send(sendMessageCommand)
}

export const retrieveMessagesInQueue = async ({ queueName }) => {
  const command = new ReceiveMessageCommand({
    QueueUrl: await getSqsUrl(queueName),
    MaxNumberOfMessages: 10
  })
  return await sqsClient.send(command)
}
