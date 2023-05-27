// ref. https://firebase.google.com/docs/functions/beta/custom-events?hl=ja#handle-events
import { logger, eventarc } from 'firebase-functions/v2'

// ref. https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
exports.createNewFatalIssue = eventarc.onCustomEventPublished(
  {
    eventType: 'google.firebase.firebasealerts.alerts.v1.published',
    region: process.env.LOCATION,
    secrets: ['GITHUB_ACCESS_TOKEN'],
  },
  (event) => {
    const ownerRepo = `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`
    const labels = `${process.env.GITHUB_LABELS}`
    logger.info(`ownerRepo: ${ownerRepo}, labels: ${labels}`)
    logger.info('createNewFatalIssue event', event)
  }
)
