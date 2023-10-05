'use strict'

import { addS3Object, getS3Object } from '../services/s3_bucket_service.js'

const INVALID_PATH = ['/', '/path']

export async function handler (event) {
  const oldData = JSON.parse(await getS3Object({ key: 'audit.txt' }))
  const messages = event.Records?.map((record) => record.body) ?? []

  messages.forEach(element => {
    const message = JSON.parse(element)
    if (INVALID_PATH.includes(message.path)) {
      throw new Error('Invalid path')
    }
  })

  await addS3Object({
    key: 'audit.txt',
    content: JSON.stringify([...oldData, ...messages])
  })
}

export async function retrieveDeadLetterQueue (event) {
  const oldData = JSON.parse(await getS3Object({ key: 'audit.txt' }))

  const messages = event.Records?.map((record) => {
    const message = JSON.parse(record.body)
    return JSON.stringify({ ...message, status: 'DEAD_LETTER_QUEUE' })
  }) ?? []

  await addS3Object({
    key: 'audit.txt',
    content: JSON.stringify([...oldData, ...messages])
  })
}
