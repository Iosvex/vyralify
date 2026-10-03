const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');

if (!admin.apps.length) {
  if (fs.existsSync(serviceAccountPath)) {
    try {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || 'vyralifyai'
      });
    } catch (e) {
      console.warn('Failed to load serviceAccountKey.json, using default init:', e.message);
      admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'vyralifyai' });
    }
  } else {
    admin.initializeApp({
      projectId: process.env.GCLOUD_PROJECT || 'vyralifyai'
    });
  }
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
