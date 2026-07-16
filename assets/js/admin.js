// Admin console — manage contentAssets and view members.
// Writes are permitted only for admins by firestore.rules (isAdmin()); the page
// is also guarded by auth-guard.js (data-admin="true").
import {db} from './firebase-config.js';
import {profileReady} from './auth-guard.js';
import {collection,getDocs,addDoc,deleteDoc,doc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function loadAssets(){
  const body=document.querySelector('#admin-assets');
  try{
    const snap=await getDocs(collection(db,'contentAssets'));
    if(snap.empty){body.innerHTML='<tr><td colspan="5">No content assets yet. Add the first lesson above.</td></tr>';return}
    const rows=snap.docs.map(d=>({id:d.id,...d.data()}))
      .sort((a,b)=>(a.category||'').localeCompare(b.category||'')||((a.order||0)-(b.order||0)));
    body.innerHTML=rows.map(a=>`<tr><td>${esc(a.title)}</td><td>${esc(a.category)}</td><td>${esc(a.type)}</td><td>${esc(a.tierRequired)}</td><td><button class="btn btn-secondary" data-del="${a.id}">Delete</button></td></tr>`).join('');
    body.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{
      if(!confirm('Delete this content asset?'))return;
      await deleteDoc(doc(db,'contentAssets',b.dataset.del));
      loadAssets();
    });
  }catch{body.innerHTML='<tr><td colspan="5">Could not load content assets.</td></tr>'}
}

async function loadUsers(){
  const body=document.querySelector('#admin-users');
  try{
    const snap=await getDocs(collection(db,'users'));
    body.innerHTML=snap.docs.map(d=>{const u=d.data();return `<tr><td>${esc(u.displayName||'—')}</td><td>${esc(u.email)}</td><td>${esc(u.tier)}</td><td>${esc(u.country||'—')}</td></tr>`}).join('')||'<tr><td colspan="4">No members yet.</td></tr>';
  }catch{body.innerHTML='<tr><td colspan="4">Could not load members.</td></tr>'}
}

(async()=>{
  await profileReady; // also ensures the visitor is an admin (auth-guard redirects otherwise)
  const form=document.querySelector('#admin-asset-form');
  const status=document.querySelector('#admin-status');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.textContent='';
    const f=new FormData(form);
    try{
      await addDoc(collection(db,'contentAssets'),{
        title:String(f.get('title')||'').trim(),
        category:f.get('category'),
        type:f.get('type'),
        tierRequired:f.get('tierRequired'),
        order:Number(f.get('order'))||0,
        url:String(f.get('url')||'').trim(),
        body:String(f.get('body')||'').trim(),
        createdAt:serverTimestamp(),
        updatedAt:serverTimestamp()
      });
      form.reset();
      status.textContent='Content asset published.';
      loadAssets();
    }catch{status.textContent='Could not save. Check your admin access and try again.'}
  });
  loadAssets();
  loadUsers();
})();
