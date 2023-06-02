import { pubsub, logger } from 'firebase-functions/v1'
// import { storage, initializeApp } from 'firebase-admin'
import { v1 } from '@google-cloud/firestore'
const client = new v1.FirestoreAdminClient()

// TODO(tsuruoka): TypeError: Cannot read properties of undefined (reading 'INTERNAL')
// initializeApp()

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=ja
exports.backupTransaction = pubsub
  .schedule(process.env.SCHEDULE_FREQUENCY!)
  .timeZone(process.env.TIME_ZONE ?? 'UTC')
  .onRun(async (_) => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT!
    const bucketName = process.env.BUCKET_NAME!
    const outputUriPrefix = `gs://${bucketName}/${process.env.PATH}`
    const databaseName = client.databasePath(projectId, '(default)')
    try {
      // await createBucketUnlessExists(bucketName)
      await client.exportDocuments({
        name: databaseName,
        outputUriPrefix: outputUriPrefix,
        collectionIds: process.env.COLLECTION_IDS?.split(','),
      })
      logger.info(
        `✅ Backup ${databaseName} to ${outputUriPrefix} successfully.`
      )
    } catch (error) {
      logger.error(error)
    }
  })

// Check if the bucket exists and create it if not
// async function createBucketUnlessExists(bucketName: string) {
//   const bucket = storage().bucket(bucketName)
//   const [exists] = await bucket.exists()
//   if (!exists) {
//     await bucket.create()
//   }
// }
