const H=TurboUI;document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Scan the QR Code',left:{label:'Back to Hubs',icon:'navigation-back',href:'../hubs/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('tools').append(H.button({label:'Flashlight',icon:'lightbulb',iconOnly:true,quiet:true,onClick:()=>{}}),H.button({label:'Choose QR image',icon:'image',iconOnly:true,quiet:true,onClick:()=>{}}));
document.getElementById('manual').append(H.button({label:'Enter UPI ID or mobile number',quiet:true,onClick:()=>{}}));
document.querySelector('.scan-camera__target').addEventListener('click',()=>{location.href='../payment-review/index.html'});
for(const name of ['Apna Kirana','Asia Bazaar','Chef Bakers','Cult fitness','Swiggy']){const item=document.createElement('div');item.className='scan-recent__item';const caption=document.createElement('p');caption.textContent=name;item.append(H.avatar({name,size:'merchant'}),caption);document.getElementById('recent').append(item);}
