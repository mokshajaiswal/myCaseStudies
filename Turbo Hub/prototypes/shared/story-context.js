/* Loaded before product scripts. Standalone screens keep their real demo storage. */
(() => {
  const params=new URLSearchParams(location.search);
  const embedded=params.get('embed')==='story';
  const scene=embedded?window.TurboFamilyStory?.scenes.find(item=>item.id===params.get('scene')):null;
  const locked=embedded&&!(scene?.interactive===true&&params.get('interactive')==='true');
  const member=scene?.member==='son'?{name:'Rohan Sharma',relation:'Son',manager:false}:scene?.actor==='daughter'?{name:'Neha Sharma',relation:'Daughter',manager:false}:{name:'Kavya Sharma',relation:'Wife',manager:true};
  const seeds={
    'turbo-demo-hub-draft':scene?.id==='hub-setup'?{type:'Family',name:'',account:''}:{type:'Family',name:'The Sharma’s',account:'credit'},
    'turbo-hub-member-draft':{...member,nickname:'',mobile:'9876543210',confirmed:true,methods:['digital','upi']},
    'turbo-hub-spending-limits':{hub:100000,arun:45000,kavya:45000,neha:5000,rohan:10000},
    'turbo-hub-members':scene?.id==='hub-members'?[]:[{name:'Neha Sharma',relation:'Daughter',pending:false,spent:500,limit:5000,methods:['digital','upi']},{name:'Rohan Sharma',relation:'Son',pending:scene?.id==='hub-members',spent:0,limit:10000,methods:['digital','upi']}],
    'turbo-demo-delivery-draft':{line1:'12, Garden Apartments',line2:'Sample Road',line3:'',pincode:'560001',city:'Bengaluru',state:'Karnataka',contact:'9876543210'},
    'turbo-hub-geofence':scene?.id==='geofence-setup'?{location:'Family home, Bengaluru',radius:'500',permission:true}:null
  };
  // Each iframe owns a fresh in-memory store. No persistent browser drafts are read/written.
  const values=new Map(Object.entries(seeds).filter(([,value])=>value!==null).map(([key,value])=>[key,JSON.stringify(value)]));
  const memory={getItem:key=>values.get(String(key))??null,setItem:(key,value)=>values.set(String(key),String(value)),removeItem:key=>values.delete(String(key)),clear:()=>values.clear()};
  const storage={getItem:key=>embedded?memory.getItem(key):sessionStorage.getItem(key),setItem:(key,value)=>embedded?memory.setItem(key,value):sessionStorage.setItem(key,value),removeItem:key=>embedded?memory.removeItem(key):sessionStorage.removeItem(key)};
  const embedURL=href=>{
    const url=new URL(href,location.href);
    if(embedded&&url.origin===location.origin&&url.pathname.includes('/prototypes/')){
      url.searchParams.set('embed','story');url.searchParams.set('scene',scene?.id||'');url.searchParams.set('interactive',String(!locked));
    }
    return url;
  };
  const navigate=href=>{const url=embedURL(href);if(!embedded||(url.origin===location.origin&&url.pathname.includes('/prototypes/')))location.href=url.href;};
  window.TurboStoryContext={embedded,scene,locked,storage,member,navigate};
  if(!embedded)return;
  document.documentElement.dataset.storyEmbed='true';
  if(locked)document.documentElement.dataset.storyLocked='true';
  if(location.pathname.includes('/onboarding/')){
    const geometry=document.createElement('link');geometry.rel='stylesheet';geometry.href=new URL('phone-preview.css',document.currentScript.src);document.head.append(geometry);
  }
  const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL('story-embed.css',document.currentScript.src);document.head.append(sheet);
  window.dsInspectorConfig={keyboardActivation:false};
  window.__DS_EXAMPLE_KEY='story-embed';
  if(locked)document.addEventListener('keydown',event=>{event.preventDefault();event.stopImmediatePropagation();},true);
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href]');if(!link)return;
    if(locked){event.preventDefault();return;}
    const url=embedURL(link.href);
    if(url.origin!==location.origin||!url.pathname.includes('/prototypes/'))event.preventDefault();
    else {link.href=url.href;link.removeAttribute('target');}
  },true);
  document.addEventListener('DOMContentLoaded',()=>{
    // The older onboarding preview has no phone shell. Frame its unchanged UI only here.
    const onboarding=document.querySelector('.onboarding');
    if(onboarding){
      const phone=document.createElement('main');phone.className='phone';
      const viewport=document.createElement('div');viewport.className='phone-viewport';
      const screen=document.createElement('div');screen.className='phone-screen';
      onboarding.before(phone);screen.append(onboarding);viewport.append(screen);phone.append(viewport);
      const frame=document.createElement('img');frame.className='phone-frame';frame.alt='';frame.setAttribute('aria-hidden','true');frame.src='../../assets/phone%20case%20clean.png';phone.append(frame);
      const fit=()=>{const r=viewport.getBoundingClientRect();viewport.style.setProperty('--screen-scale',(r.width+0.5)/390);};
      fit();new ResizeObserver(fit).observe(viewport);
    }
    if(locked){const screen=document.querySelector('.phone-screen');if(screen)screen.inert=true;}
    parent.postMessage({type:'turbo-story-ready',scene:scene?.id},location.origin);
  });
})();
