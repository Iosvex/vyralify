// Landing-only: tabbed "Everything Inside" preview. FAQ uses native <details>.
const tabs=[...document.querySelectorAll('[data-tab]')];
const panels=[...document.querySelectorAll('[data-panel]')];
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>{const on=x===t;x.classList.toggle('active',on);x.setAttribute('aria-selected',String(on))});
  panels.forEach(p=>p.classList.toggle('hidden',p.dataset.panel!==t.dataset.tab));
}));
