'use strict'

import { CreateQueueCommand, ReceiveMessageCommand, SendMessageCommand } from '@aws-sdk/client-sqs'

import { sqsClient } from '../utils/aws_config.js'
import awsHelper from '../utils/aws_helper.js'

export const createQueue = async ({ queueName }) => {
  if (!queueName) {
    throw new Error('queueName is required')
  }

  const input = {
    QueueName: awsHelper.SQS.getFullTopic(queueName)
  }
  console.log({ input })
  const command = new CreateQueueCommand(input)
  return await sqsClient.send(command)
}

export const publishItemToQueue = async ({ queueName, messageBody }) => {
  if (!queueName || !messageBody) {
    throw new Error('queueName and messageBody are required')
  }

  const input = {
    QueueUrl: awsHelper.SQS.getUrl(queueName),
    MessageBody: JSON.stringify(messageBody)
  }
  const command = new SendMessageCommand(input)
  return await sqsClient.send(command)
}

export const retrieveMessagesInQueue = async ({ queueName }) => {
  const input = {
    QueueUrl: awsHelper.SQS.getUrl(queueName),
    MaxNumberOfMessages: 10
  }
  console.log({ input })
  const command = new ReceiveMessageCommand(input)
  return await sqsClient.send(command)
}
