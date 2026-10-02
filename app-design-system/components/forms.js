(() => {
  const H=TurboUI;
  const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text)e.textContent=text;return e};
  function errorAPI(root,control,id){
    if(root.classList.contains('th-field')){const surface=el('div','th-field__surface');surface.append(...root.childNodes);root.append(surface)}
    const message=el('span','th-form-error');message.id=id+'-error';message.hidden=true;message.setAttribute('role','alert');root.append(message);
    root.setError=text=>{message.textContent=text;message.hidden=!text;root.classList.toggle('is-invalid',!!text);control.setAttribute('aria-invalid',String(!!text));if(text)control.setAttribute('aria-describedby',message.id);else control.removeAttribute('aria-describedby')};
    return root;
  }
  H.field=({id,label,value='',placeholder='',type='text',prefix='',prominent=false,optional=false,disabled=false,error='',onInput})=>{
    const root=el('div','th-field'+(prominent?' th-field--prominent':''));const caption=el('label','th-field__label',label);caption.htmlFor=id;if(optional)caption.append(el('span','th-field__optional',' · optional'));
    const body=el('div','th-field__body');const input=el('input','th-field__input');Object.assign(input,{id,name:id,value,type,placeholder,disabled});input.autocomplete='off';if(type==='tel'){input.inputMode='tel';input.maxLength=14}if(prefix){const p=el('span','th-field__prefix',prefix);p.setAttribute('aria-hidden','true');body.append(p)}body.append(input);root.append(caption,body);input.oninput=()=>onInput?.(input.value);root.control=input;errorAPI(root,input,id);root.setError(error);return root;
  };
  H.select=({id,label,items,value='',disabled=false,error='',onChange})=>{
    const root=el('div','th-field th-select');const caption=el('label','th-field__label',label);caption.htmlFor=id;const select=el('select','th-field__input');Object.assign(select,{id,name:id,disabled});items.forEach(([v,text])=>{const option=document.createElement('option');option.value=v;option.textContent=text;select.append(option)});select.value=value;root.append(caption,select);select.onchange=()=>onChange?.(select.value);root.control=select;errorAPI(root,select,id);root.setError(error);return root;
  };
  H.toggle=({id,label,description='',checked=false,disabled=false,onChange})=>{
    const root=el('div','th-switch');const text=el('div','th-switch__copy');const caption=el('span','th-switch__label',label);caption.id=id+'-label';text.append(caption);if(description){const desc=el('span','th-switch__description',description);desc.id=id+'-description';text.append(desc)}const control=el('button','th-switch__control');Object.assign(control,{id,type:'button',disabled});control.setAttribute('role','switch');control.setAttribute('aria-labelledby',caption.id);if(description)control.setAttribute('aria-describedby',id+'-description');root.setChecked=value=>{checked=!!value;control.setAttribute('aria-checked',String(checked))};root.setChecked(checked);control.onclick=()=>onChange?.(!checked);root.append(text,control);root.control=control;return root;
  };
  H.check=({id,label,description='',price='',checked=false,disabled=false,card=false,error='',onChange})=>{
    const root=el('div','th-check'+(card?' th-check--card':''));const wrap=el('label','th-check__label');wrap.htmlFor=id;const control=el('input','th-check__input');Object.assign(control,{id,name:id,type:'checkbox',checked,disabled});const body=el('span','th-check__copy');body.append(el('span','th-check__title',label));if(description)body.append(el('span','th-check__description',description));if(price)body.append(el('span','th-check__price',price));wrap.append(control,body);root.append(wrap);root.setChecked=value=>{control.checked=!!value;root.classList.toggle('is-checked',control.checked)};root.setChecked(checked);control.onchange=()=>{root.classList.toggle('is-checked',control.checked);onChange?.(control.checked)};root.control=control;errorAPI(root,control,id);root.setError(error);return root;
  };
})();
