// ref. https://firebase.google.com/docs/functions/beta/custom-events?hl=ja#handle-events
import { logger } from 'firebase-functions/v2'
import {
  onNewFatalIssuePublished,
  onNewNonfatalIssuePublished,
} from 'firebase-functions/v2/alerts/crashlytics'

const options = {
  region: process.env.LOCATION,
  secrets: ['GITHUB_ACCESS_TOKEN'],
}

const ownerRepo = `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`
const labels = `${process.env.GITHUB_LABELS}`

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
  logger.info(`appId: ${appId}`)
  logger.info(event.data.payload.issue, { structuredData: true })
})
