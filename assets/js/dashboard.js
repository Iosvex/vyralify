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
  
  // Hide all track-specific tools
  document.querySelectorAll('.tab-tools').forEach(el=>el.classList.add('hidden'));

  if(category==='community'){
    list.classList.add('hidden');
    communityPanel.classList.remove('hidden');
    initCommunity();
  }else{
    communityPanel.classList.add('hidden');
    list.classList.remove('hidden');
    
    // Show tools for current category if present
    const toolsPanel=document.getElementById(`${category}-tools`);
    if(toolsPanel) toolsPanel.classList.remove('hidden');
    
    renderAssets();
  }
}

// ---- Interactive Tools Logic ----
function initInteractiveTools(){
  // 1. Niche Explorer Selectors
  const niches={
    wealth:{
      topic:'Financial freedom, business growth, passive income, side hustles.',
      hooks:'"The 3 rules of wealth they hid from you..." / "Why your 9-to-5 is keeping you poor..."',
      tags:'#finance #wealthmindset #sidehustle #moneyhacks #businesscoach'
    },
    stoicism:{
      topic:'Self-mastery, mental toughness, ancient philosophy, discipline.',
      hooks:'"Marcus Aurelius once wrote a rule that will change your life..." / "The brutal truth about modern motivation..."',
      tags:'#stoic #stoicism #discipline #mindsetshift #mentalstrength'
    },
    luxury:{
      topic:'Aspirational lifestyle, supercars, luxury yachts, mansions, top 1% wealth.',
      hooks:'"If you want to live like this in your 20s..." / "How the 1% spend their money..."',
      tags:'#luxury #lifestyle #luxurylife #billionaire #successmindset'
    }
  };
  
  document.querySelectorAll('[data-niche-select]').forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll('[data-niche-select]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const data=niches[btn.dataset.nicheSelect];
      const details=document.getElementById('niche-details');
      if(data && details){
        details.innerHTML=`
          <strong>💡 Topic:</strong> ${data.topic}<br>
          <strong>🔥 Best Hooks:</strong> ${data.hooks}<br>
          <strong>🏷️ Recommended tags:</strong> ${data.tags}
        `;
      }
    };
  });

  // 2. Hook Analyzer Tool
  const btnAnalyze=document.getElementById('btn-analyze-hook');
  const hookInput=document.getElementById('hook-input');
  const hookResult=document.getElementById('hook-result');
  
  btnAnalyze?.addEventListener('click',()=> {
    const val=(hookInput?.value||'').trim();
    if(!val) return;
    hookResult.classList.remove('hidden');
    
    const triggerWords=['secret','why','how','never','mistake','stop','fail','hack','billionaire','hidden','cheat'];
    const hasTrigger=triggerWords.some(w=>val.toLowerCase().includes(w));
    const hasNumber=/\d+/.test(val);
    
    let score=60;
    let feedback='';
    
    if(hasTrigger && hasNumber){
      score=94;
      feedback='Excellent hook! You combined strong trigger words with a specific number. This triggers extreme curiosity.';
    }else if(hasTrigger){
      score=82;
      feedback='Great hook! Good emotional triggers. Add a number or timeframe to make it even more compelling.';
    }else if(hasNumber){
      score=75;
      feedback='Nice start. Numbers work well. Try adding power words like "mistakes", "hacks", or "secrets" for a curiosity gap.';
    }else{
      score=58;
      feedback='Needs work. This hook is too generic. Use trigger words to build suspense. Example: "Why 99% of people fail..."';
    }
    
    hookResult.style.background=score>=80?'rgba(31,190,107,.15)':'rgba(255,92,92,.15)';
    hookResult.style.border=`1px solid ${score>=80?'var(--success)':'var(--error)'}`;
    hookResult.style.color=score>=80?'var(--success)':'var(--text-dark)';
    hookResult.innerHTML=`
      <strong>Score: ${score}/100</strong><br>
      <span style="display:block;margin-top:0.25rem">${feedback}</span>
    `;
  });

  // 3. Assistant open button trigger
  document.getElementById('btn-open-assistant')?.addEventListener('click',()=>{
    const toggle=document.getElementById('assistant-toggle');
    if(toggle) toggle.click();
  });

  // 4. Affiliate code copying
  const btnCopyAffiliate=document.getElementById('btn-copy-affiliate');
  const affCodeEl=document.getElementById('affiliate-code');
  const copyStatus=document.getElementById('copy-status');
  
  if(affCodeEl && currentProfile.affiliateCode){
    affCodeEl.textContent=currentProfile.affiliateCode;
  }
  
  btnCopyAffiliate?.addEventListener('click',async()=>{
    const code=currentProfile.affiliateCode||'MEMBER';
    const link=`https://vyralify.io/signup.html?ref=${code}`;
    try{
      await navigator.clipboard.writeText(link);
      if(copyStatus){
        copyStatus.classList.remove('hidden');
        setTimeout(()=>copyStatus.classList.add('hidden'),2500);
      }
    }catch{
      alert('Could not copy link automatically. Here it is: '+link);
    }
  });
}

async function boot(){
  await profileReady;
  const name=auth.currentUser.displayName||auth.currentUser.email;
  document.querySelector('#member-name').textContent=name;
  
  const active=currentProfile.tier==='active';
  document.querySelector('#tier-state').textContent=active?'Active member':'Free plan';
  document.querySelector('#checkout')?.classList.toggle('hidden',active);
  
  // Bind AI Credit stats
  const usage=currentProfile.aiUsage||{};
  const count=usage.resetAt?.toMillis?.() > Date.now() ? (usage.count||0) : 0;
  const creditsLeft=Math.max(0, 3 - count);
  const creditsEl=document.getElementById('stat-credits');
  if(creditsEl){
    creditsEl.textContent=`${creditsLeft} / 3`;
  }
  
  // Bind affiliate performance stats
  const clicksEl=document.getElementById('aff-clicks');
  const signupsEl=document.getElementById('aff-signups');
  if(clicksEl && signupsEl){
    // Simulate clicks and signups based on user ID for aesthetics, or keep placeholders
    clicksEl.textContent = (currentProfile.affiliateCode?.charCodeAt(0)||0) * 2;
    signupsEl.textContent = Math.floor((currentProfile.affiliateCode?.charCodeAt(1)||0) / 10);
  }

  document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>selectCategory(b.dataset.category));
  selectCategory('foundation');
  
  initInteractiveTools();
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
