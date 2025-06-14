// ref. https://firebase.google.com/docs/functions/alert-events#node.js
// ref. https://firebase.google.com/docs/extensions/publishers/functions#crashlytics
import {
  CrashlyticsOptions,
  NewAnrIssuePayload,
  NewFatalIssuePayload,
  NewNonfatalIssuePayload,
  onNewAnrIssuePublished,
  onNewFatalIssuePublished,
  onNewNonfatalIssuePublished,
  onRegressionAlertPublished,
  RegressionAlertPayload,
} from 'firebase-functions/v2/alerts/crashlytics'
import { createGitHubIssueIfEnabled } from './github_api'

const options: CrashlyticsOptions = {
  region: process.env.LOCATION,
  secrets: ['GITHUB_ACCESS_TOKEN'],
}

// 関数名は`4-63 characters`が制限なので、Extensionsの場合は以下の形式となるので簡素な名前をつけるのがベター
// ext-trigger-github-issues-from-crashlytics-[FUNCTION_NAME]

// New fatal issue
exports.createFatalIssue = onNewFatalIssuePublished(options, (event) =>
  createGitHubIssueIfEnabled<NewFatalIssuePayload>(event)
)

// New non-fatal issue
exports.createNonFatalIssue = onNewNonfatalIssuePublished(options, (event) =>
  createGitHubIssueIfEnabled<NewNonfatalIssuePayload>(event)
)

// New ANR issue
exports.createAnrIssue = onNewAnrIssuePublished(options, (event) =>
  createGitHubIssueIfEnabled<NewAnrIssuePayload>(event)
)

// Regression(Better use for report debugging)
exports.regressionAlert = onRegressionAlertPublished(options, (event) =>
  createGitHubIssueIfEnabled<RegressionAlertPayload>(event)
)
