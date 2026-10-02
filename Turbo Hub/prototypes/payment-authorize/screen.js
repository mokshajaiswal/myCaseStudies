const supplied=Number(new URLSearchParams(location.search).get('amount'));
const amount=Number.isFinite(supplied)&&supplied>=1&&supplied<=1000000?supplied:2500;
const money='₹'+amount.toLocaleString('en-IN');
document.getElementById('statusbar').append(TurboUI.statusbar());
document.getElementById('nav').append(TurboUI.navigation({title:'',left:{label:'Close payment request',icon:'close',href:'../hub-dashboard/index.html?tab=Spends'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('identity').append(TurboUI.avatar({name:'Neha Sharma',large:true}));
document.getElementById('merchant').append(TurboUI.avatar({name:'Nykaa',large:true}));
document.getElementById('amount').textContent=money;
document.getElementById('request-amount').textContent=money;
const actions=document.getElementById('actions');
const swipe=TurboUI.swipeAction({id:'authorize-swipe',label:'Swipe to Authorize',onComplete:()=>location.href='../authorization-confirmed/index.html?amount='+amount});
const decline=TurboUI.button({label:'Decline',quiet:true,onClick:()=>{swipe.control.disabled=true;decline.disabled=true;document.getElementById('declined').hidden=false;const nav=document.createElement('nav');nav.className='preview-flow-navigation';nav.setAttribute('aria-label','Case-study flow navigation');const a=document.createElement('a');a.textContent='Next screen: Member · Request declined';a.href='../payment-unapproved/index.html?state=declined&amount='+amount;nav.append(a);document.querySelector('.preview-reference').append(nav);}});
decline.classList.add('decline-action');actions.append(decline,swipe);
// Local case-study demonstration only; no real approval or decline is transmitted.
