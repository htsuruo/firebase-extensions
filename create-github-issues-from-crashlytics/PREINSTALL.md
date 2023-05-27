<!-- 
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-preinstall
-->

By using this extension, creates a GitHub Issue on your selected repository, and attached required labels, triggered by new Crashlytics fatal issues.

The features of this extension are as follows:

- Automatically creates GitHub Issues if new Crashlytics fatal issues report
  - Using GitHub API's [Create an issue](https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue)
- Allows developer to set required multiple labels
  - ex. bugs, crashlytics

**This extension helps to simplify the construction of the contents described in the [Firebase Alerts triggers](https://firebase.google.com/docs/functions/alert-events#handle-crashlytics-alerts) section of the official documentation. There's no need for creating service accounts or setting up Cloud Functions. Simply install the extension and it's all done with a single click.**

## Additional setup

Before installing this extension, make sure that you've [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) in your GitHub account to access GitHub API（if your repository is organization, use GitHub Apps）. Two approach exists, but `Fine-grained personal access tokens` is recommended.

### Permissions

Required 「repository permissions > Issues > Read and write」only
<img width="630" alt="SCR-20230527-ogal-2" src="https://github.com/HTsuruo/firebase-extensions/assets/12729025/719bcfd8-12c7-4336-adde-924738553592">

## Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
- Cloud Functions
- Cloud Secret Manager
- Crashlytics

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
