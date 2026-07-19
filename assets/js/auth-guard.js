import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export let currentProfile = null;

export const profileReady = new Promise((resolve) => {
  onAuthStateChanged(auth, async (u) => {
    if (!u) {
      location.replace('/login.html');
      return;
    }
    
    try {
      const s = await getDoc(doc(db, 'users', u.uid));
      currentProfile = s.data() || {};
      
      // Strict Membership Gate: User must have an active paid membership
      if (!currentProfile.tier || currentProfile.tier !== 'active') {
        alert('Access Restricted: An active Vyralify membership is required to access the dashboard.');
        await signOut(auth);
        location.replace('/index.html#pricing');
        return;
      }
      
      // Admin route protection
      if (document.body.dataset.admin === 'true' && currentProfile.role !== 'admin') {
        location.replace('/dashboard.html');
        return;
      }
      
      resolve({ user: u, profile: currentProfile });
    } catch (err) {
      console.error('Auth Guard Verification Error:', err);
      location.replace('/login.html');
    }
  });
});
