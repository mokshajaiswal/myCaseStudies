(() => {
  for(const presentation of ['toolbar','overlay']){
    const section=document.createElement('section');section.id=presentation;
    const media=document.createElement('div');media.className='sample-media';
    const player=TurboPrototypePlayer.create({id:'timeline-'+presentation,presentation,steps:[{label:'Create a family Hub',duration:8000},{label:'Invite family members',duration:8000},{label:'Review spending',duration:8000}],media,render:({step,elapsed})=>{media.textContent=step.label+' · '+TurboPrototypePlayer.clock(elapsed);return true;}});
    section.append(player);document.querySelector('#preview').append(section);
  }
})();
