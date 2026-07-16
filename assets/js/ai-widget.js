// Floating AI Creator Assistant.
// Backend generateAi is stateless; memory/history lives here in localStorage per uid.
// Recent turns are prepended into the prompt so replies feel conversational.
import {auth,FUNCTIONS_URL} from './firebase-config.js';
import {profileReady,currentProfile} from './auth-guard.js';

const TOOLS=[
  {id:'caption',label:'Caption',hint:'Write a scroll-stopping caption for…'},
  {id:'hook',label:'Hook',hint:'Give me 5 opening hooks about…'},
  {id:'script',label:'Script',hint:'Script a 30s reel about…'},
  {id:'idea',label:'Content Idea',hint:'Give me content ideas for…'},
  {id:'hashtag',label:'Hashtags',hint:'Suggest hashtags for a post about…'},
  {id:'trend',label:'Trend Finder',hint:'What is trending in…'},
  {id:'research',label:'Niche Research',hint:'Research the niche…'},
  {id:'bio',label:'Bio',hint:'Write an IG bio for a page about…'},
  {id:'insights',label:'Growth Insights',hint:'How do I grow a page in…'},
  {id:'planner',label:'Content Planner',hint:'Plan a week of posts for…'}
];

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let tool='caption', history=[], storeKey='';

function load(){try{history=JSON.parse(localStorage.getItem(storeKey)||'[]')}catch{history=[]}}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(history.slice(-40)))}catch{/* quota */}}

function renderThread(thread){
  if(!history.length){thread.innerHTML='<p class="ai-empty">Pick a tool and describe your page. I remember this chat, so you can build on each answer.</p>';return}
  thread.innerHTML=history.map(m=>`<div class="ai-msg ai-${m.role}"><span class="ai-msg-tool">${m.role==='user'?'You':esc(m.tool||'Assistant')}</span><div class="ai-bubble">${esc(m.text)}</div></div>`).join('');
  thread.scrollTop=thread.scrollHeight;
}

// Give the model light context from the last couple of turns.
function buildPrompt(text){
  const recent=history.slice(-4).map(m=>`${m.role==='user'?'Creator':'Assistant'}: ${m.text}`).join('\n');
  return recent?`Earlier in this chat:\n${recent}\n\nNow: ${text}`:text;
}

export async function initAiWidget(){
  const panel=document.querySelector('#assistant');
  if(!panel)return;
  const toggle=document.querySelector('#assistant-toggle');
  const close=document.querySelector('#assistant-close');
  const toolGrid=document.querySelector('#ai-tools');
  const thread=document.querySelector('#ai-thread');
  const form=document.querySelector('#ai-form');
  const input=document.querySelector('#ai-prompt');
  const clearBtn=document.querySelector('#ai-clear');
  const locked=document.querySelector('#ai-locked');

  toolGrid.innerHTML=TOOLS.map((t,i)=>`<button type="button" role="tab" data-tool="${t.id}" class="${i===0?'active':''}">${t.label}</button>`).join('');
  const setOpen=open=>{panel.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));if(open)input.focus()};
  toggle.onclick=()=>setOpen(!panel.classList.contains('open'));
  close.onclick=()=>setOpen(false);

  toolGrid.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{
    tool=b.dataset.tool;
    toolGrid.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('active',x===b));
    const meta=TOOLS.find(t=>t.id===tool);
    input.placeholder=meta?meta.hint:'Describe what you need…';
  });

  await profileReady;
  storeKey=`vyralify.ai.${auth.currentUser?.uid||'anon'}`;
  load();
  renderThread(thread);

  const active=currentProfile.tier==='active';
  if(!active){
    locked.classList.remove('hidden');
    form.querySelector('button[type="submit"]').disabled=true;
    input.disabled=true;
    return;
  }

  clearBtn.onclick=()=>{history=[];save();renderThread(thread)};

  form.onsubmit=async e=>{
    e.preventDefault();
    const text=input.value.trim();
    if(!text)return;
    const label=(TOOLS.find(t=>t.id===tool)||{}).label||'Assistant';
    history.push({role:'user',tool:label,text,ts:Date.now()});
    history.push({role:'assistant',tool:label,text:'Generating…',ts:Date.now()});
    save();renderThread(thread);
    input.value='';
    const pending=history[history.length-1];
    try{
      const t=await auth.currentUser.getIdToken();
      const r=await fetch(`${FUNCTIONS_URL}/generateAi`,{
        method:'POST',
        headers:{'Content-Type':'application/json',Authorization:`Bearer ${t}`},
        body:JSON.stringify({tool,prompt:buildPrompt(text)})
      });
      const x=await r.json();
      if(!r.ok||!x.output)throw new Error();
      pending.text=x.output;
    }catch{
      pending.text="Couldn't generate that — try again.";
    }
    save();renderThread(thread);
  };
}
