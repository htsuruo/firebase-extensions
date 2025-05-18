import {
  NewAnrIssuePayload,
  NewFatalIssuePayload,
  NewNonfatalIssuePayload,
  RegressionAlertPayload,
} from 'firebase-functions/v2/alerts/crashlytics'

export type CrashlyticsAlert =
  | 'newFatalIssue'
  | 'newNonfatalIssue'
  | 'newAnrIssue'
  | 'regression'
// | 'stabilityDigest'
// | 'velocity'

// イベントトリガーで渡ってくるPayloadクラスには継承関係が無い（親クラスを持っていない）ので、
// ジェネリクスで利用できるようにtypeで束ねる
export type CrashlyticsPayload =
  | NewFatalIssuePayload
  | NewNonfatalIssuePayload
  | NewAnrIssuePayload
  | RegressionAlertPayload
// | StabilityDigestPayload
// | VelocityAlertPayload
