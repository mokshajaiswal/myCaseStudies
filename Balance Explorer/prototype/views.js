/* All views page: every view you can open, as cards or a list, filtered by type, name or code, ten to a page.
   Opened from "All views" in the view switcher and from Views in the sidebar; opening a view returns to the explorer. */
const PER_PAGE=[5,10,20];
const TYPE_OPTIONS=[{value:'all',label:'All'},{value:'mine',label:'Owned by me'},{value:'others',label:'Owned by others'}];
const VIEW_ACTIONS=[{id:'share',label:'Share',icon:'i-share'},{id:'schedule',label:'Schedule',icon:'i-calendar'},{id:'download',label:'Download',icon:'i-download'},{id:'info',label:'View info',icon:'i-info'}];
const blankFilters=()=>({name:null,code:null,type:'all'});
const pageUI={tab:'builtin',layout:(()=>{try{return localStorage.getItem('be-views-layout')||'cards'}catch{return 'cards'}})(),filters:blankFilters(),open:null,query:'',page:1,perPage:10,menu:null};
const daysLabel=days=>days===0?'Today':days===1?'Yesterday':days<31?`${days} days ago`:days<62?'Last month':`${Math.round(days/30)} months ago`;

function showPage(page){const toViews=page==='views';
  $('#explorerPage').hidden=toViews;$('#viewsPage').hidden=!toViews;
  $$('[data-route]').forEach(link=>{const on=link.dataset.route===page;link.classList.toggle('active',on);on?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current')});
  $$('.panel-edge-toggle').forEach(toggle=>{toggle.hidden=toViews});
  if(toViews){pageUI.tab=currentView.builtIn?'builtin':'mine';pageUI.filters=blankFilters();pageUI.open=null;pageUI.page=1;pageUI.menu=null;renderViewsPage();$('#viewsTitle').focus({preventScroll:true})}
  scrollTo({top:0,behavior:prefersStill()?'auto':'smooth'});history.replaceState(null,'',`#${page}`)}

function pageViews(){return views.filter(view=>view.builtIn===(pageUI.tab==='builtin'))}
/* Type narrows first; the Name and Code menus then only offer what's left. */
function typedViews(){const type=pageUI.filters.type;return pageViews().filter(view=>type==='all'||(type==='mine')===(view.owner==='Me'))}
function filteredViews(){const {name,code}=pageUI.filters;return typedViews().filter(view=>(!name||view.name===name)&&(!code||view.code===code))}
const isFiltered=()=>Boolean(pageUI.filters.name||pageUI.filters.code||pageUI.filters.type!=='all');
const pageCount=total=>Math.max(1,Math.ceil(total/pageUI.perPage));
const findView=code=>views.find(view=>view.code===code);

const CHIP_LABELS={name:'Name',code:'Code',type:'Type'};
function chipValue(key){return key==='type'?TYPE_OPTIONS.find(option=>option.value===pageUI.filters.type).label:pageUI.filters[key]||'All'}
function chipHtml(key){const active=key==='type'?pageUI.filters.type!=='all':Boolean(pageUI.filters[key]),open=pageUI.open===key;
  return `<div class="filter-chip-wrap"><button type="button" class="filter-chip ${active?'is-active':''} ${open?'is-open':''}" data-chip="${key}" aria-haspopup="listbox" aria-expanded="${open}">${CHIP_LABELS[key]}: <b>${UI.esc(chipValue(key))}</b>${UI.icon('i-down')}</button>${open?chipMenuHtml(key):''}</div>`}
const optionHtml=({key,value,html,selected,extra=''})=>`<button type="button" class="view-option ${selected?'selected':''}" role="option" aria-selected="${selected}" data-chip-option="${key}" data-value="${UI.esc(value)}"><span class="view-option-name">${html}</span>${extra}${selected?UI.icon('i-check','view-option-check'):''}</button>`;
function chipMenuHtml(key){
  if(key==='type')return `<div class="chip-menu is-short" role="listbox" aria-label="Filter by owner"><div class="chip-options">${TYPE_OPTIONS.map(option=>optionHtml({key,value:option.value,html:UI.esc(option.label),selected:pageUI.filters.type===option.value})).join('')}</div></div>`;
  const query=pageUI.query.trim().toLowerCase(),options=typedViews().filter(view=>!query||(key==='name'?view.name:view.code).toLowerCase().includes(query));
  return `<div class="chip-menu" role="listbox" aria-label="${key==='name'?'Filter by name':'Filter by code'}">${UI.search({attr:'data-chip-search',value:pageUI.query,placeholder:key==='name'?'Search views':'Search codes',extraClass:'chip-search'})}<div class="chip-options">${options.length?options.map(view=>{const text=key==='name'?view.name:view.code;return optionHtml({key,value:text,html:markText(text,pageUI.query.trim()),selected:pageUI.filters[key]===text,extra:key==='name'&&view.isDefault?'<span class="view-tag">Default</span>':''})}).join(''):`<p class="view-empty">No ${key==='name'?'views':'codes'} match.</p>`}</div></div>`}

const moreFor=view=>UI.moreButton({attr:`data-view-menu="${UI.esc(view.code)}"`,label:`More actions for ${view.name}`,open:pageUI.menu===view.code});
/* Card: the name is the button that opens the view; its ::after stretches over the whole card, so the card still
   clicks anywhere while the ⋯ button sits above it as a separate control (a button can't hold another button). */
function cardHtml(view,index){const current=view===currentView;
  return `<article class="view-card ${current?'is-current':''} ${pageUI.menu===view.code?'has-menu':''}" style="--i:${Math.min(index,12)}"><span class="view-card-top"><span class="view-card-icon" aria-hidden="true">${UI.icon(view.icon||'i-file')}</span>${view.isDefault?'<span class="view-tag">Default</span>':''}${current?'<span class="view-card-now">Open now</span>':''}${moreFor(view)}</span><span class="view-card-title"><button type="button" class="view-card-open" data-open-view="${UI.esc(view.code)}" aria-label="Open ${UI.esc(view.name)}${current?' (open now)':''}"><strong class="view-card-name">${UI.esc(view.name)}</strong></button>${view.builtIn?'':UI.sharedMark(view.visibility)}</span><span class="view-card-code">${UI.esc(view.code)}</span><span class="view-card-desc">${UI.esc(view.description||'No description yet.')}</span>${view.owner?`<span class="view-card-meta">${UI.ownerTag(view.owner)}<span>${daysLabel(view.lastOpened)}</span></span>`:`<span class="view-card-meta">${UI.icon('i-clock')}Opened ${daysLabel(view.lastOpened).toLowerCase()}</span>`}</article>`}
function listHtml(list,offset){const mine=pageUI.tab==='mine';
  return `<div class="views-table-wrap"><table class="views-table"><thead><tr><th scope="col">Name</th><th scope="col">Code</th><th scope="col">Description</th>${mine?'<th scope="col">Owner</th>':''}<th scope="col">Last opened</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>${list.map((view,index)=>`<tr class="${view===currentView?'is-current':''} ${pageUI.menu===view.code?'has-menu':''}" style="--i:${Math.min(index,12)}"><td><span class="views-table-name"><button type="button" class="views-table-open" data-open-view="${UI.esc(view.code)}"><span class="view-card-icon" aria-hidden="true">${UI.icon(view.icon||'i-file')}</span><span class="views-table-link">${UI.esc(view.name)}</span></button>${view.builtIn?'':UI.sharedMark(view.visibility)}${view.isDefault?'<span class="view-tag">Default</span>':''}${view===currentView?'<span class="view-card-now">Open now</span>':''}</span></td><td class="views-table-code">${UI.esc(view.code)}</td><td class="views-table-desc">${UI.esc(view.description||'—')}</td>${mine?`<td>${UI.ownerTag(view.owner)}</td>`:''}<td class="views-table-when">${daysLabel(view.lastOpened)}</td><td class="views-table-actions"><span class="row-actions">${UI.iconAction({attr:`data-view-action="share" data-code="${UI.esc(view.code)}"`,symbol:'i-share',label:`Share`})}${UI.iconAction({attr:`data-open-view="${UI.esc(view.code)}"`,symbol:'i-eye',label:'Open view'})}${moreFor(view)}</span></td></tr>`).join('')}</tbody></table></div>`}

/* Pager: page size, the range on show, then first / previous / page / next / last. Shown once a list outgrows five. */
function pagerHtml(total){const pages=pageCount(total),page=pageUI.page,from=(page-1)*pageUI.perPage+1,to=Math.min(page*pageUI.perPage,total);
  const step=(go,label,symbol,disabled,flip=false)=>`<button type="button" class="pager-step ${flip?'is-flipped':''}" data-page-go="${go}" aria-label="${label}" data-tip="${label}" data-tip-pos="top" ${disabled?'disabled':''}>${UI.icon(symbol)}</button>`;
  const menu=(key,options,current,label)=>pageUI.open===key?`<div class="chip-menu is-short pager-menu" role="listbox" aria-label="${label}"><div class="chip-options">${options.map(option=>`<button type="button" class="view-option ${option.value===current?'selected':''}" role="option" aria-selected="${option.value===current}" data-pager-option="${key}" data-value="${option.value}"><span class="view-option-name">${option.label}</span>${option.value===current?UI.icon('i-check','view-option-check'):''}</button>`).join('')}</div></div>`:'';
  return `<nav class="views-pager" aria-label="Pages"><div class="filter-chip-wrap"><button type="button" class="pager-select ${pageUI.open==='per'?'is-open':''}" data-pager="per" aria-haspopup="listbox" aria-expanded="${pageUI.open==='per'}" aria-label="Views per page: ${pageUI.perPage}">${pageUI.perPage} per page${UI.icon('i-down')}</button>${menu('per',PER_PAGE.map(n=>({value:n,label:`${n} per page`})),pageUI.perPage,'Views per page')}</div>
    <span class="pager-range" aria-live="polite">${from}–${to} of ${total}</span>
    <div class="pager-nav">${step('first','First page','i-chevron-end',page===1,true)}${step('prev','Previous page','i-chevron',page===1,true)}<span class="pager-page">Page <span class="filter-chip-wrap"><button type="button" class="pager-select ${pageUI.open==='page'?'is-open':''}" data-pager="page" aria-haspopup="listbox" aria-expanded="${pageUI.open==='page'}" aria-label="Page ${page} of ${pages}" ${pages===1?'disabled':''}>${page}${UI.icon('i-down')}</button>${menu('page',Array.from({length:pages},(_,i)=>({value:i+1,label:`Page ${i+1}`})),page,'Go to page')}</span> of ${pages}</span>${step('next','Next page','i-chevron',page===pages)}${step('last','Last page','i-chevron-end',page===pages)}</div></nav>`}
function renderPager(){const total=filteredViews().length;$('#viewsPager').innerHTML=total>PER_PAGE[0]?pagerHtml(total):''}

function renderViewsBody(){closeRowMenu();const list=filteredViews(),filtered=isFiltered();
  pageUI.page=Math.min(pageUI.page,pageCount(list.length));const offset=(pageUI.page-1)*pageUI.perPage,shown=list.slice(offset,offset+pageUI.perPage);
  $('#viewsCount').textContent=filtered?`${list.length} ${list.length===1?'view matches':'views match'}`:`${list.length} ${list.length===1?'view':'views'}`;
  $('#viewsBody').className=`views-body is-${pageUI.layout}`;
  $('#viewsBody').innerHTML=list.length?(pageUI.layout==='cards'?`<div class="view-cards">${shown.map(cardHtml).join('')}</div>`:listHtml(shown,offset))
    :filtered?`<div class="views-empty">${UI.icon('i-search')}<h3>No views match these filters</h3><p>Try another type, name or code, or reset the filters.</p><button type="button" class="dialog-secondary" data-reset-filters>Reset filters</button></div>`
    :`<div class="views-empty is-blank">${UI.emptyArt()}<h3>No views to show</h3><p>When you save a view, or someone shares one with you, it will show up here.</p><button type="button" class="dialog-secondary" data-go-explorer>Go to the explorer</button></div>`;
  renderPager()}
function renderToolbar(){const keys=pageUI.tab==='mine'?['type','name','code']:['name','code'];
  $('#viewsFilters').innerHTML=`${keys.map(chipHtml).join('')}${isFiltered()?'<button type="button" class="filter-reset" data-reset-filters>Reset</button>':''}`;
  $$('#viewsPage [data-layout]').forEach(button=>{const on=button.dataset.layout===pageUI.layout;button.classList.toggle('is-active',on);button.setAttribute('aria-pressed',String(on))});
  $$('#viewsPage [data-page-tab]').forEach(tab=>{const on=tab.dataset.pageTab===pageUI.tab;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1})}
function renderViewsPage(){
  $('#viewsPage').innerHTML=`<header class="views-head"><h1 id="viewsTitle" tabindex="-1">All views</h1><p>All views created for you, by you, and shared with you by others.</p></header>
    <div class="view-tabs page-tabs" role="tablist" aria-label="View groups"><button type="button" role="tab" data-page-tab="builtin">Out of the box views</button><button type="button" role="tab" data-page-tab="mine">Your views</button></div>
    <div class="views-toolbar"><div class="views-filters" id="viewsFilters"></div><span class="views-count" id="viewsCount" aria-live="polite"></span><div class="layout-toggle" role="group" aria-label="Layout"><button type="button" data-layout="cards" data-tip="Card view" data-tip-pos="top" aria-label="Card view">${UI.icon('i-cards')}</button><button type="button" data-layout="list" data-tip="List view" data-tip-pos="top" aria-label="List view">${UI.icon('i-list')}</button></div></div>
    <div id="viewsBody"></div><div id="viewsPager"></div>`;
  renderToolbar();renderViewsBody()}

/* Moving between pages: the new page fades in where the old one was; if the top of the list has scrolled away, glide back to it. */
function goToPage(page,from){const total=filteredViews().length;pageUI.page=Math.max(1,Math.min(page,pageCount(total)));pageUI.open=null;renderViewsBody();
  const top=$('#viewsPage .views-toolbar').getBoundingClientRect().top;if(top<0)scrollBy({top:top-12,behavior:prefersStill()?'auto':'smooth'});
  const again=from&&$(`#viewsPage [data-page-go="${from}"]:not(:disabled)`);(again||$('#viewsPage [data-pager="page"]'))?.focus({preventScroll:true})}

/* Row and card menu (⋯). It floats over the page (fixed), so the table's scroll box never clips it; it flips up near the bottom. */
function closeRowMenu(refocus=false){const menu=$('#viewRowMenu');if(!menu)return;const code=pageUI.menu;pageUI.menu=null;menu.remove();
  $$('#viewsPage .has-menu').forEach(el=>el.classList.remove('has-menu'));
  const trigger=$(`#viewsPage [data-view-menu="${CSS.escape(code||'')}"]`);if(trigger){trigger.setAttribute('aria-expanded','false');trigger.classList.remove('is-open');if(refocus)trigger.focus({preventScroll:true})}}
function openRowMenu(trigger){const code=trigger.dataset.viewMenu,view=findView(code);closeRowMenu();pageUI.menu=code;
  trigger.setAttribute('aria-expanded','true');trigger.classList.add('is-open');trigger.closest('.view-card,tr')?.classList.add('has-menu');
  $('#viewsPage').insertAdjacentHTML('beforeend',UI.actionMenu({label:`Actions for ${view.name}`,attr:'id="viewRowMenu"',items:VIEW_ACTIONS.map(action=>({...action,attr:`data-view-action="${action.id}" data-code="${UI.esc(code)}"`}))}));
  const menu=$('#viewRowMenu'),rect=trigger.getBoundingClientRect(),height=menu.offsetHeight,width=menu.offsetWidth,up=rect.bottom+6+height>innerHeight-12;
  menu.style.left=`${Math.max(12,Math.min(rect.right-width,innerWidth-width-12))}px`;menu.style.top=`${up?rect.top-6-height:rect.bottom+6}px`;menu.classList.toggle('opens-up',up);
  menu.querySelector('.menu-action').focus({preventScroll:true})}

/* What each action does. Share copies a link that opens this view; private views say who can actually use it. */
const VISIBILITY_TEXT={everyone:{label:'Everyone in the organisation',icon:'i-globe'},team:{label:'The owner’s team',icon:'i-users'},me:{label:'Only the owner',icon:'i-lock'}};
async function runViewAction(id,view,opener){
  if(id==='share'){if(view.visibility==='me'){toast(`Only you can open “${view.name}”. Change who can see it before you share it.`,'warn',{title:'Not shared yet',action:{label:'Edit visibility',run:()=>openViewDetailsDialog(view,{opener,focus:'visibility'})}});return}
    try{await navigator.clipboard.writeText(viewLink(view))}catch{toast('Copying links is unavailable in this browser.','warn');return}
    toast(`Anyone who can see “${view.name}” can open it from this link.`,'success',{title:'Link copied'});return}
  if(id==='schedule'){toast(`Scheduling “${view.name}” is outside this screen prototype.`);return}
  if(id==='download'){downloadCsv(view.name);return}
  if(id==='info')ownsView(view)?openViewDetailsDialog(view,{opener}):openViewInfo(view,opener)}

/* View info: everything about a view in one place, read-only, with a way straight into it. */
function openViewInfo(view,opener){const layer=document.createElement('div'),seen=VISIBILITY_TEXT[view.visibility]||VISIBILITY_TEXT.everyone;layer.className='dialog-layer';
  layer.innerHTML=`<div class="dialog form-dialog info-dialog" role="dialog" aria-modal="true" aria-labelledby="viewInfoTitle">
    <header class="form-dialog-head"><h2 id="viewInfoTitle">View info</h2><button type="button" class="form-dialog-close" data-cancel aria-label="Close">${UI.icon('i-close')}</button></header>
    <div class="form-dialog-body"><div class="info-title"><span class="view-card-icon" aria-hidden="true">${UI.icon(view.icon||'i-file')}</span><strong>${UI.esc(view.name)}</strong>${view.isDefault?'<span class="view-tag">Default</span>':''}</div>
      <dl class="info-list"><div><dt>Code</dt><dd class="views-table-code">${UI.esc(view.code)}</dd></div><div><dt>Description</dt><dd>${UI.esc(view.description||'No description yet.')}</dd></div><div><dt>Owner</dt><dd>${view.builtIn?'Zeta (out of the box)':UI.ownerTag(view.owner)}</dd></div><div><dt>Who can see it</dt><dd class="info-seen">${UI.icon(view.builtIn?'i-globe':seen.icon)}${view.builtIn?'Everyone in the organisation':seen.label}</dd></div><div><dt>Last opened</dt><dd>${daysLabel(view.lastOpened)}</dd></div></dl></div>
    <footer class="form-dialog-foot"><button type="button" class="ds-primary-action" data-open-info>Open view</button><button type="button" class="dialog-secondary" data-cancel>Close</button></footer></div>`;
  document.body.append(layer);const behind=setBehindInert(layer,true);requestAnimationFrame(()=>layer.classList.add('is-open'));layer.querySelector('[data-open-info]').focus();
  const close=(refocus=true)=>{document.removeEventListener('keydown',onKey,true);layer.classList.remove('is-open');layer.classList.add('is-closing');setBehindInert(layer,false,behind);setTimeout(()=>layer.remove(),prefersStill()?0:180);if(refocus)(opener?.isConnected?opener:$('#viewsTitle'))?.focus({preventScroll:true})};
  const onKey=event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close()}if(event.key==='Tab'){const items=[...layer.querySelectorAll('button')],at=items.indexOf(document.activeElement);event.preventDefault();items[(at+(event.shiftKey?-1:1)+items.length)%items.length].focus()}};
  document.addEventListener('keydown',onKey,true);
  layer.addEventListener('click',event=>{if(event.target.closest('[data-open-info]')){close(false);openFromPage(view.code);return}if(event.target.closest('[data-cancel]')||!event.target.closest('.dialog'))close()})}

/* Opening a view from here: same guard as the switcher, then straight back to the explorer showing it. */
async function openFromPage(code){const view=findView(code);if(!view)return;
  if(view!==currentView&&$('.viewbar').classList.contains('is-dirty')&&!await confirmDialog({title:'You have unsaved changes',body:`Opening “${view.name}” will lose the changes you made to “${currentView.name}”.`,confirmLabel:'Open anyway',cancelLabel:'Stay here',safePrimary:true}))return;
  const changed=view!==currentView;setCurrentView(view);if(changed){savedView=snapshotView();updateDirty()}showPage('explorer');$('#viewSelect').focus({preventScroll:true});if(changed)toast(`Showing “${view.name}”.`,'info')}

$('#viewsPage').addEventListener('click',event=>{
  const action=event.target.closest('[data-view-action]');if(action){const view=findView(action.dataset.code),trigger=$(`#viewsPage [data-view-menu="${CSS.escape(action.dataset.code)}"]`);const fromMenu=Boolean(action.closest('#viewRowMenu'));closeRowMenu(fromMenu);runViewAction(action.dataset.viewAction,view,fromMenu?trigger:action);return}
  const more=event.target.closest('[data-view-menu]');if(more){pageUI.menu===more.dataset.viewMenu?closeRowMenu(true):openRowMenu(more);return}
  const tab=event.target.closest('[data-page-tab]');if(tab){pageUI.tab=tab.dataset.pageTab;pageUI.filters=blankFilters();pageUI.open=null;pageUI.page=1;renderToolbar();renderViewsBody();return}
  const chip=event.target.closest('[data-chip]');if(chip){const key=chip.dataset.chip;pageUI.open=pageUI.open===key?null:key;pageUI.query='';renderToolbar();renderPager();if(pageUI.open)($('#viewsPage [data-chip-search]')||$('#viewsPage .chip-menu .view-option.selected'))?.focus();return}
  const option=event.target.closest('[data-chip-option]');if(option){const key=option.dataset.chipOption;pageUI.filters[key]=option.dataset.value;
    if(key==='type'){const left=typedViews();if(!left.some(view=>view.name===pageUI.filters.name))pageUI.filters.name=null;if(!left.some(view=>view.code===pageUI.filters.code))pageUI.filters.code=null}
    pageUI.open=null;pageUI.page=1;renderToolbar();renderViewsBody();$(`#viewsPage [data-chip="${key}"]`)?.focus();return}
  if(event.target.closest('[data-go-explorer]')){showPage('explorer');$('#viewSelect').focus({preventScroll:true});return}
  if(event.target.closest('[data-reset-filters]')){pageUI.filters=blankFilters();pageUI.open=null;pageUI.page=1;renderToolbar();renderViewsBody();$('#viewsPage [data-chip]')?.focus();return}
  const layout=event.target.closest('[data-layout]');if(layout&&layout.dataset.layout!==pageUI.layout){pageUI.layout=layout.dataset.layout;try{localStorage.setItem('be-views-layout',pageUI.layout)}catch{}renderToolbar();renderViewsBody();return}
  const pager=event.target.closest('[data-pager]');if(pager){const key=pager.dataset.pager;pageUI.open=pageUI.open===key?null:key;renderToolbar();renderPager();$(pageUI.open?`#viewsPage .pager-menu .view-option.selected`:`#viewsPage [data-pager="${key}"]`)?.focus();return}
  const pick=event.target.closest('[data-pager-option]');if(pick){const value=Number(pick.dataset.value);if(pick.dataset.pagerOption==='per'){const first=(pageUI.page-1)*pageUI.perPage;pageUI.perPage=value;pageUI.open=null;renderToolbar();goToPage(Math.floor(first/value)+1);$('#viewsPage [data-pager="per"]')?.focus()}else goToPage(value);return}
  const go=event.target.closest('[data-page-go]');if(go){const total=filteredViews().length,to={first:1,prev:pageUI.page-1,next:pageUI.page+1,last:pageCount(total)}[go.dataset.pageGo];goToPage(to,go.dataset.pageGo);return}
  const open=event.target.closest('[data-open-view]');if(open)openFromPage(open.dataset.openView);
});
$('#viewsPage').addEventListener('input',event=>{if(!event.target.matches('[data-chip-search]'))return;pageUI.query=event.target.value;const key=pageUI.open;$(`#viewsPage .chip-menu`).outerHTML=chipMenuHtml(key);const field=$('#viewsPage [data-chip-search]');field.focus();field.setSelectionRange(field.value.length,field.value.length)});
$('#viewsPage').addEventListener('keydown',event=>{
  if(event.target.closest('#viewRowMenu')){const items=[...$$('#viewRowMenu .menu-action')],at=items.indexOf(document.activeElement);
    if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();const next={ArrowDown:(at+1)%items.length,ArrowUp:(at-1+items.length)%items.length,Home:0,End:items.length-1}[event.key];items[next].focus();return}
    if(event.key==='Escape'){event.preventDefault();closeRowMenu(true);return}if(event.key==='Tab'){closeRowMenu(true);return}}
  if(event.key==='Escape'&&pageUI.open){const key=pageUI.open;pageUI.open=null;renderToolbar();renderPager();$(`#viewsPage [data-chip="${key}"],#viewsPage [data-pager="${key}"]`)?.focus();return}
  if(event.target.closest('.chip-menu')&&['ArrowDown','ArrowUp'].includes(event.key)){const items=[...$$('#viewsPage .chip-menu .view-option')];if(!items.length)return;event.preventDefault();const at=items.indexOf(document.activeElement);items[at<0?0:(at+(event.key==='ArrowDown'?1:-1)+items.length)%items.length].focus();return}
  if(event.target.closest('[data-page-tab]')&&['ArrowLeft','ArrowRight'].includes(event.key)){const next=$$('#viewsPage [data-page-tab]').find(tab=>tab!==event.target.closest('[data-page-tab]'));next.click();next.focus()}
});
document.addEventListener('mousedown',event=>{
  if(pageUI.open&&!event.target.closest('.filter-chip-wrap')){pageUI.open=null;renderToolbar();renderPager()}
  if(pageUI.menu&&!event.target.closest('#viewRowMenu,[data-view-menu]'))closeRowMenu()});
addEventListener('scroll',()=>{if(pageUI.menu)closeRowMenu()},{capture:true,passive:true});addEventListener('resize',()=>{if(pageUI.menu)closeRowMenu()});
$$('[data-route]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showPage(link.dataset.route);$('#sidebar').classList.remove('open')}));
window.refreshViewsPage=()=>{if(!$('#viewsPage').hidden){renderToolbar();renderViewsBody()}};
/* ?simulate=no-views: an empty library, to see the empty state. */
if(new URLSearchParams(location.search).get('simulate')==='no-views')for(let i=views.length-1;i>=0;i--)if(!views[i].builtIn&&views[i]!==currentView)views.splice(i,1);
/* A shared link (#view=CODE) opens straight into that view. */
const linkedView=(location.hash.match(/^#view=([A-Z0-9]+)$/)||[])[1];
if(linkedView&&findView(linkedView)){setCurrentView(findView(linkedView));savedView=snapshotView();updateDirty();history.replaceState(null,'','#explorer')}
if(location.hash==='#views')showPage('views');
