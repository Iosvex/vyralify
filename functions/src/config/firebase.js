const admin = require('firebase-admin');

process.env.GCLOUD_PROJECT = process.env.GCLOUD_PROJECT || 'vyralify-io';

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth,
  serverTimestamp: () => admin.firestore.FieldValue.serverTimestamp(),
  increment: (val) => admin.firestore.FieldValue.increment(val)
};
