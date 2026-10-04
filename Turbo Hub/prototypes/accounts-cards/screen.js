const H=TurboUI;document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));document.getElementById('heading').append(H.pageHeader({heading:'Accounts & Cards'}));
const content=document.getElementById('content');
content.append(H.accountCard({name:'PayZapp Wallet',detail:'₹0',icon:'wallet',variant:'wallet'}));
content.append(H.accountCard({name:'UPI Accounts',detail:'7667376343@pz',icon:'bank',variant:'summary'}));
content.append(H.accountCard({name:'Linked Cards',detail:'7 cards linked',icon:'card',variant:'linked',cards:[{name:'ICICI',detail:'8179',initial:'i'},{name:'PNB',detail:'4122'},{name:'Bank of Baroda',initial:'B'}]}));
content.append(H.button({label:'Introducing Turbo Hubs',icon:'family',quiet:true,href:'../onboarding/index.html'}));
