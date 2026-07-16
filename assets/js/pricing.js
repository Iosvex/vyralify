// Renders the membership price based on the visitor's location and toggle choice.
import {auth,db} from './firebase-config.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {doc,getDoc} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const PRICE={
  IN:{amount:'₹499',period:'/month',note:'Billed monthly in INR · No hidden charges · Cancel anytime',ctaText:'Join Vyralify (₹499)',url:'https://payments.cashfree.com/forms/vyralifyio',disabled:false},
  ROW:{amount:'$19',period:'/month',note:'International Payment Coming Soon · Billed in USD',ctaText:'Coming Soon (International)',url:'#',disabled:true}
};

const btnInr=document.getElementById('toggle-inr');
const btnUsd=document.getElementById('toggle-usd');
const cta=document.getElementById('pricing-cta');

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
  
  if(cta){
    cta.textContent=p.ctaText;
    cta.href=p.url;
    if(p.disabled){
      cta.classList.add('disabled');
      cta.style.pointerEvents='none';
      cta.style.opacity='0.5';
    }else{
      cta.classList.remove('disabled');
      cta.style.pointerEvents='auto';
      cta.style.opacity='1';
    }
  }

  if(btnInr && btnUsd){
    btnInr.classList.toggle('active',isIndia);
    btnUsd.classList.toggle('active',!isIndia);
  }
}

// Initial state
apply(guessIndiaFromBrowser());

btnInr?.addEventListener('click',()=>apply(true));
btnUsd?.addEventListener('click',()=>apply(false));

// If signed in, stored country overrides browser guess
onAuthStateChanged(auth,async user=>{
  if(!user)return;
  try{
    const snap=await getDoc(doc(db,'users',user.uid));
    const country=String(snap.data()?.country||'').toUpperCase();
    if(country)apply(country==='IN');
  }catch{/* leave browser guess */}
});

