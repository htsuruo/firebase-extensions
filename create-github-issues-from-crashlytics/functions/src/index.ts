// ref. https://firebase.google.com/docs/functions/alert-events#node.js
// ref. https://firebase.google.com/docs/extensions/publishers/functions#crashlytics
import {
  CrashlyticsOptions,
  onNewFatalIssuePublished,
  onNewNonfatalIssuePublished,
} from 'firebase-functions/v2/alerts/crashlytics'
import { CrashlyticsAlert } from './crashlytics_alert'
import { createGitHubIssue } from './github_api'

const options: CrashlyticsOptions = {
  region: process.env.LOCATION,
  secrets: ['GITHUB_ACCESS_TOKEN'],
}

exports.createFatalIssue = onNewFatalIssuePublished(options, async (event) => {
  const appId = event.appId
  const alertType = event.alertType.split('.').at(-1) as CrashlyticsAlert
  await createGitHubIssue({
    appId,
    alertType,
    issue: event.data.payload.issue,
  })
})

exports.createNonFatalIssue = onNewNonfatalIssuePublished(
  options,
  async (event) => {
    const appId = event.appId
    const alertType = event.alertType.split('.').at(-1) as CrashlyticsAlert
    await createGitHubIssue({
      appId,
      alertType,
      issue: event.data.payload.issue,
    })
  }
)
