(function(root){
  const clock=ms=>{const seconds=Math.floor(ms/1000);return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');};
  function timeline(steps){
    let total=0;
    const items=steps.map(step=>{const start=total;total+=Math.max(1,Number(step.duration)||1);return {...step,start,end:total};});
    return {items,total,locate(time){const value=Math.max(0,Math.min(total,Number(time)||0));const index=Math.max(0,items.findIndex(item=>value<item.end));const resolved=value===total?items.length-1:index;return {index:resolved,elapsed:value-items[resolved].start,time:value};}};
  }
  function create({steps,media,render,id='prototype-timeline',autoplay=false,presentation='toolbar'}){
    if(!steps.length)throw new Error('Prototype player requires at least one step');
    const track=timeline(steps),el=document.createElement('section');el.className='th-prototype-player';el.setAttribute('aria-label','Prototype walkthrough');
    const caption=document.createElement('p');caption.className='th-prototype-player__caption';
    const controls=document.createElement('div');controls.className='th-prototype-player__actions';
    const overlay=presentation==='overlay';if(overlay)el.className+=' th-prototype-player--overlay';
    let time=0,playing=false,visible=false,started=false,ready=false,last=performance.now(),destroyed=false;
    const toggle=TurboUI.button({label:'Play',size:'compact',shape:'pill',onClick:()=>{if(playing)pause();else play();}});
    const playButton=overlay?TurboUI.button({label:'Play prototype walkthrough',icon:'playback-play',iconOnly:true,variant:'glass',onClick:()=>play()}):null;
    const pauseButton=overlay?TurboUI.button({label:'Pause prototype walkthrough',icon:'playback-pause',iconOnly:true,variant:'glass',onClick:()=>pause()}):null;
    const previous=TurboUI.button({label:'Previous screen',icon:'caret-left',iconOnly:true,quiet:true,onClick:()=>{const state=track.locate(time);seek(track.items[Math.max(0,state.index-1)].start);}});
    const next=TurboUI.button({label:'Next screen',icon:'caret-right',iconOnly:true,quiet:true,onClick:()=>{const state=track.locate(time);seek(track.items[Math.min(track.items.length-1,state.index+1)].start);}});
    const counter=document.createElement('span');counter.className='th-prototype-player__counter';
    const timecode=document.createElement('span');timecode.className='th-prototype-player__time';
    if(overlay){
      const expand=TurboUI.button({label:'Expand prototype player',icon:'reading-expand',iconOnly:true,variant:'glass',onClick:()=>{if(document.fullscreenElement)document.exitFullscreen?.();else el.requestFullscreen?.();}});
      controls.append(playButton,pauseButton,timecode,expand);
    }else controls.append(previous,toggle,next,counter);
    const slider=TurboUI.slider({id,label:'Seek prototype walkthrough',min:0,max:track.total,step:100,value:0,format:clock,onInput:seek,variant:overlay?'media':'default'});
    slider.control.addEventListener('pointerdown',pause);
    if(overlay){
      const viewport=document.createElement('div');viewport.className='th-prototype-player__viewport';
      const panel=document.createElement('div');panel.className='th-prototype-player__panel';panel.append(controls,slider);viewport.append(media,panel);el.append(viewport,caption);
    }else el.append(media,caption,controls,slider);
    function paint(){
      const state=track.locate(time),step=track.items[state.index];
      try{ready=render({...state,step,playing})!==false;el.removeAttribute('data-error');}
      catch{ready=false;playing=false;el.dataset.error='true';}
      el.dataset.state=ready?(time===track.total?'ended':playing?'playing':'paused'):'loading';el.setAttribute('aria-busy',String(!ready));
      caption.textContent=el.dataset.error?'Preview unavailable. Press Play to retry.':step.label;
      counter.textContent=(state.index+1)+' / '+track.items.length;
      toggle.textContent=playing?'Pause':time===track.total?'Replay':'Play';toggle.setAttribute('aria-label',playing?'Pause prototype walkthrough':'Play prototype walkthrough');
      if(overlay){playButton.hidden=playing;pauseButton.hidden=!playing;timecode.textContent=clock(time)+' / '+clock(track.total);}
      previous.disabled=state.index===0;next.disabled=state.index===track.items.length-1;slider.setValue(time);
    }
    function pause(){playing=false;last=performance.now();paint();}
    function play(){if(time>=track.total)time=0;playing=true;last=performance.now();paint();}
    function seek(value){playing=false;time=Math.max(0,Math.min(track.total,Number(value)||0));last=performance.now();paint();}
    const timer=setInterval(()=>{if(destroyed)return;const now=performance.now(),delta=now-last;last=now;if(visible&&!document.hidden&&playing&&ready){time=Math.min(track.total,time+Math.min(delta,250));if(time===track.total)playing=false;}if(visible)paint();},100);
    let observer;
    if(root.IntersectionObserver){observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=performance.now();if(visible&&!started){started=true;if(autoplay&&!matchMedia('(prefers-reduced-motion: reduce)').matches)play();}else if(!visible)pause();});observer.observe(el);}else visible=true;
    const hidden=()=>{if(document.hidden)pause();};document.addEventListener('visibilitychange',hidden);
    el.controller={play,pause,seek,getState:()=>({...track.locate(time),playing,ready,total:track.total}),destroy(){destroyed=true;clearInterval(timer);observer?.disconnect();document.removeEventListener('visibilitychange',hidden);}};
    paint();return el;
  }
  root.TurboPrototypePlayer={create,timeline,clock};
})(window);
