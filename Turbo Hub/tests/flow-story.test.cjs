const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'..'),story=require('../flow-story-data.js');
const read=relative=>fs.readFileSync(path.join(app,relative),'utf8');
class Element{
  constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.attributes={};this.style={setProperty:(name,value)=>{this.style[name]=value}};this.listeners={};const classes=new Set();this.classList={add:name=>classes.add(name),remove:name=>classes.delete(name),toggle:(name,active)=>active?classes.add(name):classes.delete(name),contains:name=>classes.has(name)};}
  append(...children){children.forEach(child=>{this.children.push(child);child.parent=this})}
  replaceChildren(...children){this.children=[];this.append(...children)}
  setAttribute(name,value){this.attributes[name]=value}
  removeAttribute(name){delete this.attributes[name]}
  querySelector(){return null}
  querySelectorAll(){return []}
  addEventListener(name,fn){this.listeners[name]=fn}
  remove(){this.parent.children=this.parent.children.filter(item=>item!==this)}
}
function context(search,mutateStory=story){
  const callbacks={},writes=[],external=new Map([['manual-test','untouched']]);
  const document={documentElement:{dataset:{}},head:new Element('head'),currentScript:{src:'http://localhost:8020/app/prototypes/shared/story-context.js'},createElement:tag=>new Element(tag),querySelector:()=>null,addEventListener:(name,fn)=>{callbacks[name]=fn}};
  const location={href:'http://localhost:8020/app/prototypes/add-member/index.html'+search,search,origin:'http://localhost:8020',pathname:'/app/prototypes/add-member/index.html'};
  const window={TurboFamilyStory:mutateStory};
  vm.runInNewContext(read('prototypes/shared/story-context.js'),{window,document,location,URL,URLSearchParams,parent:{postMessage(){}},sessionStorage:{getItem:key=>{writes.push('get');return external.get(key)??null},setItem:(key,value)=>{writes.push('set');external.set(key,value)},removeItem:key=>{writes.push('remove');external.delete(key)}}});
  return {context:window.TurboStoryContext,window,callbacks,writes,external,document,location};
}
test('all catalog routes have scenes, valid files and unambiguous narrative identities',()=>{
  const registry=JSON.parse(read('app-design-system/registry.json'));
  assert.equal(story.chapters.length,5);assert.equal(new Set(story.scenes.map(s=>s.id)).size,story.scenes.length);
  const canonical=url=>{const u=new URL(url,'http://localhost:8020/design-system/');u.searchParams.delete('amount');return u.pathname+u.search};
  const routes=new Set(story.scenes.map(s=>canonical('/app/prototypes/'+s.route.replace('?', '/index.html?')+(s.route.includes('?')?'':'/index.html'))));
  // Screens deliberately left out of the story (still in the prototype and registry).
  const omitted=new Set(['hub-type','new-user-entry','request-declined','request-expired']);
  registry.screens.filter(screen=>!omitted.has(screen.id)).forEach(screen=>assert.ok(routes.has(canonical(screen.preview)),screen.id+' is missing'));
  story.scenes.forEach(scene=>{assert.equal(scene.interactive,false);assert.ok(story.cast[scene.actor]);assert.ok(scene.copy.length>40);const folder=scene.route.split('?')[0];assert.ok(fs.existsSync(path.join(app,'prototypes',folder,'index.html')));const html=read('prototypes/'+folder+'/index.html');assert.ok(html.includes('story-context.js'));assert.ok(html.includes('flow-story-data.js'))});
});
test('fictional drafts are deterministic, per-scene and do not access manual storage',()=>{
  const a=context('?embed=story&scene=add-member'),b=context('?embed=story&scene=invite-son');
  assert.equal(JSON.parse(a.context.storage.getItem('turbo-hub-member-draft')).name,'Kavya Sharma');
  assert.equal(JSON.parse(b.context.storage.getItem('turbo-hub-member-draft')).name,'Rohan Sharma');
  a.context.storage.setItem('manual-test','changed');assert.equal(a.context.storage.getItem('manual-test'),'changed');assert.equal(b.context.storage.getItem('manual-test'),null);
  assert.equal(a.external.get('manual-test'),'untouched');assert.deepEqual(a.writes,[]);assert.deepEqual(b.writes,[]);
  assert.equal(context('?embed=story&scene=invitation').context.member.name,'Neha Sharma');
  const plain=context('');assert.equal(plain.context.storage.getItem('manual-test'),'untouched');assert.deepEqual(plain.writes,['get']);
});
test('Kavya story portrait is preset and stays mounted while the name is cleared or typed',()=>{
  for(const search of ['?embed=story&scene=add-member','?embed=story&scene=invite-son','']){
    const ctx=context(search),portraits=[],fields={},nodes=Object.fromEntries(['member-form','content','footer','nav','heading','statusbar'].map(id=>[id,new Element('div')]));
    const H={avatarArtwork:{users:{kavya:'/central/kavya.png'}},avatar:options=>{const node=new Element('span');portraits.push({options,node});return node},field:options=>{fields[options.id]=options;return Object.assign(new Element('div'),{setError(){}})},select:()=>Object.assign(new Element('div'),{setError(){}}),check:()=>new Element('div'),toggle:()=>new Element('div'),button:()=>new Element('button'),actionFooter:()=>new Element('footer'),navigation:()=>new Element('nav'),statusbar:()=>new Element('div')};
    const document={createElement:tag=>new Element(tag),getElementById:id=>nodes[id],body:{dataset:{}}};
    vm.runInNewContext(read('prototypes/add-member/screen.js'),{TurboUI:H,TurboStoryContext:ctx.context,document,URLSearchParams,URL,location:ctx.location,window:{addEventListener(){}},history:{pushState(){}}});
    const pinned=search.includes('scene=add-member');assert.equal(portraits[0].options.src,pinned?'/central/kavya.png':null);
    const original=portraits[0].node;
    for(const name of ['','K','Kavya','Kavya Sharma',''])fields.name.onInput(name);
    assert.equal(portraits.length,pinned?1:6);assert.equal(nodes.content.children[0].children[0],pinned?original:portraits.at(-1).node);
  }
});
test('locked scenes reject a query-only unlock and suppress inspection and keyboard input',()=>{
  const locked=context('?embed=story&scene=add-member&interactive=true');assert.equal(locked.context.locked,true);assert.equal(locked.window.__DS_EXAMPLE_KEY,'story-embed');
  let blocked=0;locked.callbacks.keydown({preventDefault:()=>blocked++,stopImmediatePropagation:()=>blocked++});assert.equal(blocked,2);
  const editable={...story,scenes:story.scenes.map(s=>s.id==='add-member'?{...s,interactive:true}:s)};
  const unlocked=context('?embed=story&scene=add-member&interactive=true',editable);assert.equal(unlocked.context.locked,false);
  unlocked.context.navigate('../hub-dashboard/index.html?tab=Members');const url=new URL(unlocked.location.href);assert.equal(url.searchParams.get('embed'),'story');assert.equal(url.searchParams.get('scene'),'add-member');
});
test('the pending state cannot tick or expire in a locked story',()=>{
  for(const locked of [true,false]){
    let intervals=0,remaining=900;const events={};
    const el={append(){},textContent:''};
    const window={addEventListener:(key,fn)=>{events[key]=fn}};
    vm.runInNewContext(read('prototypes/request-pending/screen.js'),{URLSearchParams,location:{search:'?amount=2500'},TurboStoryContext:{locked},TurboUI:{statusbar(){},button(){},countdown:()=>({setRemaining:value=>{remaining=value}})},document:{getElementById:()=>el,addEventListener:(key,fn)=>{events[key]=fn}},Date,setInterval:()=>{intervals++;return 1},clearInterval(){},window});
    events.pageshow({persisted:true});assert.equal(intervals,locked?0:2);assert.equal(remaining,900);assert.equal(Boolean(events.visibilitychange),!locked);
  }
});
test('scene frames lazy-mount, lock keyboard/pointer input and release offscreen documents',()=>{
  let observer;const window={TurboFamilyStory:story,IntersectionObserver:class{constructor(fn){this.fn=fn;this.targets=[];observer=this}observe(el){this.targets.push(el)}}};
  const document={baseURI:'http://localhost:8020/app/index.html',createElement:tag=>new Element(tag)};
  vm.runInNewContext(read('flow-story.js'),{window,document,URL,IntersectionObserver:window.IntersectionObserver});
  window.TurboFlowStory.render();assert.equal(observer.targets.length,story.chapters.filter(c=>!c.hidden).flatMap(c=>c.scenes.flatMap(sc=>sc.sequence||[sc])).length);
  const slot=observer.targets[0];assert.equal(slot.children.filter(c=>c.tag==='iframe').length,0);
  observer.fn([{target:slot,isIntersecting:true}]);const frame=slot.children.find(c=>c.tag==='iframe');assert.equal(frame.inert,true);assert.equal(frame.tabIndex,-1);assert.equal(frame.style.pointerEvents,'none');assert.equal(frame.attributes['aria-hidden'],'true');assert.equal(new URL(frame.src).searchParams.get('scene'),'accounts-cards');
  observer.fn([{target:slot,isIntersecting:false}]);assert.equal(slot.children.filter(c=>c.tag==='iframe').length,0);
});
test('all storage-owning product scripts use the explicit context adapter',()=>{
  for(const name of ['create-hub','add-member','hub-dashboard','member-profile','delivery-details','spending-limit','geofence-setup','tag-added'])assert.ok(!read('prototypes/'+name+'/screen.js').includes('sessionStorage'),name);
});
test('the entry and the auto-playing onboarding form one sequence with independent locked fixtures',()=>{
  const group=story.chapters[0].scenes[0];
  assert.equal(group.sequence.length,2);
  assert.deepEqual(group.sequence.map(s=>s.route),['accounts-cards','onboarding']);
  assert.equal(story.chapters[0].scenes.some(s=>s.id==='hub-introduction'),false);
  for(const screen of group.sequence){assert.equal(context('?embed=story&scene='+screen.id).context.scene.route,screen.route);assert.equal(context('?embed=story&scene='+screen.id).context.locked,true);}
});
test('onboarding embeds select their declared slide while standalone starts at the beginning',()=>{
  for(const [embedded,id,expected] of [[true,'hub-introduction',0],[false,'hub-introduction',0]]){
    const slides=Array.from({length:3},()=>({contains:()=>false,classList:{toggle(){}},getAttribute:()=>''}));
    const generic={hidden:false,addEventListener(){},querySelector:()=>({textContent:''})};
    const dots=Array.from({length:3},()=>({...generic,setAttribute(){},removeAttribute(){}}));
    const window={TurboStoryContext:{embedded,scene:story.scenes.find(s=>s.id===id)},addEventListener(){}};
    const document={activeElement:null,querySelectorAll:selector=>selector==='.slide'?slides:dots,querySelector:()=>generic,addEventListener(){}};
    vm.runInNewContext(read('prototypes/onboarding/onboarding.js'),{window,document,URLSearchParams,setTimeout:()=>0,clearTimeout(){}});
    assert.equal(slides.findIndex(s=>!s.hidden),expected);assert.equal(slides.filter(s=>!s.inert).length,1);
  }
});

function loopHarness(reducedMotion=false){
  const timers=new Map(),observers=[],events={},documentEvents={};let timerID=0,motionChange;
  const document={baseURI:'http://localhost:8020/app/index.html',hidden:false,createElement:tag=>new Element(tag),addEventListener:(name,fn)=>{documentEvents[name]=fn}};
  const window={TurboFamilyStory:story,document,setTimeout:(fn,ms)=>{const id=++timerID;timers.set(id,{fn,ms});return id},clearTimeout:id=>timers.delete(id),addEventListener:(name,fn)=>{events[name]=fn},matchMedia:()=>({matches:reducedMotion,addEventListener:(name,fn)=>{motionChange=fn}}),IntersectionObserver:class{constructor(fn){this.fn=fn;this.targets=[];observers.push(this)}observe(el){this.targets.push(el)}}};
  vm.runInNewContext(read('flow-story.js'),{window,document,URL,IntersectionObserver:window.IntersectionObserver});
  const scene=story.chapters.flatMap(c=>c.scenes).find(s=>s.id==='kavya-invite-flow'),previews=scene.sequence.map(()=>new Element('figure')),rail=new Element('div');
  const controls=window.TurboFlowStory.sequenceLoop(rail,previews,scene);
  const tick=()=>{const [id,timer]=timers.entries().next().value;timers.delete(id);timer.fn()};
  const steps=controls.children[0].children.map(item=>item.children[0]);
  return {window,document,documentEvents,events,scene,previews,rail,controls,steps,timers,observers,tick,motionChange:()=>motionChange};
}
test('only the scripted playback flows loop, and the static sequence remains reversible',()=>{
  const beats=story.chapters.flatMap(c=>c.scenes),loop=beats.filter(s=>s.presentation==='loop');
  assert.deepEqual(loop.map(s=>s.id),['create-flow','kavya-invite-flow','children-invite-flow','whatsapp-invite-flow','request-flow']);
  assert.deepEqual(loop[0].sequence.map(s=>s.id),['hub-setup','hub-created']);
  assert.deepEqual(loop[1].sequence.map(s=>s.id),['members-owner','add-member','member-payment-methods','invite-sent','hub-members']);
  const h=loopHarness();h.window.TurboFamilyStory={...story,chapters:story.chapters.map(c=>({...c,scenes:c.scenes.map(s=>s.presentation==='loop'?{...s,presentation:'static'}:s)}))};
  const rendered=h.window.TurboFlowStory.render();
  const walk=el=>[el,...el.children.flatMap(walk)];
  assert.equal(walk(rendered).filter(el=>el.classList.contains('family-story__screen-rail--loop')).length,0);
  assert.equal(walk(rendered).filter(el=>el.dataset.scene).length,story.chapters.filter(c=>!c.hidden).flatMap(c=>c.scenes.flatMap(s=>s.sequence||[s])).length);
});
test('development buttons open an in-page screen overlay with ordered standalone links and return focus',()=>{
  const walk=el=>[el,...el.children.flatMap(walk)];
  const render=(search,options)=>{
    const h=loopHarness();h.window.location={search};
    const nodes=walk(h.window.TurboFlowStory.render(options));
    h.document.body=new Element('body');
    h.document.createElement=tag=>{
      const el=new Element(tag);el.focus=()=>{h.document.activeElement=el};
      if(tag==='dialog'){el.showModal=()=>{el.open=true};el.close=()=>{el.open=false;el.listeners.close()};}
      return el;
    };
    return {nodes,h};
  };
  const links=nodes=>nodes.filter(el=>el.className?.includes('family-story__dev-screens'));
  assert.equal(links(render('').nodes).length,0);
  assert.equal(links(render('?dev=false').nodes).length,0);
  const flows=story.chapters.filter(c=>!c.hidden).flatMap(c=>c.scenes).filter(s=>s.presentation==='loop');
  const {nodes:mainNodes,h}=render('?dev=true');
  const devLinks=links(mainNodes);
  assert.equal(devLinks.length,flows.length);
  for(const [index,flow] of flows.entries()){
    const button=devLinks[index];button.focus=()=>{h.document.activeElement=button};
    assert.equal(button.tag,'button');assert.equal(button.attributes['aria-haspopup'],'dialog');
    button.listeners.click();
    const dialog=h.document.body.children[index];assert.equal(dialog.tag,'dialog');assert.equal(dialog.open,true);
    assert.equal(dialog.id,button.attributes['aria-controls']);
    const nodes=walk(dialog);
    assert.equal(nodes.some(el=>el.tag==='h2'||el.tag==='h3'||el.tag==='h4'||el.tag==='figcaption'||el.tag==='p'),false);
    assert.deepEqual(nodes.filter(el=>el.dataset.scene).map(el=>el.dataset.scene),flow.sequence.map(s=>s.id));
    assert.equal(nodes.filter(el=>el.classList.contains('family-story__screen-rail--loop')).length,0);
    assert.equal(nodes.filter(el=>el.classList.contains('family-story__screen-rail--list')).length,1);
    const pages=nodes.filter(el=>el.tag==='a'&&el.textContent==='Open full page ↗');
    assert.equal(pages.length,flow.sequence.length);
    pages.forEach((link,i)=>{
      const route=flow.sequence[i].route.split('?'),page=new URL(link.href);
      assert.equal(page.pathname,'/app/prototypes/'+route[0]+'/index.html');
      assert.equal(page.search,route[1]?'?'+route[1]:'');assert.equal(page.searchParams.has('embed'),false);
    });
    const close=nodes.find(el=>el.attributes['aria-label']==='Close flow screens');close.listeners.click();
    assert.equal(dialog.open,false);assert.equal(h.document.activeElement,button);assert.equal(h.document.body.classList.contains('has-open-dialog'),false);
    button.listeners.click();assert.equal(h.document.body.children.length,index+1);dialog.close();
  }
  const ids=[...mainNodes,...walk(h.document.body)].map(el=>el.id).filter(Boolean);assert.equal(new Set(ids).size,ids.length);
  assert.equal(render('',{flowId:'missing'}).nodes.some(el=>el.dataset.scene),false);
});
test('one phone advances in order and wraps; step selection follows the current playback choice',()=>{
  const h=loopHarness(),[,caption,toggle]=h.controls.children,steps=h.steps;
  const current=()=>h.previews.findIndex(p=>p.classList.contains('is-current'));
  assert.equal(h.timers.size,0);assert.equal(current(),0);
  h.observers[0].fn([{isIntersecting:true}]);assert.equal(h.timers.size,1);
  for(let i=1;i<=5;i++){h.tick();assert.equal(current(),i%5);assert.equal(h.previews.filter(p=>p.classList.contains('is-current')).length,1);}
  assert.equal(caption.textContent,'1 of 5 · Start from Members');
  h.observers[0].fn([{isIntersecting:false}]);assert.equal(h.timers.size,0);assert.equal(current(),0);
  h.observers[0].fn([{isIntersecting:true}]);h.document.hidden=true;h.documentEvents.visibilitychange();assert.equal(h.timers.size,0);
  h.document.hidden=false;h.documentEvents.visibilitychange();assert.equal(h.timers.size,1);
  steps[2].listeners.click();assert.equal(current(),2);assert.equal(h.timers.size,1);assert.equal(toggle.textContent,'Pause preview');
  h.events.pagehide();assert.equal(h.timers.size,0);h.events.pageshow();assert.equal(h.timers.size,1);
  h.tick();assert.equal(current(),3);toggle.listeners.click();assert.equal(h.timers.size,0);
  steps[1].listeners.click();assert.equal(current(),1);assert.equal(h.timers.size,0);assert.equal(toggle.textContent,'Play preview');
});
test('reduced motion starts paused and changing the preference stops playback',()=>{
  const h=loopHarness(true),toggle=h.controls.children[2];h.observers[0].fn([{isIntersecting:true}]);assert.equal(h.timers.size,0);
  toggle.listeners.click();assert.equal(h.timers.size,1);h.motionChange()({matches:true});assert.equal(h.timers.size,0);assert.equal(toggle.textContent,'Play preview');
});


test('shared push moves only screen layers, keeps shells fixed and cleans up on completion or interruption',async()=>{
  const h=loopHarness(),make=()=>{
    const preview=new Element('figure'),head=new Element('head'),animations=[];
    const screen={animate(frames,options){let resolve;const animation={frames,options,finished:new Promise(done=>resolve=done),finish:()=>resolve(),cancel(){this.cancelled=true}};animations.push(animation);return animation}};
    preview.querySelector=()=>({contentDocument:{head,createElement:tag=>new Element(tag),querySelector:()=>screen}});
    return {preview,head,animations};
  };
  const from=make(),to=make();let finished=0;
  h.window.TurboFlowStory.pushScreens(from.preview,to.preview,false,()=>finished++);
  assert.equal(from.preview.classList.contains('is-outgoing'),true);assert.equal(to.preview.classList.contains('is-entering'),true);
  assert.equal(from.animations[0].frames[1].transform,'translateX(-100%)');assert.equal(to.animations[0].frames[0].transform,'translateX(100%)');
  assert.equal(from.animations[0].options.duration,to.animations[0].options.duration);assert.equal(to.head.children.length,1);
  from.animations[0].finish();to.animations[0].finish();await new Promise(setImmediate);
  assert.equal(finished,1);assert.equal(to.head.children.length,0);assert.equal(from.preview.classList.contains('is-outgoing'),false);assert.equal(to.preview.classList.contains('is-entering'),false);
  const interrupted=h.window.TurboFlowStory.pushScreens(from.preview,to.preview,false,()=>finished++);interrupted.cancel();
  from.animations[1].finish();to.animations[1].finish();await new Promise(setImmediate);
  assert.equal(finished,1);assert.equal(to.head.children.length,0);assert.equal(to.animations[1].cancelled,true);
  assert.equal(h.window.TurboFlowStory.pushScreens(from.preview,to.preview,true,()=>finished++),null);assert.equal(to.animations.length,2);
});


test('screen timer waits for the push handoff before starting the next screen',async()=>{
  const h=loopHarness(),animations=[];
  for(const preview of h.previews){
    const head=new Element('head'),screen={animate(){let resolve;const animation={finished:new Promise(done=>resolve=done),finish:()=>resolve(),cancel(){}};animations.push(animation);return animation}};
    preview.querySelector=()=>({contentDocument:{head,createElement:tag=>new Element(tag),querySelector:()=>screen}});
  }
  h.observers[0].fn([{isIntersecting:true}]);h.tick();
  assert.equal(h.previews[1].classList.contains('is-current'),true);assert.equal(h.timers.size,0);
  animations.forEach(animation=>animation.finish());await new Promise(setImmediate);
  assert.equal(h.timers.size,1);
});


test('children success reuses the invitation screen and animated shared indicator with scene-owned copy',()=>{
  const fixture=story.scenes.find(scene=>scene.id==='children-invite-sent');assert.equal(fixture.route,'invite-sent?name=Neha%20Sharma');
  const nodes=Object.fromEntries(['statusbar','symbol','result-heading','result-copy'].map(id=>[id,new Element('div')]));let options;
  const context={embedded:true,locked:true,scene:fixture,member:{name:'Neha Sharma'},storage:{getItem:()=>null}};
  vm.runInNewContext(read('prototypes/invite-sent/screen.js'),{TurboStoryContext:context,window:{TurboStoryContext:context},location:{search:'?name=Neha%20Sharma'},URLSearchParams,document:{getElementById:id=>nodes[id]},TurboUI:{statusbar:()=>new Element('div'),successIndicator:opts=>{options=opts;return new Element('span')}},setTimeout:()=>assert.fail('Locked confirmation must not navigate itself')});
  assert.equal(nodes['result-heading'].textContent,'Invitation sent');assert.equal(nodes['result-copy'].textContent,'Arun will be notified.');assert.equal(options.animated,true);assert.equal(options.tone,'action');
});
