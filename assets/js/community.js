// Realtime community chat — Firestore only, no third-party services.
// One live listener over recent posts; channel filtering happens client-side to
// avoid needing a composite index (single-field createdAt index is automatic).
import {db,auth} from './firebase-config.js';
import {profileReady,currentProfile} from './auth-guard.js';
import {collection,addDoc,query,orderBy,limit,onSnapshot,serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const CHANNELS=[
  {id:'introductions',label:'Introductions'},
  {id:'general',label:'General Chat'},
  {id:'networking',label:'Networking'},
  {id:'wins',label:'Wins & Milestones'},
  {id:'reviews',label:'Page Reviews'}
];

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let channel='general', posts=[], started=false;

function displayName(){
  return currentProfile.displayName||auth.currentUser?.displayName||(auth.currentUser?.email||'Member').split('@')[0];
}
function fmt(ts){try{return ts?.toDate?ts.toDate().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):''}catch{return ''}}

function render(thread,title){
  const label=(CHANNELS.find(c=>c.id===channel)||{}).label||'';
  if(title)title.textContent=label;
  const msgs=posts.filter(p=>p.channel===channel).slice().reverse();
  if(!msgs.length){thread.innerHTML=`<p class="chat-empty">No messages in ${esc(label)} yet. Start the conversation.</p>`;return}
  const me=auth.currentUser?.uid;
  thread.innerHTML=msgs.map(m=>`<div class="chat-msg${m.uid===me?' mine':''}"><span class="chat-author">${esc(m.displayName||'Member')} <time>${fmt(m.createdAt)}</time></span><div class="chat-bubble">${esc(m.body)}</div></div>`).join('');
  thread.scrollTop=thread.scrollHeight;
}

export async function initCommunity(){
  if(started)return; started=true;
  const rail=document.querySelector('#chat-channels');
  const thread=document.querySelector('#chat-thread');
  const title=document.querySelector('#chat-channel-title');
  const form=document.querySelector('#chat-form');
  const input=document.querySelector('#chat-input');
  if(!thread)return;

  rail.innerHTML=CHANNELS.map((c,i)=>`<button type="button" data-channel="${c.id}" class="${c.id===channel?'active':''}">${c.label}</button>`).join('');
  rail.querySelectorAll('[data-channel]').forEach(b=>b.onclick=()=>{
    channel=b.dataset.channel;
    rail.querySelectorAll('[data-channel]').forEach(x=>x.classList.toggle('active',x===b));
    render(thread,title);
  });

  await profileReady;

  onSnapshot(query(collection(db,'communityPosts'),orderBy('createdAt','desc'),limit(200)),
    snap=>{posts=snap.docs.map(d=>d.data());render(thread,title)},
    ()=>{thread.innerHTML='<p class="chat-empty">Chat could not load right now. Try again.</p>'}
  );

  form.onsubmit=async e=>{
    e.preventDefault();
    const body=input.value.trim();
    if(!body)return;
    input.value='';
    try{
      await addDoc(collection(db,'communityPosts'),{
        uid:auth.currentUser.uid,
        displayName:displayName().slice(0,80),
        channel,
        body:body.slice(0,1000),
        createdAt:serverTimestamp()
      });
    }catch{
      input.value=body; // restore so the member doesn't lose their message
    }
  };
}
