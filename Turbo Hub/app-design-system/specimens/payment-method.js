document.body.dataset.gallery=new URLSearchParams(location.search).get('gallery')==='1';
const examples=[
  ['card-pending','Card · pending',{name:'Card',detail:'XXXX 9700',graphic:'card-fill',status:'Details needed',href:'#card'}],
  ['upi-pending','UPI · pending',{name:'UPI',detail:'neha@pz',graphic:'upi-fill',status:'Verify PAN',href:'#upi'}],
  ['upi-active','UPI · active',{name:'UPI',detail:'kavya@pz',graphic:'upi-fill',label:'UPI kavya@pz, active'}],
  ['card-saved','Card · address saved',{name:'Card',detail:'XXXX 9700',graphic:'card-fill',href:'#edit-card',label:'Card XXXX 9700, edit delivery address'}]
];
for(const [id,title,options] of examples){const box=document.createElement('section');box.className='example';box.id=id;const caption=document.createElement('p');caption.className='label';caption.textContent=title;box.append(caption,TurboUI.paymentMethod(options));document.getElementById('preview').append(box);}
