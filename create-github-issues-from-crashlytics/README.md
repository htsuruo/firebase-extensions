# Create GitHub Issues on Crashlytics

**Author**: Hideki TSURUOKA - [HTsuruo](https://github.com/HTsuruo)

**Description**: Automatically creates GitHub Issues triggered by new Crashlytics fatal issues.

**Details**: By using this extension, creates a GitHub Issue on your selected repository, and attached required labels, triggered by new Crashlytics fatal issues.

The features of this extension are as follows:

- Automatically creates GitHub Issues if new Crashlytics fatal issues report
  - Using GitHub API's [Create an issue](https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue)
- Allows developer to set required multiple labels
  - ex. bugs, crashlytics

**This extension helps to simplify the construction of the contents described in the [Firebase Alerts triggers](https://firebase.google.com/docs/functions/alert-events#handle-crashlytics-alerts) section of the official documentation. There's no need for creating service accounts or setting up Cloud Functions. Simply install the extension and it's all done with a single click.**
