'use strict'

import { addS3Object, getS3Object } from '../services/s3_bucket_service.js'

export async function handler (event) {
  const oldData = JSON.parse(await getS3Object({ key: 'audit.txt' }))

  const messages = event.Records?.map((record) => record.body) ?? []
  await addS3Object({
    key: 'audit.txt',
    content: JSON.stringify([...oldData, ...messages])
  })
}
