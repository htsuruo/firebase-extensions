# See it in action

You just need to wait until the scheduled time in ${param:SCHEDULE}.

# Using the extension

When triggered by scheduled time, this extension creates a Firestore backup objects in [${param:BUCKET_NAME}](https://console.cloud.google.com/storage/browser/${param:BUCKET_NAME}).

To learn more about Firebase Pub/Sub triggers, visit the [functions documentation](https://firebase.google.com/docs/functions/pubsub-events?gen=2nd).

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
