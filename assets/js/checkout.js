// Pay-first entry: collect email + country, open the hosted checkout (Stripe/Razorpay).
// No account is required here — after payment the provider redirects to /signup.html
// where verifyAccess confirms the payment before an account can be created.
import {FUNCTIONS_URL} from './firebase-config.js';

const $=s=>document.querySelector(s);
const message=t=>{const e=$('.form-error');if(e)e.textContent=t};
const form=$('#checkout-form');

// Best-effort: preselect India for Indian browsers (still fully editable).
try{
  const tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');
  const loc=(navigator.language||'').toLowerCase();
  if(tz==='Asia/Kolkata'||tz==='Asia/Calcutta'||loc.endsWith('-in')||loc==='hi'){
    const sel=form?.querySelector('select[name=country]');
    if(sel)sel.value='IN';
  }
}catch{/* leave default */}

form?.addEventListener('submit',async e=>{
  e.preventDefault();message('');
  const btn=form.querySelector('button[type=submit]');
  const f=new FormData(form);
  btn.disabled=true;btn.textContent='Redirecting to payment…';
  try{
    const r=await fetch(`${FUNCTIONS_URL}/startCheckout`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:f.get('email'),country:f.get('country')})
    });
    const x=await r.json();
    if(!r.ok||!x.url)throw new Error();
    location.href=x.url;
  }catch{
    message('Checkout could not start. Please check your details and try again.');
    btn.disabled=false;btn.textContent='Continue to secure payment →';
  }
});
