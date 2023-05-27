# Create GitHub Issues from Crashlytics

**Author**: Hideki TSURUOKA (**[HTsuruo](https://github.com/HTsuruo)**)

**Description**: Automatically creates GitHub Issues triggered by new Crashlytics fatal issues.

**Details**: By using this extension, creates a GitHub Issue on your selected repository, and attached required labels, triggered by new Crashlytics fatal issues.

The features of this extension are as follows:

- Automatically creates GitHub Issues if new Crashlytics fatal issues report
  - Using GitHub API's [Create an issue](https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue)
- Allows developer to set required multiple labels
  - ex. bugs, crashlytics

**This extension helps to simplify the construction of the contents described in the [Firebase Alerts triggers](https://firebase.google.com/docs/functions/alert-events#handle-crashlytics-alerts) section of the official documentation. There's no need for creating service accounts or setting up Cloud Functions. Simply install the extension and it's all done with a single click.**

<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->
# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
- Cloud Functions
- Crashlytics

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

**Configuration Parameters:**

- GitHub access token for your repository: Use PAT(Personal Access Token) or GitHub Apps

- The owner or organization name for your repository

- The name of your repository for creating issues

- Labels to associate with the issue: The param requires array format(ex: ["bug"]). Only users with push access can set labels for new issues. Labels are silently dropped otherwise.

- Cloud Functions location: Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

**Other Resources**:

- createNewFatalIssue (firebaseextensions.v1beta.v2function)

**Access Required**:

This extension will operate with the following project IAM roles:

- firebasecrashlytics.viewer

- undefined (Reason: Allows the extension to read Crashlytics reports.)
