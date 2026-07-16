// Dashboard orchestration: tab switching, gated content, checkout, logout.
// The AI assistant and community chat live in their own modules.
import {db,auth,FUNCTIONS_URL} from './firebase-config.js';
import {profileReady,currentProfile} from './auth-guard.js';
import {collection,getDocs,query,orderBy} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {signOut} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {initAiWidget} from './ai-widget.js';
import {initCommunity} from './community.js';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={foundation:'Foundation',content:'Content & Posting',growth:'Scaling & Growth',monetisation:'Monetisation',community:'Community'};
const list=document.querySelector('#asset-list');
const communityPanel=document.querySelector('#community-panel');
const trackTitle=document.querySelector('#track-title');
let category='foundation', assetsCache=null;

async function getAssets(){
  if(!assetsCache){
    const s=await getDocs(query(collection(db,'contentAssets'),orderBy('order')));
    assetsCache=s.docs.map(d=>d.data());
  }
  return assetsCache;
}

async function renderAssets(){
  try{
    const all=await getAssets();
    const items=all.filter(a=>a.category===category);
    if(!items.length){list.innerHTML='<p class="asset-empty">This track is being written. Check back soon — new lessons drop weekly.</p>';return}
    const active=currentProfile.tier==='active';
    list.innerHTML=items.map(a=>{
      const locked=a.tierRequired==='active'&&!active;
      const action=locked
        ? `<span class="lock">Unlock the full ${esc(labels[category])} library →</span>`
        : `<a class="btn btn-secondary" href="${esc(a.url||'#')}" ${a.url?'target="_blank" rel="noopener"':''}>Open</a>`;
      return `<article class="asset card"><div><strong>${esc(a.title)}</strong><br><small>${esc(a.type||'Resource')}</small></div>${action}</article>`;
    }).join('');
  }catch{list.innerHTML='<p class="asset-empty">Resources could not be loaded. Please try again.</p>'}
}

function selectCategory(next){
  category=next;
  trackTitle.textContent=labels[category];
  document.querySelectorAll('[data-category]').forEach(b=>b.classList.toggle('active',b.dataset.category===category));
  if(category==='community'){
    list.classList.add('hidden');
    communityPanel.classList.remove('hidden');
    initCommunity();
  }else{
    communityPanel.classList.add('hidden');
    list.classList.remove('hidden');
    renderAssets();
  }
}

async function boot(){
  await profileReady;
  const name=auth.currentUser.displayName||auth.currentUser.email;
  document.querySelector('#member-name').textContent=name;
  const active=currentProfile.tier==='active';
  document.querySelector('#tier-state').textContent=active?'Active member':'Free plan';
  document.querySelector('#checkout')?.classList.toggle('hidden',active);
  document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>selectCategory(b.dataset.category));
  selectCategory('foundation');
  initAiWidget();
}

document.querySelector('#checkout')?.addEventListener('click',async()=>{
  try{
    const t=await auth.currentUser.getIdToken();
    const r=await fetch(`${FUNCTIONS_URL}/createCheckout`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${t}`}});
    const x=await r.json();
    if(!r.ok||!x.url)throw new Error();
    location.href=x.url;
  }catch{alert('Checkout could not start. Please try again.')}
});

document.querySelector('#logout')?.addEventListener('click',()=>signOut(auth).then(()=>location.replace('/index.html')));

boot();
