export async function loadPartials(){for(const [slot,file] of [['nav-slot','/partials/nav.html'],['footer-slot','/partials/footer.html']]){const el=document.getElementById(slot);if(!el)continue;try{const r=await fetch(file);if(!r.ok)throw Error();el.innerHTML=await r.text()}catch{el.innerHTML=''}}}
document.addEventListener('DOMContentLoaded',loadPartials);
