import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const firebaseConfig={apiKey:'AIzaSyBz9qHZnDQ76OOqMcKz44T9zdid_qOaGpo',authDomain:'vyralifyin1.firebaseapp.com',projectId:'vyralifyin1',storageBucket:'vyralifyin1.firebasestorage.app',messagingSenderId:'10354719243',appId:'1:10354719243:web:89ed5e54f030eb7051650e'};
const app=initializeApp(firebaseConfig);export const auth=getAuth(app);export const db=getFirestore(app);export const FUNCTIONS_URL='https://us-central1-vyralifyin1.cloudfunctions.net';
