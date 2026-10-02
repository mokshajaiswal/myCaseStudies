TurboUI.successIndicator=()=>{
 const root=document.createElement('span');root.className='th-success-indicator';
 root.setAttribute('aria-hidden','true');root.innerHTML=TurboIcons.render('success',{size:32});return root;
};
