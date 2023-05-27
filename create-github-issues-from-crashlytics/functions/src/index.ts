// ref. https://firebase.google.com/docs/functions/beta/custom-events?hl=ja#handle-events
import { logger, alerts } from 'firebase-functions/v2'

exports.createNewFatalIssue = alerts.crashlytics.onNewFatalIssuePublished(
  {
    region: process.env.LOCATION,
    secrets: ['GITHUB_ACCESS_TOKEN'],
  },
  (event) => {
    const ownerRepo = `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`
    const labels = `${process.env.GITHUB_LABELS}`
    logger.info(`ownerRepo: ${ownerRepo}, labels: ${labels}`)
    logger.info('createNewFatalIssue event', event)
    const appId = event.appId
    logger.info(`appId: ${appId}`)
    logger.info(event.data.payload.issue, { structuredData: true })
    // const { id, title, subtitle, appVersion } = event.data.payload.issue
    // ref. https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
    // TODO(tsuruoka): GitHub API叩く
  }
)
