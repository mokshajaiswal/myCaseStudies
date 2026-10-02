const H=TurboUI;
const read=(key,fallback)=>{try{return JSON.parse(sessionStorage.getItem(key))||fallback}catch{return fallback}};
const draft=read('turbo-hub-member-draft',{relation:'Wife',name:'',nickname:'',mobile:'',manager:true,confirmed:false,methods:[]});
const save=()=>sessionStorage.setItem('turbo-hub-member-draft',JSON.stringify(draft));
const e=(tag,cls,text)=>{const node=document.createElement(tag);node.className=cls;if(text)node.textContent=text;return node};
const form=document.getElementById('member-form'),content=document.getElementById('content'),footer=document.getElementById('footer');
const routeStep=()=>new URLSearchParams(location.search).get('step')==='payments'?'payments':'details';
let step=routeStep(),controls={};
function showStep(next){step=next;const url=new URL(location.href);url.searchParams.set('step',step);history.pushState({},'',url);render();const title=document.getElementById('step-title');title.tabIndex=-1;title.focus();}
window.addEventListener('popstate',()=>{step=routeStep();render()});
document.getElementById('statusbar').append(H.statusbar());
const relationships=[['','Choose relationship'],['Wife','Wife'],['Husband','Husband'],['Daughter','Daughter'],['Son','Son'],['Parent','Parent'],['Sibling','Sibling'],['Other','Other']];
function render(){
  document.body.dataset.reference=step==='details'?'member-details':'payment-methods';
  controls={};content.replaceChildren();footer.replaceChildren();
  const nav=document.getElementById('nav');nav.replaceChildren(H.navigation({title:'Add Member',left:{label:step==='details'?'Back to Hub members':'Back to member details',icon:'back',...(step==='details'?{href:'../hub-dashboard/index.html?tab=Members'}:{onClick:()=>showStep('details')})}}));
  const heading=document.getElementById('heading'),title=e('h1','',step==='details'?'Provide member details':'Choose payment methods');title.id='step-title';heading.replaceChildren(title);
  if(step==='details'){
    const portrait=e('div','member-avatar');portrait.append(H.avatar({name:draft.name||'Member',large:true,graphic:!draft.name}));content.append(portrait);
    const fields=e('div','form-fields');
    controls.relation=H.select({id:'relation',label:'Relationship with you',items:relationships,value:draft.relation,onChange:value=>{draft.relation=value;controls.relation.setError('');save()}});
    const field=(id,label,options={})=>H.field({id,label,value:draft[id],...options,onInput:value=>{draft[id]=value;controls[id].setError('');save();if(id==='name')portrait.replaceChildren(H.avatar({name:value.trim()||'Member',large:true,graphic:!value.trim()}))}});
    controls.name=field('name','Full name',{placeholder:'Enter full name'});
    controls.nickname=field('nickname','Nickname',{optional:true,placeholder:'Enter nickname'});
    controls.mobile=field('mobile','Mobile number',{type:'tel',prefix:'+91',placeholder:'10-digit mobile number'});
    fields.append(controls.relation,controls.name,controls.nickname,controls.mobile);content.append(fields);
    const role=e('div','member-role');const toggle=H.toggle({id:'manager',label:'Manager role',description:'Managers can add members and tags, edit spending limits, and authorise payments.',checked:draft.manager,onChange:value=>{draft.manager=value;toggle.setChecked(value);save()}});role.append(toggle);content.append(role);
    controls.confirmed=H.check({id:'confirmed',label:'I confirm that the member is above 18 years of age and has PAN and Aadhaar.',checked:draft.confirmed,onChange:value=>{draft.confirmed=value;controls.confirmed.setError('');save()}});const confirmation=e('div','member-confirmation');confirmation.append(controls.confirmed);content.append(confirmation);
    footer.append(H.button({label:'Next',type:'submit'}));
  }else{
    heading.append(e('p','','Hub member will use these for transactions.'));
    const error=e('p','payment-error');error.id='payment-error';error.hidden=true;error.setAttribute('role','alert');content.append(error);
    const group=e('fieldset','payment-choices');group.setAttribute('aria-labelledby','step-title');
    [['physical','Physical Card','Hub member gets a physical card delivered to their address.','₹500 / annum'],['digital','Digital Card','Hub member gets a virtual card stored in their digital wallet.','₹100 / annum'],['upi','UPI','Hub member gets a UPI ID linked to your account.','Free']].forEach(([id,label,description,price])=>group.append(H.check({id,label,description,price,card:true,checked:draft.methods.includes(id),onChange:value=>{draft.methods=value?[...new Set([...draft.methods,id])]:draft.methods.filter(x=>x!==id);error.hidden=true;save()}})));
    content.append(group);footer.append(H.button({label:'Send Invite',type:'submit'}));
  }
  content.scrollTop=0;
}
const detailErrors=()=>({relation:draft.relation?'':'Choose a relationship.',name:draft.name.trim()?'':'Enter the member’s full name.',mobile:/^[0-9]{10}$/.test(draft.mobile.replace(/\s/g,''))?'':'Enter a 10-digit mobile number.',confirmed:draft.confirmed?'':'Confirm the member’s age and documents.'});
function validateDetails(){const errors=detailErrors();Object.entries(errors).forEach(([id,message])=>controls[id].setError(message));const first=Object.keys(errors).find(id=>errors[id]);if(first)controls[first].control.focus();return !first;}
form.onsubmit=event=>{
  event.preventDefault();
  if(step==='details'){
    if(!validateDetails())return;
    save();showStep('payments');
  }else{
    if(!draft.methods.length){const error=document.getElementById('payment-error');error.hidden=false;error.textContent='Choose at least one payment method.';content.scrollTop=0;document.getElementById('physical').focus();return}
    if(Object.values(detailErrors()).some(Boolean)){showStep('details');validateDetails();return}
    const members=read('turbo-hub-members',[]);members.push({name:draft.name.trim(),relation:draft.relation,role:draft.manager?'Manager':null,pending:true,methods:draft.methods});sessionStorage.setItem('turbo-hub-members',JSON.stringify(members));sessionStorage.removeItem('turbo-hub-member-draft');location.href='../hub-dashboard/index.html?tab=Members';
  }
};
render();
