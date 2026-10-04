TurboUI.radioChoice=({id,name,label,description='',value,checked=false,disabled=false,size='default',appearance='card',onChange}={})=>{
 const root=document.createElement('label');root.className='th-radio-choice'+(size==='prominent'?' th-radio-choice--prominent':'');if(appearance==='list')root.classList.add('th-radio-choice--list');root.dataset.inspectorVariant=appearance==='list'?'list':size;root.htmlFor=id;
 const control=document.createElement('input');Object.assign(control,{id,name,type:'radio',value,checked,disabled});control.className='th-radio-choice__input';
 const title=document.createElement('span');title.className='th-radio-choice__title';title.textContent=label;root.append(control,title);
 if(description){const copy=document.createElement('span');copy.className='th-radio-choice__description';copy.textContent=description;root.append(copy);}
 control.addEventListener('change',()=>{if(control.checked)onChange?.(control.value);});root.control=control;return root;
};
