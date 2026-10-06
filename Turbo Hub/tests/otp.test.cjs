const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function harness(options={}){
  let focused;
  class Element{
    constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.attributes={};this.listeners={};this.dataset={};this.value='';const classes=new Set();this.classList={contains:name=>classes.has(name)||this.className?.split(' ').includes(name),add:name=>classes.add(name),toggle:(name,state)=>state?classes.add(name):classes.delete(name)};}
    get childNodes(){return this.children;}
    append(...children){for(const child of children){if(child.parent){child.parent.children=child.parent.children.filter(c=>c!==child);}this.children.push(child);child.parent=this;}}
    setAttribute(name,value){this.attributes[name]=value;}
    removeAttribute(name){delete this.attributes[name];}
    addEventListener(name,fn){(this.listeners[name]??=[]).push(fn);}
    dispatch(name,event={}){for(const fn of this.listeners[name]||[])fn(event);this['on'+name]?.(event);}
    querySelector(selector){const cls=selector.slice(1);for(const child of this.children){if(child.classList?.contains(cls))return child;const found=child.querySelector?.(selector);if(found)return found;}return null;}
    focus(){focused=this;this.dispatch('focus');}
    select(){this.selected=true;}
  }
  const H={},context={TurboUI:H,document:{createElement:tag=>new Element(tag)}};
  for(const file of ['forms.js','otp.js'])vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../app-design-system/components',file),'utf8'),context);
  const values=[],otp=H.otp({id:'otp',onInput:value=>values.push(value),...options});
  const type=(index,value)=>{otp.controls[index].value=value;otp.controls[index].dispatch('input');};
  return {otp,H,values,type,focused:()=>focused};
}
test('six registered digit fields advance while typing and keep an aggregate form value',()=>{
  const h=harness();assert.equal(h.otp.controls.length,6);assert.equal(h.otp.control.type,'hidden');
  for(let i=0;i<6;i++){h.type(i,'482913'[i]);if(i<5)assert.equal(h.focused(),h.otp.controls[i+1]);}
  assert.equal(h.otp.control.value,'482913');assert.equal(h.values.at(-1),'482913');
  assert.equal(h.otp.controls[0].autocomplete,'one-time-code');assert.ok(h.otp.controls.every(c=>c.inputMode==='numeric'));
});
test('paste and SMS autofill distribute all six digits; editorial updates reset every box',()=>{
  const h=harness();let prevented=false;
  h.otp.controls[3].dispatch('paste',{clipboardData:{getData:()=> '48 29-13'},preventDefault:()=>{prevented=true;}});
  assert.ok(prevented);assert.equal(h.otp.control.value,'482913');assert.deepEqual(Array.from(h.otp.controls,c=>c.value),['4','8','2','9','1','3']);
  h.type(0,'135790');assert.equal(h.otp.control.value,'135790');
  h.otp.control.value='';h.otp.control.dispatch('input');assert.ok(h.otp.controls.every(c=>c.value===''));
  h.otp.control.value='482913';h.otp.control.dispatch('input');assert.equal(h.otp.controls[5].value,'3');
});
test('backspace, arrows and validation focus support correcting a partial code',()=>{
  const h=harness({value:'48'});let prevented=0;
  h.otp.controls[2].dispatch('keydown',{key:'Backspace',preventDefault:()=>prevented++});assert.equal(h.otp.control.value,'4');assert.equal(h.focused(),h.otp.controls[1]);
  h.otp.controls[1].dispatch('keydown',{key:'ArrowLeft',preventDefault:()=>prevented++});assert.equal(h.focused(),h.otp.controls[0]);
  h.otp.controls[0].dispatch('keydown',{key:'ArrowRight',preventDefault:()=>prevented++});assert.equal(h.focused(),h.otp.controls[1]);assert.equal(prevented,3);
  h.otp.setError('Enter all six digits.');assert.equal(h.otp.controls[0].attributes['aria-describedby'],'otp-error');assert.ok(h.otp.controls.every(c=>c.attributes['aria-invalid']==='true'));
  h.otp.focus();assert.equal(h.focused(),h.otp.controls[1]);h.type(1,'x8');assert.equal(h.otp.control.value,'48');assert.equal(h.otp.controls[0].attributes['aria-invalid'],'false');
});
test('supplied disabled and numeric value states propagate without changing ordinary text fields',()=>{
  const h=harness({disabled:true,value:'a4829137'});assert.equal(h.otp.control.value,'482913');assert.ok(h.otp.controls.every(c=>c.disabled));
  const field=h.H.field({id:'name',label:'Full name',value:'Neha Sharma'});assert.equal(field.dataset.inspectorVariant,'default');assert.equal(field.control.value,'Neha Sharma');assert.equal(field.control.placeholder,'Full name');
});
