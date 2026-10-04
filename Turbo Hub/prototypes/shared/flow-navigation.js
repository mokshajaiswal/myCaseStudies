(() => {
 if(window.TurboStoryContext?.embedded||window.top!==window.self)return;
 const base=new URL('.',document.currentScript.src),style=document.createElement('link');style.rel='stylesheet';style.href=new URL('flow-navigation.css',base);document.head.append(style);
 const script=document.createElement('script');script.src=new URL('../../flow-reference/flow-data.js',base);
 script.onload=()=>{
  const nav=document.createElement('nav');nav.className='preview-screen-navigation';nav.setAttribute('aria-label','Flow screen navigation');
  const previous=document.createElement('a'),next=document.createElement('a'),position=document.createElement('span');position.className='preview-screen-navigation__position';
  previous.className='preview-screen-navigation__previous';next.className='preview-screen-navigation__next';previous.textContent='←';next.textContent='→';nav.append(previous,position,next);document.body.append(nav);
  const screens=window.TurboFlowScreens.map(entry=>({...entry,url:new URL(entry.url,location.href)}));
  function update(){
   const page=new URL(location.href);let index=-1,score=-1;
   screens.forEach((entry,i)=>{if(entry.url.pathname!==page.pathname)return;const params=[...entry.url.searchParams];if(params.some(([key,value])=>page.searchParams.get(key)!==value))return;if(params.length>score){score=params.length;index=i;}});
   if(index<0){index=screens.findIndex(entry=>entry.url.pathname===page.pathname);}nav.hidden=index<0;if(index<0)return;
   position.textContent=(index+1)+' / '+screens.length;position.title=screens[index].name;
   for(const [anchor,entry,direction] of [[previous,screens[index-1],'Previous'],[next,screens[index+1],'Next']]){
    if(entry){anchor.href=entry.url.href;anchor.removeAttribute('aria-disabled');anchor.removeAttribute('tabindex');anchor.title=direction+': '+entry.name;anchor.setAttribute('aria-label',anchor.title);}
    else{anchor.removeAttribute('href');anchor.setAttribute('aria-disabled','true');anchor.tabIndex=-1;anchor.title='No '+direction.toLowerCase()+' screen';anchor.setAttribute('aria-label',anchor.title);}
   }
  }
  update();window.addEventListener('popstate',update);document.addEventListener('click',()=>queueMicrotask(update));new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['data-reference']});
 };script.onerror=()=>console.warn('Flow navigation could not load the screen order.');document.head.append(script);
})();
