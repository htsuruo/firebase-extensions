import { CrashlyticsOptions } from 'firebase-functions/v2/alerts/crashlytics'

export const options: CrashlyticsOptions = {
  region: process.env.LOCATION,
  secrets: ['GITHUB_ACCESS_TOKEN'],
}

export const ownerRepo = `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`
export const labels = `${process.env.GITHUB_LABELS}`
