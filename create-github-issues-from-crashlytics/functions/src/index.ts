// ref. https://firebase.google.com/docs/functions/alert-events#node.js
// ref. https://firebase.google.com/docs/extensions/publishers/functions#crashlytics
import { logger } from 'firebase-functions/v2'
import {
  onNewFatalIssuePublished,
  onNewNonfatalIssuePublished,
} from 'firebase-functions/v2/alerts/crashlytics'
import { options, ownerRepo, labels } from './config'
import { CrashlyticsAlert } from './crashlytics_alert'

exports.createFatalIssue = onNewFatalIssuePublished(options, (event) => {
  logger.info(`ownerRepo: ${ownerRepo}, labels: ${labels}`)
  logger.info('NewFatalIssue event', event)
  const appId = event.appId
  logger.info(`appId: ${appId}`)
  logger.info(event.data.payload.issue, { structuredData: true })
  // const { id, title, subtitle, appVersion } = event.data.payload.issue
  // ref. https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  // TODO(tsuruoka): GitHub API叩く
})

exports.createNonFatalIssue = onNewNonfatalIssuePublished(options, (event) => {
  logger.info(`ownerRepo: ${ownerRepo}, labels: ${labels}`)
  const appId = event.appId
  const source = event.source
  const alertType = event.alertType.split('.').at(-1) as CrashlyticsAlert
  logger.info(`appId: ${appId}`)
  logger.info(`source: ${source}`)
  logger.info(`alertType: ${alertType}`)
  logger.info(event.data.payload.issue, { structuredData: true })
})
