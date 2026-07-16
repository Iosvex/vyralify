import {auth,FUNCTIONS_URL} from './firebase-config.js';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
const $=s=>document.querySelector(s);const message=t=>{const e=$('.form-error');if(e)e.textContent=t};

// ---- Pay-first signup gate ----
// Signup is only reachable after payment. verifyAccess confirms either a completed
// Stripe checkout session (?session=…) or a recorded paid email (?email=…) before the
// form is shown. The confirmed email is prefilled and locked so it matches the payment.
const signup=$('#signup-form');
if(signup){
  const params=new URLSearchParams(location.search);
  const session=params.get('session')||'';
  const emailParam=(params.get('email')||'').trim().toLowerCase();
  const gateMsg=$('#gate-msg'),gateCta=$('#gate-cta'),emailInput=signup.querySelector('input[name=email]');

  (async()=>{
    try{
      const qs=session?`session=${encodeURIComponent(session)}`:`email=${encodeURIComponent(emailParam)}`;
      if(!session&&!emailParam)throw new Error();
      const r=await fetch(`${FUNCTIONS_URL}/verifyAccess?${qs}`);
      const x=await r.json();
      if(x.ok&&x.email){
        if(emailInput){emailInput.value=x.email;emailInput.readOnly=true}
        signup.hidden=false;
        if(gateMsg)gateMsg.textContent='Payment confirmed — create your account below.';
      }else throw new Error();
    }catch{
      if(gateMsg)gateMsg.textContent="We couldn't confirm a completed payment for this email. If you just paid, give it a moment and refresh.";
      if(gateCta)gateCta.hidden=false;
    }
  })();

  signup.addEventListener('submit',async e=>{
    e.preventDefault();message('');
    const f=new FormData(signup);
    try{
      const c=await createUserWithEmailAndPassword(auth,f.get('email'),f.get('password'));
      const token=await c.user.getIdToken();
      // Server-side profile write + tier activation from paidEmails (race-safe).
      await fetch(`${FUNCTIONS_URL}/completeSignup`,{
        method:'POST',
        headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
        body:JSON.stringify({name:f.get('name')||'',country:f.get('country')||'',track:f.get('track')||''})
      });
      location.href='/dashboard.html';
    }catch(err){
      message(err.code==='auth/email-already-in-use'?'This email already has an account. Log in instead.':err.message);
    }
  });
}

// ---- Login (unchanged flow) ----
const login=$('#login-form');
if(login)login.addEventListener('submit',async e=>{
  e.preventDefault();message('');
  const f=new FormData(login);
  try{await signInWithEmailAndPassword(auth,f.get('email'),f.get('password'));location.href='/dashboard.html'}
  catch{message('Could not sign in. Check your email and password.')}
});
$('#google-login')?.addEventListener('click',async()=>{
  try{await signInWithPopup(auth,new GoogleAuthProvider());location.href='/dashboard.html'}
  catch{message('Google sign-in could not be completed.')}
});
window.vyralifyLogout=()=>signOut(auth).then(()=>location.href='/index.html');
