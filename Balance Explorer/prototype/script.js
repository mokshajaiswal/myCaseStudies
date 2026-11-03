const accounts = [
  {id:'assets',name:'Assets',type:'group',values:[56000,43876,76987,42999],children:[
    {id:'revolving',name:'Revolving Credit',type:'node',values:[10000,7000,12000,10000],children:[
      {id:'credit-main',name:'Credit Card',type:'node',values:[12000,8500,20000,7000],children:[
        {id:'platinum',name:'Platinum Credit Card',type:'account',values:[8000,5376,15000,8999],children:[
          {id:'principal',name:'Retail Principal Billed',type:'attribute',values:[2500,2000,4000,2000]},
          {id:'principal-unbilled',name:'Retail Principal Unbilled',type:'attribute',group:'categories',values:[1900,1650,2800,2300]},
          {id:'interest',name:'Retail Interest Billed',type:'attribute',values:[1800,3000,5000,3000]},
          {id:'annual-fee-billed',name:'Annual Fee Billed',type:'attribute',group:'categories',values:[600,540,820,700]},
          {id:'merchant-fee',name:'Merchant Service Fee',type:'attribute',group:'categories',values:[720,640,980,810]},
          {id:'card-settlement',name:'Card Settlement',type:'attribute',group:'categories',values:[1600,1490,2200,1940]},
          {id:'annual-fee',name:'Annual Fee Unbilled',type:'attribute',group:'categories',values:[1100,950,1300,1020]},
          {id:'late-fee',name:'Late Fee Billed',type:'attribute',group:'categories',values:[450,525,610,580]},
          {id:'cash-place-hold',name:'card_cash_place_hold',type:'attribute',group:'vouchers',values:[1100,940,1500,1260]},
          {id:'cash-hold',name:'card_cash_update_hold',type:'attribute',group:'vouchers',values:[900,720,1400,1110]},
          {id:'cash-clearance',name:'card_cash_clearance_against_hold',type:'attribute',group:'vouchers',values:[860,680,1200,990]},
          {id:'cash-refund',name:'card_cash_clearance_refund',type:'attribute',group:'vouchers',values:[320,410,450,380]},
          {id:'purchase-hold',name:'card_purchase_place_hold',type:'attribute',group:'vouchers',values:[1400,1180,1900,1650]},
          {id:'purchase-update-hold',name:'card_purchase_update_hold',type:'attribute',group:'vouchers',values:[760,690,1050,940]},
          {id:'pc-active-hold',name:'active-hold',type:'attribute',group:'posting',values:[1500, 1500, 3000, 2500]},
          {id:'pc-place-hold',name:'place-hold',type:'attribute',group:'posting',values:[1200, 980, 2000, 1620]},
          {id:'pc-release-hold',name:'release-hold',type:'attribute',group:'posting',values:[640, 720, 900, 810]},
          {id:'pc-add-ledger-attachment',name:'add_ledger_attachment',type:'attribute',group:'posting',values:[210, 180, 260, 240]},
          {id:'pc-delete-ledger-attachment',name:'delete-ledger-attachment',type:'attribute',group:'posting',values:[90, 120, 140, 110]},
          {id:'pc-update-ledger-attachment',name:'update-ledger-attachment',type:'attribute',group:'posting',values:[150, 160, 230, 190]},
          {id:'pc-update',name:'update',type:'attribute',group:'posting',values:[880, 940, 1100, 1020]},
          {id:'pc-settle',name:'settle',type:'attribute',group:'posting',values:[2100, 1950, 2600, 2380]},
          {id:'pc-reverse',name:'reverse',type:'attribute',group:'posting',values:[310, 260, 420, 350]},
          {id:'pc-write-off',name:'write-off',type:'attribute',group:'posting',values:[120, 90, 180, 150]},
          {id:'balance-current',name:'Current balance',type:'attribute',group:'balance',values:[4200,3900,5100,4650]},
          {id:'balance-pending',name:'Pending balance',type:'attribute',group:'balance',values:[300,460,510,625]}
        ]},
        {id:'gold',name:'Gold Credit Card',type:'account',values:[9000,6200,9987,6000]}
      ]},
      {id:'credit-other',name:'Credit Card',type:'node',values:[7000,7300,10000,5000]}
    ]},
    {id:'receivables',name:'Receivables',type:'node',values:[10000,10500,10000,6000]}
  ]},
  {id:'income',name:'Income',type:'group',values:[36876,65000,56000,65977],children:[
    {id:'interest-income',name:'Interest income',type:'node',values:[24100,42500,38200,43450]},
    {id:'fee-income',name:'Fee income',type:'node',values:[12776,22500,17800,22527]}
  ]},
  {id:'expenses',name:'Expense',type:'group',values:[67877,32000,54876,10000],children:[
    {id:'operating-expense',name:'Operating expense',type:'node',values:[35500,18000,31200,6200]},
    {id:'interest-expense',name:'Interest expense',type:'node',values:[32377,14000,23676,3800]}
  ]},
  {id:'liabilities',name:'Liability',type:'group',values:[65768,24000,23987,54876],children:[
    {id:'deposits',name:'Deposits',type:'node',values:[41800,16000,15300,36000]},
    {id:'borrowings',name:'Borrowings',type:'node',values:[23968,8000,8687,18876]}
  ]}
];
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const format=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
function displayValue(node,index){
  const base=node.values[index],{clock,cycle,period}=state.settings;
  if(clock==='Book'&&cycle==='monthly'&&period==='p1,p2')return base;
  const ids=period.split(',').map(id=>Number(id.slice(1))||1);
  const window=ids[Math.floor(index/2)]||1;
  const sourceShift=clock==='Value date'?(index%2===0?-0.031:0.024):0;
  const cycleShift={daily:-0.012,weekly:0.018,monthly:0,quarterly:0.043,yearly:0.067}[cycle]||0;
  const windowShift=(window-(Math.floor(index/2)+1))*0.027;
  const accountShift=(node.id.split('').reduce((sum,char)=>sum+char.charCodeAt(0),0)%7-3)*0.002;
  return Math.round(base*(1+sourceShift+cycleShift+windowShift+accountShift)*100)/100;
}
const state={expanded:new Set(['assets','revolving','credit-main','platinum']),filter:'all',settings:{clock:'Book',cycle:'monthly',period:'p1,p2'}};
function rowVisible(node){return window.rowsModel?.isVisible(node)??true}
function visibleRoots(){const roots=state.filter==='all'?accounts:accounts.filter(account=>account.id===state.filter);return roots.filter(rowVisible)}
function expandableIds(nodes=accounts){return nodes.flatMap(node=>{const children=(node.children||[]).filter(rowVisible);return children.length?[node.id,...expandableIds(children)]:[]})}
/* Each account group carries its own icon and tone through the hierarchy. */
const groupIcon=node=>node.type==='group'?UI.acctIcon(node.id):'';
function nodeRow(node,depth,tone=node.type==='group'?node.id:''){
  if(!rowVisible(node))return '';
  const children=(node.children||[]).filter(rowVisible);
  const hasChildren=Boolean(children.length),expanded=state.expanded.has(node.id);
  const onlyAttributes=hasChildren&&children.every(child=>child.type==='attribute');
  const attrGroup=node.type==='attribute'&&window.rowsModel?groupForAttribute(node):'',attrKind={categories:'Posting category',vouchers:'Voucher code',posting:'Posting code',balance:'Balance code'}[attrGroup],attrIcon=attrGroup?`<span class="attr-icon-wrap" role="img" aria-label="${attrKind}" data-tip="${attrKind}" data-tip-pos="top"><svg class="attr-icon rows-symbol-${attrGroup}" aria-hidden="true"><use href="#${rowGroups[attrGroup].symbol}"/></svg></span>`:'';
  const label=onlyAttributes?`<div class="row-label"><span class="row-chevron-spacer"></span><span>${node.name}</span><button type="button" class="attr-toggle ${expanded?'is-on':''}" data-row="${node.id}" aria-pressed="${expanded}" aria-label="${expanded?'Hide':'Show'} attributes for ${node.name}" data-tip="${expanded?'Hide attributes':'Show attributes'}" data-tip-pos="top">${UI.icon(expanded?'i-eye-off':'i-stack')}</button></div>`:hasChildren?`<button class="row-toggle" data-row="${node.id}" aria-expanded="${expanded}" aria-label="${expanded?'Collapse':'Expand'} ${node.name}"><svg class="row-chevron"><use href="#i-chevron"/></svg>${groupIcon(node)}<span>${node.name}</span></button>`:`<div class="row-label"><span class="row-chevron-spacer"></span>${groupIcon(node)}${attrIcon}<span>${node.name}</span></div>`;
  const first=`<td class="account-cell"><div class="account-indent" style="--depth:${depth}">${node.type==='group'?`<span class="account-type-dot ${node.id}" aria-hidden="true"></span>`:''}${node.type==='attribute'?'<span class="attribute-dot" aria-hidden="true"></span>':''}${label}</div></td>`;
  const values=['one','two'].map((period,p)=>tableColumns().map((column,c)=>{const value=columnValue(node,p,column.id);return `<td class="amount ${p===1&&c===0?'period-start':''}" data-value="${value}" data-period="${period}" data-metric="${column.id}" data-kind="${column.kind||'money'}">${formatCell(value,column.kind)}</td>`}).join('')).join('');
  const row=`<tr data-account="${node.id}" ${tone?`data-tone="${tone}"`:''} class="account-row kind-${node.type} ${node.group==='vouchers'||node.group==='posting'?'is-code':''} ${node.type==='account'&&expanded?'expanded-account':''} ${onlyAttributes?'has-attributes':''} ${node.type==='group'&&expanded?'is-open':''}">${first}${values}</tr>`;
  if(!hasChildren||!expanded)return row;
  return row+children.map(child=>nodeRow(child,depth+1,tone)).join('');
}
/* Columns come from the Columns tab: balance codes, then posting classes, repeated for each period. */
const tableColumns=()=>window.rowsModel?.columns()||[{id:'opening',label:'Opening balance'},{id:'closing',label:'Closing balance'}];
const round2=value=>Math.round(value*100)/100;
/* A column id is a measure, optionally with an aggregation: "debit" or "debit@max". Counts are whole numbers, not rupees. */
function columnValue(node,period,metric){const [base,agg]=metric.split('@'),open=displayValue(node,period*2),close=displayValue(node,period*2+1);
  const debit=open*0.18+Math.max(close-open,0),credit=open*0.18+Math.max(open-close,0);
  const raw={opening:open,closing:close,average:(open+close)/2,debit,credit,net:close-open,'debit-count':Math.max(1,debit/420),'credit-count':Math.max(1,credit/460),current:close,available:close*0.92,pending:Math.abs(close-open)*0.15,bc1:(Math.max(1,debit/420)+Math.max(1,credit/460))/2,bc2:open+debit-credit,bc3:(open+close)/2,bc4:close-open}[base]??0;
  const value=raw*({min:0.84,max:1.17,average:0.99}[agg]||1);
  return base.endsWith('-count')||base==='bc1'?Math.round(value):round2(value)}
const formatCell=(value,kind)=>kind==='count'?Math.round(value).toLocaleString('en-IN'):format(value);
function applyColumnVisibility(){
  const columns=tableColumns();
  $$('.balance-table [data-period-header]').forEach(header=>{header.colSpan=columns.length});
  $('.balance-table .metric-row').innerHTML=['one','two'].map((period,p)=>columns.map((column,c)=>`<th scope="col" class="${p===1&&c===0?'period-start':''}" data-metric="${column.id}" data-period="${period}">${column.label}</th>`).join('')).join('');
  $('.balance-table').style.minWidth=`${Math.max(680,320+2*columns.length*168)}px`;
}

function renderTable(){
  const roots=visibleRoots();$('#balanceRows').innerHTML=roots.map(node=>nodeRow(node,0)).join('');applyColumnVisibility();
  const ids=expandableIds(roots),allExpanded=ids.every(id=>state.expanded.has(id));
  $('#expandAll').innerHTML=`${allExpanded?'Collapse all':'Expand all'} <svg class="${allExpanded?'is-up':''}"><use href="#i-down"/></svg>`;
  $('#expandAll').disabled=!ids.length;
  const columns=tableColumns().length;
  $('#tableContext').textContent=`${roots.length} account ${roots.length===1?'group':'groups'} · 2 periods · ${columns} ${columns===1?'column':'columns'}`;
  $('#clearFilter').hidden=state.filter==='all';$('#clearFilter span').textContent=state.filter==='all'?'':$('#filterType').selectedOptions[0].textContent;
  $('#visibleCount').textContent=`${roots.length} account ${roots.length===1?'group':'groups'}`;
}
let toastTimer,numberAnimation=0;
/* Toast: says what just happened. Success is green, info blue, a warning amber; those leave on their own (the bar shows time left, hover pauses it).
   An error is pink, carries a title, a reason and a way out (Retry), and stays until dismissed or acted on. */
function toast(message,kind='info',{title='',action=null}={}){const el=$('#toast'),sticky=kind==='error',duration=kind==='warn'?5200:3600;el.classList.remove('show');el.dataset.kind=kind;el.style.setProperty('--toast-time',`${duration}ms`);el.setAttribute('role',sticky?'alert':'status');
  el.innerHTML=`<span class="toast-icon" aria-hidden="true">${UI.icon(kind==='success'?'i-check':kind==='error'?'i-alert':'i-info')}</span><span class="toast-body">${title?`<strong class="toast-title"></strong>`:''}<span class="toast-copy"></span>${action?`<button type="button" class="toast-action"></button>`:''}</span><button type="button" class="toast-close" aria-label="Dismiss">${UI.icon('i-close')}</button><span class="toast-timer" aria-hidden="true"></span>`;
  el.querySelector('.toast-copy').textContent=message;if(title)el.querySelector('.toast-title').textContent=title;
  const hide=()=>{clearTimeout(toastTimer);el.classList.remove('show')};el.querySelector('.toast-close').addEventListener('click',hide);
  if(action){const button=el.querySelector('.toast-action');button.textContent=action.label;button.addEventListener('click',()=>{hide();action.run()})}
  clearTimeout(toastTimer);requestAnimationFrame(()=>requestAnimationFrame(()=>{el.classList.add('show');if(action)el.querySelector('.toast-action').focus({preventScroll:true})}));
  el.onmouseenter=el.onmouseleave=null;if(sticky)return;toastTimer=setTimeout(hide,duration);
  el.onmouseenter=()=>{clearTimeout(toastTimer);el.classList.add('is-paused')};el.onmouseleave=()=>{el.classList.remove('is-paused');toastTimer=setTimeout(hide,1600)}}
function captureValues(){return new Map($$('#balanceRows tr[data-account]').flatMap(row=>[...row.querySelectorAll('td.amount')].map(cell=>[`${row.dataset.account}:${cell.dataset.period}:${cell.dataset.metric}`,Number(cell.dataset.value)])))}
function animateChangedValues(previous){
  const cells=$$('#balanceRows tr[data-account]');const token=++numberAnimation;
  const changes=cells.flatMap((row,rowIndex)=>[...row.querySelectorAll('td.amount')].map(cell=>({cell,rowIndex,old:previous.get(`${row.dataset.account}:${cell.dataset.period}:${cell.dataset.metric}`),next:Number(cell.dataset.value)}))).filter(item=>Number.isFinite(item.old)&&item.old!==item.next);
  if(!changes.length)return;
  changes.forEach(({cell})=>{cell.classList.remove('value-changed');void cell.offsetWidth;cell.classList.add('value-changed')});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const start=performance.now(),duration=620;
  function frame(now){if(token!==numberAnimation)return;const progress=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-progress,3);changes.forEach(({cell,old,next,rowIndex})=>{const local=Math.max(0,Math.min(1,(eased-rowIndex*0.012)/(1-rowIndex*0.012)));cell.textContent=formatCell(old+(next-old)*local,cell.dataset.kind)});if(progress<1)requestAnimationFrame(frame);else changes.forEach(({cell,next})=>cell.textContent=formatCell(next,cell.dataset.kind))}
  requestAnimationFrame(frame);
}
/* Header popovers: About (a description card) and Download (a menu). One open at a time; the button that owns it stays highlighted. */
const headerPops={infoButton:'infoPopover',shareButton:'sharePopover',exportButton:'exportMenu'};
function closeActionsMenu(restoreFocus=false){for(const [button,pop] of Object.entries(headerPops)){const wasOpen=!$('#'+pop).hidden;$('#'+pop).hidden=true;$('#'+button).setAttribute('aria-expanded','false');$('#'+button).classList.remove('is-active');if(restoreFocus&&wasOpen)$('#'+button).focus()}}
function togglePop(button){const pop=$('#'+headerPops[button]),opening=pop.hidden;closeActionsMenu();if(!opening)return;pop.hidden=false;pop.style.right=`${$('.view-actions').getBoundingClientRect().right-$('#'+button).getBoundingClientRect().right}px`;$('#'+button).setAttribute('aria-expanded','true');$('#'+button).classList.add('is-active');pop.querySelector('button:not(:disabled)')?.focus()}
function setPanel(open){
  closeSettingMenus();
  $('#workbench').classList.toggle('panel-hidden',!open);
  $('#settingsPanel').inert=!open;
  $('#settingsPanel').setAttribute('aria-hidden',String(!open));
  for(const control of [$('#togglePanelTop'),$('#settingsButton')]){
    control.setAttribute('aria-expanded',String(open));
    control.setAttribute('aria-label',open?'Close view settings':'Open view settings');
    control.title=open?'Close view settings':'Open view settings';
  }
}
function visibleRowIds(){return new Set($$('#balanceRows tr[data-account]').map(row=>row.dataset.account))}
/* Layout never jumps: a container eases from its old height to its new one, and rows already on screen slide to their new place. */
const GLIDE={duration:300,easing:'cubic-bezier(.22,1,.36,1)'};
const prefersStill=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function glideHeight(el,change){
  if(!el||prefersStill()){change();return}
  const from=el.getBoundingClientRect().height;el.getAnimations().forEach(animation=>animation.cancel());
  change();const to=el.getBoundingClientRect().height;if(Math.abs(to-from)<1)return;
  el.style.overflow='hidden';el.animate([{height:`${from}px`},{height:`${to}px`}],GLIDE).finished.catch(()=>{}).then(()=>{el.style.overflow=''});
}
function captureTops(selector,attr){return new Map($$(selector).map(el=>{const box=el.getBoundingClientRect();return [el.getAttribute(attr),{x:box.left,y:box.top}]}))}
function slideFrom(before,selector,attr){if(prefersStill())return;$$(selector).forEach(el=>{const from=before.get(el.getAttribute(attr));if(!from)return;const box=el.getBoundingClientRect(),dx=from.x-box.left,dy=from.y-box.top;if(Math.abs(dx)>1||Math.abs(dy)>1)el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'translate(0,0)'}],GLIDE)})}
const rowTops=()=>captureTops('#balanceRows tr[data-account]','data-account');
const slideRows=before=>slideFrom(before,'#balanceRows tr[data-account]','data-account');
function animateRevealedRows(before){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;$$('#balanceRows tr[data-account]').filter(row=>!before.has(row.dataset.account)).forEach((row,index)=>{row.style.setProperty('--row-delay',`${Math.min(index,8)*22}ms`);row.classList.add('row-revealed')})}
const choices={clock:[{value:'Book',label:'Book',detail:'Balances recorded in the book'},{value:'Value date',label:'Value date',detail:'Balances by effective date'}],cycle:[{value:'daily',label:'Daily',detail:'One day per period'},{value:'weekly',label:'Weekly',detail:'Seven-day reporting windows'},{value:'monthly',label:'Monthly -1',detail:'Previous monthly cycle'},{value:'quarterly',label:'Quarterly',detail:'Three-month reporting windows'},{value:'yearly',label:'Yearly',detail:'Annual reporting windows'}]};
const periods={
  daily:['12 Oct 2023','13 Oct 2023','14 Oct 2023','15 Oct 2023'],
  weekly:['05 Oct 2023 – 12 Oct 2023','13 Oct 2023 – 20 Oct 2023','21 Oct 2023 – 27 Oct 2023','28 Oct 2023 – 03 Nov 2023'],
  monthly:['05 Oct 2023 – 12 Oct 2023','13 Oct 2023 – 20 Oct 2023','21 Oct 2023 – 27 Oct 2023','28 Oct 2023 – 03 Nov 2023'],
  quarterly:['Jul – Sep 2023','Oct – Dec 2023','Jan – Mar 2024','Apr – Jun 2024'],
  yearly:['2022','2023','2024','2025']
};
function periodIds(){return $('#period').value.split(',').filter(Boolean)}
function periodLabel(cycle,id){return periods[cycle]?.[Number(id.slice(1))-1]||''}
function updatePeriodLabels(){const ids=state.settings.period.split(',');$('#periodOneLabel').textContent=periodLabel(state.settings.cycle,ids[0]);$('#periodTwoLabel').textContent=periodLabel(state.settings.cycle,ids[1])}
function closeSettingMenus(except){for(const name of ['clock','cycle','period']){if(name===except)continue;const menu=$(`#${name}Menu`),trigger=$(`#${name}Trigger`);menu.hidden=true;trigger.setAttribute('aria-expanded','false')}}
function renderChoice(name){const value=$(`#${name}`).value;const selected=choices[name].find(item=>item.value===value);$(`#${name}Value`).textContent=selected?.label||value;$(`#${name}Menu`).innerHTML=choices[name].map(item=>`<button type="button" class="ds-option ${item.value===value?'is-selected':''}" data-value="${item.value}" aria-pressed="${item.value===value}"><span><strong>${item.label}</strong><small>${item.detail}</small></span>${item.value===value?'<svg><use href="#i-check"/></svg>':''}</button>`).join('')}
function renderPeriodChips(){const ids=periodIds();$('#periodChips').innerHTML=ids.length?ids.map(id=>`<span class="ds-chip"><span>${periodLabel($('#cycle').value,id)}</span><button type="button" data-remove-period="${id}" aria-label="Remove ${periodLabel($('#cycle').value,id)}"><svg><use href="#i-close"/></svg></button></span>`).join(''):'<span class="ds-placeholder">Select periods</span>'}
let pendingPeriods=[];
function renderPeriodOptions(){const cycle=$('#cycle').value;$('#periodOptions').innerHTML=periods[cycle].map((label,index)=>{const id=`p${index+1}`;return `<label class="ds-period-option"><input type="checkbox" value="${id}" ${pendingPeriods.includes(id)?'checked':''}><span>${label}</span></label>`}).join('');$('#periodCount').textContent=`${pendingPeriods.length} of 2 selected`;$('#periodSelect').disabled=pendingPeriods.length!==2}
function syncSettingsControls(){renderChoice('clock');renderChoice('cycle');renderPeriodChips();closeSettingMenus()}
const settingFields=['clock','cycle','period'];
function readDraft(){return Object.fromEntries(settingFields.map(id=>{const field=$('#'+id);return [id,field.type==='checkbox'?field.checked:field.value]}))}
function updateDraftStatus(){
  const draft=readDraft(),changed=settingFields.filter(id=>draft[id]!==state.settings[id]);
  const rowsChanged=window.rowsModel?.hasChanges()??false;
  $('#applyButton').disabled=!changed.length&&!rowsChanged;
  $('#resetSettings').disabled=!changed.length&&!rowsChanged;
}
function discardSettings(){
  settingFields.forEach(id=>{const field=$('#'+id);if(field.type==='checkbox')field.checked=state.settings[id];else field.value=state.settings[id]});
  window.rowsModel?.discard();
  syncSettingsControls();
  updateDraftStatus();
}
function applySettings(){
  const selected={clock:$('#clock').value,cycle:$('#cycle').value,period:$('#period').value};
  const unfinished=window.rowsModel?.incompleteBalance();if(unfinished){toast(`Balance code ${unfinished} needs a code and an aggregate function, or remove it.`,'warn');return}
  if(window.rowsModel?.emptyClass()){toast('A posting class has no measures. Pick at least one, or remove that class.','warn');return}
  if(window.rowsModel&&!window.rowsModel.draftColumnCount()){toast('Choose at least one column: a posting class or a balance code.','warn');return}
  if(selected.period.split(',').filter(Boolean).length!==2){toast('Choose two periods to compare.','warn');return}
  /* Applying talks to the server: the button shows "Applying…" while it waits. A failed apply leaves the table as it was. */
  setApplying(true);setTimeout(()=>{setApplying(false);
    if(simulate.applyFails){simulate.applyFails=false;toast('Please try again in a moment.','error',{title:'Couldn’t apply settings due to a server error',action:{label:'Retry',run:applySettings}});return}
    const previous=captureValues();state.settings=selected;window.rowsModel?.apply();updatePeriodLabels();renderTable();animateChangedValues(previous);updateDraftStatus();updateDirty();toast('Settings applied successfully.','success')},prefersStill()?0:420);
}
/* A row with children opens from anywhere on it, not only its arrow. Selecting text or clicking a real button still does just that. */
$('#balanceRows').addEventListener('click',event=>{let button=event.target.closest('[data-row]');if(!button){if(String(getSelection())||event.target.closest('button,a,input'))return;button=event.target.closest('tr[data-account]')?.querySelector('[data-row]')}if(!button)return;const before=visibleRowIds(),tops=rowTops(),id=button.dataset.row;state.expanded.has(id)?state.expanded.delete(id):state.expanded.add(id);renderTable();slideRows(tops);animateRevealedRows(before);$(`[data-account="${id}"]`)?.classList.add('just-toggled');$(`[data-row="${id}"]`)?.focus({preventScroll:true})});
$('#expandAll').addEventListener('click',()=>{const tops=rowTops(),before=visibleRowIds(),ids=expandableIds(visibleRoots()),all=ids.every(id=>state.expanded.has(id));ids.forEach(id=>all?state.expanded.delete(id):state.expanded.add(id));renderTable();slideRows(tops);animateRevealedRows(before)});
$('#filterButton').addEventListener('click',()=>{$('#filterPopover').hidden=!$('#filterPopover').hidden;$('#filterButton').setAttribute('aria-expanded',String(!$('#filterPopover').hidden))});
$('#filterType').addEventListener('change',event=>{state.filter=event.target.value;renderTable();$('#filterPopover').hidden=true;$('#filterButton').setAttribute('aria-expanded','false');toast(state.filter==='all'?'All account groups shown':`Filtered to ${event.target.selectedOptions[0].textContent}`)});
$('#clearFilter').addEventListener('click',()=>{state.filter='all';$('#filterType').value='all';renderTable()});
$('#allViews').addEventListener('click',()=>{openViewMenu(false);showPage('views')});
$$('.tab').forEach(tab=>tab.addEventListener('click',()=>{$$('.tab').forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1});$$('.tab-content').forEach(content=>content.classList.toggle('active',content.id===`tab-${tab.dataset.tab}`))}));
$('.panel-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=$$('.tab');let index=tabs.indexOf(document.activeElement);index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[index].click();tabs[index].focus()});
$('#applyButton').addEventListener('click',applySettings);
$('#resetSettings').addEventListener('click',discardSettings);
settingFields.forEach(id=>$('#'+id).addEventListener('change',updateDraftStatus));
for(const name of ['clock','cycle']){
  $(`#${name}Trigger`).addEventListener('click',()=>{const menu=$(`#${name}Menu`),opening=menu.hidden;closeSettingMenus();menu.hidden=!opening;$(`#${name}Trigger`).setAttribute('aria-expanded',String(opening));if(opening)menu.querySelector('.is-selected')?.focus()});
  $(`#${name}Menu`).addEventListener('click',event=>{const option=event.target.closest('[data-value]');if(!option)return;$(`#${name}`).value=option.dataset.value;if(name==='cycle'){$('#period').value='p1,p2';renderPeriodChips()}renderChoice(name);closeSettingMenus();$(`#${name}Trigger`).focus();updateDraftStatus()});
  $(`#${name}Menu`).addEventListener('keydown',event=>{const items=[...event.currentTarget.querySelectorAll('.ds-option')];let index=items.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();index=event.key==='Home'?0:event.key==='End'?items.length-1:(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;items[index].focus()}});
}
$('#periodTrigger').addEventListener('click',()=>{const menu=$('#periodMenu'),opening=menu.hidden;closeSettingMenus();if(opening){pendingPeriods=periodIds();renderPeriodOptions()}menu.hidden=!opening;$('#periodTrigger').setAttribute('aria-expanded',String(opening));if(opening)menu.querySelector('input')?.focus()});
$('#periodOptions').addEventListener('change',event=>{if(!event.target.matches('input'))return;const id=event.target.value;if(event.target.checked){if(pendingPeriods.length>=2){event.target.checked=false;return}pendingPeriods.push(id)}else pendingPeriods=pendingPeriods.filter(item=>item!==id);pendingPeriods.sort();renderPeriodOptions();$(`#periodOptions input[value="${id}"]`)?.focus()});
$('#periodSelect').addEventListener('click',()=>{if(pendingPeriods.length!==2)return;$('#period').value=pendingPeriods.join(',');renderPeriodChips();closeSettingMenus();$('#periodTrigger').focus();updateDraftStatus()});
$('#periodCancel').addEventListener('click',()=>{closeSettingMenus();$('#periodTrigger').focus()});
$('#periodChips').addEventListener('click',event=>{const button=event.target.closest('[data-remove-period]');if(!button)return;$('#period').value=periodIds().filter(id=>id!==button.dataset.removePeriod).join(',');renderPeriodChips();updateDraftStatus()});
$('#togglePanelTop').addEventListener('click',()=>setPanel($('#workbench').classList.contains('panel-hidden')));
$('#settingsButton').addEventListener('click',()=>setPanel($('#workbench').classList.contains('panel-hidden')));
$('#menuButton').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#appSwitcher').addEventListener('click',()=>toast('App switching is outside this screen prototype'));
$('#languageButton').addEventListener('click',()=>toast('English is the available language in this prototype'));
/* Leaving with unsaved changes asks first; staying is the safe, highlighted choice. The browser's own prompt covers reloads and tab closes. */
async function confirmLeave(opener){if(!$('.viewbar').classList.contains('is-dirty'))return true;return confirmDialog({title:'You have unsaved changes',body:'Are you sure you want to leave this page? The changes you made will be lost.',confirmLabel:'Leave',cancelLabel:'Stay on the page',opener,safePrimary:true})}
$$('[data-nav]').forEach(link=>link.addEventListener('click',async event=>{event.preventDefault();if(!await confirmLeave(link))return;toast(`${link.dataset.nav} is outside this screen prototype`);$('#sidebar').classList.remove('open')}));
addEventListener('beforeunload',event=>{if($('.viewbar').classList.contains('is-dirty')){event.preventDefault();event.returnValue=''}});
/* Share: says who can open this view before handing out a link. A private view can't be copied; it offers Edit visibility instead.
   With unsaved changes, it warns that the link opens the last saved version. */
const SHARE_TEXT={everyone:{label:'Everyone in the organisation',icon:'i-globe',note:'Anyone in the organisation can open this view, so you can copy the link and share it.'},team:{label:'Only my team',icon:'i-users',note:'Only your team can open this view. Share the link with people in your team.'},me:{label:'Only me',icon:'i-lock',note:'Only you can open this view. To share it, change who can see it first.'}};
const viewLink=view=>`${location.origin}${location.pathname}#view=${view.code}`;
const ownsView=view=>!view.builtIn&&view.owner==='Me';
function renderSharePopover(){const view=currentView,seen=view.builtIn?'everyone':view.visibility||'everyone',text=SHARE_TEXT[seen],locked=seen==='me',dirty=$('.viewbar').classList.contains('is-dirty');
  $('#sharePopover').innerHTML=`<div class="share-row"><span class="popover-label" id="sharePopoverLabel">Visibility</span><span class="share-seen">${UI.icon(text.icon)}${text.label}</span></div><p class="share-note">${text.note}</p>${dirty&&!locked?`<p class="share-warn">${UI.icon('i-info')}<span>The link opens the last saved version. Save first to share your changes.</span></p>`:''}<div class="share-actions"><button type="button" class="ds-primary-action share-copy" data-copy-link ${locked?'disabled':''}>${UI.icon('i-copy')}<span>Copy URL</span></button>${ownsView(view)?`<button type="button" class="dialog-secondary share-edit" data-edit-visibility>${UI.icon('i-pencil')}Edit visibility</button>`:''}<span class="sr-only" aria-live="polite" data-copy-status></span></div>`}
/* Copy URL confirms inside the button (a tick and "Copied") rather than with a toast: the feedback sits where you clicked. */
async function copyLink(button,view){try{await navigator.clipboard.writeText(viewLink(view))}catch{toast('Copying links is unavailable in this browser.','warn');return}
  const label=button.querySelector('span'),icon=button.querySelector('svg use'),before=label.textContent;button.classList.add('is-copied');label.textContent='Copied';icon?.setAttribute('href','#i-check');
  const status=button.parentElement.querySelector('[data-copy-status]');if(status)status.textContent='Link copied';
  clearTimeout(button.copyTimer);button.copyTimer=setTimeout(()=>{button.classList.remove('is-copied');label.textContent=before;icon?.setAttribute('href',button.dataset.icon||'#i-copy');if(status)status.textContent=''},1800)}
$('#shareButton').addEventListener('click',()=>{if($('#sharePopover').hidden)renderSharePopover();togglePop('shareButton')});
$('#sharePopover').addEventListener('click',event=>{if(event.target.closest('[data-copy-link]'))copyLink(event.target.closest('[data-copy-link]'),currentView);if(event.target.closest('[data-edit-visibility]')){closeActionsMenu();openViewDetailsDialog(currentView,{opener:$('#shareButton'),focus:'visibility'})}});
$('#infoButton').addEventListener('click',()=>togglePop('infoButton'));
$('#scheduleButton').addEventListener('click',()=>toast('Scheduling is outside this screen prototype.'));
$('#exportButton').addEventListener('click',()=>togglePop('exportButton'));
$('#exportMenu').addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const items=[...$('#exportMenu').querySelectorAll('button')];let index=items.indexOf(document.activeElement);index=event.key==='Home'?0:event.key==='End'?items.length-1:(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;items[index].focus()});
/* Excel: the table as it stands (columns, periods, every row) in a CSV that opens straight in Excel. */
$('#exportExcel').addEventListener('click',()=>{closeActionsMenu(true);downloadCsv($('#viewSelect strong').textContent)});
/* The table as a CSV that opens in Excel; also used by Download on the All views page. */
function downloadCsv(viewName){const columns=tableColumns(),header=['Account',...[1,2].flatMap(period=>columns.map(column=>`Period ${period} ${column.label.toLowerCase()}`))];const rows=[];function walk(nodes){nodes.forEach(node=>{rows.push([node.name,...[0,1].flatMap(period=>columns.map(column=>columnValue(node,period,column.id)))]);if(node.children)walk(node.children)})}walk(visibleRoots());const csv=[header,...rows].map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const link=document.createElement('a');link.href=url;link.download=`${viewName.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(`“${viewName}” downloaded as a CSV that opens in Excel.`,'success')}
/* PDF: the browser's print-to-PDF, with a print layout that keeps only the title and the table. */
$('#exportPdf').addEventListener('click',()=>{closeActionsMenu(true);toast('Choose “Save as PDF” in the print dialog.','info');setTimeout(()=>window.print(),350)});
document.addEventListener('click',event=>{if(!event.target.closest('.view-select-wrap')){$('#viewMenu').hidden=true;$('#viewSelect').setAttribute('aria-expanded','false')}if(!event.target.closest('.view-actions'))closeActionsMenu();if(!event.target.closest('.toolbar-left')){$('#filterPopover').hidden=true;$('#filterButton').setAttribute('aria-expanded','false')}if(!event.target.closest('.ds-dropdown'))closeSettingMenus();if(innerWidth<=850&&!event.target.closest('#sidebar')&&!event.target.closest('#menuButton'))$('#sidebar').classList.remove('open')});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeActionsMenu(true);for(const name of ['clock','cycle','period']){if(!$(`#${name}Menu`).hidden){closeSettingMenus();$(`#${name}Trigger`).focus();break}}$('#viewMenu').hidden=true;$('#filterPopover').hidden=true;$('#filterButton').setAttribute('aria-expanded','false');$('#sidebar').classList.remove('open')}});
renderTable();

syncSettingsControls();
updateDraftStatus();
/* Group icons arrive once on load; later re-renders keep them still. */
$('.balance-table').classList.add('icons-intro');setTimeout(()=>$('.balance-table').classList.remove('icons-intro'),900);
/* A field with a menu opens from anywhere on the field, not only its arrow. Buttons inside it (a chip's x, clear all, +N) keep their own job. */
document.addEventListener('click',event=>{const field=event.target.closest('.ds-multiselect,[data-field-opens]');if(!field||event.target.closest('button'))return;field.querySelector('.ds-disclosure,.rows-picker-toggle')?.click()});
/* The main navigation folds to a slim rail and back. Width glides; labels fade first so nothing squeezes. */
(()=>{const sidebar=$('#sidebar'),toggle=$('#sidebarToggle');if(!sidebar||!toggle)return;
  const set=collapsed=>{sidebar.classList.toggle('is-collapsed',collapsed);toggle.setAttribute('aria-expanded',String(!collapsed));const label=collapsed?'Expand navigation':'Collapse navigation';toggle.setAttribute('aria-label',label);toggle.title=label;
    sidebar.querySelectorAll(':scope>.brand,:scope>nav').forEach(part=>{part.inert=collapsed});try{localStorage.setItem('be-nav-collapsed',collapsed?'1':'0')}catch{}};
  let saved=false;try{saved=localStorage.getItem('be-nav-collapsed')==='1'}catch{}
  if(saved){sidebar.classList.add('no-glide');set(true);requestAnimationFrame(()=>requestAnimationFrame(()=>sidebar.classList.remove('no-glide')))}
  toggle.addEventListener('click',()=>set(!sidebar.classList.contains('is-collapsed')));
})();
/* Saved vs applied. Applying settings makes the view "unsaved": the title gains an asterisk, Reset changes and Save appear.
   Reset returns to the last save; Save makes the current state the new baseline. */
const snapshotView=()=>({settings:{...state.settings},rows:window.rowsModel?.snapshot()});
const viewKey=snap=>JSON.stringify({settings:snap.settings,rows:snap.rows&&{nodes:[...snap.rows.nodes].sort(),attributes:snap.rows.attributes}});
let savedView=snapshotView();
function updateDirty(){const dirty=viewKey(snapshotView())!==viewKey(savedView);$('.viewbar').classList.toggle('is-dirty',dirty);$('#dirtyText').textContent=dirty?' (unsaved changes)':''}
/* Views. Built-in ("out of the box") views are shared templates and can't be overwritten; your own views can.
   Saving over a built-in view is offered only as Save as a new view. */
const views=[
  {name:'Q3 FY24 Card Balances',code:'ABCIN00005',builtIn:true,isDefault:true,icon:'i-map',lastOpened:0,visibility:'everyone',description:'Helps you analyse balances, track trends, and gain insights into financial data with ease.'},
  {name:'Trial Balance View',code:'TRBV00003',builtIn:true,icon:'i-balance',lastOpened:9,visibility:'everyone',description:'Trial balance for a specific period: every account’s debit and credit totals, to check the books balance.'},
  {name:'Accounting Journal Report',code:'ACJR00002',builtIn:true,icon:'i-bank',lastOpened:0,visibility:'everyone',description:'All manual postings made in the period, line by line, with their posting codes.'},
  {name:'Multi-Currency P & L View',code:'MCPL00008',builtIn:true,icon:'i-currency',lastOpened:33,visibility:'everyone',description:'Income and expense balances across currencies, converted at the period’s rate.'},
  {name:'Daily Avg Balance View',code:'DAVB00009',builtIn:true,icon:'i-calendar',lastOpened:12,visibility:'everyone',description:'Balances of a selected node and its posting categories, averaged per day.'},
  {name:'Cash Flow Report',code:'CAFR00004',builtIn:true,icon:'i-cash',lastOpened:16,visibility:'everyone',description:'Cash (funds) inflow and outflow by account group for the period.'},
  {name:'Monthly Average Balance',code:'MAVB00006',builtIn:true,icon:'i-calendar',lastOpened:24,visibility:'everyone',description:'Average balance for each node over the selected period, month by month.'},
  {name:'Profit and Loss Statement',code:'PLST00007',builtIn:true,icon:'i-balance',lastOpened:52,visibility:'everyone',description:'Profit or loss for a period: income against expenses, with the net result.'},
  {name:'Income Expense Report',code:'INEX00010',builtIn:true,icon:'i-dollar',lastOpened:61,visibility:'everyone',description:'Income and expense accounts side by side, with period-on-period change.'},
  {name:'GL Summary Report',code:'GLSR00013',builtIn:true,icon:'i-doc',lastOpened:75,visibility:'everyone',description:'A collapsed view of the general ledger, as shown in the Balance Sheet tab.'},
  {name:'Balance Sheet Summary',code:'BSSM00016',builtIn:true,icon:'i-doc',lastOpened:90,visibility:'everyone',description:'Assets against liabilities at period end, rolled up to the top of the chart of accounts.'},
  {name:'Daily Delta Report',code:'DDLT00017',builtIn:true,icon:'i-calendar',lastOpened:100,visibility:'everyone',description:'Day-on-day change in every balance, for balancing after end-of-day runs.'},
  {name:'Posting Category Mix',code:'PCMX00018',builtIn:true,icon:'i-tag',lastOpened:120,visibility:'everyone',description:'Debit and credit counts by posting category: POS, e-commerce and cash.'},
  {name:'Regional Roll-up View',code:'RGRU00019',builtIn:true,icon:'i-tree',lastOpened:140,visibility:'everyone',description:'Balances rolled up by region, then to the global total.'},
  {name:'JAS Quarterly Report',code:'JASQ00011',builtIn:false,owner:'John',icon:'i-file',lastOpened:0,visibility:'everyone',description:'July to September balances for the quarterly review.'},
  {name:'Monthly View 12',code:'MV1200014',builtIn:false,owner:'Me',icon:'i-file',lastOpened:0,visibility:'everyone',description:'December month-end check, saved from Q3 FY24 Card Balances.'},
  {name:'August Balance Sheet',code:'AUBS00020',builtIn:false,owner:'Me',icon:'i-file',lastOpened:5,visibility:'me',description:'August month-end balance sheet with posting categories.'},
  {name:'JAS Balance Asset',code:'JASA00021',builtIn:false,owner:'John',icon:'i-file',lastOpened:9,visibility:'team',description:'Asset balances for July to September, by product.'},
  {name:'Card Settlement Recon',code:'CSRC00015',builtIn:false,owner:'Alia Khan',icon:'i-file',lastOpened:11,visibility:'team',description:'Card settlement postings against the settlement account, for daily reconciliation.'},
  {name:'Branch Cash Position',code:'BRCP00022',builtIn:false,owner:'Alia Khan',icon:'i-file',lastOpened:26,visibility:'everyone',description:'Cash on hand by branch at the close of each day.'},
  {name:'Income & Expense View',code:'IEVW00012',builtIn:false,owner:'Me',icon:'i-file',lastOpened:41,visibility:'team',description:'Income and expense accounts side by side.'},
  {name:'Settlement Exceptions',code:'STEX00024',builtIn:false,owner:'Alia Khan',icon:'i-file',lastOpened:63,visibility:'team',description:'Settlement postings that didn’t match, for the morning exceptions call.'},
  {name:'Q2 Liability Check',code:'Q2LC00025',builtIn:false,owner:'Me',icon:'i-file',lastOpened:80,visibility:'me',description:'Liability balances for April to June, before the audit.'},
  {name:'Fee Income by Product',code:'FIBP00026',builtIn:false,owner:'John',icon:'i-file',lastOpened:96,visibility:'everyone',description:'Fee income split by card product and posting category.'},
  {name:'Opening Balances FY26',code:'OBFY00027',builtIn:false,owner:'Me',icon:'i-file',lastOpened:130,visibility:'team',description:'Opening balances for the new financial year, checked against last year’s close.'},
  {name:'Monthly View 1',code:'MV0100023',builtIn:false,owner:'Me',icon:'i-file',lastOpened:58,visibility:'me',description:'January opening balances, kept for comparison.'}];
let currentView=views[0];
/* View switcher (Figma): two tabs, a search, views grouped by when you last opened them, the default view tagged. */
const viewUI={tab:null,query:''};
const recency=[['Today',days=>days===0],['In the last month',days=>days>0&&days<=30],['More than a month ago',days=>days>30]];
function markText(text,query){const at=query?text.toLowerCase().indexOf(query.toLowerCase()):-1;return at<0?UI.esc(text):`${UI.esc(text.slice(0,at))}<mark>${UI.esc(text.slice(at,at+query.length))}</mark>${UI.esc(text.slice(at+query.length))}`}
function renderViewMenu(){const tab=viewUI.tab||(currentView.builtIn?'builtin':'mine'),query=viewUI.query.trim().toLowerCase();
  $$('[data-view-tab]').forEach(button=>{const on=button.dataset.viewTab===tab;button.setAttribute('aria-selected',String(on));button.tabIndex=on?0:-1;button.classList.toggle('active',on)});
  const list=views.filter(view=>view.builtIn===(tab==='builtin')&&(!query||view.name.toLowerCase().includes(query)));
  const item=view=>`<button type="button" class="view-option ${view===currentView?'selected':''}" role="option" aria-selected="${view===currentView}" data-view-code="${UI.esc(view.code)}"><span class="view-option-icon" aria-hidden="true">${UI.icon(view.icon||'i-file')}</span><span class="view-option-name">${markText(view.name,viewUI.query.trim())}${view.owner?`<small class="view-option-owner">${UI.esc(view.owner)}</small>`:''}</span>${view.isDefault?'<span class="view-tag">Default</span>':''}${view===currentView?UI.icon('i-check','view-option-check'):''}</button>`;
  const groups=recency.map(([label,test])=>{const items=list.filter(view=>test(view.lastOpened)).sort((a,b)=>a.lastOpened-b.lastOpened);return items.length?`<div class="menu-caption" role="presentation">${label.toUpperCase()}</div>${items.map(item).join('')}`:''}).join('');
  $('#viewList').innerHTML=groups||`<p class="view-empty">${query?`No views match “${UI.esc(viewUI.query.trim())}”.`:tab==='mine'?'You haven’t saved any views yet. Use Save as a new view.':'No views here yet.'}</p>`}
function openViewMenu(open){const menu=$('#viewMenu');menu.hidden=!open;$('#viewSelect').setAttribute('aria-expanded',String(open));if(open){viewUI.tab=null;viewUI.query='';$('#viewSearch').value='';renderViewMenu();$('#viewSearch').focus({preventScroll:true})}}
$('#viewSelect').addEventListener('click',()=>openViewMenu($('#viewMenu').hidden));
$$('[data-view-tab]').forEach(button=>button.addEventListener('click',()=>{viewUI.tab=button.dataset.viewTab;renderViewMenu();button.focus()}));
$('.view-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;const tabs=[...$$('[data-view-tab]')],at=tabs.indexOf(document.activeElement);const next=tabs[(at+1)%tabs.length];viewUI.tab=next.dataset.viewTab;renderViewMenu();next.focus()});
$('#viewSearch').addEventListener('input',event=>{viewUI.query=event.target.value;renderViewMenu()});
$('#viewMenu').addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;const items=[...$$('#viewList .view-option')];if(!items.length)return;event.preventDefault();const at=items.indexOf(document.activeElement);items[at<0?(event.key==='ArrowDown'?0:items.length-1):(at+(event.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()});
function setCurrentView(view){currentView=view;view.lastOpened=0;$('#viewSelect strong').textContent=view.name;$('#viewSelect small').textContent=`Code · ${view.code}`;$('#viewDescription').textContent=view.description||'No description yet.';renderViewMenu();updateSaveMenu()}
function updateSaveMenu(){const locked=currentView.builtIn,item=$('#saveView');item.setAttribute('aria-disabled',String(locked));item.classList.toggle('is-locked',locked);$('#saveViewHint').hidden=!locked;locked?item.setAttribute('aria-describedby','saveViewHintText'):item.removeAttribute('aria-describedby')}
$('#viewList').addEventListener('click',async event=>{const button=event.target.closest('[data-view-code]');if(!button)return;const view=views.find(item=>item.code===button.dataset.viewCode);openViewMenu(false);$('#viewSelect').focus({preventScroll:true});if(view===currentView)return;
  if($('.viewbar').classList.contains('is-dirty')&&!await confirmDialog({title:'You have unsaved changes',body:`Switching to “${view.name}” will lose the changes you made to “${currentView.name}”.`,confirmLabel:'Switch anyway',cancelLabel:'Stay on this view',opener:$('#viewSelect'),safePrimary:true}))return;
  setCurrentView(view);savedView=snapshotView();updateDirty();toast(`Showing “${view.name}”.`,'info')});
function closeSaveMenu(restoreFocus=false){$('#saveMenu').hidden=true;$('#saveMore').setAttribute('aria-expanded','false');$('#saveMore').classList.remove('is-open');if(restoreFocus)$('#saveMore').focus()}
function saveView(){if(currentView.builtIn)return;savedView=snapshotView();updateDirty();closeSaveMenu();$('#viewSelect').focus({preventScroll:true});toast(`“${currentView.name}” saved`,'success')}
$('#saveMore').addEventListener('click',()=>{const menu=$('#saveMenu'),opening=menu.hidden;menu.hidden=!opening;$('#saveMore').setAttribute('aria-expanded',String(opening));$('#saveMore').classList.toggle('is-open',opening);if(opening)menu.querySelector(currentView.builtIn?'#saveAsNew':'#saveView').focus()});
$('#saveMenu').addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;event.preventDefault();const items=[...$('#saveMenu').querySelectorAll('.menu-action')],at=items.indexOf(document.activeElement);items[(at+(event.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()});
$('#saveView').addEventListener('click',saveView);
$('#saveAsNew').addEventListener('click',()=>{closeSaveMenu();openSaveAsDialog()});
document.addEventListener('click',event=>{if(!event.target.closest('.save-group'))closeSaveMenu()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#saveMenu').hidden)closeSaveMenu(true)});
/* Save as a new view: name it, optionally code and describe it, choose who sees it. The new view becomes the current one;
   the view it came from is left untouched. Clicking outside never throws typed text away; only Cancel, × or Escape do. */
const visibilityOptions=[{value:'everyone',label:'Give access to everyone in the organisation',icon:'i-globe'},{value:'team',label:'Only my team',icon:'i-users'},{value:'me',label:'Only me',icon:'i-lock'}];
function openSaveAsDialog(){const opener=$('#saveMore'),layer=document.createElement('div');layer.className='dialog-layer';
  const suggested=`${currentView.name.replace(/ \(copy( \d+)?\)$/,'')} (copy)`;
  layer.innerHTML=`<form class="dialog form-dialog" role="dialog" aria-modal="true" aria-labelledby="saveAsTitle" novalidate>
    <header class="form-dialog-head"><h2 id="saveAsTitle">Save as a new view</h2><button type="button" class="form-dialog-close" data-cancel aria-label="Close">${UI.icon('i-close')}</button></header>
    <div class="form-dialog-body">
      <p class="form-dialog-intro">The new view keeps every change you've made here: parameters, rows and columns.</p>
      <h3>Basic details</h3>
      <label class="form-field"><span>Name <b aria-hidden="true">*</b></span><input id="newViewName" name="name" required maxlength="60" autocomplete="off" aria-describedby="newViewNameError"><small class="field-error" id="newViewNameError" hidden></small></label>
      <label class="form-field"><span>Code</span><input id="newViewCode" name="code" maxlength="12" autocomplete="off" placeholder="Created for you if left empty" aria-describedby="newViewCodeHint newViewCodeError"><small class="field-hint" id="newViewCodeHint">Letters and numbers, up to 12.</small><small class="field-error" id="newViewCodeError" hidden></small></label>
      <label class="form-field"><span>Description <em>(optional)</em></span><textarea id="newViewDesc" name="description" rows="3" maxlength="240" placeholder="What is this view for? It shows under About this view."></textarea></label>
      <h3>Sharing &amp; visibility</h3>
      <label class="form-field"><span>Visibility</span><span class="select-with-icon"><span class="select-icon" aria-hidden="true">${UI.icon('i-globe')}</span><select id="newViewVisibility" name="visibility">${visibilityOptions.map(option=>`<option value="${option.value}">${option.label}</option>`).join('')}</select>${UI.icon('i-down','select-caret')}</span></label>
    </div>
    <footer class="form-dialog-foot"><button type="submit" class="ds-primary-action">Save</button><button type="button" class="dialog-secondary" data-cancel>Cancel</button></footer></form>`;
  document.body.append(layer);const behind=setBehindInert(layer,true);requestAnimationFrame(()=>layer.classList.add('is-open'));
  const form=layer.querySelector('form'),name=form.querySelector('#newViewName'),code=form.querySelector('#newViewCode'),visibility=form.querySelector('#newViewVisibility');
  name.value=suggested;visibility.value=currentView.visibility||'everyone';name.focus();name.select();
  visibility.addEventListener('change',()=>{form.querySelector('.select-icon').innerHTML=UI.icon(visibilityOptions.find(option=>option.value===visibility.value).icon)});
  code.addEventListener('input',()=>{const at=code.selectionStart;code.value=code.value.toUpperCase().replace(/[^A-Z0-9]/g,'');code.setSelectionRange(at,at)});
  const showError=(field,message)=>{const error=form.querySelector(`#${field.id}Error`);field.setAttribute('aria-invalid',String(Boolean(message)));field.closest('.form-field').classList.toggle('has-error',Boolean(message));error.hidden=!message;error.innerHTML=message?`${UI.icon('i-alert')}<span></span>`:'';if(message)error.querySelector('span').textContent=message};
  name.addEventListener('input',()=>showError(name,''));code.addEventListener('input',()=>showError(code,''));
  const close=()=>{document.removeEventListener('keydown',onKey,true);layer.classList.remove('is-open');layer.classList.add('is-closing');setBehindInert(layer,false,behind);setTimeout(()=>layer.remove(),prefersStill()?0:180);(opener.offsetParent?opener:$('#viewSelect')).focus({preventScroll:true})};
  const onKey=event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close()}if(event.key==='Tab'){const items=[...form.querySelectorAll('input,textarea,select,button')],at=items.indexOf(document.activeElement);if(event.shiftKey&&at===0||!event.shiftKey&&at===items.length-1){event.preventDefault();items[event.shiftKey?items.length-1:0].focus()}}};
  document.addEventListener('keydown',onKey,true);
  form.addEventListener('click',event=>{if(event.target.closest('[data-cancel]'))close()});
  form.addEventListener('submit',event=>{event.preventDefault();const title=name.value.trim().replace(/\s+/g,' ');
    if(!title){showError(name,'Give the view a name.');name.focus();return}
    if(views.some(view=>view.name.toLowerCase()===title.toLowerCase())){showError(name,'Name already in use. Choose a different one.');name.focus();name.select();return}
    let newCode=code.value.trim();if(newCode&&views.some(view=>view.code===newCode)){showError(code,'Code already in use. Leave it empty to get one.');code.focus();return}
    if(!newCode){const stem=title.split(/\s+/).map(word=>word[0]).join('').toUpperCase().replace(/[^A-Z]/g,'').slice(0,4).padEnd(4,'X');let n=1;do{newCode=`${stem}${String(n).padStart(5,'0')}`;n++}while(views.some(view=>view.code===newCode))}
    const view={name:title,code:newCode,builtIn:false,owner:'Me',icon:'i-file',lastOpened:0,visibility:visibility.value,description:form.querySelector('#newViewDesc').value.trim()};
    views.push(view);setCurrentView(view);savedView=snapshotView();updateDirty();close();toast(`“${title}” created`,'success')});
}
/* View details: edit a view you own (name, description, who can see it). The code is fixed so links and reports keep working.
   Save changes wakes up only once something differs; clicking outside never throws edits away. */
function openViewDetailsDialog(view,{opener=document.activeElement,focus='name'}={}){const layer=document.createElement('div');layer.className='dialog-layer';
  layer.innerHTML=`<form class="dialog form-dialog" role="dialog" aria-modal="true" aria-labelledby="detailsTitle" novalidate>
    <header class="form-dialog-head"><h2 id="detailsTitle"></h2><button type="button" class="form-dialog-close" data-cancel aria-label="Close">${UI.icon('i-close')}</button></header>
    <div class="form-dialog-body">
      <h3>Basic details</h3>
      <label class="form-field"><span>Name <b aria-hidden="true">*</b></span><input id="detailsName" required maxlength="60" autocomplete="off" aria-describedby="detailsNameError"><small class="field-error" id="detailsNameError" hidden></small></label>
      <label class="form-field is-readonly"><span>Code</span><input id="detailsCode" readonly aria-describedby="detailsCodeHint"><small class="field-hint" id="detailsCodeHint">Codes can’t change, so links and reports keep working.</small></label>
      <label class="form-field"><span>Description <em>(optional)</em></span><textarea id="detailsDesc" rows="3" maxlength="240" placeholder="What is this view for? It shows under About this view."></textarea></label>
      <h3>Sharing &amp; visibility</h3>
      <label class="form-field"><span>Visibility</span><span class="select-with-icon"><span class="select-icon" aria-hidden="true"></span><select id="detailsVisibility">${visibilityOptions.map(option=>`<option value="${option.value}">${option.label}</option>`).join('')}</select>${UI.icon('i-down','select-caret')}</span></label>
      <div class="details-link"><button type="button" class="link-action" data-copy-link data-icon="#i-link">${UI.icon('i-link')}<span>Copy URL</span></button><small class="field-hint" id="detailsLinkHint"></small><span class="sr-only" aria-live="polite" data-copy-status></span></div>
    </div>
    <footer class="form-dialog-foot"><button type="submit" class="ds-primary-action" disabled>Save changes</button><button type="button" class="dialog-secondary" data-cancel>Cancel</button></footer></form>`;
  const form=layer.querySelector('form'),name=form.querySelector('#detailsName'),desc=form.querySelector('#detailsDesc'),visibility=form.querySelector('#detailsVisibility'),save=form.querySelector('[type="submit"]'),copy=form.querySelector('[data-copy-link]');
  form.querySelector('#detailsTitle').textContent=view.name;name.value=view.name;form.querySelector('#detailsCode').value=view.code;desc.value=view.description||'';visibility.value=view.visibility||'everyone';
  /* Copy URL follows what's saved, not what's picked: a link is only worth copying if someone else can already open it. */
  const sync=()=>{form.querySelector('.select-icon').innerHTML=UI.icon(visibilityOptions.find(option=>option.value===visibility.value).icon);
    const changed=name.value.trim().replace(/\s+/g,' ')!==view.name||desc.value.trim()!==(view.description||'')||visibility.value!==(view.visibility||'everyone');save.disabled=!changed;
    const savedPrivate=(view.visibility||'everyone')==='me',moved=visibility.value!==(view.visibility||'everyone');copy.disabled=savedPrivate;
    form.querySelector('#detailsLinkHint').textContent=moved?'Who can open the link changes when you save.':savedPrivate?'Only you can open this view. Change visibility to share it.':''};
  document.body.append(layer);const behind=setBehindInert(layer,true);requestAnimationFrame(()=>layer.classList.add('is-open'));sync();
  (focus==='visibility'?visibility:name).focus();if(focus!=='visibility')name.select();
  const showError=message=>{const error=form.querySelector('#detailsNameError');name.setAttribute('aria-invalid',String(Boolean(message)));name.closest('.form-field').classList.toggle('has-error',Boolean(message));error.hidden=!message;error.innerHTML=message?`${UI.icon('i-alert')}<span></span>`:'';if(message)error.querySelector('span').textContent=message};
  form.addEventListener('input',event=>{if(event.target===name)showError('');sync()});visibility.addEventListener('change',sync);
  const close=()=>{document.removeEventListener('keydown',onKey,true);layer.classList.remove('is-open');layer.classList.add('is-closing');setBehindInert(layer,false,behind);setTimeout(()=>layer.remove(),prefersStill()?0:180);(opener?.isConnected&&opener.offsetParent?opener:$('#viewSelect')).focus({preventScroll:true})};
  const onKey=event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close()}if(event.key==='Tab'){const items=[...form.querySelectorAll('input:not([readonly]),textarea,select,button:not(:disabled)')],at=items.indexOf(document.activeElement);if(event.shiftKey&&at===0||!event.shiftKey&&at===items.length-1){event.preventDefault();items[event.shiftKey?items.length-1:0].focus()}}};
  document.addEventListener('keydown',onKey,true);
  form.addEventListener('click',event=>{if(event.target.closest('[data-cancel]'))close();if(event.target.closest('[data-copy-link]'))copyLink(copy,view)});
  form.addEventListener('submit',event=>{event.preventDefault();if(save.disabled)return;const title=name.value.trim().replace(/\s+/g,' ');
    if(!title){showError('Give the view a name.');name.focus();return}
    if(views.some(other=>other!==view&&other.name.toLowerCase()===title.toLowerCase())){showError('Name already in use. Choose a different one.');name.focus();name.select();return}
    const wasPrivate=view.visibility==='me',seen=visibility.value;Object.assign(view,{name:title,description:desc.value.trim(),visibility:seen});
    if(view===currentView){$('#viewSelect strong').textContent=view.name;$('#viewDescription').textContent=view.description||'No description yet.'}
    renderViewMenu();window.refreshViewsPage?.();close();
    toast(wasPrivate&&seen!=='me'?`${seen==='team'?'Your team':'Everyone in the organisation'} can now open it. Copy its link from Share.`:`Your changes are saved.`,'success',{title:`“${title}” updated`})});
}
renderViewMenu();updateSaveMenu();
$('#resetChanges').addEventListener('click',async()=>{if(!await confirmDialog({title:'Reset changes?',body:'All unsaved changes will be lost and the view will go back to its last saved state.',confirmLabel:'Yes, reset',cancelLabel:'No, keep them',tone:'danger',opener:$('#resetChanges')}))return;const previous=captureValues();state.settings={...savedView.settings};window.rowsModel?.restore(savedView.rows);discardSettings();updatePeriodLabels();renderTable();animateChangedValues(previous);updateDirty();$('#viewSelect').focus();toast('Changes reset to the last saved view.','info')});
/* Server states. A prototype never fails on its own, so ?simulate=load-error or ?simulate=apply-error makes the first attempt fail; the retry succeeds. */
const simulate=(()=>{const mode=new URLSearchParams(location.search).get('simulate');return {loadFails:mode==='load-error',applyFails:mode==='apply-error',slowLoad:mode==='slow-load'}})();
function setApplying(on){const button=$('#applyButton');button.classList.toggle('is-busy',on);button.setAttribute('aria-busy',String(on));if(on){button.disabled=true;button.dataset.label=button.innerHTML;button.innerHTML='<span class="button-spinner" aria-hidden="true"></span>Applying…'}else{if(button.dataset.label)button.innerHTML=button.dataset.label;updateDraftStatus()}}
function setTableState(kind){const box=$('#tableState');$('.table-scroll').dataset.state=kind||'';$('#expandAll').hidden=Boolean(kind);$('#tableContext').hidden=Boolean(kind);
  if(kind==='error'){$('#balanceRows').innerHTML='';box.hidden=false;box.innerHTML=`<span class="state-icon" aria-hidden="true">${UI.icon('i-alert')}</span><h3>Something went wrong with our servers</h3><p>The request took too long to process, and we didn't receive a response in time.</p><button type="button" class="ds-primary-action" id="retryLoad">Try again</button>`;$('#retryLoad').addEventListener('click',retryLoad);return}
  box.hidden=true;box.innerHTML='';box.classList.remove('is-sr');
  if(kind==='loading'){box.hidden=false;box.innerHTML=tableSkeleton();box.focus?.()}}
/* Loading: the whole table as a skeleton (header rows included), no grid lines, the same column rhythm as the real table. */
function tableSkeleton(){const cols=tableColumns().length,cells=(width,i)=>Array.from({length:cols*2},(_,c)=>`<span class="sk-cell"><span class="skeleton" style="width:${width}%;--i:${i}"></span></span>`).join('');
  const periods=`<span class="sk-period" style="grid-column:span ${cols}"><span class="skeleton" style="width:44%;--i:0"></span></span>`.repeat(2);
  const body=[58,64,52,60].map((width,i)=>`<div class="sk-row" style="--cols:${cols*2}"><span class="sk-cell sk-name"><span class="skeleton sk-box" style="--i:${i+2}"></span><span class="skeleton" style="width:${width}%;--i:${i+2}"></span></span>${cells(70,i+2)}</div>`).join('');
  return `<span class="sr-only">Loading balances…</span><div class="table-skeleton" aria-hidden="true"><div class="sk-row sk-head" style="--cols:${cols*2}"><span class="sk-cell sk-name"><span class="skeleton" style="width:42%;--i:0"></span></span>${periods}</div><div class="sk-row sk-head" style="--cols:${cols*2}"><span class="sk-cell sk-name"><span class="skeleton" style="width:50%;--i:1"></span></span>${cells(78,1)}</div>${body}</div>`}
function retryLoad(){setTableState('loading');setTimeout(()=>{setTableState(null);renderTable();animateRevealedRows(new Set());$('#balanceRows [data-row]')?.focus({preventScroll:true})},prefersStill()?300:1400)}
/* First load: a short skeleton while the balances arrive (?simulate=slow-load holds it for 4 s). */
function bootStates(){if(simulate.loadFails){setTableState('error');return}if(prefersStill()&&!simulate.slowLoad)return;setTableState('loading');setTimeout(()=>{setTableState(null);renderTable();animateRevealedRows(new Set())},simulate.slowLoad?4000:650)}
/* Confirm dialog (GDS): asks before anything that throws work away. The page behind dims and goes inert;
   focus starts on the safe choice; Escape or a click outside means No; focus returns to whatever opened it. */
/* safePrimary: the staying choice is the blue button (e.g. "Stay on the page"), the risky one is secondary. */
function confirmDialog({title,body,confirmLabel='Yes',cancelLabel='No',tone='danger',opener:from=null,safePrimary=false}){return new Promise(resolve=>{
  const opener=from||document.activeElement,layer=document.createElement('div');layer.className='dialog-layer';
  layer.innerHTML=`<div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialogTitle" aria-describedby="dialogBody" data-tone="${tone}"><span class="dialog-icon" aria-hidden="true">${UI.icon('i-alert')}</span><h2 id="dialogTitle"></h2><p id="dialogBody"></p><div class="dialog-actions">${safePrimary?'<button type="button" class="ds-primary-action" data-answer="no"></button><button type="button" class="dialog-secondary" data-answer="yes"></button>':'<button type="button" class="ds-primary-action" data-answer="yes"></button><button type="button" class="dialog-secondary" data-answer="no"></button>'}</div></div>`;
  layer.querySelector('#dialogTitle').textContent=title;layer.querySelector('#dialogBody').textContent=body;layer.querySelector('[data-answer="yes"]').textContent=confirmLabel;layer.querySelector('[data-answer="no"]').textContent=cancelLabel;
  document.body.append(layer);const behind=setBehindInert(layer,true);requestAnimationFrame(()=>layer.classList.add('is-open'));layer.querySelector('[data-answer="no"]').focus();
  const close=answer=>{document.removeEventListener('keydown',onKey,true);layer.classList.remove('is-open');layer.classList.add('is-closing');setBehindInert(layer,false,behind);setTimeout(()=>layer.remove(),prefersStill()?0:180);opener?.focus?.({preventScroll:true});resolve(answer)};
  const onKey=event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(false)}if(event.key==='Tab'){const items=[...layer.querySelectorAll('button')],at=items.indexOf(document.activeElement);event.preventDefault();items[(at+(event.shiftKey?-1:1)+items.length)%items.length].focus()}};
  document.addEventListener('keydown',onKey,true);
  layer.addEventListener('click',event=>{const answer=event.target.closest('[data-answer]');if(answer)close(answer.dataset.answer==='yes');else if(!event.target.closest('.dialog'))close(false)});
})}
/* While a dialog is open, everything behind it (header, sidebar, page) is inert; each element's earlier state is restored after. */
function setBehindInert(layer,on,previous){const others=[...document.body.children].filter(el=>el!==layer&&el.tagName!=='SCRIPT');if(on){const before=others.map(el=>el.inert);others.forEach(el=>{el.inert=true});return before}others.forEach((el,i)=>{el.inert=previous?.[i]??false})}
