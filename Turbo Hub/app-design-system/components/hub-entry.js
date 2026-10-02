TurboUI.hubEntry=({name,type='Family Hub',members=[],href}={})=>{
 const root=document.createElement('a');root.className='th-hub-entry';root.href=href;
 root.setAttribute('aria-label',`${name}, ${type}${members.length?', '+members.length+' members':''}`);
 root.append(TurboUI.avatar({graphic:true,large:true}));
 const copy=document.createElement('div');copy.className='th-hub-entry__copy';
 const title=document.createElement('strong');title.className='th-hub-entry__name';title.textContent=name;
 const kind=document.createElement('span');kind.className='th-hub-entry__type';kind.textContent=type;copy.append(title,kind);
 if(members.length){const group=document.createElement('div');group.className='th-hub-entry__members';for(const member of members.slice(0,3))group.append(TurboUI.avatar({name:member}));copy.append(group);}
 root.append(copy);return root;
};
