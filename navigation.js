/* Link HTML statici; JavaScript gestisce soltanto i controlli dell'anteprima. */
const panels=[...document.querySelectorAll('.variant-panel')];
const dataNode=document.getElementById('variant-data');
const metadata=dataNode?JSON.parse(dataNode.textContent):{};
const navArea=document.getElementById('navigation-area');
const mobileButton=document.querySelector('.mobile-toggle');
function closeMenus(except){document.querySelectorAll('.menu-disclosure[open]').forEach(d=>{if(d!==except)d.open=false})}
document.querySelectorAll('.menu-disclosure').forEach(d=>{
 d.addEventListener('toggle',()=>{if(d.open)closeMenus(d)});
 d.querySelector('.close-menu').addEventListener('click',()=>{d.open=false;d.querySelector('summary').focus()});
 d.addEventListener('focusout',()=>{setTimeout(()=>{if(!d.parentElement.contains(document.activeElement))d.open=false},0)});
});
document.querySelectorAll('[data-variant]').forEach(button=>button.addEventListener('click',()=>{
 closeMenus();const key=button.dataset.variant;
 panels.forEach(p=>p.hidden=p.id!=='panel-'+key);
 document.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll('.map-panel').forEach(p=>p.hidden=p.dataset.map!==key);
 document.querySelectorAll('[data-seo]').forEach(p=>p.hidden=p.dataset.seo!==key);
 document.querySelectorAll('[data-cro]').forEach(p=>p.hidden=p.dataset.cro!==key);
 document.getElementById('variant-description').textContent=metadata[key].description;
}));
const showAll=document.getElementById('show-all');
if(showAll)showAll.addEventListener('change',()=>{document.getElementById('all-menus').hidden=!showAll.checked});
if(mobileButton)mobileButton.addEventListener('click',()=>{const open=navArea.classList.toggle('mobile-open');mobileButton.setAttribute('aria-expanded',String(open));mobileButton.setAttribute('aria-label',open?'Chiudi menu principale':'Apri menu principale');if(!open)closeMenus()});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const open=document.querySelector('.menu-disclosure[open]');if(open){open.open=false;open.querySelector('summary').focus()}else if(mobileButton&&navArea.classList.contains('mobile-open')){navArea.classList.remove('mobile-open');mobileButton.setAttribute('aria-expanded','false');mobileButton.setAttribute('aria-label','Apri menu principale');mobileButton.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header')&&!e.target.closest('.variant-panel'))closeMenus()});
matchMedia('(max-width:760px)').addEventListener('change',()=>{closeMenus();if(navArea)navArea.classList.remove('mobile-open');if(mobileButton){mobileButton.setAttribute('aria-expanded','false');mobileButton.setAttribute('aria-label','Apri menu principale')}});

// Su mobile il gruppo si apre su richiesta; su desktop tutte le colonne sono visibili.
function setGroupLayout(){const mobile=matchMedia('(max-width:760px)').matches;document.querySelectorAll('.group-disclosure').forEach(d=>d.open=!mobile)}
setGroupLayout();matchMedia('(max-width:760px)').addEventListener('change',setGroupLayout);
