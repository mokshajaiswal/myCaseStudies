const params=new URLSearchParams(location.search),main=document.getElementById('preview');
document.body.dataset.gallery=params.get('gallery')==='1';
const held=params.get('state'),target=params.get('target');
function example(id,title,labels){
  const box=document.createElement('section');box.id=id;box.className='example';
  const caption=document.createElement('p');caption.className='label';caption.textContent=title;
  const list=document.createElement('ol');list.className='flow-checkpoint-example';
  const buttons=labels.map((label,index)=>{
    const button=TurboFlowCheckpoint({number:index+1,label,last:index===labels.length-1,onSelect:()=>{if(!held||held==='live')select(index);}});
    const item=document.createElement('li');item.append(button);list.append(item);return button;
  });
  function select(index){buttons.forEach((button,i)=>{button.setState(i<index?'complete':i===index?'current':'upcoming');button.progressElement.style.transform=`scaleY(${i<index?1:i===index?0.5:0})`;});}
  select(labels.length>1?1:0);
  if(['upcoming','current','complete'].includes(held))buttons.forEach(button=>{button.setState(held);button.progressElement.style.transform=`scaleY(${held==='complete'?1:held==='current'?0.5:0})`;});
  box.append(caption,list);main.append(box);
  if(target&&target!==id)box.hidden=true;
}
example('connected','Connected steps',['Neha’s lock screen','The invitation on WhatsApp','Install PayZapp']);
example('last','Final checkpoint',['Inside the family Hub']);
