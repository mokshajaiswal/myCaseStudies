const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){
  let render,snapshots=0,fail=false;
  class Element{
    constructor(){this.children=[];this.style={};this.events={};this.contentDocument={defaultView:{TurboStoryContext:{}},getAnimations:()=>[]};this.mounts=0;}
    append(...items){for(const item of items){if(item.parent)item.remove();this.children.push(item);item.parent=this;item.mounts++;}}
    replaceChildren(...items){for(const item of [...this.children])item.remove();this.append(...items);}
    remove(){if(this.parent){this.parent.children=this.parent.children.filter(item=>item!==this);this.parent=null;}}
    addEventListener(name,fn){this.events[name]=fn;}
    load(){this.events.load();}
    getBoundingClientRect(){return {height:700};}
  }
  const host=new Element(),fixtures=[{id:'first',route:'accounts-cards',title:'First'},{id:'second',route:'hub-dashboard?tab=Spends',title:'Second'}];
  const context={TurboFamilyStory:{chapters:[{scenes:fixtures}],scenes:fixtures},TurboStoryPlayback:{actionsFor:()=>[],snapshot(){if(fail)throw Error('Fixture unavailable');snapshots++;}},TurboPrototypePlayer:{create(options){render=options.render;const node=new Element();node.controller={destroy(){}};node.append(options.media);return node;}},document:{createElement:()=>new Element(),querySelector:()=>host},window:{},parent:{postMessage(){}},location:{href:'http://localhost:8020/app/prototypes/walkthrough/index.html',origin:'http://localhost:8020'},URL,addEventListener(){}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../prototypes/walkthrough/screen.js'),'utf8'),context);
  return {media:host.children[0].children[0],render:(index,playing=false)=>render({index,elapsed:0,step:{id:fixtures[index].id,fixture:fixtures[index],flow:fixtures[index].id,label:fixtures[index].title,actions:[]},playing}),get snapshots(){return snapshots;},fail(value){fail=value;}};
}
test('loaded iframe stays mounted; handoffs retain the visible screen without restarting it',()=>{
  const h=setup();assert.equal(h.render(0),false);const first=h.media.children[0];first.load();
  assert.equal(first.mounts,1);assert.equal(first.style.visibility,'visible');assert.equal(h.render(0),true);
  h.render(1);const second=h.media.children[1];assert.equal(first.mounts,1);assert.equal(h.media.children.length,2);
  second.load();assert.equal(second.mounts,1);assert.equal(h.media.children.length,1);assert.equal(h.media.children[0],second);
  h.render(0);const back=h.media.children[1];second.load();assert.equal(h.media.children[0],second);back.load();assert.equal(back.mounts,1);assert.equal(h.media.children.length,1);
});
test('fixture failure is reported and Play retries with a fresh frame',()=>{
  const h=setup();h.render(0);h.fail(true);h.media.children[0].load();assert.throws(()=>h.render(0),/Fixture unavailable/);
  h.fail(false);assert.equal(h.render(0,true),false);h.media.children[0].load();assert.equal(h.render(0),true);
});
