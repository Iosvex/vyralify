import { auth, db } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const $ = s => document.querySelector(s);
const message = (msg, isError = true) => {
  const errEl = $('.form-error');
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = msg ? 'block' : 'none';
    errEl.style.color = isError ? 'var(--danger, #DC2626)' : 'var(--green, #2FAE6B)';
    errEl.style.background = isError ? 'rgba(220,38,38,.07)' : 'rgba(47,174,107,.07)';
    errEl.style.borderColor = isError ? 'rgba(220,38,38,.2)' : 'rgba(47,174,107,.2)';
  }
};

// ---- Verify Paid Membership Status Before Dashboard Entry ----
async function verifyPaidUserAndRedirect(user) {
  try {
    const userSnap = await getDoc(doc(db, 'users', user.uid));
    const data = userSnap.data();

    if (!data || data.tier !== 'active') {
      message('No active membership found for this account. Please purchase a membership to gain access.');
      await signOut(auth);
      setTimeout(() => {
        location.href = '/index.html#pricing';
      }, 2000);
      return false;
    }

    message('Membership verified! Redirecting to workspace...', false);
    setTimeout(() => {
      location.href = '/dashboard.html';
    }, 600);
    return true;
  } catch (err) {
    console.error('Membership check error:', err);
    message('Could not verify membership status. Please try again.');
    await signOut(auth);
    return false;
  }
}

// ---- Login Form Handler ----
const loginForm = $('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    message('');
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      message('Please fill in both email and password.');
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await verifyPaidUserAndRedirect(cred.user);
    } catch (err) {
      message(err.code === 'auth/invalid-credential' 
        ? 'Invalid email or password. Please check your credentials.' 
        : 'Sign in failed. Ensure you have an active Vyralify membership.');
    }
  });
}

// ---- Google Login Handler ----
const googleBtn = $('#google-login');
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    message('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await verifyPaidUserAndRedirect(result.user);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        message('Google Sign-In failed or cancelled. Please try again.');
      }
    }
  });
}

window.vyralifyLogout = () => signOut(auth).then(() => { location.href = '/index.html'; });
