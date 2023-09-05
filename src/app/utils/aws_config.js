import { S3Client } from '@aws-sdk/client-s3'
import { SNSClient } from '@aws-sdk/client-sns'
import { SQSClient } from '@aws-sdk/client-sqs'

export const awsClient = (() => {
  const config = {
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return new S3Client({
      ...config,
      endpoint: process.env.S3_END_POINT
    })
  }

  return new S3Client({
    ...config
  })
})()

export const snsClient = (() => {
  const config = {
    region: process.env.AWS_DEPLOY_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return new SNSClient({
      ...config,
      endpoint: process.env.SNS_URL
    })
  }

  return new SNSClient({ ...config })
})()

export const sqsClient = (() => {
  const config = {
    region: process.env.AWS_DEPLOY_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return new SQSClient({
      ...config,
      endpoint: process.env.SQS_URL
    })
  }

  return new SQSClient({ ...config })
})()
