const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'..'),story=require('../flow-story-data.js');
const read=file=>fs.readFileSync(path.join(app,file),'utf8');
class Element{
  constructor(tag,rect={left:0,top:0,width:300,height:620}){
    this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.attributes={};this.style={setProperty:(name,value)=>this.style[name]=value};this.listeners={};this.rect=rect;this.events=[];this.animations=[];
    const classes=new Set();this.classList={add:n=>classes.add(n),remove:n=>classes.delete(n),contains:n=>classes.has(n),toggle:(n,active)=>active?classes.add(n):classes.delete(n)};
  }
  append(...children){for(const child of children){this.children.push(child);child.parentElement=this;}}
  setAttribute(name,value){this.attributes[name]=value;}
  getAttribute(name){return this.attributes[name]??null;}
  addEventListener(name,fn){this.listeners[name]=fn;}
  querySelector(selector){if(selector==='iframe')return this.frame||null;if(selector==='.family-story__phone-slot')return this.slot;return null;}
  getBoundingClientRect(){const {left,top,width,height}=this.rect;return {left,top,width,height,right:left+width,bottom:top+height};}
  dispatchEvent(event){this.events.push(event.type);this.listeners[event.type]?.(event);}
  animate(frames,options){const animation={frames,options,cancelled:false,paused:false,pause(){this.paused=true;},play(){this.paused=false;},cancel(){this.cancelled=true;}};this.animations.push(animation);return animation;}
}
function harness({reduced=false,flowId='kavya-invite-flow'}={}){
  const scene=story.chapters.flatMap(c=>c.scenes).find(s=>s.id===flowId);
  let clock=0,id=0,errors=0;const timers=new Map(),observers=[],events={},documentEvents={},presses=[];
  const document={hidden:false,createElement:tag=>new Element(tag),addEventListener:(name,fn)=>documentEvents[name]=fn};
  const window={document,TurboFamilyStory:story,performance:{now:()=>clock},setTimeout:(fn,ms)=>{timers.set(++id,{fn,due:clock+ms});return id;},clearTimeout:id=>timers.delete(id),matchMedia:()=>({matches:reduced,addEventListener(){}}),addEventListener:(name,fn)=>events[name]=fn,IntersectionObserver:class{constructor(fn){this.fn=fn;observers.push(this);}observe(){}}};
  const controlsByScene=[],previews=scene.sequence.map(screen=>{
    const preview=new Element('figure');preview.slot=new Element('div',{left:100,top:200,width:300,height:620});preview.append(preview.slot);
    const frame=new Element('iframe',{left:100,top:200,width:300,height:620});frame.clientWidth=300;frame.clientHeight=620;preview.frame=frame;preview.slot.append(frame);
    const controls={};
    const scroller=new Element('div',{left:10,top:150,width:280,height:400});scroller.scrollTop=0;scroller.clientHeight=400;scroller.scrollHeight=1400;scroller.contains=target=>target.inContent;
    const footer=new Element('footer',{left:10,top:550,width:280,height:60});
    const control=(selector,tag,type='',inContent=true)=>{
      const target=new Element(tag,{left:40,top:220,width:type==='checkbox'?20:200,height:30});target.type=type;target.value='prefilled';target.checked=true;target.inContent=inContent;controls[selector]=target;return target;
    };
    if(screen.id==='hub-joined')control('#actions a','a');
    if(screen.id==='members-owner'||screen.id==='members-parents')control('#hub-panel .section-top a','a');
    if(screen.id==='add-member'||screen.id==='invite-son'){
      control('#relation','select');for(const name of ['name','nickname','mobile'])control('#'+name,'input','text');
      const manager=control('#manager','button');manager.setAttribute('role','switch');manager.setAttribute('aria-checked','true');manager.listeners.click=()=>manager.setAttribute('aria-checked',String(manager.getAttribute('aria-checked')!=='true'));
      const confirmed=control('#confirmed','input','checkbox',false),next=control('#footer button[type="submit"]','button','submit',false);next.disabled=false;confirmed.listeners.change=()=>next.disabled=!confirmed.checked;
    }
    if(screen.id==='member-payment-methods'){
      for(const name of ['physical','digital','upi'])control('#'+name,'input','checkbox');control('#footer button[type="submit"]','button','submit',false);
    }
    if(screen.id==='spending-limit'){
      const range=control('#limit-amount','input','range');range.min='500';range.max='100000';control('#content button[type="submit"]','button','submit');
    }
    if(screen.id==='scan-qr')control('.scan-camera__target','button');
    if(screen.id==='members-family')control('#hub-tab-0','button');
    if(screen.id==='hub-dashboard')control('#hub-tab-2','button');
    if(screen.id==='hub-analytics')control('#nav a[aria-label="Back to Hubs"]','a','',false);
    if(screen.id==='invite-notification')control('#notifications .th-payment-notification','a', '',false);
    if(screen.id==='invitation')control('.wa-preview','a');
    if(screen.id==='play-store'){
      const store=control('#store','div'),install=control('#install','div');store.scrollTop=0;
      install.setPlaybackState=(state,value=0)=>{install.state=state;install.percent=value;delete controls['#install button'];delete controls['#install a'];if(state==='idle')control('#install button','button');if(state==='ready')control('#install a','a');};
      install.setPlaybackState('idle');
    }
    if(screen.id==='payzapp-onboarding'){control('#start-action button','button');controls.onboarding={slides:[],resets:0};}
    if(screen.id==='hub-welcome'){control('.welcome-footer button','button');controls.welcome={resets:0,enters:0,shows:0,paused:false};}
    if(screen.id==='verify-mobile'){control('#otp','input','text');control('#form button[type="submit"]','button','submit');}
    if(screen.id==='neha-profile')control('#upi-row','a');
    if(screen.id==='neha-upi-active')control('#card-row','a');
    if(screen.id==='verify-pan'){
      for(const name of ['pan','name','dob'])control('#'+name,'input','text');
      control('#pan-consent','input','checkbox');control('#form button[type="submit"]','button','submit');
    }
    if(screen.id==='upi-pin'){
      for(const name of ['pin','confirm'])control('#'+name,'input','password');
      control('#form button[type="submit"]','button','submit');
    }
    if(screen.id==='neha-delivery'){
      for(const name of ['line1','line2','line3','pincode','city','state','contact'])control('#'+name,'input','text');
      control('#delivery-confirm','input','checkbox');control('#delivery-form button[type="submit"]','button','submit');
    }
    if(screen.id==='neha-delivery-confirmed'){
      control('#actions a','a');const success=control('.th-success-indicator','span');success.plays=0;success.play=()=>success.plays++;
    }
    if(screen.id==='payment-review'){
      control('#amount','input','text');const swipe=control('#pay','input','range',false);swipe.min='0';swipe.max='100';swipe.classList.add('th-swipe__control');
    }
    controls['#content']=scroller;controls['.phone-content']=scroller;controls['#footer']=footer;
    class Event{constructor(type){this.type=type;}}
    const doc={readyState:'complete',defaultView:{TurboWelcomePlayback:screen.id==='hub-welcome'?{reset(){controls.welcome.resets++;},enter(){controls.welcome.enters++;},show(){controls.welcome.shows++;},pause(){controls.welcome.paused=true;},resume(){controls.welcome.paused=false;}}:undefined,TurboPayzappPlayback:screen.id==='payzapp-onboarding'?{reset(){controls.onboarding.resets++;controls.onboarding.slides=[];},showSlide(slide){controls.onboarding.slides.push(slide);},pause(){},resume(){}}:undefined,TurboStoryContext:{embedded:true,locked:true,scene:screen},Event,MouseEvent:Event,TurboUI:{pressButton:target=>{
      if(target?.tagName!=='A'&&target?.type!=='submit')return null;
      const press={target,paused:false,cancelled:false,pause(){this.paused=true;},play(){this.paused=false;},cancel(){this.cancelled=true;}};presses.push(press);return press;
    }}},querySelector:selector=>controls[selector]||null};
    frame.contentDocument=doc;controlsByScene.push(controls);return preview;
  });
  window.TurboIcons={render:()=>'<svg></svg>'};
  vm.runInNewContext(read('app-design-system/components/flow-checkpoint.js'),{window});
  vm.runInNewContext(read('flow-story-playback.js'),{window});
  // Include the real sequence controller: this catches timer handoff bugs between screens.
  const originalCreate=window.TurboStoryPlayback.create;
  window.TurboStoryPlayback.create=options=>originalCreate({...options,onError:()=>{errors++;options.onError?.();}});
  vm.runInNewContext(read('flow-story.js'),{window,document,URL,IntersectionObserver:window.IntersectionObserver});
  const rail=new Element('div',{left:100,top:200,width:300,height:620}),controls=window.TurboFlowStory.sequenceLoop(rail,previews,scene);
  const current=()=>previews.findIndex(p=>p.classList.contains('is-current'));
  const tick=()=>{
    const entry=[...timers].sort((a,b)=>a[1].due-b[1].due)[0];assert.ok(entry,'Expected a pending playback action');
    const [key,timer]=entry;timers.delete(key);clock=timer.due;timer.fn();
  };
  const until=condition=>{let count=0;while(!condition()){assert.ok(count++<250,'Playback did not reach the expected state');tick();}};
  const start=()=>observers[0].fn([{isIntersecting:true}]);
  const steps=controls.children[0].children.map(item=>item.children[0]),fills=steps.map(button=>button.children[0].children[0]);
  return {scene,window,document,documentEvents,events,previews,controlsByScene,rail,controls,steps,fills,timers,tick,until,start,current,presses,errors:()=>errors,advanceClock:ms=>clock+=ms};
}
test('scrubbing backward restores input and role state without activating a submit action',()=>{
  const h=harness(),index=h.scene.sequence.findIndex(item=>item.id==='add-member');
  const doc=h.previews[index].frame.contentDocument,fields=h.controlsByScene[index];
  const snapshot=h.window.TurboStoryPlayback.snapshot;
  snapshot(doc,'add-member','kavya-invite-flow',100000);
  assert.equal(fields['#name'].value,'Kavya Sharma');assert.equal(fields['#confirmed'].checked,true);
  snapshot(doc,'add-member','kavya-invite-flow',0);
  assert.equal(fields['#name'].value,'');assert.equal(fields['#confirmed'].checked,false);assert.equal(fields['#manager'].getAttribute('aria-checked'),'false');
  assert.equal(fields['#footer button[type="submit"]'].events.includes('click'),false);
  doc.defaultView.TurboStoryContext.locked=false;
  assert.throws(()=>snapshot(doc,'add-member','kavya-invite-flow',0),/locked fixture/);
});
test('scripted touch waits for movement, reaches Add, and continues across all five screens',()=>{
  const h=harness();assert.equal(h.timers.size,0);h.start();h.tick();
  const dot=h.rail.children.at(-1);assert.equal(dot.style.left,undefined);assert.ok(!dot.classList.contains('is-visible'));
  h.tick();assert.equal(dot.style.left,'140px');assert.equal(dot.style.top,'235px');assert.ok(dot.classList.contains('is-visible'));h.tick();assert.ok(dot.classList.contains('is-tapping'));
  h.until(()=>h.current()===1);h.tick();
  const details=h.controlsByScene[1];assert.equal(details['#name'].value,'');assert.equal(details['#confirmed'].checked,false);assert.equal(details['#footer button[type="submit"]'].disabled,true);
  h.until(()=>details['#name'].value==='Kavya Sharma');assert.equal(details['#relation'].value,'Wife');
  h.until(()=>h.current()===2);assert.equal(details['#mobile'].value,'9876543210');assert.equal(details['#manager'].getAttribute('aria-checked'),'true');assert.equal(details['#confirmed'].checked,true);assert.equal(details['#footer button[type="submit"]'].disabled,false);
  h.until(()=>h.current()===3);const methods=h.controlsByScene[2];assert.equal(methods['#physical'].checked,false);assert.equal(methods['#digital'].checked,true);assert.equal(methods['#upi'].checked,true);
  h.until(()=>h.current()===4);h.until(()=>h.current()===0);h.until(()=>h.current()===1);h.tick();assert.equal(details['#name'].value,'');assert.equal(h.errors(),0);
  // Cursor pulses do not invoke native navigation or form submission.
  for(const selectors of h.controlsByScene)for(const [selector,el] of Object.entries(selectors))if(selector.includes('submit')||selector.includes('section-top'))assert.deepEqual(el.events,[]);
});
test('one touch dot fades at handoffs and waits for movement while retaining its last position across all flows',()=>{
  for(const flowId of ['kavya-invite-flow','children-invite-flow','whatsapp-invite-flow','member-activation-flow','request-flow','tracking-flow']){
    const h=harness({flowId});h.start();const dot=h.rail.children.at(-1);
    let before;
    while(h.current()===0){before={left:dot.style.left,top:dot.style.top};h.tick();}
    assert.equal(h.rail.children.at(-1),dot);assert.deepEqual({left:dot.style.left,top:dot.style.top},before,flowId);
    assert.ok(!dot.classList.contains('is-visible'));assert.ok(!dot.classList.contains('is-tapping'));
    const first=h.window.TurboStoryPlayback.actionsFor(h.scene.sequence[1].id,flowId)[0];
    if(['enter','hide','success'].includes(first.kind)){h.tick();assert.deepEqual({left:dot.style.left,top:dot.style.top},before);assert.ok(!dot.classList.contains('is-visible'));}
    const arrivals=dot.animations.length;
    h.until(()=>dot.classList.contains('is-visible'));assert.equal(h.current(),1,'the first movement reveals the dot');
    assert.equal(dot.animations.length,arrivals+1,'each screen gets an approach even when the next target is nearby');
    const arrival=dot.animations.at(-1);assert.match(arrival.frames[0].transform,/translateX\(-?80px\)/);assert.equal(arrival.frames[0].opacity,0);assert.equal(arrival.frames[1].opacity,1);assert.equal(arrival.options.duration,550);
    h.until(()=>h.current()===0);before={left:dot.style.left,top:dot.style.top};
    assert.ok(!dot.classList.contains('is-visible'));
    h.tick();assert.deepEqual({left:dot.style.left,top:dot.style.top},before);assert.ok(!dot.classList.contains('is-visible'));
    assert.equal(h.errors(),0);assert.equal(h.rail.children.filter(el=>el.className==='family-story__touch-dot').length,1);
  }
});
test('the shared dot targets the phone correctly when the rail has a different origin',()=>{
  const h=harness();h.rail.rect.left=50;h.rail.rect.top=120;h.start();h.tick();h.tick();
  const dot=h.rail.children.at(-1);assert.equal(dot.style.left,'190px');assert.equal(dot.style.top,'315px');
});
test('dot approaches from inside the phone, scales its travel and pauses or cancels with playback',()=>{
  const h=harness(),frame=h.previews[0].frame,target=h.controlsByScene[0]['#hub-panel .section-top a'];
  frame.rect.width=150;frame.rect.height=310;target.rect.left=250;target.rect.width=20;
  h.start();h.tick();h.tick();const dot=h.rail.children.at(-1),arrival=dot.animations.at(-1);
  assert.equal(dot.style.left,'130px');assert.match(arrival.frames[0].transform,/translateX\(-40px\)/);
  h.controls.children[2].listeners.click();assert.equal(arrival.paused,true);
  h.controls.children[2].listeners.click();assert.equal(arrival.paused,false);
  h.steps[1].listeners.click();assert.equal(arrival.cancelled,true);assert.ok(!dot.classList.contains('is-visible'));
});
test('typing pauses mid-word, preserves the outstanding delay, and resumes without resetting',()=>{
  const h=harness();h.start();h.until(()=>h.current()===1);const name=h.controlsByScene[1]['#name'];h.until(()=>name.value==='Kav');
  h.advanceClock(30);h.controls.children[2].listeners.click();assert.equal(h.timers.size,0);assert.equal(h.rail.dataset.playbackState,'paused');
  h.advanceClock(10000);assert.equal(name.value,'Kav');h.controls.children[2].listeners.click();
  const timer=[...h.timers.values()][0];assert.equal(timer.due-h.window.performance.now(),55);h.tick();assert.equal(name.value,'Kavy');
});
test('visibility and page lifecycle pause actions; step selection restarts playback unless already paused',()=>{
  const h=harness();h.start();h.document.hidden=true;h.documentEvents.visibilitychange();assert.equal(h.timers.size,0);
  h.document.hidden=false;h.documentEvents.visibilitychange();assert.equal(h.timers.size,1);h.events.pagehide();assert.equal(h.timers.size,0);h.events.pageshow();assert.equal(h.timers.size,1);
  h.steps[2].listeners.click();assert.equal(h.current(),2);assert.equal(h.timers.size,1);h.tick();assert.equal(h.controlsByScene[2]['#digital'].checked,false);assert.equal(h.errors(),0);
  h.controls.children[2].listeners.click();h.steps[1].listeners.click();assert.equal(h.current(),1);assert.equal(h.timers.size,0);
});
test('frames may mount late or reload without reusing a stale action document',()=>{
  const h=harness(),frame=h.previews[0].frame,doc=frame.contentDocument;frame.contentDocument=null;h.start();h.tick();assert.equal(h.errors(),0);assert.equal(h.timers.size,1);
  frame.contentDocument=doc;doc.readyState='loading';h.tick();assert.equal(h.rail.children.at(-1).classList.contains('is-visible'),false);
  doc.readyState='complete';h.tick();assert.equal(h.rail.children.at(-1).style.left,undefined);assert.ok(!h.rail.children.at(-1).classList.contains('is-visible'));
  h.tick();frame.contentDocument={...doc};h.tick();assert.equal(h.rail.children.at(-1).style.left,'140px');
});
test('playback refuses standalone, unlocked or unrelated frames and missing controls',()=>{
  for(const changes of [{embedded:false},{locked:false},{scene:{id:'wrong-scene'}}]){
    const h=harness();Object.assign(h.previews[0].frame.contentDocument.defaultView.TurboStoryContext,changes);h.start();h.tick();assert.equal(h.errors(),1);assert.equal(h.timers.size,0);
  }
  const h=harness();delete h.controlsByScene[0]['#hub-panel .section-top a'];h.start();h.tick();h.tick();assert.equal(h.errors(),1);assert.equal(h.timers.size,0);
});
test('target positioning uses scaled live rectangles and scrolls only child content',()=>{
  const h=harness(),frame=h.previews[0].frame,target=h.controlsByScene[0]['#hub-panel .section-top a'],scroller=h.controlsByScene[0]['#content'];
  target.rect.top=590;frame.rect.width=150;frame.rect.height=310;h.start();h.tick();h.tick();
  assert.equal(scroller.scrollTop,86);const dot=h.rail.children.at(-1);assert.equal(dot.style.left,'70px');assert.equal(dot.style.top,'302.5px');assert.equal(h.errors(),0);
});
test('reduced motion holds scripted actions until explicitly played',()=>{
  const h=harness({reduced:true});h.start();assert.equal(h.timers.size,0);h.controls.children[2].listeners.click();h.tick();assert.ok(!h.rail.children.at(-1).classList.contains('is-visible'));
  h.tick();assert.ok(h.rail.children.at(-1).classList.contains('is-visible'));assert.equal(h.rail.children.at(-1).animations.length,0);
});
test('button tap feedback pauses with playback and cancels when the reader changes screens',()=>{
  const h=harness();h.start();h.tick();h.tick();h.tick();assert.equal(h.presses.length,1);assert.equal(h.presses[0].target,h.controlsByScene[0]['#hub-panel .section-top a']);
  h.controls.children[2].listeners.click();assert.equal(h.presses[0].paused,true);h.controls.children[2].listeners.click();assert.equal(h.presses[0].paused,false);
  h.controls.children[2].listeners.click();const dot=h.rail.children.at(-1),before={left:dot.style.left,top:dot.style.top};h.steps[1].listeners.click();assert.equal(h.presses[0].cancelled,true);assert.equal(h.timers.size,0);
  assert.ok(!dot.classList.contains('is-visible'));assert.deepEqual({left:dot.style.left,top:dot.style.top},before);
});
test('connected checkpoints identify current, completed and upcoming screens and reset with the loop',()=>{
  const h=harness(),list=h.controls.children[0];assert.equal(list.tagName,'OL');assert.equal(h.steps.length,5);
  h.steps.forEach((button,i)=>{assert.equal(button.children[1].children[0].textContent,h.scene.sequence[i].title);assert.equal(button.children[1].children.length,1);assert.equal(button.getAttribute('aria-current'),i===0?'step':'false');});
  assert.equal(h.steps.at(-1).children[0].hidden,true);
  assert.equal(h.steps[0].children[2].children[0].textContent,'1');
  h.start();h.until(()=>h.current()===2);
  assert.deepEqual(h.steps.map(step=>step.dataset.state),['complete','complete','current','upcoming','upcoming']);
  assert.match(h.steps[0].getAttribute('aria-label'),/completed/);
  assert.equal(h.fills[0].style.transform,'scaleY(1)');assert.equal(h.fills[1].style.transform,'scaleY(1)');assert.equal(h.fills[2].style.transform,'scaleY(0)');assert.equal(h.fills[3].style.transform,'scaleY(0)');
  h.until(()=>h.current()===0);assert.ok(h.fills.every(fill=>fill.style.transform==='scaleY(0)'));
  assert.deepEqual(h.steps.map(step=>step.dataset.state),['current','upcoming','upcoming','upcoming','upcoming']);
  h.steps[3].listeners.click();h.steps[1].listeners.click();
  assert.deepEqual(h.steps.map(step=>step.dataset.state),['complete','current','upcoming','upcoming','upcoming']);
});
test('step fill follows the complete screen action duration and preserves exact progress on pause',()=>{
  const h=harness();h.start();assert.equal(h.fills[0].animations.length,0);h.tick();
  assert.equal(h.fills[0].animations.at(-1).options.duration,2150);h.tick();
  assert.equal(h.fills[0].style.transform,`scaleY(${600/2150})`);assert.equal(h.fills[0].animations.at(-1).options.duration,1550);
  const animation=h.fills[0].animations.at(-1);h.advanceClock(120);h.controls.children[2].listeners.click();assert.equal(animation.cancelled,true);assert.equal(h.fills[0].style.transform,`scaleY(${720/2150})`);
  h.advanceClock(10000);h.controls.children[2].listeners.click();assert.equal(h.fills[0].animations.at(-1).options.duration,1430);
  h.until(()=>h.current()===1);h.tick();assert.equal(h.fills[1].animations.at(-1).options.duration,9980);
  h.until(()=>h.current()===2);h.tick();assert.equal(h.fills[2].animations.at(-1).options.duration,4290);
});
test('late frame loading holds fill at zero and step clicks cancel the old timer and select the matching phone',()=>{
  const h=harness(),frame=h.previews[0].frame,doc=frame.contentDocument;frame.contentDocument=null;h.start();h.tick();h.tick();
  assert.equal(h.fills[0].animations.length,0);assert.equal(h.fills[0].style.transform,'scaleY(0)');frame.contentDocument=doc;h.tick();
  const animation=h.fills[0].animations.at(-1);h.steps[3].listeners.click();assert.equal(animation.cancelled,true);assert.equal(h.current(),3);assert.equal(h.timers.size,1);h.tick();
  assert.equal(h.fills[3].animations.at(-1).options.duration,2200);assert.equal(h.steps[3].getAttribute('aria-current'),'step');h.until(()=>h.current()===4);h.tick();assert.equal(h.fills[4].animations.at(-1).options.duration,2800);
});
test('reduced motion avoids continuously animated step fills while keeping explicit playback usable',()=>{
  const h=harness({reduced:true});h.start();h.controls.children[2].listeners.click();h.tick();h.tick();
  assert.ok(h.fills.every(fill=>fill.animations.length===0));assert.equal(h.fills[0].style.transform,`scaleY(${600/2150})`);
});


test('children invite flow types Rohan without manager rights, sets Neha allowance and returns to the roster',()=>{
  const h=harness({flowId:'children-invite-flow'});h.start();h.until(()=>h.current()===1);
  const son=h.controlsByScene[1];h.until(()=>son['#mobile'].value==='9876543211');
  assert.equal(son['#name'].value,'Rohan Sharma');assert.equal(son['#relation'].value,'Son');assert.equal(son['#manager'].getAttribute('aria-checked'),'false');
  h.until(()=>h.current()===2);assert.equal(son['#confirmed'].checked,true);
  const limit=h.controlsByScene[2];h.until(()=>limit['#limit-amount'].value==='5000');assert.equal(limit['#limit-target'],undefined);
  h.until(()=>h.current()===3);assert.equal(h.scene.sequence[3].id,'children-invite-sent');h.until(()=>h.current()===4);assert.equal(h.scene.sequence[4].id,'members-children-invited');h.until(()=>h.current()===0);h.until(()=>h.current()===1);h.tick();
  assert.equal(son['#name'].value,'');assert.equal(son['#manager'].getAttribute('aria-checked'),'false');assert.equal(h.errors(),0);
});

test('incoming fixture is reset before transition playback starts, including manual selection',()=>{
  const h=harness();
  h.steps[2].listeners.click();
  const payments=h.controlsByScene[2];
  for(const id of ['physical','digital','upi'])assert.equal(payments['#'+id].checked,false);
  h.steps[1].listeners.click();
  const details=h.controlsByScene[1];
  assert.equal(details['#name'].value,'');assert.equal(details['#mobile'].value,'');assert.equal(details['#confirmed'].checked,false);assert.equal(details['#manager'].getAttribute('aria-checked'),'false');
  h.start();h.until(()=>details['#name'].value==='Kavya Sharma');
  assert.equal(details['#name'].value,'Kavya Sharma');assert.equal(h.errors(),0);
});


test('children allowance visibly drags through intermediate amounts and pauses without losing its position',()=>{
  const h=harness({flowId:'children-invite-flow'});h.start();h.until(()=>h.current()===2);
  const range=h.controlsByScene[2]['#limit-amount'],dot=h.rail.children.at(-1);
  assert.equal(range.value,'500');h.until(()=>range.value==='1500');const before=Number.parseFloat(dot.style.left);
  h.controls.children[2].listeners.click();assert.equal(range.value,'1500');assert.equal(h.timers.size,0);
  h.controls.children[2].listeners.click();h.until(()=>range.value==='3000');assert.ok(Number.parseFloat(dot.style.left)>before);
  h.until(()=>range.value==='5000');assert.ok(range.events.filter(event=>event==='input').length>=10);assert.equal(dot.style.transitionDuration,'100ms,100ms,180ms');assert.equal(h.errors(),0);
});


test('Neha request loop scans, types the amount and visually swipes without navigating or confirming',()=>{
  const h=harness({flowId:'request-flow'});h.start();h.until(()=>h.current()===1);
  const review=h.controlsByScene[1];assert.equal(review['#amount'].value,'');assert.equal(review['#pay'].value,'0');
  h.until(()=>review['#amount'].value==='2500');h.until(()=>review['#pay'].value==='50');
  const dot=h.rail.children.at(-1),middle=Number.parseFloat(dot.style.left);
  h.until(()=>review['#pay'].value==='100');assert.ok(Number.parseFloat(dot.style.left)>middle);assert.equal(review['#pay'].events.includes('change'),false);
  h.until(()=>h.current()===2);assert.equal(h.scene.sequence[2].id,'request-pending');h.until(()=>h.current()===0);assert.equal(h.errors(),0);
});

test('parents review Members, Spends and Analytics, scroll with pausable timing, then return to All Hubs',()=>{
  const h=harness({flowId:'tracking-flow'});h.start();
  assert.deepEqual(h.scene.sequence.map(s=>s.id),['members-family','hub-dashboard','hub-analytics','hubs']);
  for(const id of ['members-family','hub-dashboard','hub-analytics'])assert.equal(story.scenes.find(s=>s.id===id).roster,'family');
  h.until(()=>h.current()===1);h.until(()=>h.current()===2);
  const scroller=h.controlsByScene[2]['.phone-content'],dot=h.rail.children.at(-1);
  assert.equal(scroller.scrollTop,0);h.until(()=>scroller.scrollTop>=500);
  assert.ok(!dot.classList.contains('is-visible'),'analytics reading has no tap dot');
  const before=scroller.scrollTop;h.controls.children[2].listeners.click();h.advanceClock(10000);
  assert.equal(scroller.scrollTop,before);assert.equal(h.timers.size,0);
  h.controls.children[2].listeners.click();h.until(()=>scroller.scrollTop===1000);
  h.until(()=>dot.classList.contains('is-tapping'));assert.equal(scroller.scrollTop,0);
  h.until(()=>h.current()===3);h.until(()=>h.current()===0);
  scroller.scrollTop=900;h.steps[2].listeners.click();assert.equal(scroller.scrollTop,0);
  const doc=h.previews[2].frame.contentDocument;
  h.window.TurboStoryPlayback.snapshot(doc,'hub-analytics','tracking-flow',2900);assert.ok(scroller.scrollTop>0&&scroller.scrollTop<1000);
  h.window.TurboStoryPlayback.snapshot(doc,'hub-analytics','tracking-flow',0);assert.equal(scroller.scrollTop,0);
  for(const controls of h.controlsByScene)for(const el of Object.values(controls))if(el.tagName==='A'||el.tagName==='BUTTON')assert.deepEqual(el.events,[]);
  assert.equal(h.errors(),0);
});

test('Neha joins through eight fixtures into the Hub with pausable install, direct invite acceptance, SMS autofill and full reset',()=>{
  const h=harness({flowId:'whatsapp-invite-flow'});h.start();
  assert.deepEqual(h.scene.sequence.map(s=>s.id),['invite-notification','invitation','play-store','payzapp-onboarding','hub-welcome','verify-mobile','hub-joined','neha-hub']);
  h.until(()=>h.current()===2);
  const install=h.controlsByScene[2]['#install'];assert.equal(install.state,'idle');
  h.until(()=>install.percent===35);h.controls.children[2].listeners.click();
  assert.equal(h.timers.size,0);assert.equal(install.state,'progress');assert.equal(install.percent,35);
  h.advanceClock(10000);h.controls.children[2].listeners.click();h.until(()=>install.state==='ready');
  h.until(()=>h.current()===3);const onboarding=h.controlsByScene[3].onboarding;assert.equal(onboarding.resets,1);
  const onboardingActions=h.window.TurboStoryPlayback.actionsFor('payzapp-onboarding','whatsapp-invite-flow');
  assert.ok(onboardingActions.reduce((total,action)=>total+action.wait,0)<6000,'onboarding should continue within six seconds');
  h.until(()=>h.current()===4);assert.deepEqual(onboarding.slides,[0]);assert.equal(h.controlsByScene[4]['#welcome-terms'],undefined);
  h.until(()=>h.current()===5);const otp=h.controlsByScene[5]['#otp'];assert.equal(otp.value,'');
  h.until(()=>otp.value==='482913');assert.deepEqual(otp.events,['input','input']);
  h.until(()=>h.current()===6);h.until(()=>h.current()===7);assert.equal(h.scene.sequence[7].route,'hub-dashboard?state=joined&member=neha');h.until(()=>h.current()===0);h.until(()=>h.current()===2);
  assert.equal(install.state,'idle');assert.equal(install.percent,0);
  h.steps[4].listeners.click();assert.equal(h.controlsByScene[4]['#welcome-terms'],undefined);
  h.steps[5].listeners.click();assert.equal(otp.value,'');assert.equal(h.errors(),0);
  for(const selectors of h.controlsByScene)for(const el of Object.values(selectors))if(el.tagName==='A'||el.tagName==='BUTTON')assert.deepEqual(el.events,[]);
});

test('Play Store story adapter freezes native install timers while standalone installation still opens the app',()=>{
  for(const locked of [true,false]){
    const make=()=>({children:[],append(...items){this.children.push(...items)},replaceChildren(...items){this.children=items},classList:{remove(){}}});
    const nodes={statusbar:make(),store:make(),install:make()},timers=[];
    const window={TurboStoryContext:{embedded:locked,locked}};
    vm.runInNewContext(read('prototypes/play-store/screen.js'),{window,TurboIcons:{render:()=>'<svg></svg>'},TurboUI:{statusbar:make},document:{getElementById:id=>nodes[id],createElement:make,querySelector:make},addEventListener(){},setTimeout:(callback,delay)=>timers.push({callback,delay})});
    nodes.install.children[0].onclick();
    if(locked){
      assert.equal(timers.length,0);nodes.install.setPlaybackState('progress',35);assert.ok(nodes.install.innerHTML.includes('aria-valuenow="35"'));
      nodes.install.setPlaybackState('ready');assert.equal(nodes.install.children[0].textContent,'Open');
      nodes.install.setPlaybackState('idle');assert.equal(nodes.install.children[0].textContent,'Install');
    }else{
      assert.equal(nodes.install.setPlaybackState,undefined);assert.equal(timers.length,1);assert.equal(timers[0].delay,1600);
      timers[0].callback();assert.equal(nodes.install.children[0].textContent,'Open');assert.equal(nodes.install.children[0].href,'../payzapp-onboarding/index.html?next=hub-welcome');
    }
  }
});

test('Neha activation traverses all seven fixtures with valid details, masked PINs and a repeatable reset',()=>{
  const h=harness({flowId:'member-activation-flow'});h.start();
  assert.deepEqual(h.scene.sequence.map(s=>s.id),['neha-profile','verify-pan','upi-pin','neha-upi-active','neha-delivery','neha-delivery-confirmed','neha-ready']);
  h.until(()=>h.current()===1);const pan=h.controlsByScene[1];
  assert.equal(pan['#pan'].value,'');assert.equal(pan['#dob'].value,'');assert.equal(pan['#name'].value,'Neha Sharma');assert.equal(pan['#pan-consent'].checked,false);
  h.until(()=>h.current()===2);
  assert.match(pan['#pan'].value,/^[A-Z]{5}\d{4}[A-Z]$/);assert.equal(pan['#dob'].value,'14/08/2007');assert.equal(pan['#pan-consent'].checked,true);
  const pin=h.controlsByScene[2];assert.equal(pin['#pin'].value,'');assert.equal(pin['#confirm'].value,'');
  h.until(()=>h.current()===3);assert.match(pin['#pin'].value,/^\d{4}$/);assert.equal(pin['#pin'].value,pin['#confirm'].value);assert.equal(pin['#pin'].type,'password');
  h.until(()=>h.current()===4);const address=h.controlsByScene[4];
  assert.equal(address['#line1'].value,'');assert.equal(address['#pincode'].value,'');assert.equal(address['#delivery-confirm'].checked,false);
  assert.equal(address['#city'].value,'Bengaluru');assert.equal(address['#state'].value,'Karnataka');assert.equal(address['#contact'].value,'9876543210');
  h.until(()=>h.current()===5);assert.equal(address['#line1'].value,'12, Garden Apartments');assert.equal(address['#pincode'].value,'560001');assert.equal(address['#delivery-confirm'].checked,true);
  h.until(()=>h.current()===6);assert.equal(h.controlsByScene[5]['.th-success-indicator'].plays,1);
  h.until(()=>h.current()===0);assert.ok(h.fills.every(fill=>fill.style.transform==='scaleY(0)'));
  h.until(()=>h.current()===1);assert.equal(pan['#pan'].value,'');assert.equal(pan['#pan-consent'].checked,false);
  h.steps[2].listeners.click();assert.equal(pin['#pin'].value,'');assert.equal(pin['#confirm'].value,'');
  h.steps[4].listeners.click();assert.equal(address['#line1'].value,'');assert.equal(address['#delivery-confirm'].checked,false);assert.equal(h.errors(),0);
  for(const selectors of h.controlsByScene)for(const el of Object.values(selectors))if(el.tagName==='A'||el.tagName==='BUTTON')assert.deepEqual(el.events,[]);
});

test('activation typing pauses exactly and hides offscreen; late delivery frames reset and scroll only their own content',()=>{
  const h=harness({flowId:'member-activation-flow'});h.start();h.until(()=>h.current()===1);
  const pan=h.controlsByScene[1]['#pan'];h.until(()=>pan.value==='BXK');h.advanceClock(30);h.controls.children[2].listeners.click();
  assert.equal(h.timers.size,0);h.advanceClock(10000);h.controls.children[2].listeners.click();
  assert.equal([...h.timers.values()][0].due-h.window.performance.now(),55);h.tick();assert.equal(pan.value,'BXKP');
  h.document.hidden=true;h.documentEvents.visibilitychange();assert.equal(h.timers.size,0);
  h.document.hidden=false;h.documentEvents.visibilitychange();assert.equal(h.timers.size,1);
  const frame=h.previews[4].frame,doc=frame.contentDocument;frame.contentDocument=null;h.steps[4].listeners.click();h.tick();
  assert.equal(h.fills[4].style.transform,'scaleY(0)');frame.contentDocument=doc;h.tick();
  const fields=h.controlsByScene[4];assert.equal(fields['#line1'].value,'');
  fields['#delivery-confirm'].rect.top=650;h.until(()=>fields['#delivery-confirm'].checked);
  assert.ok(fields['#content'].scrollTop>0);assert.equal(h.controlsByScene[1]['#content'].scrollTop,0);assert.equal(h.errors(),0);
});

test('activation walkthrough snapshots restore PAN, PIN and address state when seeking backwards',()=>{
  const h=harness({flowId:'member-activation-flow'}),snapshot=h.window.TurboStoryPlayback.snapshot;
  for(const [index,id,field,expected,checkbox] of [[1,'verify-pan','#pan','BXKPS4821L','#pan-consent'],[2,'upi-pin','#pin','4821',null],[4,'neha-delivery','#line1','12, Garden Apartments','#delivery-confirm']]){
    const doc=h.previews[index].frame.contentDocument,fields=h.controlsByScene[index];
    snapshot(doc,id,'member-activation-flow',100000);assert.equal(fields[field].value,expected);if(checkbox)assert.equal(fields[checkbox].checked,true);
    fields['#content'].scrollTop=200;snapshot(doc,id,'member-activation-flow',0);
    assert.equal(fields[field].value,'');assert.equal(fields['#content'].scrollTop,0);if(checkbox)assert.equal(fields[checkbox].checked,false);
    for(const el of Object.values(fields))if(el.type==='submit')assert.deepEqual(el.events,[]);
  }
});

test('Welcome entrance starts with playback after preparation and replays on return',()=>{
 const h=harness({flowId:'whatsapp-invite-flow'});h.start();h.until(()=>h.current()===4);
 const welcome=h.controlsByScene[4].welcome;assert.equal(welcome.resets,1);assert.equal(welcome.enters,0);
 const dot=h.rail.children.at(-1);assert.ok(!dot.classList.contains('is-visible'));
 h.tick();assert.equal(welcome.enters,1);assert.ok(!dot.classList.contains('is-visible'));
 h.controls.children[2].listeners.click();assert.equal(welcome.paused,true);h.controls.children[2].listeners.click();assert.equal(welcome.paused,false);
 h.steps[3].listeners.click();h.steps[4].listeners.click();assert.equal(welcome.resets,2);h.tick();assert.equal(welcome.enters,2);
 h.window.TurboStoryPlayback.snapshot(h.previews[4].frame.contentDocument,'hub-welcome','whatsapp-invite-flow',0);assert.equal(welcome.shows,1);assert.equal(welcome.enters,2);
});
