const H=TurboUI;document.getElementById('statusbar').append(H.statusbar());
document.getElementById('nav').append(H.navigation({title:'Scan the QR Code',left:{label:'Back to Hubs',icon:'navigation-back',href:'../hubs/index.html'},right:{label:'Help',icon:'help',onClick:()=>{}}}));
document.getElementById('tools').append(H.button({label:'Flashlight',icon:'flash',variant:'camera',onClick:()=>{}}),H.button({label:'Choose QR image',icon:'gallery',variant:'camera',onClick:()=>{}}));
document.getElementById('manual').append(H.button({label:'Enter UPI ID or mobile number',quiet:true,onClick:()=>{}}));
document.querySelector('.scan-camera__target').addEventListener('click',()=>{TurboStoryContext.navigate('../payment-review/index.html')});
const recentMerchants = [
  {name:'Apna Kirana',src:'assets/apna-kirana.png'},
  {name:'Asia Bazaar',src:'assets/asia-bazaar.png'},
  {name:'Chef Bakers',src:'assets/chef-bakers.png'},
  {name:'Cult fitness',src:'assets/cult-fitness.png'},
  {name:'Swiggy',src:'../hub-dashboard/assets/merchants/swiggy.png'}
];
for(const {name,src} of recentMerchants){
  const item=document.createElement('div');item.className='scan-recent__item';
  const caption=document.createElement('p');caption.textContent=name;
  item.append(H.avatar({name,size:'merchant',src}),caption);
  document.getElementById('recent').append(item);
}
