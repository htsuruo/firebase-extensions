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

initializeApp()

exports.backupFirestoreToStorage = https.onRequest(
  (req: https.Request, res) => {
    // Here we reference a user-provided parameter
    // (its value is provided by the user during installation)
    const consumerProvidedGreeting = process.env.GREETING

    // And here we reference an auto-populated parameter
    // (its value is provided by Firebase after installation)
    const instanceId = process.env.EXT_INSTANCE_ID

    const greeting = `${consumerProvidedGreeting} everyone, from ${instanceId}`
    logger.info(greeting, { structuredData: true })

    res.send(greeting)
  }
)
