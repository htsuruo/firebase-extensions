import { pubsub, logger } from 'firebase-functions/v1'
import { v1 } from '@google-cloud/firestore'
import { HttpsError } from 'firebase-functions/v1/https'
import { formatTimestamp } from './format'
// import { Storage } from '@google-cloud/storage'

const client = new v1.FirestoreAdminClient()
// const storage = new Storage()

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=en
exports.backupTransaction = pubsub
  .schedule(`'${process.env.SCHEDULE!}'`)
  .onRun(async (context) => {
    const projectId = process.env.PROJECT_ID!
    const databaseName = client.databasePath(projectId, '(default)')
    const bucket = process.env.BUCKET ?? process.env.STORAGE_BUCKET
    let outputUriPrefix = `gs://${bucket}`

    const prefixPath = process.env.PREFIX_PATH
    if (prefixPath) {
      outputUriPrefix += `/${prefixPath}`
    }
    outputUriPrefix += `/${formatTimestamp({
      timestamp: context.timestamp,
      timeZone: process.env.TIME_ZONE,
    })}`

    try {
      // await createBucketIfNotFound(bucketName)
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

// TODO(tsuruoka): バケット作成のAPIを叩いているはずが`ApiError: Not Implemented`となり作成できない問題
// そもそもバケットの作成については最上位権限の`storage.admin`のIAM roleが必要なので、このためだけに付与するのはセキュリティ的には微妙な気がしている
// 利用者側にセットアップしてもらうほうが良い気がしている。

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
