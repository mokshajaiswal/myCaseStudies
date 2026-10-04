const H=TurboUI,labels=['My Hubs','Shared with me'];let active=new URLSearchParams(location.search).get('tab')==='others'?labels[1]:labels[0];
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Turbo Hubs',variant:'icons-only',left:{label:'Back to flow references',icon:'navigation-back',href:'../../flow-reference/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
// The heading lives in the hero with New Hub beside it; the bar keeps only back and help.
document.getElementById('heading').append(H.pageHeader({heading:'Turbo Hubs',action:H.button({label:'New Hub',icon:'plus',size:'compact',variant:'glass',shape:'pill',href:'../create-hub/index.html'})}));
// The family Hub opens; the others are illustrative only, so they stay put.
const hubs={
 me:[{name:'The Sharma’s',accent:'violet',members:['Arun Sharma','Kavya Sharma','Neha Sharma'],spent:14500,limit:100000,href:'../hub-dashboard/index.html'},
     // Arun also looks after his parents' everyday expenses.
     {name:'Mom & Dad',graphic:'users',accent:'teal',members:['Arun Sharma','Shanti Sharma','Ramesh Sharma'],spent:18200,limit:40000}],
 others:[{name:'Green Park Residents',graphic:'buildings',accent:'amber',members:['Meera Iyer','Arun Sharma','Rahul Verma'],spent:38000,limit:150000}]
};
function render(){document.getElementById('tabs').replaceChildren(H.tabs({id:'hubs',items:labels,selected:active,tone:'segmented',onChange:value=>{active=value;history.replaceState(null,'','?tab='+(active===labels[0]?'me':'others'));render();}}));const panel=document.getElementById('hubs-panel');panel.setAttribute('aria-labelledby','hubs-tab-'+labels.indexOf(active));panel.replaceChildren(...hubs[active===labels[0]?'me':'others'].map(hub=>{const entry=H.hubEntry(hub);if(!hub.href){entry.href='#';entry.addEventListener('click',event=>event.preventDefault());}return entry;}));}
render();
