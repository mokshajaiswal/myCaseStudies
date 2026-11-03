/* Balance Explorer components.
   Every piece of UI that appears in more than one place is built here, once.
   The app (script.js, rows.js) and the component sheet (components.html) both call these,
   so a change here changes every use. Names match the component sheet: "Chip / overflow" = UI.moreChip. */
const UI=(()=>{
  const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icon=(id,cls='')=>`<svg${cls?` class="${cls}"`:''}><use href="#${id}"/></svg>`;

  /* Account group icon: one drawing per group; parts move on hover (see variant.css). */
  const groupIcons={
    assets:`<svg viewBox="0 0 24 24"><g class="gi-part gi-bag"><path class="gi-soft" d="M10.4 7.6C6.9 9.6 5 12.7 5 15.6 5 18.6 7.4 20 12 20s7-1.4 7-4.4c0-2.9-1.9-6-5.4-8"/><path d="M9 4h6l-1.7 3.6h-2.6L9 4Z"/><path d="M10 11.4h4M10 13.3h4M11.2 11.4c1.8 0 1.8 3.8 0 3.8h-1l2.8 2.6"/></g></svg>`,
    income:`<svg viewBox="0 0 24 24"><g class="gi-part gi-note"><rect class="gi-soft" x="2.5" y="7" width="13.5" height="10" rx="2"/><circle cx="9.25" cy="12" r="2.1"/></g><g class="gi-part gi-arrow"><path d="M20 5.5v9M17.4 12 20 14.6 22.6 12"/></g></svg>`,
    expenses:`<svg viewBox="0 0 24 24"><path class="gi-soft" d="M4 8.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"/><path class="gi-part gi-flap" d="M4 8.5 14.6 4.9a1.5 1.5 0 0 1 2 1.4v2.2"/><path d="M20 12h-3.4a1.6 1.6 0 0 0 0 3.2H20"/></svg>`,
    liabilities:`<svg viewBox="0 0 24 24"><circle class="gi-part gi-coin gi-soft" cx="14" cy="6.2" r="3"/><path d="M3 13v7.5"/><path d="M3 14h3l3.4-1.4a2 2 0 0 1 1.6 0l3.2 1.4a1.3 1.3 0 0 1-1 2.4h-3"/><path d="M3 19.5h10.5l6.2-3.6a1.4 1.4 0 0 0-1.5-2.4L13.6 16"/></svg>`
  };
  const acctIcon=group=>groupIcons[group]?`<span class="acct-icon" aria-hidden="true">${groupIcons[group]}</span>`:'';

  /* Checkbox: state is 'on' | 'off' | 'mixed'. Mixed is set as .indeterminate after render (UI.settle). */
  const checkbox=({attr='',state='off',disabled=false}={})=>`<input type="checkbox" ${attr} ${state==='on'?'checked':''} ${state==='mixed'?'data-partial':''} ${disabled?'disabled':''}>`;
  const settle=root=>root.querySelectorAll('input[data-partial]').forEach(input=>{input.indeterminate=true});

  /* Count badge: the number on a section header. */
  const count=(value,attr='')=>`<span class="rows-count" ${attr}>${value}</span>`;

  /* Caret: the arrow that opens a tree line, ledger or section. */
  const caret=({attr='',open=false,label='',empty=false}={})=>`<button type="button" class="rows-caret ${empty?'is-empty':''}" ${attr} aria-expanded="${open}" aria-label="${open?'Collapse':'Expand'} ${esc(label)}">${icon('i-chevron')}</button>`;
  const folderIcon=open=>icon(open?'i-folder-open':'i-folder','rows-node-icon is-folder');
  const leafIcon=()=>icon('i-stack','rows-node-icon is-leaf');

  /* Option: one checkable line in a picker. labelHtml may carry a search highlight. */
  const option=({attr='',flip='',state='off',labelHtml='',extraClass=''}={})=>`<label class="rows-option ${extraClass}" ${flip?`data-flip="${flip}"`:''}>${checkbox({attr,state})}<span>${labelHtml}</span></label>`;

  /* Folder line: a ledger inside a picker, with its own checkbox and picked/total count. */
  const folderLine=({name,flip='',toggleAttr='',checkAttr='',state='off',open=false,picked=0,total=0}={})=>
    `<div class="rows-folder-line" ${flip?`data-flip="${flip}"`:''}>${caret({attr:toggleAttr,open,label:name})}<label class="rows-folder-label">${checkbox({attr:checkAttr,state})}${folderIcon(open)}<span>${esc(name)}</span></label><span class="rows-folder-count">${picked}/${total}</span></div>`;

  /* Tree line: one CoA node with caret, tri-state checkbox and folder/leaf icon. */
  /* current: the row being worked on (last clicked or ticked); shown with a stronger band and blue name. */
  const treeLine=({id,nameHtml,depth=0,tone='',open=false,hasChildren=false,state='off',label='',current=false}={})=>
    `<div class="rows-tree-line ${open?'is-open':''} ${current?'is-current':''}" ${current?'aria-current="true"':''} data-flip="t:${id}" data-line="${id}" ${tone?`data-tone="${tone}"`:''} style="--row-depth:${depth}">${caret({attr:`data-tree-toggle="${id}"`,open,label,empty:!hasChildren})}<label class="rows-node-label">${checkbox({attr:`data-node-check="${id}"`,state})}${hasChildren?folderIcon(open):leafIcon()}<span>${nameHtml}</span></label></div>`;

  /* Search: a filter field, used in the CoA tree and in long pickers. */
  const search=({attr='',value='',placeholder='Search',extraClass=''}={})=>`<label class="rows-search ${extraClass}">${icon('i-search')}<input type="search" ${attr} value="${esc(value)}" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}"></label>`;

  /* Chip: one chosen value in a field. isNew pops it in; delay staggers a batch. */
  const chip=({label,flip='',removeAttr='',isNew=false,delay=0}={})=>`<span class="ds-chip ${isNew?'is-new':''}" ${flip?`data-flip="${flip}"`:''} style="--chip-delay:${delay}ms" title="${esc(label)}"><span>${esc(label)}</span><button type="button" ${removeAttr} aria-label="Remove ${esc(label)}">${icon('i-close')}</button></span>`;
  /* Chip / overflow: "+N" when more than the limit are chosen; "Show less" once expanded. */
  const moreChip=({attr='',hidden=0,expanded=false}={})=>`<button type="button" class="ds-chip rows-more" ${attr} aria-expanded="${expanded}">${expanded?'Show less':`+${hidden}`}</button>`;

  /* Picker field: the bar that holds chips. Clicking anywhere on it (not on a chip's x) opens the picker. */
  /* summary: plain text instead of chips, for single-line choices such as an aggregation. */
  const pickerField=({chipsHtml='',summary='',placeholder='',clearAttr='',clearLabel='',toggleAttr='',toggleLabel='',open=false}={})=>
    `<div class="rows-picker-field ${open?'is-open':''} ${summary?'is-summary':''}" data-field-opens><div class="rows-selected">${summary?`<span class="rows-summary">${esc(summary)}</span>`:chipsHtml||`<span class="ds-placeholder">${esc(placeholder)}</span>`}</div>${chipsHtml&&clearAttr?`<button class="rows-clear" ${clearAttr} aria-label="Clear all ${esc(clearLabel)}" title="Clear all">${icon('i-close')}</button>`:''}<button class="rows-picker-toggle" ${toggleAttr} aria-label="${esc(toggleLabel)}" aria-expanded="${open}">${icon('i-down')}</button></div>`;

  /* Menu footer: running count plus Cancel and a confirm action. */
  const menuFooter=({countText='',cancelAttr='',confirmAttr='',confirmLabel='Add'}={})=>`<div class="rows-picker-footer"><span class="rows-pending-count">${esc(countText)}</span><div><button class="ds-text-action" ${cancelAttr}>Cancel</button><button class="ds-primary-action" ${confirmAttr}>${esc(confirmLabel)}</button></div></div>`;

  /* Group head: a collapsible section header in the Rows tab (icon, label, count). */
  /* action: an optional button beside the head (e.g. "Add +"); it sits outside the head button, never inside it. */
  const groupHead=({attr='',open=false,symbol='',symbolClass='',label='',countValue=0,action=''}={})=>{const head=`<button class="rows-group-head" ${attr} aria-expanded="${open}">${icon('i-chevron','rows-head-chevron')}<svg class="rows-group-symbol ${symbolClass}" aria-hidden="true"><use href="#${symbol}"/></svg><span>${esc(label)}</span>${count(countValue)}</button>`;return action?`<div class="rows-group-headline ${open?'is-open':''}">${head}${action}</div>`:head};
  /* Select: a single-choice dropdown. Each option can carry a detail line (a description or a formula).
     Same look as Clock and Cycle in Basic Parameters; choosing an option applies it and closes the menu. */
  const select=({key,value='',placeholder='',label='',options=[],open=false}={})=>{const chosen=options.find(option=>option.value===value);
    return `<div class="ds-dropdown" data-select="${key}"><button type="button" class="ds-trigger" data-select-toggle="${key}" aria-haspopup="listbox" aria-expanded="${open}" aria-label="${esc(label)}${chosen?`: ${esc(chosen.label)}`:''}"><span class="${chosen?'':'ds-trigger-placeholder'}">${esc(chosen?chosen.label:placeholder)}</span>${icon('i-down')}</button>${open?`<div class="ds-menu" role="listbox">${options.map(option=>`<button type="button" class="ds-option ${option.value===value?'is-selected':''}" role="option" aria-selected="${option.value===value}" data-select-option="${key}" data-value="${esc(option.value)}"><span><strong>${esc(option.label)}</strong>${option.detail?`<small>${esc(option.detail)}</small>`:''}</span>${option.value===value?icon('i-check'):''}</button>`).join('')}</div>`:''}</div>`};
  /* Head action: the small outlined "Add +" button on a group head. */
  const headAction=({attr='',label='Add'}={})=>`<button type="button" class="rows-head-action" ${attr}>${esc(label)}${icon('i-plus')}</button>`;
  /* Class card: one posting class, holding its measure field and aggregation field, removable with its x. */
  const classCard=({id,index=1,bodyHtml='',isNew=false,removeAttr='',noun='posting class'}={})=>`<div class="class-card ${isNew?'is-new':''}" data-flip="k:${id}" role="group" aria-label="${esc(noun.charAt(0).toUpperCase()+noun.slice(1))} ${index}"><button type="button" class="class-card-remove" ${removeAttr} aria-label="Remove ${esc(noun)} ${index}" title="Remove">${icon('i-close')}</button>${bodyHtml}</div>`;

  /* Owner tag: who made a view. "Me" is green so your own views stand out; anyone else is purple. */
  const ownerTag=owner=>owner?`<span class="owner-tag ${owner==='Me'?'is-me':''}">${esc(owner)}</span>`:'';
  /* Shared mark: a people icon after a view's name when others can open it. Private views carry nothing. */
  const sharedMark=visibility=>visibility==='everyone'||visibility==='team'?`<span class="shared-mark" role="img" aria-label="${visibility==='team'?'Shared with your team':'Shared with everyone'}" data-tip="${visibility==='team'?'Shared with your team':'Shared with everyone'}" data-tip-pos="top">${icon('i-users')}</span>`:'';
  /* Icon action: a quiet square icon button with a tooltip, used in table rows. */
  const iconAction=({attr='',symbol='',label='',tipPos='top'}={})=>`<button type="button" class="icon-action" ${attr} aria-label="${esc(label)}" data-tip="${esc(label)}" data-tip-pos="${tipPos}">${icon(symbol)}</button>`;
  /* More button: the ⋯ that opens a row's or card's action menu. */
  const moreButton=({attr='',label='More actions',open=false}={})=>`<button type="button" class="icon-action more-button ${open?'is-open':''}" ${attr} aria-haspopup="menu" aria-expanded="${open}" aria-label="${esc(label)}">${icon('i-more')}</button>`;
  /* Action menu: icon + label items; each item carries its own data attributes. */
  const actionMenu=({items=[],label='Actions',attr=''}={})=>`<div class="actions-menu row-menu" role="menu" aria-label="${esc(label)}" ${attr}>${items.map(item=>`<button type="button" class="menu-action" role="menuitem" ${item.attr||''}>${icon(item.icon)}<span>${esc(item.label)}</span></button>`).join('')}</div>`;

  /* Empty art (GDS empty state): a folder with a view sliding in and a plus; the view rises once when it appears. */
  const emptyArt=()=>`<svg class="empty-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="#f1f3f8"/><rect x="22" y="36" width="40" height="52" rx="5" fill="#d9deea"/><g class="empty-art-doc"><rect x="44" y="30" width="38" height="42" rx="4" fill="#fff" stroke="#3fae6a" stroke-width="3"/><path d="M52 41h22M52 49h16" stroke="#3fae6a" stroke-width="3" stroke-linecap="round"/><rect x="38" y="38" width="10" height="16" rx="3" fill="#fff" stroke="#6b83d6" stroke-width="2.5"/></g><path d="M30 52h56a5 5 0 0 1 5 5v26a5 5 0 0 1-5 5H35a5 5 0 0 1-5-5V52Z" fill="#eceff5"/><circle cx="88" cy="84" r="12" fill="#b9bfd3"/><path d="M88 78v12M82 84h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`;

  return {esc,icon,acctIcon,checkbox,settle,count,caret,folderIcon,leafIcon,option,folderLine,treeLine,search,chip,moreChip,pickerField,menuFooter,groupHead,headAction,classCard,select,ownerTag,sharedMark,iconAction,moreButton,actionMenu,emptyArt};
})();
