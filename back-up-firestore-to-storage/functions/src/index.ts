import { pubsub, logger, https } from 'firebase-functions/v1'
// import { initializeApp } from 'firebase-admin'
import { v1 } from '@google-cloud/firestore'

// const app = initializeApp()
const client = new v1.FirestoreAdminClient()

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

exports.backupTransactionHttps = https.onRequest(async (_req, _resp) => {
  const projectId = process.env.PROJECT_ID!
  const databaseName = client.databasePath(projectId, '(default)')
  const bucketName = process.env.BUCKET_NAME!
  let outputUriPrefix = `gs://${bucketName}`

  try {
    // await createBucketIfNotFound(bucketName)
    const res = await client.exportDocuments({
      name: databaseName,
      collectionIds: process.env.COLLECTION_IDS?.split(','),
      outputUriPrefix: outputUriPrefix,
    })
    logger.info(res, { structuredData: true })
    logger.info(`✅ Backup ${databaseName} to ${outputUriPrefix} successfully.`)
  } catch (error) {
    logger.error(error)
  }
})

// TODO(tsuruoka): Google Cloud のSDKを使ってバケットを作成する(=firebase-adminでは作成できないぽい)
// Check if the bucket exists and create it if not
// async function createBucketIfNotFound(bucketName: string) {
//   const bucket = app.storage().bucket(bucketName)
//   const [exists] = await bucket.exists()
//   if (!exists) {
//     bucket.create()
//     logger.info('not extists, create bucket')
//   }
// }
