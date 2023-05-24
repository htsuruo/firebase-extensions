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
import { initializeApp } from 'firebase-admin'
import * as firestore from '@google-cloud/firestore'
const client = new firestore.v1.FirestoreAdminClient()

initializeApp()

exports.backupTransaction = https.onRequest(async (req: https.Request, res) => {
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT!
  const bucketName = process.env.BUCKET_NAME ?? `${projectId}.appspot.com`
  const result = await client.exportDocuments({
    name: client.databasePath(projectId, '(default)'),
    outputUriPrefix: `gs://${bucketName}/${process.env.OBJECT_PATH}`,
    collectionIds: process.env.COLLECTION_IDS?.split(','),
  })

  logger.info(result, { structuredData: true })

  res.sendStatus(200)
})
