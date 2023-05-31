# See it in action

You can test out this extension right away!

1. Force a crash to test your implementation
    - [Test your Crashlytics implementation  |  Firebase Crashlytics](https://firebase.google.com/docs/crashlytics/test-implementation?platform=flutter)

2. Go to your repository issues page to confirm that the issue has been created.
    - https://github.com/${param:GITHUB_OWNER}/${param:GITHUB_REPO}/issues

# Using the extension

When triggered by a new Crashlytics fatal issue, this extension creates a GitHub issue in [`${param:GITHUB_OWNER}/${param:GITHUB_REPO}`](https://github.com/${param:GITHUB_OWNER}/${param:GITHUB_REPO}/issues).

To learn more about Firebase Alerts triggers, visit the [functions documentation](https://firebase.google.com/docs/functions/alert-events).

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
