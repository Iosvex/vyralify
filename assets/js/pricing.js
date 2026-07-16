// Renders the membership price based on the visitor's location.
// Order of preference (architecture.md §6): signed-in user's saved country → browser locale guess.
// This ONLY chooses which of the two fixed prices to show — pricing logic is unchanged.
import {auth,db} from './firebase-config.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {doc,getDoc} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const PRICE={
  IN:{amount:'₹499',period:'/month',note:'Billed monthly in INR via Razorpay · cancel anytime'},
  ROW:{amount:'$19',period:'/month',note:'Billed monthly in USD via Stripe · cancel anytime'}
};

function guessIndiaFromBrowser(){
  try{
    const tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');
    const loc=(navigator.language||'').toLowerCase();
    return tz==='Asia/Kolkata'||tz==='Asia/Calcutta'||loc.endsWith('-in')||loc==='hi';
  }catch{return false}
}

function apply(isIndia){
  const p=isIndia?PRICE.IN:PRICE.ROW;
  document.querySelectorAll('[data-price]').forEach(el=>el.textContent=p.amount);
  document.querySelectorAll('[data-price-period]').forEach(el=>el.textContent=p.period);
  document.querySelectorAll('[data-price-note]').forEach(el=>el.textContent=p.note);
}

// Best-effort immediately (avoids a $→₹ flash on Indian browsers); default markup stays $19.
apply(guessIndiaFromBrowser());

// If signed in, the stored country is authoritative — override the browser guess.
onAuthStateChanged(auth,async user=>{
  if(!user)return;
  try{
    const snap=await getDoc(doc(db,'users',user.uid));
    const country=String(snap.data()?.country||'').toUpperCase();
    if(country)apply(country==='IN');
  }catch{/* leave the browser guess in place */}
});
