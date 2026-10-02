TurboUI.notice=({message,onDismiss}={})=>{
 const root=document.createElement('div');root.className='th-notice';
 const icon=document.createElement('span');icon.className='th-notice__icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=TurboIcons.render('success',{size:20});
 const text=document.createElement('span');text.className='th-notice__message';text.setAttribute('role','status');text.textContent=message;
 root.append(icon,text);
 if(onDismiss)root.append(TurboUI.button({label:'Dismiss confirmation',icon:'close',iconOnly:true,quiet:true,onClick:onDismiss}));
 return root;
};
