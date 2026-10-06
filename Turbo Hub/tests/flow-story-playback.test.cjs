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
  animate(frames,options){const animation={frames,options,cancelled:false,cancel(){this.cancelled=true;}};this.animations.push(animation);return animation;}
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
    const scroller=new Element('div',{left:10,top:150,width:280,height:400});scroller.scrollTop=0;scroller.clientHeight=400;scroller.contains=target=>target.inContent;
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
      control('#limit-target','select');const range=control('#limit-amount','input','range');range.min='500';range.max='100000';control('#content button[type="submit"]','button','submit');
    }
    if(screen.id==='scan-qr')control('.scan-camera__target','button');
    if(screen.id==='invite-notification')control('#notifications .th-payment-notification','a', '',false);
    if(screen.id==='invitation')control('.wa-preview','a');
    if(screen.id==='play-store'){
      const store=control('#store','div'),install=control('#install','div');store.scrollTop=0;
      install.setPlaybackState=(state,value=0)=>{install.state=state;install.percent=value;delete controls['#install button'];delete controls['#install a'];if(state==='idle')control('#install button','button');if(state==='ready')control('#install a','a');};
      install.setPlaybackState('idle');
    }
    if(screen.id==='hub-welcome'){control('#welcome-terms','input','checkbox');control('.welcome-footer button','button');}
    if(screen.id==='verify-mobile'){control('#otp','input','text');control('#form button[type="submit"]','button','submit');}
    if(screen.id==='payment-review'){
      control('#amount','input','text');const swipe=control('#pay','input','range',false);swipe.min='0';swipe.max='100';swipe.classList.add('th-swipe__control');
    }
    controls['#content']=scroller;controls['#footer']=footer;
    class Event{constructor(type){this.type=type;}}
    const doc={readyState:'complete',defaultView:{TurboStoryContext:{embedded:true,locked:true,scene:screen},Event,MouseEvent:Event,TurboUI:{pressButton:target=>{
      if(target?.tagName!=='A'&&target?.type!=='submit')return null;
      const press={target,paused:false,cancelled:false,pause(){this.paused=true;},play(){this.paused=false;},cancel(){this.cancelled=true;}};presses.push(press);return press;
    }}},querySelector:selector=>controls[selector]||null};
    frame.contentDocument=doc;controlsByScene.push(controls);return preview;
  });
  vm.runInNewContext(read('flow-story-playback.js'),{window});
  // Include the real sequence controller: this catches timer handoff bugs between screens.
  const originalCreate=window.TurboStoryPlayback.create;
  window.TurboStoryPlayback.create=options=>originalCreate({...options,onError:()=>{errors++;options.onError?.();}});
  vm.runInNewContext(read('flow-story.js'),{window,document,URL,IntersectionObserver:window.IntersectionObserver});
  const rail=new Element('div'),controls=window.TurboFlowStory.sequenceLoop(rail,previews,scene);
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
test('scripted touch enters from the side, reaches Add, and continues across all five screens',()=>{
  const h=harness();assert.equal(h.timers.size,0);h.start();h.tick();
  const dot=h.previews[0].slot.children.at(-1);assert.equal(dot.style.left,'-16px');assert.ok(dot.classList.contains('is-visible'));
  h.tick();assert.equal(dot.style.left,'140px');assert.equal(dot.style.top,'235px');h.tick();assert.ok(dot.classList.contains('is-tapping'));
  h.until(()=>h.current()===1);h.tick();
  const details=h.controlsByScene[1];assert.equal(details['#name'].value,'');assert.equal(details['#confirmed'].checked,false);assert.equal(details['#footer button[type="submit"]'].disabled,true);
  h.until(()=>details['#name'].value==='Kavya Sharma');assert.equal(details['#relation'].value,'Wife');
  h.until(()=>h.current()===2);assert.equal(details['#mobile'].value,'9876543210');assert.equal(details['#manager'].getAttribute('aria-checked'),'true');assert.equal(details['#confirmed'].checked,true);assert.equal(details['#footer button[type="submit"]'].disabled,false);
  h.until(()=>h.current()===3);const methods=h.controlsByScene[2];assert.equal(methods['#physical'].checked,false);assert.equal(methods['#digital'].checked,true);assert.equal(methods['#upi'].checked,true);
  h.until(()=>h.current()===4);h.until(()=>h.current()===0);h.until(()=>h.current()===1);h.tick();assert.equal(details['#name'].value,'');assert.equal(h.errors(),0);
  // Cursor pulses do not invoke native navigation or form submission.
  for(const selectors of h.controlsByScene)for(const [selector,el] of Object.entries(selectors))if(selector.includes('submit')||selector.includes('section-top'))assert.deepEqual(el.events,[]);
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
  frame.contentDocument=doc;doc.readyState='loading';h.tick();assert.equal(h.previews[0].slot.children.at(-1).classList.contains('is-visible'),false);
  doc.readyState='complete';h.tick();assert.equal(h.previews[0].slot.children.at(-1).style.left,'-16px');
  h.tick();frame.contentDocument={...doc};h.tick();assert.equal(h.previews[0].slot.children.at(-1).style.left,'-16px');
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
  assert.equal(scroller.scrollTop,86);const dot=h.previews[0].slot.children.at(-1);assert.equal(dot.style.left,'70px');assert.equal(dot.style.top,'302.5px');assert.equal(h.errors(),0);
});
test('reduced motion holds scripted actions until explicitly played',()=>{
  const h=harness({reduced:true});h.start();assert.equal(h.timers.size,0);h.controls.children[2].listeners.click();h.tick();assert.ok(h.previews[0].slot.children.at(-1).classList.contains('is-visible'));
});
test('button tap feedback pauses with playback and cancels when the reader changes screens',()=>{
  const h=harness();h.start();h.tick();h.tick();h.tick();assert.equal(h.presses.length,1);assert.equal(h.presses[0].target,h.controlsByScene[0]['#hub-panel .section-top a']);
  h.controls.children[2].listeners.click();assert.equal(h.presses[0].paused,true);h.controls.children[2].listeners.click();assert.equal(h.presses[0].paused,false);
  h.controls.children[2].listeners.click();h.steps[1].listeners.click();assert.equal(h.presses[0].cancelled,true);assert.equal(h.timers.size,0);
});
test('title-only step buttons identify one current screen, with internal timing preserved',()=>{
  const h=harness(),list=h.controls.children[0];assert.equal(list.tagName,'OL');assert.equal(h.steps.length,5);
  h.steps.forEach((button,i)=>{assert.equal(button.children[1].children[0].textContent,h.scene.sequence[i].title);assert.equal(button.children[1].children.length,1);assert.equal(button.getAttribute('aria-current'),i===0?'step':'false');});
  h.start();h.until(()=>h.current()===2);
  assert.equal(h.fills[0].style.transform,'scaleY(1)');assert.equal(h.fills[1].style.transform,'scaleY(1)');assert.equal(h.fills[2].style.transform,'scaleY(0)');assert.equal(h.fills[3].style.transform,'scaleY(0)');
  h.until(()=>h.current()===0);assert.ok(h.fills.every(fill=>fill.style.transform==='scaleY(0)'));
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
  const limit=h.controlsByScene[2];h.until(()=>limit['#limit-amount'].value==='5000');assert.equal(limit['#limit-target'].value,'neha');
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
  const range=h.controlsByScene[2]['#limit-amount'],dot=h.previews[2].slot.children.at(-1);
  assert.equal(range.value,'500');h.until(()=>range.value==='1500');const before=Number.parseFloat(dot.style.left);
  h.controls.children[2].listeners.click();assert.equal(range.value,'1500');assert.equal(h.timers.size,0);
  h.controls.children[2].listeners.click();h.until(()=>range.value==='3000');assert.ok(Number.parseFloat(dot.style.left)>before);
  h.until(()=>range.value==='5000');assert.ok(range.events.filter(event=>event==='input').length>=10);assert.equal(dot.style.transitionDuration,'100ms');assert.equal(h.errors(),0);
});


test('Neha request loop scans, types the amount and visually swipes without navigating or confirming',()=>{
  const h=harness({flowId:'request-flow'});h.start();h.until(()=>h.current()===1);
  const review=h.controlsByScene[1];assert.equal(review['#amount'].value,'');assert.equal(review['#pay'].value,'0');
  h.until(()=>review['#amount'].value==='2500');h.until(()=>review['#pay'].value==='50');
  const dot=h.previews[1].slot.children.at(-1),middle=Number.parseFloat(dot.style.left);
  h.until(()=>review['#pay'].value==='100');assert.ok(Number.parseFloat(dot.style.left)>middle);assert.equal(review['#pay'].events.includes('change'),false);
  h.until(()=>h.current()===2);assert.equal(h.scene.sequence[2].id,'request-pending');h.until(()=>h.current()===0);assert.equal(h.errors(),0);
});

test('Neha joins through seven fixtures into the Hub with pausable install, terms acceptance, SMS autofill and full reset',()=>{
  const h=harness({flowId:'whatsapp-invite-flow'});h.start();
  assert.deepEqual(h.scene.sequence.map(s=>s.id),['invite-notification','invitation','play-store','hub-welcome','verify-mobile','hub-joined','neha-hub']);
  h.until(()=>h.current()===2);
  const install=h.controlsByScene[2]['#install'];assert.equal(install.state,'idle');
  h.until(()=>install.percent===35);h.controls.children[2].listeners.click();
  assert.equal(h.timers.size,0);assert.equal(install.state,'progress');assert.equal(install.percent,35);
  h.advanceClock(10000);h.controls.children[2].listeners.click();h.until(()=>install.state==='ready');
  h.until(()=>h.current()===3);const terms=h.controlsByScene[3]['#welcome-terms'];assert.equal(terms.checked,false);
  h.until(()=>terms.checked);assert.deepEqual(terms.events,['change','change']);
  h.until(()=>h.current()===4);const otp=h.controlsByScene[4]['#otp'];assert.equal(otp.value,'');
  h.until(()=>otp.value==='482913');assert.deepEqual(otp.events,['input','input']);
  h.until(()=>h.current()===5);h.until(()=>h.current()===6);assert.equal(h.scene.sequence[6].route,'hub-dashboard?state=joined&member=neha');h.until(()=>h.current()===0);h.until(()=>h.current()===2);
  assert.equal(install.state,'idle');assert.equal(install.percent,0);
  h.steps[3].listeners.click();assert.equal(terms.checked,false);
  h.steps[4].listeners.click();assert.equal(otp.value,'');assert.equal(h.errors(),0);
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
      timers[0].callback();assert.equal(nodes.install.children[0].textContent,'Open');assert.equal(nodes.install.children[0].href,'../hub-welcome/index.html');
    }
  }
});
