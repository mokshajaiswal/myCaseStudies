const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'..');
function harness({locked=false,search='',reduced=false}={}){
 const document={activeElement:null};
 class Element{
  constructor(tag){this.style={};this.animations=[];this.tagName=tag.toUpperCase();this.children=[];this.attributes={};this.dataset={};this.listeners={};this.tabIndex=0;this.hidden=false;this.inert=false;}
  animate(frames,options){const animation={frames,options,cancelled:false,paused:false,cancel(){this.cancelled=true;},pause(){this.paused=true;},play(){this.paused=false;}};this.animations.push(animation);return animation;}
  append(...nodes){this.children.push(...nodes);}
  setAttribute(name,value){this.attributes[name]=value;}
  removeAttribute(name){delete this.attributes[name];}
  addEventListener(name,fn){this.listeners[name]=fn;}
  focus(){document.activeElement=this;}
  querySelectorAll(){return this.children.flatMap(child=>[...(['BUTTON','INPUT','A'].includes(child.tagName)?[child]:[]),...child.querySelectorAll()]);}
 }
 document.createElement=tag=>new Element(tag);
 document.createTextNode=text=>{const node=new Element('span');node.textContent=text;return node;};
 const nodes=Object.fromEntries(['welcome-screen','statusbar','hero','content','payzapp-home','home-accounts','invitation-layer','invitation-modal','invitation-reopen','invitation-close'].map(id=>[id,new Element('div')]));
 nodes['invitation-modal'].tabIndex=-1;
 nodes['invitation-modal'].append(nodes['invitation-close'],nodes.hero,nodes.content);
 document.getElementById=id=>nodes[id];
 const buttons=[],cards=[],navigations=[],errors=[];
 const H={chromeBackdrop:({host})=>{host.dataset.chromeBackdrop=true;return host;},avatarArtwork:{home:'family.png'},statusbar:()=>new Element('div'),avatar:()=>new Element('span'),accountCard:options=>{cards.push(options);return new Element('section');},
  button:options=>{const button=new Element(options.href?'a':'button');button.options=options;buttons.push(button);return button;},
  check:()=>{const check=new Element('label');check.control=new Element('input');check.control.checked=false;check.setError=value=>errors.push(value);check.append(check.control);return check;}};
 const story={embedded:locked,locked,storage:{getItem:()=>null},navigate:route=>navigations.push(route)};
 const window={TurboStoryContext:story,matchMedia:()=>({matches:reduced})};
 vm.runInNewContext(fs.readFileSync(path.join(app,'prototypes/hub-welcome/screen.js'),'utf8'),{TurboUI:H,TurboStoryContext:story,document,window,location:{search},URLSearchParams});
 return {document,window,H,nodes,cards,navigations,errors,buttons,button:label=>buttons.find(b=>b.options.label===label),terms:nodes.content.children.find(child=>child.id==='footer').children[0]};
}
test('invitation opens over an inert home with zero balances; closing and reopening restore focus',()=>{
 const h=harness();assert.equal(h.nodes['welcome-screen'].dataset.chromeBackdrop,true);assert.deepEqual(h.cards.map(c=>[c.name,c.detail]),[['PayZapp Wallet','₹0'],['Cashpoints','0']]);
 assert.equal(h.nodes['payzapp-home'].inert,true);assert.equal(h.nodes['invitation-layer'].hidden,false);assert.equal(h.document.activeElement,h.nodes['invitation-modal']);
 h.button('Close invitation').options.onClick();assert.equal(h.nodes['invitation-layer'].hidden,true);assert.equal(h.nodes['payzapp-home'].inert,false);assert.equal(h.document.activeElement,h.button('View Hub invitation'));
 h.button('View Hub invitation').options.onClick();assert.equal(h.nodes['payzapp-home'].inert,true);assert.equal(h.nodes['invitation-layer'].hidden,false);
});
test('terms are disclosed without a checkbox and accepting proceeds to number verification',()=>{
 const h=harness(),accept=h.button('Accept invite');assert.equal(h.terms.tagName,'P');assert.equal(h.terms.children[0].textContent,'By proceeding, you accept all ');assert.equal(h.button('Terms & Conditions').options.variant,'link');assert.equal(h.nodes.content.querySelectorAll().some(node=>node.tagName==='INPUT'),false);accept.options.onClick();assert.deepEqual(h.navigations,['../verify-mobile/index.html']);
});
test('modal traps keyboard focus and Escape dismisses to the home',()=>{
 const h=harness(),modal=h.nodes['invitation-modal'];let prevented=0;
 const key=(key,shiftKey=false)=>modal.listeners.keydown({key,shiftKey,preventDefault:()=>prevented++,stopPropagation(){}});
 key('Tab');assert.equal(h.document.activeElement,h.button('Close invitation'));
 key('Tab',true);assert.equal(h.document.activeElement,h.button('Accept invite'));
 key('Tab');assert.equal(h.document.activeElement,h.button('Close invitation'));
 key('Escape');assert.equal(h.nodes['invitation-layer'].hidden,true);assert.equal(prevented,4);
});
test('closed preview shows home while a locked story always keeps its invitation and avoids autofocus',()=>{
 const plain=harness({search:'?invite=closed'});assert.equal(plain.nodes['invitation-layer'].hidden,true);
 const story=harness({locked:true,search:'?invite=closed'});assert.equal(story.nodes['invitation-layer'].hidden,false);assert.equal(story.document.activeElement,null);
});
test('shared home account cards retain zero detail and branded artwork, and delegate actions to the compact child',()=>{
 const h=harness();let activations=0;
 vm.runInNewContext(fs.readFileSync(path.join(app,'app-design-system/components/account-card.js'),'utf8'),{TurboUI:h.H,document:h.document,TurboIcons:{render:()=>'<svg></svg>'}});
 const card=h.H.accountCard({name:'Cashpoints',detail:'0',variant:'home',graphicSrc:'cash.svg',actionIcon:'flash',onAction:()=>activations++});
 assert.equal(card.dataset.inspectorVariant,'home');assert.equal(card.children[0].children[0].children[1].textContent,'0');assert.equal(card.children[0].children[1].children[0].src,'cash.svg');
 const action=card.children[1];assert.equal(action.dataset.inspectorVariant,'compact');action.listeners.click();assert.equal(activations,1);
 const wallet=h.H.accountCard({name:'Wallet',detail:'₹0',variant:'wallet'});assert.equal(wallet.dataset.inspectorVariant,'wallet');assert.equal(wallet.children[1].dataset.inspectorVariant,'label');
});

test('locked flow entrance waits for the handoff, scales the modal, pauses and resets for replay',()=>{
 const h=harness({locked:true}),modal=h.nodes['invitation-modal'],layer=h.nodes['invitation-layer'],playback=h.window.TurboWelcomePlayback;
 assert.equal(modal.style.opacity,'1');assert.equal(modal.animations.length,0);playback.reset();
 assert.equal(modal.style.opacity,'0');assert.equal(layer.style.opacity,'0');
 playback.enter();const animation=modal.animations.at(-1);
 assert.deepEqual(Array.from(animation.frames,frame=>frame.transform),['scale(.92)','scale(1)']);assert.equal(animation.options.duration,420);assert.equal(layer.animations.at(-1).options.duration,280);
 playback.pause();assert.equal(animation.paused,true);playback.resume();assert.equal(animation.paused,false);
 playback.reset();assert.equal(animation.cancelled,true);assert.equal(modal.style.opacity,'0');
 playback.enter();assert.equal(modal.animations.length,2);
 playback.show();assert.equal(modal.animations.at(-1).cancelled,true);assert.equal(modal.style.opacity,'1');assert.equal(modal.style.transform,'none');
});
test('standalone opening and reopening animate; reduced motion presents the final modal immediately',()=>{
 const h=harness();assert.equal(h.nodes['invitation-modal'].animations.length,1);
 h.button('Close invitation').options.onClick();assert.equal(h.nodes['invitation-modal'].animations[0].cancelled,true);
 h.button('View Hub invitation').options.onClick();assert.equal(h.nodes['invitation-modal'].animations.length,2);
 const reduced=harness({locked:true,reduced:true});reduced.window.TurboWelcomePlayback.enter();assert.equal(reduced.nodes['invitation-modal'].animations.length,0);assert.equal(reduced.nodes['invitation-modal'].style.opacity,'1');
});
