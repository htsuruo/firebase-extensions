import { pubsub, logger } from 'firebase-functions/v1'
import { v1 } from '@google-cloud/firestore'
import { HttpsError } from 'firebase-functions/v1/https'
import { formatTimestamp } from './format'

const client = new v1.FirestoreAdminClient()

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=en
exports.backupTransaction = pubsub
  .schedule(`'${process.env.SCHEDULE!}'`)
  .onRun(async (context) => {
    const projectId = process.env.PROJECT_ID!
    const databaseName = client.databasePath(projectId, '(default)')
    let outputUriPrefix = `gs://${process.env.BUCKET}`

    const prefixPath = process.env.PREFIX_PATH
    if (prefixPath) {
      outputUriPrefix += `/${prefixPath}`
    }
    outputUriPrefix += `/${formatTimestamp({
      timestamp: context.timestamp,
      timeZone: process.env.TIME_ZONE,
    })}`

    try {
      await client.exportDocuments({
        name: databaseName,
        collectionIds: process.env.COLLECTION_IDS?.split(','),
        outputUriPrefix: outputUriPrefix,
      })
      logger.info(
        `✅ Backup ${databaseName} to ${outputUriPrefix} successfully.`
      )
    } catch (error) {
      logger.error(error, { structuredData: true })
      throw new HttpsError('internal', '🚨 Backup operation failed.')
    }
  })
