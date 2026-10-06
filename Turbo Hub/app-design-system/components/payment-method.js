(() => {
  const H=TurboUI;
  H.paymentMethod=({id,name,detail='',graphic,href=null,status='',label=''}={})=>{
    const make=(tag,cls,text)=>{const node=document.createElement(tag);node.className=cls;if(text)node.textContent=text;return node;};
    const row=make(href?'a':'div','th-payment-method');if(id)row.id=id;
    row.dataset.inspectorVariant=href?'link':'informational';
    if(href)row.href=href;
    if(label)row.setAttribute('aria-label',label);
    const copy=make('div','th-payment-method__copy');copy.append(make('p','th-payment-method__title',name));
    if(detail)copy.append(make('p','th-payment-method__detail',detail));
    row.append(H.avatar({name,graphic}),copy);
    if(status)row.append(H.badge(status,{variant:'warning',icon:'warning-circle'}));
    const chevron=make('span','th-payment-method__chevron');chevron.setAttribute('aria-hidden','true');chevron.innerHTML=TurboIcons.render('caret-right',{size:20});row.append(chevron);
    return row;
  };
})();
