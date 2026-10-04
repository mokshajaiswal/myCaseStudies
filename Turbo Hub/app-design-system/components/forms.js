(() => {
  const H=TurboUI;
  const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text)e.textContent=text;return e};
  function errorAPI(root,control,id){
    if(root.classList.contains('th-field')){const surface=el('div','th-field__surface');surface.append(...root.childNodes);root.append(surface)}
    const message=el('span','th-form-error');message.id=id+'-error';message.hidden=true;message.setAttribute('role','alert');root.append(message);
    root.setError=text=>{message.textContent=text;message.hidden=!text;root.classList.toggle('is-invalid',!!text);control.setAttribute('aria-invalid',String(!!text));if(text)control.setAttribute('aria-describedby',message.id);else control.removeAttribute('aria-describedby')};
    return root;
  }
  H.field=({id,label,value='',placeholder='',type='text',prefix='',variant='labelled',prominent=false,optional=false,disabled=false,error='',onInput})=>{
    const root=el('div','th-field'+(prominent?' th-field--prominent':''));if(variant==='placeholder')root.classList.add('th-field--placeholder');root.dataset.inspectorVariant=variant==='placeholder'?'placeholder':prominent?'amount':'default';const caption=el('label','th-field__label',label);caption.htmlFor=id;if(optional)caption.append(el('span','th-field__optional',' (Optional)'));
    const body=el('div','th-field__body');const input=el('input','th-field__input');Object.assign(input,{id,name:id,value,type,placeholder:variant==='placeholder'?(placeholder||label):label+(optional?' (Optional)':''),disabled});input.autocomplete='off';if(type==='tel'){input.inputMode='tel';input.maxLength=14}if(prefix){const p=el('span','th-field__prefix',prefix);p.setAttribute('aria-hidden','true');body.append(p)}body.append(input);root.append(caption,body);const syncEmpty=()=>root.classList.toggle('is-empty',!input.value);syncEmpty();input.addEventListener('input',syncEmpty);input.oninput=()=>onInput?.(input.value);root.control=input;errorAPI(root,input,id);root.setError(error);return root;
  };
  H.select=({id,label,items,value='',disabled=false,error='',onChange})=>{
    const root=el('div','th-field th-select');const caption=el('label','th-field__label',label);caption.htmlFor=id;const select=el('select','th-field__input');Object.assign(select,{id,name:id,disabled});items.forEach(([v,text])=>{const option=document.createElement('option');option.value=v;option.textContent=text;select.append(option)});select.value=value;root.append(caption,select);select.onchange=()=>onChange?.(select.value);root.control=select;errorAPI(root,select,id);const arrow=el('span','th-select__arrow');arrow.setAttribute('aria-hidden','true');arrow.innerHTML=TurboIcons.render('back',{size:20});root.querySelector('.th-field__surface').append(arrow);root.setError(error);return root;
  };
  H.infoPill=({label='More information',onClick}={})=>{const button=el('button','th-info-pill');button.type='button';button.setAttribute('aria-label',label);button.innerHTML=TurboIcons.render('help',{size:16});if(onClick)button.addEventListener('click',onClick);return button;};
  H.toggle=({id,label,description='',info=false,onInfo,checked=false,disabled=false,onChange})=>{
    const root=el('div','th-switch');const text=el('div','th-switch__copy');const caption=el('span','th-switch__label',label);caption.id=id+'-label';const heading=el('div','th-switch__heading');heading.append(caption);if(info)heading.append(H.infoPill({label:'About '+label,onClick:onInfo}));text.append(heading);root.dataset.inspectorVariant=info?'info':'default';if(description){const desc=el('span','th-switch__description',description);desc.id=id+'-description';text.append(desc)}const control=el('button','th-switch__control');Object.assign(control,{id,type:'button',disabled});control.setAttribute('role','switch');control.setAttribute('aria-labelledby',caption.id);if(description)control.setAttribute('aria-describedby',id+'-description');root.setChecked=value=>{checked=!!value;control.setAttribute('aria-checked',String(checked))};root.setChecked(checked);control.onclick=()=>onChange?.(!checked);root.append(text,control);root.control=control;return root;
  };
  // Range slider: a labelled native range with a filled track and min/max captions. The caller owns the value
  // (onInput emits each step); setValue/setRange keep the fill and captions in sync with external input.
  H.slider=({id,label,min=0,max=100,step=1,value=min,format=v=>String(v),disabled=false,onInput})=>{
    const root=el('div','th-slider');const head=el('div','th-slider__head');const name=el('label','th-slider__label',label);name.htmlFor=id;const readout=el('output','th-slider__value');readout.htmlFor=id;head.append(name,readout);
    const control=el('input','th-slider__control');Object.assign(control,{id,name:id,type:'range',disabled});
    const ends=el('div','th-slider__range');const low=el('span','',''),high=el('span','','');ends.append(low,high);ends.setAttribute('aria-hidden','true');
    root.append(head,control,ends);
    const paint=()=>{const lo=Number(control.min),hi=Number(control.max),v=Number(control.value);root.style.setProperty('--slider-fill',(hi>lo?(v-lo)/(hi-lo)*100:0)+'%');readout.textContent=format(v);control.setAttribute('aria-valuetext',format(v));};
    root.setRange=(lo,hi)=>{control.min=String(lo);control.max=String(hi);low.textContent=format(lo);high.textContent=format(hi);paint();};
    root.setValue=v=>{control.value=String(v);paint();};
    control.step=String(step);root.setRange(min,max);root.setValue(value);
    control.addEventListener('input',()=>{paint();onInput?.(Number(control.value));});
    root.control=control;return root;
  };
  H.check=({id,label,description='',price='',checked=false,disabled=false,card=false,tone='blue',error='',link=null,onChange})=>{
    const root=el('div','th-check'+(card?' th-check--card'+(tone==='violet'?' th-check--violet':''):''));if(card)root.dataset.inspectorVariant=tone==='violet'?'card-violet':'card';const wrap=el('label','th-check__label');wrap.htmlFor=id;const control=el('input','th-check__input');Object.assign(control,{id,name:id,type:'checkbox',checked,disabled});const body=el('span','th-check__copy');const title=el('span','th-check__title',label);if(link){/* An inline link ending the label (e.g. Terms and conditions); clicking it never toggles the box. */const a=el('a','th-check__link',link.label);a.href=link.href||'#';a.addEventListener('click',event=>{event.stopPropagation();if(link.onClick){event.preventDefault();link.onClick(event);}});title.append(' ',a);root.dataset.inspectorVariant='link';}body.append(title);if(description)body.append(el('span','th-check__description',description));if(price)body.append(el('span','th-check__price',price));wrap.append(control,body);root.append(wrap);root.setChecked=value=>{control.checked=!!value;root.classList.toggle('is-checked',control.checked)};root.setChecked(checked);control.onchange=()=>{root.classList.toggle('is-checked',control.checked);onChange?.(control.checked)};root.control=control;errorAPI(root,control,id);root.setError(error);return root;
  };
})();
