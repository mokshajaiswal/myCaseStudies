// Composite references are displayed through a screen-sized window; originals stay intact.
const triptych=(id,column,width=3155)=>({id,width,height:1797,screenWidth:810,x:column*(width-810)/2});
const screenAssets={
 'Accounts & Cards':triptych('VMJYp9g7DGyHWmhJZz1cQChc',1),
 'Introduction':triptych('VMJYp9g7DGyHWmhJZz1cQChc',2),
 'Hub type':triptych('irJNPUFcdMorYoJ08bUXa5fgmk',2),
 'Name & source':triptych('irJNPUFcdMorYoJ08bUXa5fgmk',1),
 'Hub created':triptych('irJNPUFcdMorYoJ08bUXa5fgmk',0),
 'Member details':triptych('keXcXE5lkhS5SPirkreik3BLM',1),
 'Payment methods':triptych('keXcXE5lkhS5SPirkreik3BLM',0),
 'Invitation status':{id:'cUEe9aCzNha1OYgFqfbI4ag9A',ratio:'720 / 2452'},
 'Spending':{id:'mO1QSMbg3mwg82znPJfl6fYFbxA',ratio:'720 / 2486'},
 'Analytics':{id:'xuyu9b6BPiGFE51sIWm7n3Rm4HE',ratio:'720 / 3094'},
 'Other Hubs':triptych('keXcXE5lkhS5SPirkreik3BLM',2),
 'Profile · pending action':triptych('G4ExTT6ySA2J0WQb83q1BWijJ0w',0,3300),
 'Delivery details':triptych('G4ExTT6ySA2J0WQb83q1BWijJ0w',1,3300),
 'Address saved':triptych('G4ExTT6ySA2J0WQb83q1BWijJ0w',2,3300),
 'Scan QR':{id:'OOyc0Zq9BRNy8eRM7cFK8sNo23g'},
 'Review payment':{id:'pj5901B1DyQtj8DDjEgz0wXEaA'},
 'Request pending':{id:'Z8wJc8fuEBUz3utfYZbLnu2Mls'},
 'Notification':triptych('Y16WMsQBYYXK4i16Uq3PzRaQUDs',0,3301),
 'Review & authorize':triptych('Y16WMsQBYYXK4i16Uq3PzRaQUDs',1,3301),
 'Authorization confirmed':triptych('Y16WMsQBYYXK4i16Uq3PzRaQUDs',2,3301),
 'Processing':{id:'8O2LAV3ua2Xc89uFVOUrY734oGA'},
 'Payment receipt':{id:'AEUUu7mF6h2FAlF8b5RqtQDDvA'},
 'Link or buy':triptych('L9fO641kjt3My4tVM92GN606kQ0',0),
 'Scan tag QR':triptych('L9fO641kjt3My4tVM92GN606kQ0',1),
 'Tag added':triptych('L9fO641kjt3My4tVM92GN606kQ0',2)
};
const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node};
const root=document.getElementById('flows');
const allScreens=chapters.flatMap(chapter=>chapter.groups.flatMap(group=>group.screens));
const done=allScreens.filter(([name])=>prototypes[name]).length;
const checklist=el('details','flow-checklist');
checklist.append(el('summary','',`Screen checklist · ${done} done · ${allScreens.length-done} remaining`));
checklist.append(el('p','checklist-note','Done means a full-page preview is available.'));
const checklistGroups=el('div','checklist-groups');
chapters.forEach(chapter=>{
 const group=el('section');group.append(el('h3','',chapter.title));const list=el('ul','checklist-items');
 chapter.groups.flatMap(group=>group.screens).forEach(([name])=>{
  const complete=Boolean(prototypes[name]);const item=el('li',complete?'is-done':'is-remaining');
  const mark=el('span','checklist-mark',complete?'✓':'○');mark.setAttribute('aria-hidden','true');
  item.append(mark,el('span','',name),el('span','checklist-status',complete?'Done':'Remaining'));list.append(item);
 });group.append(list);checklistGroups.append(group);
});
checklist.append(checklistGroups);root.before(checklist);
chapters.forEach((chapter,index)=>{
 const section=el('section','chapter');
 section.append(el('p','eyebrow',`${String(index+1).padStart(2,'0')} / ${chapter.role}`),el('h2','',chapter.title));
 section.append(el('p','flow-intro',chapter.intro));
 let step=0;
 chapter.groups.forEach(group=>{
  const block=el('section','flow-group');const header=el('div','group-head');header.append(el('h3','',group.title),el('p','decision',group.decision));
  const list=el('ol',group.screens.length===4?'screens screens--four':'screens');
  group.screens.forEach(([name,placement,status])=>{
   step++;const item=el('li',status==='new'?'proposed':'');const box=el('div','placeholder');
   const meta=el('div','slot-meta');meta.append(el('span','slot',`${index+1}.${step}`));if(status)meta.append(el('span','status',status==='new'?'Create':'Prototype reference'));
   box.append(meta,el('strong','',name),el('p','',placement));item.append(box);
   const preview=el('div','screen-preview');const stage=el('div','screen-stage');preview.append(stage);item.append(preview);
   const asset=screenAssets[name];
   if(asset){const link=el('a','screen-reference');link.href=`source/${asset.id}.png`;link.target='_blank';link.rel='noopener';link.setAttribute('aria-label',`Open original reference: ${name}`);const img=el('img');img.src=link.href;img.alt=name+' — original Turbo Hub screen';img.loading='lazy';img.decoding='async';if(asset.ratio)link.style.aspectRatio=asset.ratio;if(asset.width){link.classList.add('screen-reference--crop');link.style.aspectRatio=`${asset.screenWidth} / ${asset.height}`;img.style.width=`${asset.width/asset.screenWidth*100}%`;img.style.left=`${-asset.x/asset.screenWidth*100}%`;}link.append(img);stage.append(link);box.classList.add('placeholder--caption');}
   if(prototypes[name]){const prototype=el('a','open-full-page','Open full page ↗');const [path,query]=prototypes[name].split('?');prototype.href='../prototypes/'+path+'/index.html'+(query?'?'+query:'');prototype.target='_blank';prototype.rel='noopener';prototype.setAttribute('aria-label',`Open ${name} full page in a new tab`);preview.append(prototype);}
   if(!asset)stage.append(el('span','reserved-label',status==='new'?'Screen to create':'Screen reference pending'));list.append(item);
  });block.append(header,list);section.append(block);
 });
 const details=el('details');details.append(el('summary','','References'));if(chapter.note)details.append(el('p','',chapter.note));
 const links=el('p','reference-links');chapter.refs.forEach(([name,id])=>{const a=el('a','',name);a.href=`source/${id}.png`;a.target='_blank';a.rel='noopener';links.append(a)});details.append(links);section.append(details);root.append(section);
});


