/*
 * This template contains a HTTP function that responds
 * with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/publishers
 */

import { https, logger } from 'firebase-functions/v2'
import { storage } from 'firebase-admin'
import * as firestore from '@google-cloud/firestore'
const client = new firestore.v1.FirestoreAdminClient()

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=ja
exports.backupTransaction = https.onRequest(async (req: https.Request, res) => {
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT!
  const bucketName = process.env.BUCKET_NAME!
  const outputUriPrefix = `gs://${bucketName}/${process.env.PATH}`
  const databaseName = client.databasePath(projectId, '(default)')
  try {
    await createBucketUnlessExists(bucketName)
    await client.exportDocuments({
      name: databaseName,
      outputUriPrefix: outputUriPrefix,
      collectionIds: process.env.COLLECTION_IDS?.split(','),
    })
    res.sendStatus(200)
  } catch (error) {
    logger.error(error)
    res.sendStatus(500)
  }
})

// Check if the bucket exists and create it if not
async function createBucketUnlessExists(bucketName: string) {
  const bucket = storage().bucket(bucketName)
  const [exists] = await bucket.exists()
  if (!exists) {
    await bucket.create()
  }
}
