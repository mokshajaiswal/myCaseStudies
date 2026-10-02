const H=TurboUI;document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));document.getElementById('heading').append(H.pageHeader({heading:'Accounts & Cards'}));
const content=document.getElementById('content');
function group(name,detail){const host=document.createElement('section');host.className='account-group';host.setAttribute('aria-label',name);host.append(H.row({name,detail,graphic:'payment'}));content.append(host);return host;}
const wallet=group('PayZapp Wallet','₹0');const action=document.createElement('div');action.className='account-group__action';action.append(H.button({label:'Add Money',icon:'plus',quiet:true,onClick:()=>{}}));wallet.append(action);
group('UPI Accounts','7667376343@pz');const linked=group('Linked Cards','7 cards linked');const cards=document.createElement('div');cards.className='account-cards';cards.append(H.button({label:'Add card',icon:'plus',iconOnly:true,quiet:true,onClick:()=>{}}));for(const label of ['ICICI · 8179','PNB · 4122','Bank of Baroda'])cards.append(H.badge(label));linked.append(cards);
content.append(H.button({label:'Introducing Turbo Hubs',icon:'family',quiet:true,href:'../onboarding/index.html'}));
