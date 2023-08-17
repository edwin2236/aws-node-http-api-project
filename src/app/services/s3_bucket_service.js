const { PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3')
const { client } = require('../utils/s3_bucket')

const addS3Object = async ({ key, content }) => {
  if (!key || !content) throw new Error('key and content are required')

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(content)
  })

  await client.send(command)
  return { data: 'ok' }
}

const listOfS3Object = async () => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME
  })

  let isTruncated = true
  let contents = []

  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await client.send(command)
    const contentsList = Contents?.map((c) => c.Key)
    contents = contents.concat(contentsList)
    isTruncated = IsTruncated
    command.input.ContinuationToken = NextContinuationToken
  }

  return { data: contents }
}

module.exports = { addS3Object, listOfS3Object }
