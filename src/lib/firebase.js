import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBz9qHZnDQ76OOqMcKz44T9zdid_qOaGpo",
  authDomain: "vyralifyin1.firebaseapp.com",
  projectId: "vyralifyin1",
  storageBucket: "vyralifyin1.firebasestorage.app",
  messagingSenderId: "10354719243",
  appId: "1:10354719243:web:89ed5e54f030eb7051650e"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const FUNCTIONS_URL = 'https://us-central1-vyralifyin1.cloudfunctions.net';
export { app };
