const params=new URLSearchParams(location.search),state=params.get('state'),example=params.get('example');
if(params.get('gallery')==='1')document.body.dataset.gallery='true';
const host=document.getElementById('preview');host.replaceChildren();
for(const [id,title,description] of [['descriptive','With description','Share household expenses with family members'],['plain','Title only','']]){
 const section=document.createElement('section');section.id=id;section.className='example';const caption=document.createElement('p');caption.className='label';caption.textContent=title;section.append(caption);
 const group=document.createElement('fieldset');group.style.cssText='display:grid;gap:var(--th-space-4);border:0;padding:0;margin:0';const legend=document.createElement('legend');legend.textContent='Hub type';group.append(legend);
 for(const value of ['Family','Team'])group.append(TurboUI.radioChoice({id:id+'-'+value,name:id+'-type',value,label:example==='long'?value+' Hub for household expenses and shared day-to-day spending':value+' Hub',description,checked:state==='unselected'?value==='Team':value==='Family',disabled:state==='disabled'}));section.append(group);host.append(section);
}
