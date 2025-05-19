import { RequestError } from '@octokit/request-error'
import { Octokit } from '@octokit/rest'
import { logger } from 'firebase-functions/v2'
import { CrashlyticsEvent } from 'firebase-functions/v2/alerts/crashlytics'
import { CrashlyticsAlert, CrashlyticsPayload } from './types'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

// ref. https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
export async function createGitHubIssueIfEnabled<T extends CrashlyticsPayload>(
  event: CrashlyticsEvent<T>
) {
  const alertType = parseAlertType(event.alertType)
  logger.info(`alertType: ${alertType}`, { structuredData: true })
  if (!process.env.ALERTS?.split(',').includes(alertType)) {
    logger.warn(
      `Skip the creation of a GitHub issue because ${alertType} alert is not enabled`
    )
    return
  }

  try {
    const payload = event.data.payload
    await octokit.rest.issues.create({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      title: payload.issue.title,
      body: makeBody(event),
      labels: process.env.GITHUB_LABELS?.split(','),
    })
  } catch (error) {
    if (error instanceof RequestError) {
      if (error.status) {
        // handle Octokit error
        // see https://github.com/octokit/request-error.js
        logger.error(error.message)
      }
    }
    logger.error(error, { structuredData: true })
    throw error
  }
}

// Examople payload
// {
//   id: '2262421223909713056',
//   appid: '1:162074331013:android:f5830f1b7bf6ffd8ade6ec',
//   type: 'google.firebase.firebasealerts.alerts.v1.published',
//   alerttype: 'crashlytics.regression',
//   source: '//firebasealerts.googleapis.com/projects/162074331013',
//   project: '162074331013',
//   specversion: '1.0',
//   time: '2025-05-19T00:44:38.808893Z',
//   data: {
//     '@type': 'type.googleapis.com/google.events.firebase.firebasealerts.v1.AlertData',
//     createTime: '2025-05-19T00:44:38.808893Z',
//     endTime: '2025-05-19T00:44:38.808893Z',
//     payload: {
//       issue: [Object],
//       '@type': 'type.googleapis.com/google.events.firebase.firebasealerts.v1.CrashlyticsRegressionAlertPayload',
//       type: 'fatal',
//       resolveTime: '2025-05-18T07:00:00Z'
//     }
//   },
//   traceparent: '00-407a4a49f8d10296ddf36a791a38df95-6f41c394d4759033-01',
//   alertType: 'crashlytics.regression',
//   appId: '1:162074331013:android:f5830f1b7bf6ffd8ade6ec'
// }
function makeBody<T extends CrashlyticsPayload>(event: CrashlyticsEvent<T>) {
  logger.info(event, { structuredData: true })
  const { id, subtitle, appVersion } = event.data.payload.issue
  const alertType = parseAlertType(event.alertType)
  // TODO(tsuruoka): 本来はURLリンクを載せたいものの、`packageName`が取得できず`appId`のみなのでURLを生成できない問題
  // フォーマットは以下であることを確認したので、`packageName`が取得できるようになったらURLも表示できる
  // https://console.firebase.google.com/project/[PROJECT_ID]/crashlytics/app/[OS]:[PACKAGE_NAME]/issues/[ISSUE_ID]?time=last-seven-days
  const appId = event.appId

  return `
  ### ${subtitle}

  | Info | Value |
  |--------|--------|
  | appId | ${appId} |
  | alertType | ${alertType} |
  | id | ${id} |
  | appVersion | ${appVersion} |
  `
}

function parseAlertType(alertType: string) {
  return alertType.split('.').at(-1) as CrashlyticsAlert
}
