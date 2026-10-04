(() => {
 // variant='inline' puts a short prefix beside the time ("Expires in 13:36") and drops the caption.
 TurboUI.countdown=({remaining=900,total=900,label='Request will expire after this time',variant='default',prefix='Expires in'}={})=>{
  const inline=variant==='inline';
  const root=document.createElement('div');root.className='th-countdown'+(inline?' th-countdown--inline':'');root.dataset.inspectorVariant=variant;
  const time=document.createElement('span');time.className='th-countdown__time';time.setAttribute('role','timer');time.setAttribute('aria-live','off');
  const track=document.createElement('div');track.className='th-countdown__track';track.setAttribute('role','progressbar');track.setAttribute('aria-label','Time remaining');track.setAttribute('aria-valuemin','0');
  const fill=document.createElement('span');fill.className='th-countdown__fill';track.append(fill);
  const caption=document.createElement('p');caption.className='th-countdown__caption';caption.textContent=label;
  if(inline){const head=document.createElement('p');head.className='th-countdown__head';const lead=document.createElement('span');lead.className='th-countdown__prefix';lead.textContent=prefix;head.append(lead,' ',time);root.append(head,track);}
  else root.append(time,track,caption);
  const duration=Number.isFinite(total)&&total>0?Math.ceil(total):900;
  root.setRemaining=value=>{const seconds=Number.isFinite(value)?Math.min(duration,Math.max(0,Math.ceil(value))):0;time.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');time.setAttribute('aria-label',`${Math.floor(seconds/60)} minutes ${seconds%60} seconds remaining`);track.setAttribute('aria-valuemax',String(duration));track.setAttribute('aria-valuenow',String(seconds));track.setAttribute('aria-valuetext',time.textContent+' remaining');fill.style.width=seconds/duration*100+'%';root.dataset.state=seconds?'running':'expired';};
  root.setRemaining(remaining);return root;
 };
})();
