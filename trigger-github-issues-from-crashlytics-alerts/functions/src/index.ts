// ref. https://firebase.google.com/docs/functions/alert-events#node.js
// ref. https://firebase.google.com/docs/extensions/publishers/functions#crashlytics
import {
  CrashlyticsOptions,
  onNewFatalIssuePublished,
  onNewNonfatalIssuePublished,
  onNewAnrIssuePublished,
} from 'firebase-functions/v2/alerts/crashlytics'
import { createGitHubIssue } from './github_api'

const options: CrashlyticsOptions = {
  region: process.env.LOCATION,
  secrets: ['GITHUB_ACCESS_TOKEN'],
}

exports.createFatalIssue = onNewFatalIssuePublished(options, async (event) => {
  await createGitHubIssue({
    event,
    issue: event.data.payload.issue,
  })
})

exports.createNonFatalIssue = onNewNonfatalIssuePublished(
  options,
  async (event) => {
    await createGitHubIssue({
      event,
      issue: event.data.payload.issue,
    })
  }
)

exports.createAnrIssue = onNewAnrIssuePublished(options, async (event) => {
  await createGitHubIssue({
    event,
    issue: event.data.payload.issue,
  })
})
