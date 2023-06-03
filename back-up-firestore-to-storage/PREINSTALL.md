By using this extension, export selected Firestore documents to Cloud Storage at any scheduled time. It depends on Google API's [exportDocuments](https://cloud.google.com/firestore/docs/reference/rest/v1/projects.databases/exportDocuments).

This extension streamlines the creation of content outlined in the Schedule data exports section of[the official Firebase documentation](https://firebase.google.com/docs/firestore/solutions/schedule-export).It eliminates the need to manually create service accounts or configure Cloud Functions. Just install the extension, and with a single click, you're all set up.

> Caution: Exporting data from Cloud Firestore will incur one read operation per document exported. However, these reads will not appear in the usage section of the console. Make sure you understand this before setting up recurring exports to avoid an unexpected bill.

The features of this extension are as follows:

- Exports documents of specified Firestore collection ID(s) at any scheduled time
- Allows developers to set schedule the time to export
  - Supports both `Unix Crontab` and `App Engine syntax`
    - ref. [Scheduling jobs with cron.yaml | Google App Engine flexible environment docs | Google Cloud](https://cloud.google.com/appengine/docs/flexible/scheduling-jobs-with-cron-yaml)

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions
- Cloud Firestore
- Cloud Storage

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
