(() => {
  const H=TurboUI;
  H.otp=({id,label='6-digit code',value='',disabled=false,error='',onInput}={})=>{
    const make=(tag,cls)=>{const node=document.createElement(tag);node.className=cls;return node;};
    const root=make('fieldset','th-otp'),legend=make('legend','th-otp__label');legend.textContent=label;
    const digits=make('div','th-otp__digits'),message=make('span','th-form-error');
    message.id=id+'-error';message.hidden=true;message.setAttribute('role','alert');
    const aggregate=make('input','');Object.assign(aggregate,{id,name:id,type:'hidden',value:'',disabled});
    const fields=[];
    const clean=text=>String(text??'').replace(/\D/g,'').slice(0,6);
    const notify=()=>{aggregate.value=fields.map(field=>field.control.value).join('');root.setError('');onInput?.(aggregate.value);};
    const focus=index=>{const control=fields[index].control;control.focus();control.select();};
    const fill=(text,start=0)=>{const chars=clean(text);for(let i=start;i<6;i++)fields[i].control.value=chars[i-start]||'';};
    for(let i=0;i<6;i++){
      const field=H.field({id:id+'-digit-'+(i+1),label:'Digit '+(i+1)+' of 6',variant:'digit',disabled,onInput:text=>{
        const chars=clean(text);
        if(chars.length>1){fill(chars,chars.length===6?0:i);notify();focus(Math.min(5,(chars.length===6?0:i)+chars.length));}
        else {field.control.value=chars;notify();if(chars&&i<5)focus(i+1);}
      }});
      const control=field.control;control.inputMode='numeric';control.maxLength=6;control.pattern='[0-9]*';control.autocomplete=i===0?'one-time-code':'off';
      control.addEventListener('focus',()=>control.select());
      control.addEventListener('paste',event=>{const text=clean(event.clipboardData?.getData('text')||'');if(!text)return;event.preventDefault();const start=text.length===6?0:i;fill(text,start);notify();focus(Math.min(5,start+text.length));});
      control.addEventListener('keydown',event=>{
        if(event.key==='Backspace'&&!control.value&&i>0){event.preventDefault();fields[i-1].control.value='';notify();focus(i-1);}
        if(event.key==='ArrowLeft'&&i>0){event.preventDefault();focus(i-1);}
        if(event.key==='ArrowRight'&&i<5){event.preventDefault();focus(i+1);}
      });
      fields.push(field);digits.append(field);
    }
    root.setError=text=>{message.textContent=text;message.hidden=!text;for(const field of fields){field.control.setAttribute('aria-invalid',String(!!text));if(text)field.control.setAttribute('aria-describedby',message.id);else field.control.removeAttribute('aria-describedby');}};
    root.setValue=text=>{fill(text);aggregate.value=fields.map(field=>field.control.value).join('');};
    aggregate.addEventListener('input',()=>{root.setValue(aggregate.value);root.setError('');onInput?.(aggregate.value);});
    root.focus=()=>focus(Math.max(0,fields.findIndex(field=>!field.control.value)));
    root.control=aggregate;root.controls=fields.map(field=>field.control);
    root.append(legend,digits,aggregate,message);root.setValue(value);root.setError(error);return root;
  };
})();
