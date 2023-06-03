import { pubsub, logger, https } from 'firebase-functions/v1'
import { v1 } from '@google-cloud/firestore'
// import { Storage } from '@google-cloud/storage'

const client = new v1.FirestoreAdminClient()
// const storage = new Storage()

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=ja
exports.backupTransaction = pubsub
  .schedule(`'${process.env.SCHEDULE!}'`)
  .onRun(async (_) => {
    const projectId = process.env.PROJECT_ID!
    const databaseName = client.databasePath(projectId, '(default)')
    const bucketName = process.env.BUCKET_NAME ?? process.env.STORAGE_BUCKET!
    const path = process.env.PATH ?? process.env.EXT_INSTANCE_ID
    const outputUriPrefix = `gs://${bucketName}/${path}`
    try {
      // await createBucketIfNotFound(bucketName)
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

exports.backupTransactionHttps = https.onRequest(async (_req, res) => {
  const projectId = process.env.PROJECT_ID!
  const databaseName = client.databasePath(projectId, '(default)')
  const bucketName = process.env.BUCKET_NAME!
  let outputUriPrefix = `gs://${bucketName}`

  try {
    // await createBucketIfNotFound(bucketName)
    await client.exportDocuments({
      name: databaseName,
      collectionIds: process.env.COLLECTION_IDS?.split(','),
      outputUriPrefix: outputUriPrefix,
    })
    logger.info(`✅ Backup ${databaseName} to ${outputUriPrefix} successfully.`)
  } catch (error) {
    logger.error(error)
  }
})

// TODO(tsuruoka): ApiError: Not Implemented

// Check if the bucket exists and create it if not
//
// The reason why we need to use googleapis instead of firebase-admin SDK is
// Cloud Storage for Firebase does not support `Bucket` APIs.
// ref. https://firebase.google.com/docs/emulator-suite/connect_storage#differences_from_google_cloud_storage
// async function createBucketIfNotFound(bucketName: string) {
//   const bucket = storage.bucket(bucketName)
//   const [exists] = await bucket.exists()
//   if (!exists) {
//     const [bucket] = await storage.createBucket(bucketName, {
//       location: process.env.LOCATION,
//       coldline: true,
//     })
//     logger.info(`${bucket.name} created with coldline in ${location}`)
//   }
// }
