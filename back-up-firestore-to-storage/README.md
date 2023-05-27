# Back up Firestore to Storage

**Author**: Hideki TSURUOKA - [HTsuruo](https://github.com/HTsuruo)

**Description**: Exports Firestore documents to Cloud Storage at any scheduled time.

**Details**: By using this extension, export selected Firestore documents to Cloud Storage at any scheduled time. And also, it depends on Google API's [exportDocuments](https://cloud.google.com/firestore/docs/reference/rest/v1/projects.databases/exportDocuments).

The features of this extension are as follows:

- Exports documents of specified Firestore collection ID(s)
- Allows developer to setting export the execution export schedule
  - Supports both Unix Crontab and App Engine syntax
    - ref. [Scheduling jobs with cron.yaml  |  Google App Engine flexible environment docs  |  Google Cloud](https://cloud.google.com/appengine/docs/flexible/scheduling-jobs-with-cron-yaml)

**This extension helps to simplify the construction of the contents described in the [Schedule data exports](https://firebase.google.com/docs/firestore/solutions/schedule-export) section of the official documentation. There's no need for creating service accounts or setting up Cloud Scheduler, and so on. Simply install the extension and it's all done with a single click.**

> Caution: Exporting data from Cloud Firestore will incur one read operation per document exported. However, these reads will not appear in the usage section of the console. Make sure you understand this before setting up recurring exports to avoid an unexpected bill.
