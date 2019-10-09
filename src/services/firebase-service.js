import * as admin from 'firebase-admin';
import firebaseConfig from '../config/config';

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: firebaseConfig.databaseURL,
});

export default admin;
