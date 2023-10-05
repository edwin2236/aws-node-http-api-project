import { PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { awsClient } from '../utils/aws_config.js'

const s3BucketName = process.env.S3_BUCKET_NAME

export const addS3Object = async ({ key, content }) => {
  if (!s3BucketName) {
    throw new Error('S3_BUCKET_NAME environment variable is not set')
  }

  if (!key || !content) {
    throw new Error('key and content are required')
  }

  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: key,
    Body: Buffer.from(content)
  })

  await awsClient.send(command)
  return { data: 'ok' }
}

export const listOfS3Object = async () => {
  if (!s3BucketName) {
    throw new Error('S3_BUCKET_NAME environment variable is not set')
  }

  const command = new ListObjectsV2Command({
    Bucket: s3BucketName
  })

  let isTruncated = true
  let contents = []

  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await awsClient.send(command)

    const contentsList = Contents?.map((c) => c.Key)
    contents = [...contents, ...contentsList]
    isTruncated = IsTruncated

    command.input.ContinuationToken = NextContinuationToken
  }

  return { data: contents }
}

export const getS3Object = async ({ key }) => {
  try {
    const command = new GetObjectCommand({
      Bucket: s3BucketName,
      Key: key
    })
    const response = await awsClient.send(command)
    return await response.Body.transformToString()
  } catch (error) {
    return '[]'
  }
}
