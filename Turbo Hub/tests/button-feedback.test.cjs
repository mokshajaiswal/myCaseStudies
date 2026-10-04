const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'..');
function harness({reduced=false,scale='.98',duration='120ms'}={}){
  const animations=[];
  const window={matchMedia:()=>({matches:reduced}),getComputedStyle:()=>({getPropertyValue:name=>name==='--button-press-scale'?scale:duration})};
  const document={currentScript:{src:'http://localhost:8020/design-system/components/hub.js'}};
  class Element{
    constructor(tag){this.tagName=tag.toUpperCase();this.ownerDocument=document;this.children=[];this.dataset={};this.attributes={};this.listeners={};this.disabled=false;const classes=new Set();this.classList={contains:name=>classes.has(name)||this.className?.split(' ').includes(name),add:name=>classes.add(name)};}
    append(...children){this.children.push(...children);}
    setAttribute(name,value){this.attributes[name]=value;}
    getAttribute(name){return this.attributes[name]??null;}
    addEventListener(name,fn){this.listeners[name]=fn;}
    animate(frames,options){const animation={frames,options};animations.push(animation);return animation;}
  }
  document.defaultView=window;document.createElement=tag=>new Element(tag);document.createTextNode=text=>({textContent:text});
  const context={window,document,URL,TurboIcons:{render:()=>'<svg></svg>'}};
  Object.defineProperty(context,'TurboUI',{get:()=>window.TurboUI});
  vm.runInNewContext(fs.readFileSync(path.join(app,'app-design-system/components/hub.js'),'utf8'),context);
  return {H:window.TurboUI,animations};
}
test('all Action configurations and edit actions reuse a visual 98% press without invoking callbacks',()=>{
  const h=harness();let activations=0;
  const variants=[{}, {size:'compact'}, {iconOnly:true}, {quiet:true}, {variant:'list'}, {variant:'danger'}, {variant:'camera'}, {variant:'glass'}, {href:'/somewhere'}];
  for(const props of variants){
    const button=h.H.button({label:'Action',onClick:()=>activations++,...props}),animation=h.H.pressButton(button);
    assert.deepEqual(Array.from(animation.frames,f=>f.scale),['1','.98','1']);assert.equal(animation.options.duration,240);assert.equal(animation.frames[1].offset,.5);assert.equal(button.disabled,false);
  }
  assert.ok(h.H.pressButton(h.H.avatarEdit({onClick:()=>activations++})));assert.equal(activations,0);
  // Feedback animates only scale, preserving any caller-owned transform and geometry.
  assert.ok(h.animations.every(a=>a.frames.every(frame=>!('transform' in frame))));
});
test('disabled, aria-disabled and reduced-motion controls do not animate',()=>{
  const h=harness(),disabled=h.H.button({label:'Disabled',disabled:true}),aria=h.H.button({label:'Unavailable'});aria.setAttribute('aria-disabled','true');
  assert.equal(h.H.pressButton(disabled),null);assert.equal(h.H.pressButton(aria),null);assert.equal(h.H.pressButton(h.H.avatarEdit({disabled:true})),null);assert.equal(h.animations.length,0);
  const reduced=harness({reduced:true});assert.equal(reduced.H.pressButton(reduced.H.button({label:'Still'})),null);assert.equal(reduced.animations.length,0);
});
test('press feedback reads the shared CSS motion settings and gracefully supports missing animation APIs',()=>{
  const h=harness({scale:'.95',duration:'.1s'}),button=h.H.button({label:'Configured'}),animation=h.H.pressButton(button);
  assert.equal(animation.frames[1].scale,'.95');assert.equal(animation.options.duration,200);button.animate=null;assert.equal(h.H.pressButton(button),null);
});
