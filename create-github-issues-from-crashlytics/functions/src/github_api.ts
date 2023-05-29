import { Octokit } from '@octokit/rest'
import { RequestError } from '@octokit/request-error'
import {
  CrashlyticsEvent,
  Issue,
} from 'firebase-functions/v2/alerts/crashlytics'
import { logger } from 'firebase-functions/v2'
import { CrashlyticsAlert } from './crashlytics_alert'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

type CrashlyticsInfo<T> = {
  event: CrashlyticsEvent<T>
  issue: Issue
}

// ref. https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
export async function createGitHubIssue<T>(info: CrashlyticsInfo<T>) {
  try {
    await octokit.rest.issues.create({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      title: info.issue.title,
      body: makeBody(info),
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
    // handle all other errors
    logger.error(error, { structuredData: true })
    throw error
  }
}

function makeBody<T>(info: CrashlyticsInfo<T>) {
  const { event, issue } = info
  logger.info(event, { structuredData: true })
  const appId = event.appId
  const alertType = event.alertType.split('.').at(-1) as CrashlyticsAlert
  return `
    ## ${issue.title}
    | Header | Header |
    |--------|--------|
    | appId | ${appId} |
    | alertType | ${alertType} |
    | id | ${issue.id} |
    | appVersion | ${issue.appVersion} |
    `
}
