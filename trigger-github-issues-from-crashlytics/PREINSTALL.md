By using this extension, you can create GitHub Issues on a selected repository, and attach required labels, triggered by new Crashlytics alerts.

This extension streamlines the creation of content outlined in the Firebase Alerts triggers section of [the official Firebase documentation](https://firebase.google.com/docs/functions/alert-events#handle-crashlytics-alerts). It eliminates the need to manually create service accounts or configure Cloud Functions. Just install the extension, and with a single click, you're all set up.

The features of this extension are as follows:

- Automatically create a GitHub issue if a new Crashlytics issue occurs using the [GitHub API](https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue).
- Allow developers to set multiple required labels (e.g., `bugs`, `crashlytics`) for issues.

| Crashlytics Issue | GitHub Issue |
|--------|--------|
| <img width="900" alt="SCR-20230529-ukgw-2" src="https://github.com/htsuruo/firebase-extensions/assets/12729025/d019c106-a2c2-4b76-b5f9-2327609fe3a0"> | <img width="970" alt="SCR-20230529-ukml" src="https://github.com/htsuruo/firebase-extensions/assets/12729025/8eafcf03-a285-4067-b56f-36e378747758"> |

## Supported crashlytics alerts

- `crashlytics.newFatalIssue`: An event is sent when an application experiences a new fatal crash (not for any subsequent, identical events).
- `crashlytics.newNonfatalIssue`: An event is sent when an application experiences a new non-fatal error (not for any subsequent, identical events).
- `crashlytics.newAnrIssue`: An event is sent when an application experiences a new Application Not Responding (ANR) error (not for any subsequent, identical events).

### Not supported (Future work)

- `crashlytics.regression`: An event is sent when an application experiences a crash for an issue marked as closed for a previous application version.
- `crashlytics.stabilityDigest`: An event is sent when there is a notification of the top trending issues in Crashlytics.
- `crashlytics.velocity`: An event is sent when a single issue is responsible for causing a significant number of application sessions to crash.

## Additional setup

Before installing this extension, make sure that you've [created a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) in your GitHub account to access the GitHub API（if your repository is organization, use GitHub Apps).

Two approaches exist for creating access tokens, but `Fine-grained personal access tokens` are recommended.

### Permissions

When creating a PAT (Personal Access Token), you need to give it the following permission:
`repository permissions > Issues > Read and write`

<img width="630" alt="SCR-20230527-ogal-2" src="https://github.com/htsuruo/firebase-extensions/assets/12729025/719bcfd8-12c7-4336-adde-924738553592">

## Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions
- Cloud Secret Manager
- Crashlytics

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
