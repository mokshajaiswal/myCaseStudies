/* Row configuration is a draft until the shared Apply button commits it. */
const rowGroups={
  categories:{label:'Posting categories',symbol:'i-tag',options:[
    {id:'merchant-fee',label:'Merchant Service Fee',folder:'Pseudo ledger 1'},
    {id:'card-settlement',label:'Card Settlement',folder:'Pseudo ledger 1'},
    {id:'principal',label:'Retail Principal Billed',folder:'Pseudo ledger 2'},
    {id:'principal-unbilled',label:'Retail Principal Unbilled',folder:'Pseudo ledger 2'},
    {id:'interest',label:'Retail Interest Billed',folder:'Pseudo ledger 2'},
    {id:'annual-fee-billed',label:'Annual Fee Billed',folder:'Pseudo ledger 2'},
    {id:'annual-fee',label:'Annual Fee Unbilled',folder:'Pseudo ledger 2'},
    {id:'late-fee',label:'Late Fee Billed',folder:'Pseudo ledger 2'}]},
  vouchers:{label:'Voucher codes',symbol:'i-receipt',code:true,options:[
    {id:'cash-place-hold',label:'card_cash_place_hold'},
    {id:'cash-hold',label:'card_cash_update_hold'},
    {id:'cash-clearance',label:'card_cash_clearance_against_hold'},
    {id:'cash-refund',label:'card_cash_clearance_refund'},
    {id:'purchase-hold',label:'card_purchase_place_hold'},
    {id:'purchase-update-hold',label:'card_purchase_update_hold'}]},
  posting:{label:'Posting codes',symbol:'i-clipboard',code:true,options:[
    {id:'pc-active-hold',label:'active-hold'},
    {id:'pc-place-hold',label:'place-hold'},
    {id:'pc-release-hold',label:'release-hold'},
    {id:'pc-add-ledger-attachment',label:'add_ledger_attachment'},
    {id:'pc-delete-ledger-attachment',label:'delete-ledger-attachment'},
    {id:'pc-update-ledger-attachment',label:'update-ledger-attachment'},
    {id:'pc-update',label:'update'},
    {id:'pc-settle',label:'settle'},
    {id:'pc-reverse',label:'reverse'},
    {id:'pc-write-off',label:'write-off'}]},
  /* Columns tab: same picker engine, different panel. Order here is the order of table columns. */
  /* Posting classes are cards (see classesHtml); each card picks measures and an aggregation. */
  /* Columns tab: both groups are lists of cards (see classesHtml, balanceCardsHtml). */
  classes:{label:'Posting classes',symbol:'i-classes',scope:'columns',cards:'classes',options:[]},
  measures:{label:'Balance codes',symbol:'i-sigma',scope:'columns',cards:'balance',options:[]},
  balance:{label:'Balance codes',symbol:'i-sigma',options:[
    {id:'balance-current',label:'Current balance'},
    {id:'balance-pending',label:'Pending balance'}]}
};
const escapeRowText=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const treeNodes=(()=>{const output=[];function walk(nodes){nodes.forEach(node=>{if(node.type!=='attribute'){output.push(node);walk(node.children||[])}})}walk(accounts);return output})();
const allNodeIds=treeNodes.map(node=>node.id);
const parentByNode=new Map();
function indexParents(nodes,parent=null){nodes.forEach(node=>{if(node.type==='attribute')return;if(parent)parentByNode.set(node.id,parent.id);indexParents(node.children||[],node)})}
indexParents(accounts);
const initialAttributes={categories:['principal','interest'],vouchers:[],posting:[],balance:[],measures:[],classes:[{id:'c1',measures:['opening','debit','closing'],aggs:['default']}]};
const CLASS_MEASURES=[{id:'opening',label:'Opening balance'},{id:'closing',label:'Closing balance'},{id:'debit',label:'Debit value'},{id:'debit-count',label:'Debit count',kind:'count'},{id:'credit',label:'Credit value'},{id:'credit-count',label:'Credit count',kind:'count'}];
/* Balance codes are named formulas over postings; the formula shows under the chosen code. */
const BALANCE_CODES=[{value:'bc1',label:'Balance Code 1',detail:'(Debit Count + Credit Count)/2',kind:'count'},{value:'bc2',label:'Balance Code 2',detail:'Opening Balance + Debit Value − Credit Value'},{value:'bc3',label:'Balance Code 3',detail:'(Opening Balance + Closing Balance)/2'},{value:'bc4',label:'Balance Code 4',detail:'Closing Balance − Opening Balance'}];
const AGGREGATE_FUNCTIONS=[{value:'default',label:'As calculated',detail:'The code’s own value for the period'},{value:'min',label:'Minimum',detail:'Lowest value in the period'},{value:'max',label:'Maximum',detail:'Highest value in the period'},{value:'average',label:'Average',detail:'Mean across the period'}];
const balanceColumns=cards=>cards.filter(card=>card.code&&card.agg).map(card=>{const code=BALANCE_CODES.find(item=>item.value===card.code),agg=AGGREGATE_FUNCTIONS.find(item=>item.value===card.agg);return {id:card.agg==='default'?card.code:`${card.code}@${card.agg}`,label:card.agg==='default'?code.label:`(${agg.label}) ${code.label}`,kind:code.kind}});
const AGGREGATIONS=[{id:'min',label:'Min'},{id:'max',label:'Max'},{id:'average',label:'Average'},{id:'default',label:'Default'}];
let classSeq=1;
/* The picker engine works on any field: a group key ("posting") or a card field ("pc|c1|m" measures, "pc|c1|a" aggregation). */
const isCardKey=key=>key.startsWith('pc|');
const cardOf=key=>draftRows.attributes.classes.find(card=>card.id===key.split('|')[1]);
function groupOf(key){if(!isCardKey(key))return rowGroups[key];return key.endsWith('|m')?{label:'Measures',options:CLASS_MEASURES,confirm:'Select'}:{label:'Aggregation',options:AGGREGATIONS,confirm:'Select'}}
function selOf(key){if(!isCardKey(key))return draftRows.attributes[key];const card=cardOf(key);return key.endsWith('|m')?card.measures:card.aggs}
function setSel(key,ids){if(!isCardKey(key)){draftRows.attributes[key]=ids;return}const card=cardOf(key);if(key.endsWith('|m'))card.measures=ids;else card.aggs=ids.length?ids:['default']}
function classColumns(cards){return cards.flatMap(card=>CLASS_MEASURES.filter(measure=>card.measures.includes(measure.id)).flatMap(measure=>['default','min','max','average'].map(id=>AGGREGATIONS.find(agg=>agg.id===id)).filter(agg=>card.aggs.includes(agg.id)).map(agg=>agg.id==='default'?{...measure}:{...measure,id:`${measure.id}@${agg.id}`,label:`(${agg.label}) ${measure.label}`})))}
const copyRows=value=>({nodes:new Set(value.nodes),attributes:structuredClone(value.attributes)});
let appliedRows={nodes:new Set(allNodeIds),attributes:initialAttributes};
let draftRows=copyRows(appliedRows);
const rowUI={openGroup:null,picker:null,treeOpen:new Set(),search:'',pending:new Set(),toggled:null,current:null,pickerQuery:'',chipsOpen:new Set(),folderOpen:new Set(['Pseudo ledger 2']),added:new Set(),counts:{},shown:{group:null,picker:null,folders:new Set()}};
function groupForAttribute(node){return node.group||({principal:'categories',interest:'categories'}[node.id]||'balance')}
function isRowVisible(node){return node.type==='attribute'?draftRows.attributes[groupForAttribute(node)]?.includes(node.id):draftRows.nodes.has(node.id)}
/* A node is checked when it and everything under it is shown, and mixed when only part of it is. */
function nodeDescendants(node){return (node.children||[]).filter(child=>child.type!=='attribute').flatMap(child=>[child,...nodeDescendants(child)])}
function nodeCheckState(node){const below=nodeDescendants(node),selected=draftRows.nodes.has(node.id),picked=below.filter(child=>draftRows.nodes.has(child.id)).length;
  if(selected&&picked===below.length)return 'full';return selected||picked?'partial':'none'}
function highlightName(name){const query=rowUI.search,at=query?name.toLowerCase().indexOf(query.toLowerCase()):-1;
  return at<0?escapeRowText(name):`${escapeRowText(name.slice(0,at))}<mark>${escapeRowText(name.slice(at,at+query.length))}</mark>${escapeRowText(name.slice(at+query.length))}`}
function rowTreeHtml(nodes,depth=0){return nodes.filter(node=>node.type!=='attribute').map(node=>{
  const children=(node.children||[]).filter(child=>child.type!=='attribute');
  const query=rowUI.search.toLowerCase(),matches=node.name.toLowerCase().includes(query),childMatches=children.some(child=>subtreeMatches(child,query));
  if(query&&!matches&&!childMatches)return '';
  const open=rowUI.treeOpen.has(node.id)||Boolean(query&&childMatches),state=nodeCheckState(node);
  return UI.treeLine({id:node.id,nameHtml:highlightName(node.name),depth,tone:depth===0?node.id:'',open,hasChildren:Boolean(children.length),state:{full:'on',partial:'mixed',none:'off'}[state],label:node.name,current:rowUI.current===node.id})+(children.length&&open?rowTreeHtml(children,depth+1):'');
}).join('')}
function subtreeMatches(node,query){return node.name.toLowerCase().includes(query)||(node.children||[]).some(child=>subtreeMatches(child,query))}
function renderTree(){
  const before=new Map($$('#rowsTree [data-node-check]').map(input=>[input.dataset.nodeCheck,`${input.checked}/${input.indeterminate}`]));
  const counter=$('#rowsNodeCount'),count=`${draftRows.nodes.size}`;
  if(counter.textContent&&counter.textContent!==count){counter.classList.remove('is-bumped');void counter.offsetWidth;counter.classList.add('is-bumped')}
  counter.textContent=count;
  const tops=captureTops('#rowsTree [data-flip]','data-flip');
  glideHeight($('#rowsTree'),()=>{$('#rowsTree').innerHTML=rowTreeHtml(accounts)||'<p class="rows-empty">No matching nodes</p>'});slideFrom(tops,'#rowsTree [data-flip]','data-flip');
  $$('#rowsTree [data-partial]').forEach(input=>{input.indeterminate=true});
  /* Motion only marks what changed: new lines slide in, changed boxes pop, the toggled caret turns. */
  let fresh=0;
  $$('#rowsTree [data-node-check]').forEach(input=>{const id=input.dataset.nodeCheck,line=input.closest('.rows-tree-line');
    if(!before.has(id)){if(before.size){line.style.setProperty('--line-delay',`${Math.min(fresh++,8)*24}ms`);line.classList.add('is-new')}}
    else if(before.get(id)!==`${input.checked}/${input.indeterminate}`)line.classList.add('just-changed')});
  if(rowUI.toggled){$(`#rowsTree [data-line="${rowUI.toggled}"]`)?.classList.add('just-toggled');rowUI.toggled=null}
const all=allNodeIds.every(id=>draftRows.nodes.has(id));$('#rowsSelectAll').checked=all;$('#rowsSelectAll').indeterminate=!all&&draftRows.nodes.size>0}
function groupRowHtml(key){if(rowGroups[key].cards==='classes')return classesHtml(key);if(rowGroups[key].cards==='balance')return balanceCardsHtml(key);const group=rowGroups[key],selected=draftRows.attributes[key],open=rowUI.openGroup===key,expanded=rowUI.chipsOpen.has(key);
  const labelOf=id=>group.options.find(option=>option.id===id)?.label||id;
  const shown=selected.filter((_,index)=>expanded||selected.length<=CHIP_LIMIT||index<CHIP_LIMIT);
  const chips=shown.map((id,index)=>UI.chip({label:labelOf(id),flip:`c:${key}:${id}`,removeAttr:`data-remove-attribute="${key}:${id}"`,isNew:rowUI.added.has(id),delay:index*35})).join('')+(selected.length>CHIP_LIMIT?UI.moreChip({attr:`data-more-chips="${key}"`,hidden:selected.length-CHIP_LIMIT,expanded}):'');
  const field=UI.pickerField({chipsHtml:chips,placeholder:`Select ${group.label.toLowerCase()}`,clearAttr:`data-clear-attribute="${key}"`,clearLabel:group.label.toLowerCase(),toggleAttr:`data-open-picker="${key}"`,toggleLabel:`Choose ${group.label}`,open:rowUI.picker===key});
  return `<div class="rows-attribute ${open?'is-open':''} ${group.code?'is-code':''}">${UI.groupHead({attr:`data-open-group="${key}"`,open,symbol:group.symbol,symbolClass:`rows-symbol-${key}`,label:group.label,countValue:selected.length})}${open?`<div class="rows-group-body ${rowUI.shown.group===key?'is-settled':''}"><div class="rows-picker-wrap">${field}${rowUI.picker===key?pickerHtml(key):''}</div></div>`:''}</div>`}
const CHIP_LIMIT=6,SEARCH_FROM=8;
/* A picker field for any key: chips for multi-value fields, a one-line summary for the aggregation. */
function fieldHtml(key,{placeholder,summary=false}){const group=groupOf(key),selected=selOf(key),open=rowUI.picker===key,expanded=rowUI.chipsOpen.has(key);
  const labelOf=id=>group.options.find(option=>option.id===id)?.label||id;
  if(summary){const text=selected.length===group.options.length?'All':group.options.filter(option=>selected.includes(option.id)).map(option=>option.label).join(', ');
    return `<div class="rows-picker-wrap">${UI.pickerField({summary:text,toggleAttr:`data-open-picker="${key}"`,toggleLabel:`Choose ${group.label.toLowerCase()}`,open})}${open?pickerHtml(key):''}</div>`}
  const shown=selected.filter((_,index)=>expanded||selected.length<=CHIP_LIMIT||index<CHIP_LIMIT);
  const chips=shown.map((id,index)=>UI.chip({label:labelOf(id),flip:`c:${key}:${id}`,removeAttr:`data-remove-attribute="${key}:${id}"`,isNew:rowUI.added.has(id),delay:index*35})).join('')+(selected.length>CHIP_LIMIT?UI.moreChip({attr:`data-more-chips="${key}"`,hidden:selected.length-CHIP_LIMIT,expanded}):'');
  return `<div class="rows-picker-wrap">${UI.pickerField({chipsHtml:chips,placeholder,clearAttr:`data-clear-attribute="${key}"`,clearLabel:group.label.toLowerCase(),toggleAttr:`data-open-picker="${key}"`,toggleLabel:`Choose ${group.label.toLowerCase()}`,open})}${open?pickerHtml(key):''}</div>`}
function classesHtml(key){const group=rowGroups[key],cards=draftRows.attributes[key],open=rowUI.openGroup===key;
  const body=cards.length?cards.map((card,index)=>UI.classCard({id:card.id,index:index+1,isNew:rowUI.newCard===card.id,removeAttr:`data-remove-card="${key}:${card.id}"`,bodyHtml:fieldHtml(`pc|${card.id}|m`,{placeholder:'Select measures'})+fieldHtml(`pc|${card.id}|a`,{summary:true})})).join(''):'<p class="rows-empty class-empty">No posting classes yet. Use Add to create one.</p>';
  return `<div class="rows-attribute ${open?'is-open':''}">${UI.groupHead({attr:`data-open-group="${key}"`,open,symbol:group.symbol,symbolClass:`rows-symbol-${key}`,label:group.label,countValue:cards.length,action:open?UI.headAction({attr:`data-add-card="${key}"`}):''})}${open?`<div class="rows-group-body class-list ${rowUI.shown.group===key?'is-settled':''}">${body}</div>`:''}</div>`}
function balanceCardsHtml(key){const group=rowGroups[key],cards=draftRows.attributes[key],open=rowUI.openGroup===key;
  const body=cards.length?cards.map((card,index)=>{const code=BALANCE_CODES.find(item=>item.value===card.code);
    return UI.classCard({id:card.id,index:index+1,noun:'balance code',isNew:rowUI.newCard===card.id,removeAttr:`data-remove-card="${key}:${card.id}"`,bodyHtml:`<div class="card-field">${UI.select({key:`bc|${card.id}|code`,value:card.code,placeholder:'Select balance code',label:'Balance code',options:BALANCE_CODES,open:rowUI.select===`bc|${card.id}|code`})}${code?`<p class="card-formula" aria-live="polite">${UI.esc(code.detail)}</p>`:''}</div>${UI.select({key:`bc|${card.id}|agg`,value:card.agg,placeholder:'Select aggregate function',label:'Aggregate function',options:AGGREGATE_FUNCTIONS,open:rowUI.select===`bc|${card.id}|agg`})}`})}).join(''):'<p class="rows-empty class-empty">No balance codes yet. Use Add to create one.</p>';
  return `<div class="rows-attribute ${open?'is-open':''}">${UI.groupHead({attr:`data-open-group="${key}"`,open,symbol:group.symbol,symbolClass:`rows-symbol-${key}`,label:group.label,countValue:cards.length,action:open?UI.headAction({attr:`data-add-card="${key}"`}):''})}${open?`<div class="rows-group-body class-list ${rowUI.shown.group===key?'is-settled':''}">${body}</div>`:''}</div>`}
function markMatch(text,query){const at=query?text.toLowerCase().indexOf(query.toLowerCase()):-1;return at<0?escapeRowText(text):`${escapeRowText(text.slice(0,at))}<mark>${escapeRowText(text.slice(at,at+query.length))}</mark>${escapeRowText(text.slice(at+query.length))}`}
function pickerMatches(key){const query=rowUI.pickerQuery.toLowerCase();return groupOf(key).options.filter(option=>!query||option.label.toLowerCase().includes(query))}
function pickerHtml(key){const group=groupOf(key),query=rowUI.pickerQuery,matches=pickerMatches(key),all=matches.length>0&&matches.every(option=>rowUI.pending.has(option.id)),some=matches.some(option=>rowUI.pending.has(option.id));
  const optionHtml=option=>UI.option({attr:`data-attribute-option="${option.id}"`,flip:`o:${option.id}`,state:rowUI.pending.has(option.id)?'on':'off',labelHtml:markMatch(option.label,query)});
  const folderHtml=folder=>{const all=group.options.filter(option=>option.folder===folder),items=matches.filter(option=>option.folder===folder),picked=all.filter(option=>rowUI.pending.has(option.id)).length,open=rowUI.folderOpen.has(folder)||Boolean(query);
    if(!items.length)return '';
    return `<div class="rows-folder-group ${open?'is-open':''}">${UI.folderLine({name:folder,flip:`f:${folder}`,toggleAttr:`data-folder-toggle="${folder}"`,checkAttr:`data-folder-all="${folder}"`,state:picked===all.length?'on':picked?'mixed':'off',open,picked,total:all.length})}${open?`<div class="rows-folder-items ${rowUI.shown.folders.has(folder)?'is-settled':''}">${items.map(optionHtml).join('')}</div>`:''}</div>`};
  const options=(key==='categories'?['Pseudo ledger 1','Pseudo ledger 2'].map(folderHtml).join(''):matches.map(optionHtml).join(''))||`<p class="rows-empty">No ${escapeRowText(group.label.toLowerCase())} match “${escapeRowText(query)}”</p>`;
  const search=group.options.length>=SEARCH_FROM?UI.search({attr:'data-picker-search',value:query,placeholder:`Search ${group.label.toLowerCase()}`,extraClass:'rows-picker-search'}):'';
  const selectAll=`<label class="rows-option rows-select-all">${UI.checkbox({attr:'data-attribute-all',state:all?'on':some?'mixed':'off',disabled:!matches.length})}<span>${query?'Select all results':'Select all'}</span></label>`;
  return `<div class="rows-picker-menu ${rowUI.shown.picker===key?'is-settled':''}">${search}${selectAll}<div class="rows-options">${options}</div>${UI.menuFooter({countText:`${rowUI.pending.size} selected`,cancelAttr:'data-picker-cancel',confirmAttr:'data-picker-add',confirmLabel:group.confirm||'Add'})}</div>`}
function renderGroups(){const tops=captureTops('.attr-panel .rows-attribute [data-flip]','data-flip'),scrolled=$('.attr-panel .rows-options')?.scrollTop||0;for(const key of Object.keys(rowGroups)){const wrap=$(`#rowsGroup-${key}`),html=groupRowHtml(key);if(wrap.innerHTML!==html)glideHeight(wrap,()=>{wrap.innerHTML=html});
    const count=draftRows.attributes[key].length;if(rowUI.counts[key]!==undefined&&rowUI.counts[key]!==count)$(`#rowsGroup-${key} .rows-count`)?.classList.add('is-bumped');rowUI.counts[key]=count}
  const list=$('.attr-panel .rows-options');if(list)list.scrollTop=scrolled;
  slideFrom(tops,'.attr-panel .rows-attribute [data-flip]','data-flip');
  $$('.attr-panel .rows-picker-menu [data-partial]').forEach(input=>{input.indeterminate=true});rowUI.added.clear();rowUI.newCard=null;
  /* Panels animate only when they first appear; re-renders inside them stay still. */
  rowUI.shown={group:rowUI.openGroup,picker:rowUI.picker,folders:rowUI.picker?new Set(rowUI.folderOpen):new Set()}}
function closeSelect(){const key=rowUI.select;if(!key)return;rowUI.select=null;renderGroups();$(`[data-select-toggle="${key}"]`)?.focus({preventScroll:true})}
function closePicker(){const key=rowUI.picker;if(!key)return;rowUI.picker=null;rowUI.pickerQuery='';renderGroups();$(`[data-open-picker="${key}"]`)?.focus({preventScroll:true})}
function renderRows(){renderTree();renderGroups()}
function setSubtree(node,checked){if(node.type==='attribute')return;checked?draftRows.nodes.add(node.id):draftRows.nodes.delete(node.id);(node.children||[]).forEach(child=>setSubtree(child,checked))}
function selectAncestors(id){let parent=parentByNode.get(id);while(parent){draftRows.nodes.add(parent);parent=parentByNode.get(parent)}}
function rowsChanged(){if(draftRows.nodes.size!==appliedRows.nodes.size||[...draftRows.nodes].some(id=>!appliedRows.nodes.has(id)))return true;return Object.keys(rowGroups).some(key=>JSON.stringify(draftRows.attributes[key])!==JSON.stringify(appliedRows.attributes[key]))||Object.keys(rowGroups).some(key=>draftRows.attributes[key].join('|')!==appliedRows.attributes[key].join('|'))}
/* The table's columns: chosen balance codes first, then posting classes, each in catalogue order. */
const dedupe=columns=>columns.filter((column,index)=>columns.findIndex(other=>other.id===column.id)===index);
window.rowsModel={snapshot:()=>copyRows(appliedRows),restore(snap){appliedRows=copyRows(snap);draftRows=copyRows(snap);rowUI.picker=null;rowUI.select=null;renderRows()},columns:()=>dedupe([...classColumns(appliedRows.attributes.classes),...balanceColumns(appliedRows.attributes.measures)]),draftColumnCount:()=>classColumns(draftRows.attributes.classes).length+balanceColumns(draftRows.attributes.measures).length,emptyClass:()=>draftRows.attributes.classes.some(card=>!card.measures.length),incompleteBalance:()=>draftRows.attributes.measures.findIndex(card=>!card.code||!card.agg)+1,isVisible:node=>node.type==='attribute'?appliedRows.attributes[groupForAttribute(node)]?.includes(node.id):appliedRows.nodes.has(node.id),hasChanges:rowsChanged,apply(){appliedRows=copyRows(draftRows)},discard(){draftRows=copyRows(appliedRows);rowUI.picker=null;renderRows()}};
$('#rowsSettings').innerHTML=`<div class="rows-section"><button class="rows-section-head" id="rowsNodeToggle" aria-expanded="false"><svg class="rows-head-chevron"><use href="#i-chevron"/></svg><svg class="rows-group-symbol rows-symbol-nodes" aria-hidden="true"><use href="#i-tree"/></svg><strong>CoA Nodes</strong><span class="rows-count" id="rowsNodeCount"></span></button><div class="rows-tree-panel" id="rowsNodePanel" hidden><label class="rows-search"><svg><use href="#i-search"/></svg><input id="rowsSearch" type="search" placeholder="Search CoA nodes" aria-label="Search CoA nodes"></label><label class="rows-all"><input type="checkbox" id="rowsSelectAll"> Select all</label><div id="rowsTree"></div></div></div><div class="rows-section-label">Attributes <button class="field-help" title="Attributes appear under accounts in the table after Apply" aria-label="About attributes"><svg><use href="#i-info"/></svg></button></div>${Object.keys(rowGroups).filter(key=>!rowGroups[key].scope).map(key=>`<div id="rowsGroup-${key}"></div>`).join('')}`;
$('#columnsSettings').innerHTML=Object.keys(rowGroups).filter(key=>rowGroups[key].scope==='columns').map(key=>`<div id="rowsGroup-${key}"></div>`).join('');
/* Opening a section never yanks the panel: the header stays put, and only if the new content would fall below the fold
   does the panel scroll, smoothly and just enough, once the section has finished gliding open. */
function revealSection(section){if(!section)return;const panel=section.closest('.attr-panel')||document;
  /* Measure only once every glide in the panel has landed, so the decision uses the final layout. */
  requestAnimationFrame(()=>Promise.all(document.getAnimations().filter(animation=>panel.contains?.(animation.effect?.target)).map(animation=>animation.finished.catch(()=>{}))).then(()=>{
    const box=section.getBoundingClientRect();if(box.bottom<=innerHeight-12&&box.top>=0)return;
    section.scrollIntoView({block:box.height>innerHeight*.8?'start':'nearest',behavior:prefersStill()?'auto':'smooth'})}))}
/* Rows and Columns share one picker engine; both panels listen the same way. */
function onPanels(type,handler){$$('.attr-panel').forEach(panel=>panel.addEventListener(type,handler))}
$('#rowsNodeToggle').addEventListener('click',()=>{const panel=$('#rowsNodePanel'),opening=panel.hidden;glideHeight($('#rowsSettings .rows-section'),()=>{panel.hidden=!opening});$('#rowsNodeToggle').setAttribute('aria-expanded',String(opening));if(opening)$('#rowsSearch').focus({preventScroll:true});if(opening)revealSection($('#rowsSettings .rows-section'))});
$('#rowsSearch').addEventListener('input',event=>{rowUI.search=event.target.value.trim();renderTree()});
$('#rowsSelectAll').addEventListener('change',event=>{draftRows.nodes=event.target.checked?new Set(allNodeIds):new Set();renderTree();updateDraftStatus()});
/* The line you last clicked becomes the current one, so your place in a deep tree stays marked. */
function markCurrent(id){rowUI.current=id;$$('#rowsTree .rows-tree-line').forEach(line=>{const on=line.dataset.line===id;line.classList.toggle('is-current',on);on?line.setAttribute('aria-current','true'):line.removeAttribute('aria-current')})}
$('#rowsTree').addEventListener('click',event=>{const line=event.target.closest('[data-line]');if(line)markCurrent(line.dataset.line);const toggle=event.target.closest('[data-tree-toggle]');if(!toggle)return;const id=toggle.dataset.treeToggle;rowUI.treeOpen.has(id)?rowUI.treeOpen.delete(id):rowUI.treeOpen.add(id);rowUI.toggled=id;renderTree();$(`[data-tree-toggle="${id}"]`)?.focus({preventScroll:true})});
$('#rowsTree').addEventListener('change',event=>{const id=event.target.dataset.nodeCheck;if(!id)return;const node=treeNodes.find(item=>item.id===id);setSubtree(node,event.target.checked);if(event.target.checked)selectAncestors(id);rowUI.current=id;renderTree();updateDraftStatus();$(`[data-node-check="${id}"]`)?.focus({preventScroll:true})});
onPanels('click',event=>{
  const groupButton=event.target.closest('[data-open-group]');if(groupButton){const key=groupButton.dataset.openGroup;rowUI.openGroup=rowUI.openGroup===key?null:key;rowUI.picker=null;rowUI.select=null;renderGroups();$(`[data-open-group="${key}"]`)?.focus({preventScroll:true});if(rowUI.openGroup)revealSection($(`#rowsGroup-${key}`));return}
  /* Add + creates a card and opens its first field; the x fades a card out and the rest slide up. */
  const addCard=event.target.closest('[data-add-card]');if(addCard){const key=addCard.dataset.addCard,id=`c${++classSeq}`;rowUI.openGroup=key;rowUI.newCard=id;rowUI.picker=null;rowUI.select=null;
    if(key==='classes'){draftRows.attributes.classes.push({id,measures:[],aggs:['default']});rowUI.picker=`pc|${id}|m`;rowUI.pickerQuery='';rowUI.pending=new Set()}
    else{draftRows.attributes[key].push({id,code:'',agg:''});rowUI.select=`bc|${id}|code`}
    renderGroups();updateDraftStatus();if(rowUI.select)$(`[data-select-option="${rowUI.select}"]`)?.focus({preventScroll:true});return}
  const removeCard=event.target.closest('[data-remove-card]');if(removeCard){const [key,id]=removeCard.dataset.removeCard.split(':');removeCard.closest('.class-card')?.classList.add('is-leaving');setTimeout(()=>{draftRows.attributes[key]=draftRows.attributes[key].filter(card=>card.id!==id);if(rowUI.picker?.includes(`|${id}|`))rowUI.picker=null;if(rowUI.select?.includes(`|${id}|`))rowUI.select=null;renderGroups();updateDraftStatus();$(`[data-add-card="${key}"]`)?.focus({preventScroll:true})},matchMedia('(prefers-reduced-motion: reduce)').matches?0:160);return}
  const selectToggle=event.target.closest('[data-select-toggle]');if(selectToggle){const key=selectToggle.dataset.selectToggle;rowUI.select=rowUI.select===key?null:key;rowUI.picker=null;renderGroups();$(`[data-select-toggle="${key}"]`)?.focus({preventScroll:true});if(rowUI.select)$(`[data-select-option="${key}"].is-selected,[data-select-option="${key}"]`)?.focus({preventScroll:true});return}
  const selectOption=event.target.closest('[data-select-option]');if(selectOption){const key=selectOption.dataset.selectOption,[,id,field]=key.split('|'),card=draftRows.attributes.measures.find(item=>item.id===id);if(card)card[field]=selectOption.dataset.value;rowUI.select=null;
    /* Choosing a code moves straight on to its aggregate when that is still empty. */
    if(card&&field==='code'&&!card.agg)rowUI.select=`bc|${id}|agg`;
    renderGroups();updateDraftStatus();$(rowUI.select?`[data-select-option="${rowUI.select}"]`:`[data-select-toggle="${key}"]`)?.focus({preventScroll:true});return}
  const remove=event.target.closest('[data-remove-attribute]');if(remove){const at=remove.dataset.removeAttribute.lastIndexOf(':'),key=remove.dataset.removeAttribute.slice(0,at),id=remove.dataset.removeAttribute.slice(at+1);remove.closest('.ds-chip')?.classList.add('is-leaving');setTimeout(()=>{setSel(key,selOf(key).filter(item=>item!==id));renderGroups();updateDraftStatus();$(`[data-open-picker="${key}"]`)?.focus({preventScroll:true})},matchMedia('(prefers-reduced-motion: reduce)').matches?0:150);return}
  const clear=event.target.closest('[data-clear-attribute]');if(clear){const key=clear.dataset.clearAttribute;$$(`[data-flip^="c:${key}:"]`).forEach(chip=>chip.classList.add('is-leaving'));setTimeout(()=>{setSel(key,[]);rowUI.picker=null;renderGroups();updateDraftStatus();$(`[data-open-picker="${key}"]`)?.focus({preventScroll:true})},matchMedia('(prefers-reduced-motion: reduce)').matches?0:150);return}
  const folder=event.target.closest('[data-folder-toggle]');if(folder){const name=folder.dataset.folderToggle;rowUI.folderOpen.has(name)?rowUI.folderOpen.delete(name):rowUI.folderOpen.add(name);renderGroups();$(`[data-folder-toggle="${name}"]`)?.focus({preventScroll:true});return}
  const more=event.target.closest('[data-more-chips]');if(more){const key=more.dataset.moreChips;rowUI.chipsOpen.has(key)?rowUI.chipsOpen.delete(key):rowUI.chipsOpen.add(key);renderGroups();$(`[data-more-chips="${key}"]`)?.focus({preventScroll:true});return}
  const picker=event.target.closest('[data-open-picker]');if(picker){const key=picker.dataset.openPicker;rowUI.picker=rowUI.picker===key?null:key;rowUI.pickerQuery='';rowUI.pending=new Set(selOf(key));renderGroups();return}
  if(event.target.closest('[data-picker-cancel]')){closePicker();return}
  if(event.target.closest('[data-picker-add]')){const key=rowUI.picker,before=new Set(selOf(key));setSel(key,groupOf(key).options.map(item=>item.id).filter(id=>rowUI.pending.has(id)));selOf(key).filter(id=>!before.has(id)).forEach(id=>rowUI.added.add(id));rowUI.picker=null;renderGroups();updateDraftStatus()}
});
onPanels('change',event=>{if(!rowUI.picker)return;const key=rowUI.picker;if(event.target.matches('[data-attribute-all]'))pickerMatches(key).forEach(item=>event.target.checked?rowUI.pending.add(item.id):rowUI.pending.delete(item.id));else if(event.target.matches('[data-attribute-option]')){const id=event.target.dataset.attributeOption;event.target.checked?rowUI.pending.add(id):rowUI.pending.delete(id)}
  else if(event.target.matches('[data-folder-all]')){const ids=rowGroups[key].options.filter(item=>item.folder===event.target.dataset.folderAll).map(item=>item.id);ids.forEach(id=>event.target.checked?rowUI.pending.add(id):rowUI.pending.delete(id))}else return;
  const focus=event.target.dataset.attributeOption?`[data-attribute-option="${event.target.dataset.attributeOption}"]`:event.target.dataset.folderAll?`[data-folder-all="${event.target.dataset.folderAll}"]`:'[data-attribute-all]';
  renderGroups();const again=$(`.attr-panel ${focus}`);again?.focus({preventScroll:true});again?.closest('.rows-folder-line,.rows-option')?.classList.add('just-changed')});
onPanels('input',event=>{if(!event.target.matches('[data-picker-search]'))return;rowUI.pickerQuery=event.target.value.trim();renderGroups();const field=$('.attr-panel [data-picker-search]');if(field){field.focus();field.setSelectionRange(field.value.length,field.value.length)}});
/* An open picker closes like a menu: Escape, or a press anywhere outside it. */
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&rowUI.picker)closePicker();if(event.key==='Escape'&&rowUI.select)closeSelect()});
/* Arrow keys move through a select's options, like Clock and Cycle. */
onPanels('keydown',event=>{const current=event.target.closest('[data-select-option]');if(!current||!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const items=[...current.parentElement.querySelectorAll('[data-select-option]')],index=items.indexOf(current);({ArrowDown:items[index+1]||items[0],ArrowUp:items[index-1]||items.at(-1),Home:items[0],End:items.at(-1)})[event.key].focus()});
document.addEventListener('mousedown',event=>{if(rowUI.picker&&!event.target.closest('.rows-picker-wrap'))closePicker();if(rowUI.select&&!event.target.closest(`[data-select="${rowUI.select}"]`))closeSelect()});
renderRows();renderTable();updateDraftStatus();
/* The view as first loaded is the saved baseline. */
savedView=snapshotView();updateDirty();bootStates();
