const { S3Client } = require('@aws-sdk/client-s3')

const s3hook = (event, context) => {
  console.log({ event: JSON.stringify(event) })
  console.log({ context: JSON.stringify(context) })
  console.log({ env: JSON.stringify(process.env) })
}

const client = (function () {
  if (process.env.NODE_ENV !== 'production') {
    return new S3Client({
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
      },
      endpoint: process.env.S3_END_POINT
    })
  }

  return new S3Client({
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    }
  })
})()

module.exports = { s3hook, client }
