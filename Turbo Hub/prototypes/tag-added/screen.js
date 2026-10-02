const H=TurboUI;
let savedLimits={};try{savedLimits=JSON.parse(sessionStorage.getItem('turbo-hub-spending-limits'))||{}}catch{}
const E=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n};
document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Hub Details',left:{label:'Back to tag choices',icon:'navigation-back',href:'../pixel-tag/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('overview').append(H.summary({variant:'centered',action:{label:'Hub options',icon:'more',onClick:()=>{}}}),H.limit({spent:0,limit:savedLimits.hub??100000,label:'Monthly Limit',variant:'circular'}));
document.getElementById('tabs').append(H.tabs({items:['Spends','Members','Analytics'],selected:'Members',onChange:tab=>{location.href='../hub-dashboard/index.html?tab='+encodeURIComponent(tab)}}));
const panel=document.getElementById('hub-panel');panel.setAttribute('aria-labelledby','hub-tab-1');
const memberHeading=E('div','section-top');memberHeading.append(E('h2','section-heading','4 members'),H.button({label:'Add',icon:'caret-down',iconPosition:'end',size:'compact',quiet:true,href:'../add-member/index.html'}));
const members=E('div','member-list');members.append(H.member({name:'Arun Sharma',role:'Manager',spent:0,limit:savedLimits.arun??45000,variant:'profile'}),H.member({name:'Kavya Sharma',role:'Manager',relation:'Wife',spent:4000,limit:savedLimits.kavya??45000,variant:'profile'}),H.member({name:'Neha Sharma',relation:'Daughter',spent:500,limit:savedLimits.neha??5000,variant:'profile'}));
const tag=E('article','linked-tag');tag.setAttribute('aria-label','Card Keys, Pixel+ Tag');tag.append(H.row({name:'Card Keys',detail:'Pixel+ Tag',graphic:'tag',amount:''}));const setup=E('div','linked-tag-setup');let geofence=null;try{geofence=JSON.parse(sessionStorage.getItem('turbo-hub-geofence'))}catch{}setup.append(E('p','',geofence?'Geofence: '+geofence.location+' · '+geofence.radius+' m':'Configure Geofence for your Tag'),H.button({label:geofence?'Edit geofence':'Setup Pixel+ Tag',quiet:true,size:'compact',icon:'caret-right',iconPosition:'end',href:'../geofence-setup/index.html'}));tag.append(setup);members.append(tag);panel.append(memberHeading,members);


