const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){
  class Element{constructor(){this.dataset={};this.children=[];this.events={};}append(...items){this.children.push(...items);}setAttribute(k,v){this[k]=v;}removeAttribute(k){delete this[k];}addEventListener(k,v){this.events[k]=v;}}
  let now=0,tick,observer;
  const document={hidden:false,createElement:()=>new Element(),addEventListener(){},removeEventListener(){}};
  const TurboUI={button:({onClick})=>{const el=new Element();el.click=onClick;return el;},slider:({onInput})=>{const el=new Element();el.control=new Element();el.setValue=v=>el.value=v;el.input=onInput;return el;}};
  const window={IntersectionObserver:class{constructor(fn){observer=fn;}observe(){}disconnect(){}}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../app-design-system/components/prototype-player.js'),'utf8'),{window,document,TurboUI,performance:{now:()=>now},setInterval:fn=>{tick=fn;return 1;},clearInterval(){},IntersectionObserver:window.IntersectionObserver,matchMedia:()=>({matches:false})});
  return {api:window.TurboPrototypePlayer,document,element:()=>new Element(),show:()=>observer([{isIntersecting:true}]),advance:ms=>{now+=ms;tick();}};
}
test('timeline resolves exact boundaries, clamps endpoints and seeks backwards',()=>{
  const h=harness(),track=h.api.timeline([{duration:1000},{duration:2000}]);
  assert.equal(track.locate(1000).index,1);assert.equal(track.locate(500).elapsed,500);assert.equal(track.locate(-30).time,0);assert.equal(track.locate(9999).index,1);assert.equal(track.locate(9999).elapsed,2000);
});
test('loading holds time; pause and scrub preserve the selected position before resuming',()=>{
  const h=harness();let ready=false;
  const player=h.api.create({steps:[{label:'First',duration:1000},{label:'Second',duration:2000}],media:h.element(),render:()=>ready,autoplay:true});
  h.show();h.advance(200);assert.equal(player.controller.getState().time,0);
  ready=true;h.advance(100);h.advance(200);assert.equal(player.controller.getState().time,200);
  player.controller.pause();h.advance(200);assert.equal(player.controller.getState().time,200);
  player.controller.seek(1800);assert.equal(player.controller.getState().index,1);assert.equal(player.controller.getState().playing,false);
  player.controller.seek(300);player.controller.play();h.advance(100);assert.equal(player.controller.getState().time,400);
  player.controller.destroy();
});
