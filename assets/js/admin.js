// Admin console — manage contentAssets and view members.
// Writes are permitted only for admins by firestore.rules (isAdmin()); the page
// is also guarded by auth-guard.js (data-admin="true").
import {db} from './firebase-config.js';
import {profileReady} from './auth-guard.js';
import {collection,getDocs,addDoc,deleteDoc,updateDoc,doc,serverTimestamp,query,orderBy,limit} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

let usersCache=[];
let aiLogCache=[];

async function loadAssets(){
  const body=document.querySelector('#admin-assets');
  try{
    const snap=await getDocs(collection(db,'contentAssets'));
    if(snap.empty){body.innerHTML='<tr><td colspan="5">No content assets yet. Add the first lesson above.</td></tr>';return}
    const rows=snap.docs.map(d=>({id:d.id,...d.data()}))
      .sort((a,b)=>(a.category||'').localeCompare(b.category||'')||((a.order||0)-(b.order||0)));
    body.innerHTML=rows.map(a=>`<tr><td>${esc(a.title)}</td><td>${esc(a.category)}</td><td>${esc(a.type)}</td><td>${esc(a.tierRequired)}</td><td><button class="btn btn-secondary" data-del="${a.id}" style="padding:0.3rem 0.6rem;font-size:0.75rem">Delete</button></td></tr>`).join('');
    body.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{
      if(!confirm('Delete this content asset?'))return;
      await deleteDoc(doc(db,'contentAssets',b.dataset.del));
      loadAssets();
    });
  }catch(err){
    console.error(err);
    body.innerHTML='<tr><td colspan="5">Could not load content assets.</td></tr>';
  }
}

function renderUsersList(filteredUsers){
  const body=document.querySelector('#admin-users');
  if(!filteredUsers.length){
    body.innerHTML='<tr><td colspan="5">No matching members found.</td></tr>';
    return;
  }
  
  body.innerHTML=filteredUsers.map(u=>`
    <tr>
      <td>${esc(u.displayName||'—')}</td>
      <td>${esc(u.email)}</td>
      <td>
        <select class="admin-tier-select" data-uid="${u.id}" style="padding:0.2rem 0.5rem;border-radius:6px;border:1px solid var(--line);font-size:0.8rem">
          <option value="free" ${u.tier==='free'?'selected':''}>Free</option>
          <option value="active" ${u.tier==='active'?'selected':''}>Active</option>
        </select>
      </td>
      <td>${esc(u.country||'—')}</td>
      <td>
        <button class="btn btn-secondary toggle-admin-role" data-uid="${u.id}" data-role="${u.role||'member'}" style="padding:0.2rem 0.5rem;font-size:0.75rem">
          ${u.role==='admin'?'Revoke Admin':'Make Admin'}
        </button>
      </td>
    </tr>
  `).join('');
  
  // Bind change handlers for Tier Selects
  body.querySelectorAll('.admin-tier-select').forEach(sel=>{
    sel.onchange=async(e)=>{
      const uid=sel.dataset.uid;
      const nextTier=e.target.value;
      try{
        await updateDoc(doc(db,'users',uid),{
          tier:nextTier,
          subscriptionStatus:nextTier==='active'?'active':'none',
          updatedAt:serverTimestamp()
        });
        // Reload stats and users
        loadUsers();
      }catch{
        alert('Could not update member tier. Ensure you have admin access.');
        loadUsers();
      }
    };
  });

  // Bind role toggles
  body.querySelectorAll('.toggle-admin-role').forEach(btn=>{
    btn.onclick=async()=>{
      const uid=btn.dataset.uid;
      const currentRole=btn.dataset.role;
      const nextRole=currentRole==='admin'?'member':'admin';
      if(!confirm(`Are you sure you want to change this user role to ${nextRole}?`))return;
      try{
        await updateDoc(doc(db,'users',uid),{
          role:nextRole,
          updatedAt:serverTimestamp()
        });
        loadUsers();
      }catch{
        alert('Could not update user role. Ensure you have admin access.');
        loadUsers();
      }
    };
  });
}

async function loadUsers(){
  try{
    const snap=await getDocs(collection(db,'users'));
    usersCache=snap.docs.map(d=>({id:d.id,...d.data()}));
    
    // Update Stats Bar
    const total=usersCache.length;
    const active=usersCache.filter(u=>u.tier==='active').length;
    const pct=total>0?Math.round((active/total)*100):0;
    
    document.getElementById('admin-stat-total').textContent=total;
    document.getElementById('admin-stat-active').textContent=active;
    document.getElementById('admin-stat-active-pct').textContent=`${pct}% conversion`;
    document.getElementById('admin-stat-mrr').textContent=`₹${active*499}`;
    
    // Filter and render list
    const searchVal=document.getElementById('admin-user-search')?.value?.trim()?.toLowerCase()||'';
    const filtered=usersCache.filter(u=>
      String(u.displayName||'').toLowerCase().includes(searchVal)||
      String(u.email||'').toLowerCase().includes(searchVal)
    );
    renderUsersList(filtered);
  }catch(err){
    console.error(err);
    document.querySelector('#admin-users').innerHTML='<tr><td colspan="5">Could not load members.</td></tr>';
  }
}

async function loadAiLog(){
  const body=document.querySelector('#admin-ai-log');
  try{
    const qSnap=await getDocs(query(collection(db,'aiGenerations'),orderBy('timestamp','desc'),limit(20)));
    aiLogCache=qSnap.docs.map(d=>d.data());
    
    const allGenerationsSnap=await getDocs(collection(db,'aiGenerations'));
    document.getElementById('admin-stat-ai').textContent=allGenerationsSnap.size;
    
    if(qSnap.empty){
      body.innerHTML='<tr><td colspan="4">No AI generation activity logged yet.</td></tr>';
      return;
    }
    
    body.innerHTML=aiLogCache.map(g=>{
      const date=g.timestamp?.toDate ? g.timestamp.toDate().toLocaleString() : '—';
      return `
        <tr>
          <td><code style="font-size:0.75rem">${esc(g.uid)}</code></td>
          <td><span class="eyebrow" style="margin:0">${esc(g.tool)}</span></td>
          <td>${date}</td>
          <td>${g.tokenCount||'—'} tokens</td>
        </tr>
      `;
    }).join('');
  }catch(err){
    console.error(err);
    body.innerHTML='<tr><td colspan="4">Could not load AI activity log. Check indexing.</td></tr>';
  }
}

(async()=>{
  await profileReady; // redirects non-admins
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

  // Wire search input
  document.getElementById('admin-user-search')?.addEventListener('input',(e)=>{
    const val=e.target.value.toLowerCase();
    const filtered=usersCache.filter(u=>
      String(u.displayName||'').toLowerCase().includes(val)||
      String(u.email||'').toLowerCase().includes(val)
    );
    renderUsersList(filtered);
  });

  loadAssets();
  loadUsers();
  loadAiLog();
})();
