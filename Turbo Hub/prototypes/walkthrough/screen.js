(() => {
  const steps=TurboFamilyStory.chapters.flatMap(chapter=>chapter.scenes.flatMap(flow=>(flow.sequence||[flow]).map(screen=>{
    const fixture=TurboFamilyStory.scenes.find(item=>item.id===screen.id);
    const actions=TurboStoryPlayback.actionsFor(screen.id,flow.id);
    return {id:screen.id,label:screen.title,fixture,flow:flow.id,actions,duration:actions.reduce((total,action)=>total+action.wait,0)||2800};
  })));
  const media=document.createElement('div');media.className='walkthrough-media';
  let current=-1,frame=null,displayed=null,loaded=false,loadError=null,snapshotKey='',requestedElapsed=0;
  function render({index,elapsed,step,playing}){
    requestedElapsed=elapsed;
    if(loadError&&current===index){
      if(playing){current=-1;loadError=null;}else throw loadError;
    }
    if(current!==index){
      current=index;loaded=false;loadError=null;snapshotKey='';
      const [path,query='']=step.fixture.route.split('?');const url=new URL('../'+path+'/index.html',location.href);url.search=query;
      url.searchParams.set('embed','story');url.searchParams.set('scene',step.id);url.searchParams.set('interactive','false');
      const incoming=document.createElement('iframe');incoming.title=step.label;incoming.tabIndex=-1;incoming.inert=true;incoming.src=url.href;
      incoming.style.visibility='hidden';
      incoming.addEventListener('load',()=>{
        if(frame!==incoming)return;
        try{TurboStoryPlayback.snapshot(incoming.contentDocument,step.id,step.flow,requestedElapsed);}catch(error){loadError=error;return;}
        loaded=true;
        incoming.style.visibility='visible';displayed=incoming;
        // Removing old frames is safe; reinserting the live iframe reloads it.
        for(const child of [...media.children])if(child!==incoming)child.remove();
      });
      for(const child of [...media.children])if(child!==displayed)child.remove();
      frame=incoming;media.append(incoming);return false;
    }
    if(!loaded||!frame.contentDocument?.defaultView?.TurboStoryContext)return false;
    let position=0,action=0;for(const item of step.actions){if(position>elapsed)break;action++;position+=item.wait;}
    const key=index+':'+action+':'+playing;
    if(key!==snapshotKey){TurboStoryPlayback.snapshot(frame.contentDocument,step.id,step.flow,elapsed);snapshotKey=key;}
    frame.contentDocument.getAnimations?.().forEach(animation=>playing?animation.play():animation.pause());
    return true;
  }
  const player=TurboPrototypePlayer.create({steps,media,render,autoplay:true,presentation:'overlay'});document.querySelector('#walkthrough').append(player);
  window.walkthroughPlayer=player.controller;
  const reportHeight=()=>parent.postMessage({type:'turbo-walkthrough-size',height:Math.ceil(document.querySelector('#walkthrough').getBoundingClientRect().height)},location.origin);
  if(window.ResizeObserver)new ResizeObserver(reportHeight).observe(document.querySelector('#walkthrough'));
  reportHeight();
  addEventListener('pagehide',()=>player.controller.destroy());
})();
