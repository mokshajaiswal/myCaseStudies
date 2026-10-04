const host=document.getElementById('preview');
for(const [id,tone] of [['success','success'],['action','action']]){const box=document.createElement('section');box.id=id;box.className='example';box.append(TurboUI.successIndicator({tone}));host.append(box);}
{const box=document.createElement('section');box.id='animated';box.className='example';const indicator=TurboUI.successIndicator({tone:'action',animated:true});box.append(indicator);box.addEventListener('click',()=>indicator.play());host.append(box);}
