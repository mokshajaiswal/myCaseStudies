// A Hub in the Hubs list, laid out as a cover: tile with member faces and a chevron on top, then the name and,
// optionally, this month's spend against the Hub limit as a bar with the amounts at its top right. The whole card opens the Hub.
// type is optional (omitted on the Hubs list). graphic is the tile: true for the family home artwork, or a
// registered icon name (e.g. users) for other kinds of Hub. accent tints the card, tile and ring so Hubs are told
// apart at a glance: violet, teal or amber; omit for the neutral card.
TurboUI.hubEntry=({name,type='',members=[],href,graphic=true,spent=null,limit=null,accent=null}={})=>{
 const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text!=null)e.textContent=text;return e;};
 const money=value=>'₹'+value.toLocaleString('en-IN');
 const root=el('a','th-hub-entry'+(accent?' th-hub-entry--'+accent:''));root.href=href;root.dataset.inspectorVariant=accent||'default';
 const used=limit>0?Math.min(100,Math.max(0,Math.round((spent||0)*100/limit))):null;
 root.setAttribute('aria-label',[name,type,members.length?members.length+' members':'',used!=null?money(spent||0)+' of '+money(limit)+' spent this month':''].filter(Boolean).join(', '));

 const top=el('div','th-hub-entry__top');top.append(TurboUI.avatar({name:graphic===true?name:'',graphic,size:'profile'}));
 if(members.length){const group=el('div','th-hub-entry__members');for(const member of members.slice(0,3))group.append(TurboUI.avatar({name:member,size:'stack'}));top.append(group);}
 const chevron=el('span','th-hub-entry__chevron');chevron.innerHTML=TurboIcons.render('caret-right',{size:20});top.append(chevron);

 // Name on the left, '₹spent / ₹limit' at the top right of a full-width bar.
 const body=el('div','th-hub-entry__body'),head=el('div','th-hub-entry__head'),copy=el('div','th-hub-entry__copy');
 copy.append(el('strong','th-hub-entry__name',name));if(type)copy.append(el('span','th-hub-entry__type',type));head.append(copy);
 if(used!=null){const amount=el('span','th-hub-entry__amount',money(spent||0));amount.append(el('small','',' / '+money(limit)));head.append(amount);}
 body.append(head);
 if(used!=null){const bar=el('span','th-hub-entry__bar');const fill=el('span','th-hub-entry__bar-fill');fill.style.width=used+'%';bar.append(fill);body.append(bar);}
 root.append(top,body);for(const part of [top,body])part.setAttribute('aria-hidden','true');
 return root;
};
