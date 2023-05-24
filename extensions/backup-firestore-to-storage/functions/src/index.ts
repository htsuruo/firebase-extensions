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
import * as firestore from '@google-cloud/firestore'
const client = new firestore.v1.FirestoreAdminClient()

// ref. https://firebase.google.com/docs/firestore/solutions/schedule-export?hl=ja
exports.backupTransaction = https.onRequest(async (req: https.Request, res) => {
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT!
  const bucketName = process.env.BUCKET_NAME ?? `${projectId}.appspot.com`
  const databaseName = client.databasePath(projectId, '(default)')
  const result = await client.exportDocuments({
    name: databaseName,
    outputUriPrefix: `gs://${bucketName}/${process.env.OBJECT_PATH}`,
    collectionIds: process.env.COLLECTION_IDS?.split(','),
  })

  logger.info(result, { structuredData: true })

  res.sendStatus(200)
})
