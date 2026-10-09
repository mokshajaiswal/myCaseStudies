/* Reversible case-study choreography over existing, locked same-origin screens. */
(function(root){
  const move=selector=>({kind:'move',selector,wait:600});
  const tap=()=>({kind:'tap',wait:450});
  const set=(selector,value)=>({kind:'set',selector,value,wait:320});
  const type=(selector,value)=>Array.from(value,(_,i)=>({kind:'set',selector,value:value.slice(0,i+1),wait:85}));
  const drag=(selector,values)=>values.map(value=>({kind:'drag',selector,value,wait:100}));
  const next={kind:'next',wait:0};
  // Choreography is keyed by flow ID, then scene ID, so two flows that reuse a route never share actions or resets.
  // reload:true resets a scene by reloading its locked fixture on each repeat (for controls without an undo path).
  const FLOWS={
    'whatsapp-invite-flow':{scenes:{
      'invite-notification':[{kind:'hide',wait:1800},{kind:'enter',wait:600},move('#notifications .th-payment-notification'),tap(),{kind:'hold',wait:450},next],
      'invitation':[{kind:'hide',wait:1800},{kind:'enter',wait:600},move('.wa-preview'),tap(),{kind:'hold',wait:450},next],
      'play-store':[{kind:'hide',wait:1000},{kind:'enter',wait:600},move('#install button'),tap(),{kind:'hide',wait:0},{kind:'store',state:'progress',value:0,wait:400},{kind:'store',state:'progress',value:35,wait:500},{kind:'store',state:'progress',value:75,wait:500},{kind:'store',state:'progress',value:100,wait:350},{kind:'store',state:'ready',wait:650},move('#install a'),tap(),{kind:'hold',wait:450},next],
      'hub-welcome':[{kind:'hide',wait:2200},{kind:'enter',wait:600},move('#welcome-terms'),tap(),set('#welcome-terms',true),{kind:'hold',wait:500},move('.welcome-footer button'),tap(),{kind:'hold',wait:450},next],
      'verify-mobile':[{kind:'hide',wait:1400},set('#otp','482913'),{kind:'hold',wait:1000},{kind:'enter',wait:600},move('#form button[type="submit"]'),tap(),{kind:'hold',wait:450},next],
      'hub-joined':[{kind:'success',wait:2200},{kind:'enter',wait:600},move('#actions a'),tap(),{kind:'hold',wait:450},next],
      'neha-hub':[{kind:'hide',wait:4200},next]
    }},
    'request-flow':{scenes:{
      'scan-qr':[{kind:'enter',wait:600},move('.scan-camera__target'),tap(),{kind:'hold',wait:700},next],
      'payment-review':[move('#amount'),tap(),...type('#amount','2500'),{kind:'hold',wait:700},move('#pay'),tap(),...drag('#pay',[10,20,30,40,50,60,70,80,90,100]),{kind:'hold',wait:650},next],
      'request-pending':[{kind:'hide',wait:3500},next]
    }},
    'children-invite-flow':{scenes:{
      'members-parents':[{kind:'enter',wait:600},move('#hub-panel .section-top a'),tap(),{kind:'hold',wait:500},next],
      'invite-son':[move('#relation'),tap(),set('#relation','Son'),move('#name'),tap(),...type('#name','Rohan Sharma'),{kind:'hold',wait:350},move('#mobile'),tap(),...type('#mobile','9876543211'),move('#confirmed'),tap(),set('#confirmed',true),move('#footer button[type="submit"]'),tap(),{kind:'hold',wait:500},next],
      'spending-limit':[move('#limit-amount'),tap(),...drag('#limit-amount',[1000,1500,2000,2500,3000,3500,4000,4500,5000]),{kind:'hold',wait:600},move('#content button[type="submit"]'),tap(),{kind:'hold',wait:800},next],
      'children-invite-sent':[{kind:'success',wait:2800},next],
      'members-children-invited':[{kind:'hide',wait:3200},next]
    }},
    'create-flow':{reload:['hub-setup'],scenes:{
      'hub-setup':[{kind:'enter',wait:600},move('#hub-name'),tap(),...type('#hub-name','The Sharma’s'),{kind:'hold',wait:350},move('#account-credit'),tap(),set('#account-credit',true),{kind:'hold',wait:450},move('#footer button[type="submit"]'),tap(),{kind:'hold',wait:500},next],
      'hub-created':[{kind:'hide',wait:3200},next]
    }}
  };
  function actions(id,flow){
    const scripted=FLOWS[flow]?.scenes[id];if(scripted)return scripted;
    if(id==='members-owner')return [{kind:'enter',wait:600},move('#hub-panel .section-top a'),tap(),{kind:'hold',wait:500},next];
    if(id==='add-member')return [move('#relation'),tap(),set('#relation','Wife'),move('#name'),tap(),...type('#name','Kavya Sharma'),{kind:'hold',wait:350},move('#mobile'),tap(),...type('#mobile','9876543210'),move('#manager'),tap(),set('#manager',true),move('#confirmed'),tap(),set('#confirmed',true),move('#footer button[type="submit"]'),tap(),{kind:'hold',wait:500},next];
    if(id==='member-payment-methods')return [move('#digital'),tap(),set('#digital',true),move('#upi'),tap(),set('#upi',true),move('#footer button[type="submit"]'),tap(),{kind:'hold',wait:500},next];
    if(id==='invite-sent')return [{kind:'success',wait:2200},next];
    return [{kind:'hide',wait:2800},next];
  }
  function setControl(doc,selector,value){
    const control=doc.querySelector(selector);if(!control)throw new Error('Missing playback control: '+selector);
    const win=doc.defaultView;
    if(control.type==='radio'){
      // Selecting through a real click runs the radio's own change handler (and any dependent state).
      if(value&&!control.checked)control.click();
    }else if(control.getAttribute('role')==='switch'){
      if((control.getAttribute('aria-checked')==='true')!==value)control.dispatchEvent(new win.MouseEvent('click',{bubbles:true}));
    }else if(control.type==='checkbox'){
      control.checked=Boolean(value);control.dispatchEvent(new win.Event('change',{bubbles:true}));
    }else{
      control.value=String(value);control.dispatchEvent(new win.Event(control.tagName==='SELECT'?'change':'input',{bubbles:true}));
    }
  }
  function prepare(doc,id,flow){
    if(flow==='whatsapp-invite-flow'){
      if(id==='play-store'){doc.querySelector('#install').setPlaybackState('idle');doc.querySelector('#store').scrollTop=0;}
      if(id==='hub-welcome'){setControl(doc,'#welcome-terms',false);doc.querySelector('#content').scrollTop=0;}
      if(id==='verify-mobile'){setControl(doc,'#otp','');doc.querySelector('#content').scrollTop=0;}
    }else if(id==='add-member'||id==='invite-son'){
      for(const selector of ['#relation','#name','#nickname','#mobile'])setControl(doc,selector,'');
      setControl(doc,'#manager',false);setControl(doc,'#confirmed',false);
      doc.querySelector('#content').scrollTop=0;
    }else if(id==='payment-review'&&flow==='request-flow'){
      setControl(doc,'#amount','');setControl(doc,'#pay',0);
    }else if(id==='spending-limit'&&flow==='children-invite-flow'){
      setControl(doc,'#limit-target','neha');setControl(doc,'#limit-amount',500);
    }else if(id==='member-payment-methods')for(const selector of ['#physical','#digital','#upi'])setControl(doc,selector,false);
  }
  // Scroll only the child content viewport, never the case-study page or fixed footer.
  function reveal(doc,target){
    const scroller=doc.querySelector('#content');if(!scroller||!scroller.contains(target))return;
    const box=scroller.getBoundingClientRect(),rect=target.getBoundingClientRect();
    const footer=doc.querySelector('#footer')?.getBoundingClientRect();
    const bottom=Math.min(box.bottom,footer?.top??box.bottom)-16;
    const scale=box.height/(scroller.clientHeight||box.height);
    if(rect.bottom>bottom)scroller.scrollTop+=(rect.bottom-bottom)/scale;
    else if(rect.top<box.top+16)scroller.scrollTop-=(box.top+16-rect.top)/scale;
  }
  function point(doc,target,frame,slot){
    reveal(doc,target);
    const rect=target.getBoundingClientRect(),host=slot.getBoundingClientRect(),box=frame.getBoundingClientRect();
    // Field text is the tap target; small toggles and checkboxes use their actual centre.
    const range=target.type==='range',fraction=range?Math.max(0,Math.min(1,(Number(target.value)-Number(target.min))/(Number(target.max)-Number(target.min)||1))):0;
    const radius=(target.classList.contains('th-swipe__control')?28:12)*(doc.querySelector('#content')?.getBoundingClientRect().height/(doc.querySelector('#content')?.clientHeight||1)||1);
    const x=range?rect.left+Math.min(radius,rect.width/2)+fraction*Math.max(0,rect.width-2*radius):target.tagName==='INPUT'&&target.type!=='checkbox'?rect.left+Math.min(28,rect.width/3):rect.left+rect.width/2;
    return {x:box.left-host.left+x*box.width/(frame.clientWidth||box.width),y:box.top-host.top+(rect.top+rect.height/2)*box.height/(frame.clientHeight||box.height)};
  }
  function create({rail,previews,scene,onAdvance,onError,onProgress}){
    const now=()=>root.performance?.now()??Date.now();
    const cursors=previews.map(preview=>{
      const dot=root.document.createElement('span');dot.className='family-story__touch-dot';dot.setAttribute('aria-hidden','true');
      preview.querySelector('.family-story__phone-slot').append(dot);return dot;
    });
    let index=0,queue=[],position=0,timer=null,due=0,remaining=0,elapsed=0,running=false,readyDoc=null,preparedDoc=null,revision=0,lastTarget=null;
    const presses=new Set();
    const cancelPresses=()=>{presses.forEach(animation=>animation.cancel());presses.clear();};
    const cancel=()=>{if(timer!==null)root.clearTimeout(timer);timer=null;};
    const progress=()=>onProgress?.({index,elapsed,duration:queue.reduce((sum,action)=>sum+action.wait,0),playing:running&&Boolean(readyDoc),ready:Boolean(readyDoc)});
    const arm=delay=>{cancel();remaining=delay;if(running){due=now()+delay;timer=root.setTimeout(tick,delay);}progress();};
    const showDot=()=>{cursors[index].classList.add('is-visible');};
    const hideDots=()=>cursors.forEach(dot=>{dot.classList.remove('is-visible');dot.classList.remove('is-tapping');});
    function tick(){
      timer=null;if(!running)return;if(readyDoc)elapsed+=remaining;remaining=0;
      const frame=previews[index].querySelector('iframe'),doc=frame?.contentDocument;
      // Never operate a standalone, interactive or unrelated document, even if a frame navigates.
      const context=doc?.defaultView?.TurboStoryContext;
      if(!doc||doc.readyState!=='complete'||!context){readyDoc=null;elapsed=0;arm(100);return;}
      if(!context.embedded||!context.locked||context.scene?.id!==scene.sequence[index].id){pause();onError?.();return;}
      try{
        if(doc!==readyDoc){cancelPresses();const sceneId=scene.sequence[index].id;
        // A scene that cannot be reset through its controls reloads its fixture once it has been played.
        if(FLOWS[scene.id]?.reload?.includes(sceneId)&&doc.defaultView.__turboPlayed){doc.location.reload();readyDoc=null;arm(100);return;}
        doc.defaultView.__turboPlayed=true;readyDoc=doc;queue=actions(sceneId,scene.id);position=0;elapsed=0;if(preparedDoc!==doc)prepare(doc,sceneId,scene.id);preparedDoc=doc;}
        const action=queue[position++],dot=cursors[index],slot=dot.parentElement,currentRevision=revision;
        dot.classList.remove('is-tapping');
        if(action.kind==='enter'){dot.style.left='-16px';dot.style.top='45%';showDot();}
        if(action.kind==='move'||action.kind==='drag'){
          if(action.kind==='drag')setControl(doc,action.selector,action.value);
          dot.style.transitionDuration=action.kind==='drag'?'100ms':'550ms';
          const target=doc.querySelector(action.selector);if(!target)throw new Error('Missing playback target');
          const coords=point(doc,target,frame,slot);dot.style.left=coords.x+'px';dot.style.top=coords.y+'px';showDot();lastTarget=action.selector;
        }
        if(action.kind==='tap'){
          dot.classList.add('is-tapping');
          const animation=doc.defaultView.TurboUI?.pressButton(doc.querySelector(lastTarget));
          if(animation){presses.add(animation);animation.onfinish=()=>presses.delete(animation);}
        }
        if(action.kind==='set')setControl(doc,action.selector,action.value);
        if(action.kind==='store')doc.querySelector('#install').setPlaybackState(action.state,action.value);
        if(action.kind==='hide')hideDots();
        if(action.kind==='success'){hideDots();doc.querySelector('.th-success-indicator')?.play?.();}
        // Add, Next and Send Invite taps are visual only. The parent advances existing
        // fixtures; no links, submit handlers, real invitations or history are triggered.
        if(action.kind==='next')onAdvance();
        if(revision===currentRevision)arm(action.wait);
      }catch{pause();onError?.();}
    }
    // Reset a ready fixture while it is still hidden, before the parent starts
    // sliding it in. A late-mounted frame is prepared in its load event instead.
    function prepareIncoming(){
      const id=scene.sequence[index].id,doc=previews[index].querySelector('iframe')?.contentDocument;
      const context=doc?.defaultView?.TurboStoryContext;
      if(!doc||doc.readyState!=='complete'||!context?.embedded||!context.locked||context.scene?.id!==id)return;
      if(FLOWS[scene.id]?.reload?.includes(id))return;
      try{prepare(doc,id,scene.id);preparedDoc=doc;}catch{onError?.();}
    }
    previews.forEach((preview,i)=>preview.querySelector('.family-story__phone-slot').addEventListener('load',()=>{if(i===index&&!readyDoc)prepareIncoming();},true));
    function activate(next){
      cancel();cancelPresses();running=false;revision++;index=next;queue=actions(scene.sequence[index].id,scene.id);position=0;readyDoc=null;preparedDoc=null;remaining=0;elapsed=0;lastTarget=null;hideDots();prepareIncoming();progress();
    }
    function pause(){
      if(timer!==null){const rest=Math.max(0,due-now());if(readyDoc)elapsed+=remaining-rest;remaining=rest;}cancel();running=false;rail.dataset.playbackState='paused';progress();
      cursors.forEach(dot=>dot.getAnimations?.().forEach(animation=>animation.pause()));
      presses.forEach(animation=>animation.pause());
    }
    function resume(){
      if(running)return;running=true;rail.dataset.playbackState='playing';
      cursors.forEach(dot=>dot.getAnimations?.().forEach(animation=>animation.play()));presses.forEach(animation=>animation.play());arm(remaining);
    }
    if(root.ResizeObserver)new root.ResizeObserver(()=>{
      if(!lastTarget||!readyDoc)return;
      const frame=previews[index].querySelector('iframe'),target=readyDoc.querySelector(lastTarget);if(!frame||!target)return;
      const coords=point(readyDoc,target,frame,cursors[index].parentElement);cursors[index].style.left=coords.x+'px';cursors[index].style.top=coords.y+'px';
    }).observe(rail);
    return {activate,pause,resume};
  }
  // Deterministic seeking for the full walkthrough. Never follows links or submits forms.
  function snapshot(doc,id,flow,elapsed){
    const context=doc?.defaultView?.TurboStoryContext;
    if(!context?.embedded||!context.locked||context.scene?.id!==id)throw new Error('Snapshot requires the matching locked fixture');
    if(id==='hub-setup'){
      if(!doc.defaultView.TurboCreateHubPlaybackReset)throw new Error('Creation fixture cannot be reset');
      doc.defaultView.TurboCreateHubPlaybackReset();
    }else prepare(doc,id,flow);
    let time=0,lastTarget=null;
    for(const action of actions(id,flow)){
      if(time>elapsed)break;
      if(action.kind==='set'||action.kind==='drag')setControl(doc,action.selector,action.value);
      if(action.kind==='store')doc.querySelector('#install').setPlaybackState(action.state,action.value);
      if(action.kind==='move'||action.kind==='drag')lastTarget=action.selector;
      time+=action.wait;
    }
    if(lastTarget){const target=doc.querySelector(lastTarget);if(target)reveal(doc,target);}
  }
  root.TurboStoryPlayback={create,actionsFor:actions,snapshot};
})(window);
