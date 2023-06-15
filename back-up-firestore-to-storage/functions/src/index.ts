import { pubsub, logger } from 'firebase-functions/v1'
import { v1 } from '@google-cloud/firestore'
import { HttpsError } from 'firebase-functions/v1/https'
import { formatTimestamp } from './format'
// import { Storage } from '@google-cloud/storage'

const client = new v1.FirestoreAdminClient()
// const storage = new Storage()
const projectId = process.env.PROJECT_ID!
const databaseName = client.databasePath(projectId, '(default)')
const bucketName = process.env.BUCKET_NAME ?? process.env.STORAGE_BUCKET

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=en
exports.backupTransaction = pubsub
  .schedule(`'${process.env.SCHEDULE!}'`)
  .onRun(async (context) => {
    let outputUriPrefix = `gs://${bucketName}`

    const prefixPath = process.env.PREFIX_PATH
    if (prefixPath) {
      outputUriPrefix += `/${prefixPath}`
    }
    outputUriPrefix += `/${formatTimestamp({
      timestamp: context.timestamp,
      timeZone: process.env.TIME_ZONE,
      format: process.env.TIMESTAMP_FORMAT,
    })}`

    await exportDocuments({ outputUriPrefix, retryIfAlreadyExists: true })
  })

async function exportDocuments(params: {
  outputUriPrefix: string
  retryIfAlreadyExists: boolean
}) {
  const { outputUriPrefix, retryIfAlreadyExists } = params
  try {
    await client.exportDocuments({
      name: databaseName,
      collectionIds: process.env.COLLECTION_IDS?.split(','),
      outputUriPrefix: outputUriPrefix,
    })
    logger.info(`✅ Backup ${databaseName} to ${outputUriPrefix} successfully.`)
  } catch (error) {
    if (error instanceof HttpsError) {
      logger.info(`${error.code}: ${error.message}: ${error.details}`)
      if (retryIfAlreadyExists && error.code === 'invalid-argument') {
        retryWithUniqueSuffix(outputUriPrefix)
        return
      }
    }
    logger.error(error, { structuredData: true })
    throw new HttpsError('internal', '🚨 Backup operation failed.')
  }
}

// Avoid object path name collisions
async function retryWithUniqueSuffix(outputUriPrefix: string) {
  const additionalSuffix = generateUniqueString()
  await exportDocuments({
    outputUriPrefix: `${outputUriPrefix}-${additionalSuffix}`,
    retryIfAlreadyExists: false,
  })
}

// Does not generate a completed unique string, but it is enough for this use case.
function generateUniqueString() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
