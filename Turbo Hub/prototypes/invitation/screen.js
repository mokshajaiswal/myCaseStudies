const H=TurboUI;
const newUser=new URLSearchParams(location.search).get('audience')==='new';
const node=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n};
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Hub invitation',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'}}));
document.getElementById('heading').append(H.pageHeader({heading:newUser?'Get started with PayZapp':'Join your family'}));
const content=document.getElementById('content');const preview=node('section','invitation-preview');preview.append(H.summary({name:'The Sharma’s',type:'Family Hub',variant:'centered'}));
const people=node('div','invitation-people');people.setAttribute('aria-label','Your family');['Arun Sharma','Kavya Sharma','Neha Sharma'].forEach(name=>people.append(H.avatar({name})));preview.append(people);
const copy=node('section','invitation-copy');copy.append(node('h2','','Hey Neha!'),node('p','','Arun Sharma has invited you to join The Sharma’s family Hub on PayZapp.'),node('p','','Start sharing expenses with your family.'));
const actions=node('div','invitation-actions');
if(newUser){copy.append(node('p','','Create your PayZapp account first, then return to this invitation to access your family Hub.'));const status=node('p','invitation-caption');status.setAttribute('role','status');actions.append(H.button({label:'Create PayZapp account',onClick:()=>{status.textContent='Account setup is not included in this prototype.'}}),H.button({label:'I already have a PayZapp account',quiet:true,href:'index.html'}),status);window.addEventListener('DOMContentLoaded',()=>{const figure=document.querySelector('.preview-reference');figure.append(node('p','','Proposed new-user entry · invitation is the related Figma reference.'));const nav=node('nav','preview-flow-navigation');nav.setAttribute('aria-label','Case-study flow navigation');const link=node('a','','Preview after account setup: Member profile');link.href='../member-profile/index.html';nav.append(link);figure.append(nav);});}
else actions.append(H.button({label:'Open Hub in PayZapp',href:'../member-profile/index.html'}),node('p','invitation-caption','For existing PayZapp users.'),H.button({label:'New to PayZapp?',quiet:true,href:'index.html?audience=new'}));
content.append(preview,copy,actions);

