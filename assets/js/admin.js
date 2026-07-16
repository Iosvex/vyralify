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
    if(snap.empty){body.innerHTML='<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">No content assets yet. Add the first lesson above.</td></tr>';return}
    const rows=snap.docs.map(d=>({id:d.id,...d.data()}))
      .sort((a,b)=>(a.category||'').localeCompare(b.category||'')||((a.order||0)-(b.order||0)));
    const countBadge=document.getElementById('assets-count-badge');
    if(countBadge)countBadge.textContent=`${rows.length} assets`;
    body.innerHTML=rows.map(a=>`<tr><td>${esc(a.title)}</td><td>${esc(a.category)}</td><td>${esc(a.type)}</td><td><span class="tier-badge ${esc(a.tierRequired)}">${esc(a.tierRequired)}</span></td><td><button class="btn btn-secondary" data-del="${a.id}" style="padding:0.3rem 0.7rem;font-size:0.75rem;color:var(--danger);border-color:rgba(220,38,38,.3)">Delete</button></td></tr>`).join('');
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
      <td class="mono-col">${esc(u.email)}</td>
      <td>
        <select class="tier-select admin-tier-select ${u.tier==='active'?'active-tier':''}" data-uid="${u.id}">
          <option value="free" ${u.tier==='free'?'selected':''}>Free</option>
          <option value="active" ${u.tier==='active'?'selected':''}>Active</option>
        </select>
      </td>
      <td>${esc(u.country||'—')}</td>
      <td>
        <button class="role-btn ${u.role==='admin'?'revoke-admin':'make-admin'} toggle-admin-role" data-uid="${u.id}" data-role="${u.role||'member'}">
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
    document.getElementById('admin-stat-mrr').textContent=`₹${(active*499).toLocaleString('en-IN')}`;
    const badge=document.getElementById('members-count-badge');
    if(badge)badge.textContent=`${total} total`;
    
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
          <td class="mono-col" style="max-width:140px;overflow:hidden;text-overflow:ellipsis">${esc(g.uid)}</td>
          <td><span class="bento-card-badge">${esc(g.tool)}</span></td>
          <td class="mono-col">${date}</td>
          <td class="mono-col">${g.tokenCount||'—'}</td>
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
