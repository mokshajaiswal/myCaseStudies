const H=TurboUI,key='turbo-demo-hub-draft';
const types=[['Family','Share household expenses with family members'],['Team','Share work-related expenses with team members'],['Office','Share work-related expenses with colleagues'],['Roommates','Share household expenses with your roommates']];
let draft={type:'Family',name:'',account:''};try{const saved=JSON.parse(sessionStorage.getItem(key));if(saved&&typeof saved==='object'){if(types.some(([type])=>type===saved.type))draft.type=saved.type;if(typeof saved.name==='string')draft.name=saved.name.slice(0,40);if(['credit','prepaid'].includes(saved.account))draft.account=saved.account;}}catch{}
const e=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node;};
const persist=()=>{try{sessionStorage.setItem(key,JSON.stringify(draft));}catch{}};
const params=new URLSearchParams(location.search);let step=['type','details','created'].includes(params.get('step'))?params.get('step'):'type';
document.getElementById('statusbar').append(H.statusbar());
function go(next){step=next;history.pushState(null,'','?step='+next);render();}
function render(){
 const content=document.getElementById('content'),footer=document.getElementById('footer'),feedback=document.getElementById('feedback');content.replaceChildren();footer.replaceChildren();feedback.replaceChildren();
 document.getElementById('nav').replaceChildren(H.navigation({title:step==='created'?'Hub Details':'',left:{label:step==='type'?'Back to flow references':'Back',icon:'navigation-back',onClick:()=>step==='type'?location.href='../../flow-reference/index.html':go(step==='details'?'type':'details')},right:step==='created'?{label:'Help',icon:'help',onClick:()=>{}}:null}));
 document.getElementById('heading').replaceChildren(...(step==='created'?[]:[H.pageHeader({heading:step==='type'?'Choose a Hub Type':'Tell us more about the hub'})]));
 content.classList.toggle('creation-content--created',step==='created');
 document.body.dataset.reference=step==='type'?'hub-type':step==='details'?'hub-setup':'hub-created';
 if(step==='type'){
  const choices=e('fieldset','creation-choices');choices.append(e('legend','','Hub type'));
  for(const [type,description] of types)choices.append(H.radioChoice({id:'type-'+type,name:'hub-type',value:type,label:type+' Hub',description,checked:draft.type===type,onChange:value=>{draft.type=value;persist();}}));content.append(choices);footer.append(H.button({label:'Next',onClick:()=>go('details')}));
 }else if(step==='details'){
  const form=e('form','creation-form');form.id='hub-form';form.noValidate=true;
  const portrait=e('div','creation-portrait');portrait.append(H.avatar({graphic:true,size:'hub'}));
  const name=H.field({id:'hub-name',label:'Hub Name',value:draft.name,onInput:value=>{draft.name=value;name.setError('');persist();}});name.control.maxLength=40;
  const choices=e('fieldset','creation-choices');choices.append(e('legend','','Source Account'));const error=e('p','creation-error');error.id='account-error';error.setAttribute('role','alert');error.hidden=true;
  for(const [value,label] of [['credit','Credit Account · XXXX 9132'],['prepaid','Prepaid Account · XXXX 4281']])choices.append(H.radioChoice({id:'account-'+value,name:'source-account',value,label,checked:draft.account===value,onChange:value=>{draft.account=value;error.hidden=true;choices.querySelectorAll('input').forEach(input=>{input.removeAttribute('aria-describedby');input.removeAttribute('aria-invalid');});persist();}}));
  form.append(portrait,name,choices,error);content.append(form);const submit=H.button({label:'Create Hub',type:'submit'});submit.setAttribute('form','hub-form');footer.append(submit);
  form.onsubmit=event=>{event.preventDefault();let first=null;if(!draft.name.trim()){name.setError('Enter a name for your Hub.');first=name.control;}if(!draft.account){error.textContent='Choose a source account.';error.hidden=false;choices.querySelectorAll('input').forEach(input=>{input.setAttribute('aria-describedby','account-error');input.setAttribute('aria-invalid','true');});first??=choices.querySelector('input');}if(first){first.focus();return;}draft.name=draft.name.trim();persist();go('created');};
 }else{
  content.append(H.summary({name:draft.name||'The Sharma’s',type:draft.type.toUpperCase()+' HUB',variant:'centered',action:{label:'Hub options',icon:'more',onClick:()=>{}}}),e('p','created-intro','Let’s add members to the hub. You can also add Pixel tags here to manage them seamlessly.'));
  const actions=e('div','created-actions');actions.append(H.button({label:'Invite Member',icon:'invite',quiet:true,href:'../add-member/index.html'}),H.button({label:'Add Pixel Tag',icon:'tag',quiet:true,href:'../pixel-tag/index.html'}));content.append(actions);
  const notice=H.notice({message:'Hub created successfully',onDismiss:()=>feedback.replaceChildren()});feedback.append(notice);footer.append(H.button({label:'View Hub',href:'../hub-dashboard/index.html?tab=Members'}));
 }
 content.scrollTop=0;
}
addEventListener('popstate',()=>{const value=new URLSearchParams(location.search).get('step');step=['details','created'].includes(value)?value:'type';render();});render();
// Local case-study creation only. Existing account identifiers are sample data.
