/*
 * This template contains a HTTP function that responds
 * with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/publishers
 */

import * as functions from 'firebase-functions'
import { firestore, logger } from 'firebase-functions/v1'

exports.greetTheWorld = functions.https.onRequest(
  (req: functions.Request, res: functions.Response) => {
    const consumerProvidedGreeting = process.env.GREETING
    const instanceId = process.env.EXT_INSTANCE_ID
    const greeting = `${consumerProvidedGreeting} World from ${instanceId} !!!`
    res.send(greeting)
  }
)

exports.usersCreateTrigger = firestore
  .document('users/{userId}')
  .onCreate((snapshot, context) => {
    logger.info(snapshot.data())
    return 0
  })
