/* Case-study presentation, not a product component or a second UI renderer. */
(function(root){
  const asset='assets/flow-story/';
  function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;}
  // The prototype on its own, outside the story embed (for ?dev=true review links).
  function pageURL(scene){
    const [path,query='']=scene.route.split('?'),url=new URL('prototypes/'+path+'/index.html',document.baseURI);
    url.search=query;return url;
  }
  function devLink(scene,button=false){
    const link=node('a',button?'family-story__loop-toggle family-story__dev-open family-story__dev-open--button':'family-story__dev-open','Open full page ↗');link.href=pageURL(scene).href;link.target='_blank';link.rel='noopener';return link;
  }
  function flowScreensButton(scene){
    const button=node('button','family-story__loop-toggle family-story__dev-screens','View all screens');button.type='button';
    button.setAttribute('aria-label','View all screens for '+scene.title);button.setAttribute('aria-haspopup','dialog');
    button.setAttribute('aria-controls','flow-screens-dialog-'+scene.id);
    let dialog;
    button.addEventListener('click',()=>{
      if(!dialog){
        dialog=node('dialog','family-story__screens-dialog');dialog.id='flow-screens-dialog-'+scene.id;
        dialog.setAttribute('aria-label',scene.title+' — All screens');
        const header=node('header','family-story__screens-header'),close=node('button','family-story__loop-toggle','Close');close.type='button';close.autofocus=true;close.setAttribute('aria-label','Close flow screens');
        header.append(close);
        dialog.append(header,render({flowId:scene.id}));document.body.append(dialog);
        close.addEventListener('click',()=>dialog.close());
        dialog.addEventListener('close',()=>{document.body.classList.remove('has-open-dialog');button.focus();});
        dialog.addEventListener('click',event=>{
          if(event.target!==dialog)return;
          const rect=dialog.getBoundingClientRect();
          if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
        });
      }
      dialog.showModal();document.body.classList.add('has-open-dialog');
    });
    return button;
  }
  function sceneURL(scene){
    const [path,query='']=scene.route.split('?');
    const url=new URL('prototypes/'+path+'/index.html',document.baseURI);
    url.search=query;
    url.searchParams.set('embed','story');url.searchParams.set('scene',scene.id);
    url.searchParams.set('interactive',String(scene.interactive));
    return url;
  }
  // Shared preview-only push. Keep both device shells stationary and animate their
  // clipped screen layers; the incoming shell is transparent until the handoff.
  function pushScreens(outgoing,incoming,reduced,onFinish){
    const from=outgoing?.querySelector('iframe')?.contentDocument;
    const to=incoming?.querySelector('iframe')?.contentDocument;
    const oldScreen=from?.querySelector('.phone-screen'),newScreen=to?.querySelector('.phone-screen');
    if(reduced||!oldScreen?.animate||!newScreen?.animate||!to?.head)return null;
    const transparent=to.createElement('style');
    transparent.textContent='html[data-story-embed] .phone,html[data-story-embed] .phone::before,html[data-story-embed] .phone-viewport{background:transparent;box-shadow:none}';
    to.head.append(transparent);
    outgoing.classList.add('is-outgoing');incoming.classList.add('is-entering');
    const options={duration:420,easing:'cubic-bezier(.22,.68,.22,1)',fill:'both'};
    const animations=[oldScreen.animate([{transform:'translateX(0)'},{transform:'translateX(-100%)'}],options),newScreen.animate([{transform:'translateX(100%)'},{transform:'translateX(0)'}],options)];
    let cancelled=false;
    const cleanup=()=>{animations.forEach(animation=>animation.cancel());transparent.remove();outgoing.classList.remove('is-outgoing');incoming.classList.remove('is-entering');};
    Promise.all(animations.map(animation=>animation.finished)).then(()=>{if(!cancelled){cancelled=true;cleanup();onFinish();}},()=>{if(!cancelled){cancelled=true;cleanup();onFinish();}});
    return {cancel(){if(cancelled)return;cancelled=true;cleanup();}};
  }
  // Editorial playback only: product fixtures remain locked and deterministic.
  // The sequence and static rail are retained; presentation:'static' restores them.
  function sequenceLoop(rail,previews,scene){
    rail.classList.add('family-story__screen-rail--loop');
    const controls=node('div','family-story__loop-controls');
    const progress=node('ol','family-story__loop-progress');progress.setAttribute('aria-label',scene.title+' steps');
    const caption=node('p','family-story__loop-caption');caption.setAttribute('aria-live','off');
    const toggle=node('button','family-story__loop-toggle');toggle.type='button';
    const reduced=root.matchMedia?.('(prefers-reduced-motion: reduce)');
    let index=0,timer=null,due=0,visible=false,paused=Boolean(reduced?.matches),playback=null,fillAnimation=null,transition=null,shown=false;
    const interval=Math.max(2500,scene.loopInterval||4200);
    let remaining=interval;
    const now=()=>root.performance?.now()??Date.now();
    const clear=()=>{if(timer!==null){remaining=Math.max(0,due-now());root.clearTimeout(timer);}timer=null;};
    const fills=[];
    const buttons=scene.sequence.map((screen,i)=>{
      const button=node('button','family-story__loop-step');button.type='button';button.setAttribute('aria-label',`Step ${i+1} of ${previews.length}: ${screen.title}`);
      const track=node('span','family-story__step-track'),fill=node('span','family-story__step-fill');track.setAttribute('aria-hidden','true');track.append(fill);fills.push(fill);
      const text=node('span','family-story__step-text');text.append(node('strong','family-story__step-title',screen.title));button.append(track,text);
      button.addEventListener('click',()=>{show(i);sync();});const item=node('li');item.append(button);progress.append(item);return button;
    });
    function paintTiming({index:step=index,elapsed=0,duration=interval,playing=false,ready=true}){
      if(step!==index)return;
      fillAnimation?.cancel();fillAnimation=null;
      const fraction=ready?Math.min(1,Math.max(0,elapsed/Math.max(1,duration))):0;
      fills.forEach((fill,i)=>{fill.style.transform=`scaleY(${i<index?1:i===index?fraction:0})`;});
      const fill=fills[index],wait=Math.max(0,duration-elapsed);
      if(playing&&ready&&wait&&!reduced?.matches&&fill.animate)fillAnimation=fill.animate([{transform:`scaleY(${fraction})`},{transform:'scaleY(1)'}],{duration:wait,easing:'linear',fill:'forwards'});
    }
    function schedule(){
      clear();const playing=!paused&&visible&&!document.hidden;
      if(transition)return;
      if(playback){playing?playback.resume():playback.pause();return;}
      paintTiming({elapsed:interval-remaining,playing});
      if(playing){due=now()+remaining;timer=root.setTimeout(()=>{timer=null;show((index+1)%previews.length);schedule();},remaining);}
    }
    function show(next){
      clear();const previous=shown?previews[index]:null;transition?.cancel();transition=null;
      index=next;remaining=interval;paintTiming({});
      playback?.activate(index);
      previews.forEach((preview,i)=>{const active=i===index;preview.classList.toggle('is-current',active);preview.inert=!active;preview.setAttribute('aria-hidden','true');buttons[i].setAttribute('aria-current',active?'step':'false');buttons[i].setAttribute('aria-pressed',String(active));});
      caption.textContent=`${index+1} of ${previews.length} · ${scene.sequence[index].title}`;
      if(previous&&previous!==previews[index])transition=pushScreens(previous,previews[index],reduced?.matches,()=>{transition=null;schedule();});
      shown=true;
    }
    function sync(){toggle.textContent=paused?'Play preview':'Pause preview';toggle.setAttribute('aria-label',(paused?'Play ':'Pause ')+scene.title+' preview');schedule();}
    toggle.addEventListener('click',()=>{paused=!paused;sync();});
    reduced?.addEventListener('change',event=>{if(event.matches){paused=true;transition?.cancel();transition=null;sync();}});
    document.addEventListener?.('visibilitychange',schedule);
    root.addEventListener?.('pagehide',()=>{clear();if(playback)playback.pause();else paintTiming({elapsed:interval-remaining});});
    root.addEventListener?.('pageshow',schedule);
    // Any flow with a playback script (keyed by flow ID in flow-story-playback.js) runs touch choreography.
    if(scene.playback)playback=root.TurboStoryPlayback?.create({rail,previews,scene,onProgress:paintTiming,onAdvance:()=>{show((index+1)%previews.length);schedule();},onError:()=>{paused=true;sync();}})||null;
    if('IntersectionObserver' in root){
      const watcher=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);schedule();},{threshold:.2});watcher.observe(rail);
    }else visible=true;
    controls.append(progress,caption,toggle);show(0);sync();
    return controls;
  }
  function render({flowId}={}){
    const story=root.TurboFamilyStory,section=node('div','family-story');const dev=Boolean(flowId)||/[?&]dev=true(&|$)/.test(root.location?.search||'');const beats=[];
    if(flowId)section.classList.add('family-story--screen-list');
    if(flowId&&!story.chapters.some(chapter=>!chapter.hidden&&chapter.scenes.some(scene=>scene.id===flowId&&scene.sequence))){section.append(node('p','','Flow not found. Return to the case study and choose View all screens beside a preview.'));return section;}
    if(!flowId){
    const intro=node('div','family-story__intro');
    intro.append(node('h3','family-story__heading','Meet the Sharmas'),node('p','family-story__lead','To walk through the flows, I’ll follow one fictional family. Arun and Kavya want to support their children’s spending with clear boundaries; Neha and Rohan want to pay on their own. Each section below picks up a moment in their journey, with the screens and the reasoning behind them.'));
    const home=node('img','family-story__home');home.src=asset+'family.png';home.alt='The Sharma family, Arun, Kavya, Neha and Rohan, together at home, each with a phone.';home.width=1536;home.height=1024;home.loading='lazy';
    const homeFigure=node('div','family-story__home-figure');homeFigure.append(home);
    // Bubble x/y are % of the illustration: x centres the tail, y is where the tail tip sits (just above each head).
    Object.entries(story.cast).forEach(([key,person])=>{if(!person.bubble)return;const bubble=node('span','family-story__home-bubble'+(person.bubble.tail?' family-story__home-bubble--tail-'+person.bubble.tail:''));bubble.setAttribute('aria-hidden','true');bubble.style.left=person.bubble.x+'%';bubble.style.bottom=(100-person.bubble.y)+'%';bubble.dataset.cast=key;bubble.append(node('strong','',person.name),node('span','family-story__home-bubble-role',person.bubble.text));homeFigure.append(bubble);});
    let familyTitle;
    if(story.family){familyTitle=node('span','family-story__home-title',story.family.name);familyTitle.setAttribute('aria-hidden','true');familyTitle.style.left=story.family.label.x+'%';familyTitle.style.top=story.family.label.y+'%';homeFigure.append(familyTitle);}
    intro.append(homeFigure);
    // ?dev=true: drag the family title and bubbles into place; every drop copies all positions for flow-story-data.js.
    if(dev){
      homeFigure.classList.add('is-dev');
      const round=v=>Math.round(v*10)/10;
      // Each draggable: its element, the data it edits, how to place it, and its copied line.
      const items=[...homeFigure.querySelectorAll('.family-story__home-bubble')].map(el=>{
        const key=el.dataset.cast,data=story.cast[key].bubble;
        return {el,data,place:()=>{el.style.left=data.x+'%';el.style.bottom=(100-data.y)+'%';},line:()=>key+': x:'+data.x+',y:'+data.y+(data.tail?",tail:'"+data.tail+"'":'')};
      });
      if(familyTitle){const data=story.family.label;items.unshift({el:familyTitle,data,place:()=>{familyTitle.style.left=data.x+'%';familyTitle.style.top=data.y+'%';},line:()=>'family: x:'+data.x+',y:'+data.y});}
      const copyAll=()=>{
        const lines=items.map(item=>item.line()).join('\n');
        root.navigator.clipboard?.writeText(lines).then(()=>toast('Copied positions'),()=>toast('Copy failed: see console'));
        console.log(lines);
      };
      const toast=text=>{let t=homeFigure.querySelector('.family-story__dev-toast');if(!t){t=node('span','family-story__dev-toast');homeFigure.append(t);}t.textContent=text;clearTimeout(t.timer);t.timer=setTimeout(()=>t.remove(),1600);};
      items.forEach(({el,data,place})=>{
        el.addEventListener('pointerdown',event=>{
          event.preventDefault();el.setPointerCapture(event.pointerId);
          const rect=homeFigure.getBoundingClientRect(),start={x:event.clientX,y:event.clientY,bx:data.x,by:data.y};
          const move=e=>{data.x=round(start.bx+(e.clientX-start.x)/rect.width*100);data.y=round(start.by+(e.clientY-start.y)/rect.height*100);place();};
          const up=()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);copyAll();};
          el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);
        });
      });
    }
    
    section.append(intro);
    }
    const mounts=[];let count=0;
    for(const chapter of story.chapters.filter(c=>!c.hidden)){
      const chapterEl=node('section','family-story__chapter');chapterEl.id=(flowId?'flow-screens-'+flowId+'-story-':'story-')+chapter.id;chapterEl.setAttribute(chapter.headerless||flowId?'aria-label':'aria-labelledby',chapter.headerless||flowId?chapter.title:chapterEl.id+'-title');
      const header=node('header','family-story__chapter-header');
      const title=node('h3','family-story__heading',chapter.title);title.id=chapterEl.id+'-title';
      header.append(title,node('p','family-story__lead',chapter.intro));
      // headerless:true keeps a chapter's sections but drops its heading and intro (the sections follow on directly).
      if(chapter.headerless||flowId)chapterEl.classList.add('family-story__chapter--headerless');else chapterEl.append(header);
      for(const scene of chapter.scenes.filter(scene=>!flowId||scene.id===flowId)){
        const actor=story.cast[scene.actor],article=node('article','family-story__scene'+(count++%2?' family-story__scene--reverse':''));article.id=(flowId?'flow-screens-scene-':'scene-')+scene.id;
        const copy=node('div','family-story__copy');
        const heading=node('h4','family-story__scene-title',scene.title);heading.id=article.id+'-title';article.setAttribute(flowId?'aria-label':'aria-labelledby',flowId?scene.title:heading.id);
        copy.append(heading,node('p','',scene.copy));
        if(scene.proposed)copy.append(node('p','family-story__designation','Proposed prototype behavior'));
        const figure=node('div','family-story__figure');
        const stage=node('div','family-story__stage');stage.dataset.artworkPlacement=scene.placement;
        if(scene.sequence){
          stage.classList.add('family-story__stage--sequence');
          const rail=node('div','family-story__screen-rail');rail.setAttribute('role','group');rail.setAttribute('aria-label',scene.title+' screens');
          const previews=[];
          for(const screen of scene.sequence){
            const fixture=story.scenes.find(item=>item.id===screen.id),slot=node('div','family-story__phone-slot');slot.dataset.scene=fixture.id;
            const loading=node('span','family-story__loading','Screen preview');loading.setAttribute('aria-hidden','true');slot.append(loading);
            if(!fixture.interactive){const gesture=node('div','family-story__gesture-surface');gesture.setAttribute('aria-hidden','true');slot.append(gesture);}
            const preview=node('figure','family-story__preview');preview.append(slot);
            if(flowId)preview.setAttribute('aria-label',screen.title);
            else preview.append(node('figcaption','',screen.title),node('p','family-story__screen-summary',screen.copy));
            rail.append(preview);previews.push(preview);mounts.push({slot,scene:fixture});
            if(dev)preview.append(devLink(fixture,Boolean(flowId)));
          }
          rail.classList.add('family-story__screen-rail--n'+previews.length);
          // Four or more screens snake through two columns: row 1 left→right, down, row 2 right→left, down, and so on.
          // Each screen records its cell and the direction of the chevron that leads into it.
          if(scene.presentation==='loop'&&!flowId){
            stage.classList.add('family-story__stage--loop');
            const controls=sequenceLoop(rail,previews,scene);
            if(dev)controls.append(flowScreensButton(scene));
            stage.append(controls,rail);
          }else if(flowId){
            rail.classList.add('family-story__screen-rail--list');stage.append(rail);
          }else{
            if(previews.length>=4){rail.classList.add('family-story__screen-rail--snake');previews.forEach((preview,i)=>{const row=Math.floor(i/2),pos=i%2,reverse=row%2===1;preview.style.gridRow=String(row+1);preview.style.gridColumn=String(reverse?2-pos:pos+1);preview.dataset.arrow=i===0?'none':pos===0?'down':reverse?'left':'right';});}if(scene.connected===false)rail.classList.add('family-story__screen-rail--loose');
            stage.append(rail);
          }
        }else{
          const slot=node('div','family-story__phone-slot');slot.dataset.scene=scene.id;
          const loading=node('span','family-story__loading','Screen preview');loading.setAttribute('aria-hidden','true');slot.append(loading);
          const preview=node('figure','family-story__preview');preview.append(slot,node('figcaption','',scene.title+' · '+actor.name+'’s view'+(scene.alternative?' · Alternative path':chapter.id==='tag'?' · Optional branch':'')+' · '+(scene.interactive?'Interactive preview':'Static story preview')));stage.append(preview);
          if(dev)preview.append(devLink(scene));
          mounts.push({slot,scene});
        }
        if(!scene.sequence){const art=node('img','family-story__character');art.src=asset+(scene.artwork||actor.image);art.alt='';art.width=1024;art.height=1536;art.loading='lazy';art.decoding='async';const artwork=node('figure','family-story__artwork');artwork.append(art,node('figcaption','',actor.name+' · '+actor.role));stage.append(artwork);}
        figure.append(stage);
        let pair;
        if(scene.designRationale&&!flowId){
          pair=node('div','family-story__narrative-pair');
          if(!scene.actionBubble)pair.classList.add('family-story__narrative-pair--single');
          if(scene.actionBubble){
            const bubble=node('blockquote','family-story__action-bubble');
            bubble.append(node('p','',scene.actionBubble),node('cite','',actor.name));pair.append(bubble);
          }
          const rationale=node('aside','family-story__rationale'),rationaleHeader=node('div','family-story__rationale-header');
          const rationaleTitle=node('h5','',scene.designRationale.title);rationaleTitle.id=article.id+'-rationale';rationale.setAttribute('aria-labelledby',rationaleTitle.id);
          rationaleHeader.append(rationaleTitle);
          rationale.append(rationaleHeader,node('p','family-story__rationale-copy',scene.designRationale.copy));pair.append(rationale);
        }
        // Story beat, then the screens, then the designer's boxed note on why.
        if(!flowId)article.append(copy);
        article.append(figure);
        if(pair)article.append(pair);
        chapterEl.append(article);beats.push({article,actor:scene.actor});
      }
      if(!flowId||chapterEl.children.length)section.append(chapterEl);
    }
    // Page backdrop: a faded portrait of whoever the section in view is about; hidden outside the story.
    const body=root.document?.body;
    if(!flowId&&body&&'IntersectionObserver' in root){
      const backdrop=node('div','family-story__backdrop');backdrop.setAttribute('aria-hidden','true');
      const portraits={};
      for(const [key,person] of Object.entries(story.cast)){const img=node('img');img.src=asset+person.image;img.alt='';img.decoding='async';portraits[key]=img;backdrop.append(img);}
      body.append(backdrop);
      // The persona stays for their whole part, including the gaps between sections; it only
      // clears above the first section or past the last one.
      const visible=new Set();let current=null;
      const show=()=>{
        const mid=root.innerHeight/2,first=beats[0]?.article.getBoundingClientRect(),last=beats.at(-1)?.article.getBoundingClientRect();
        const inView=beats.find(b=>visible.has(b.article));
        if(inView)current=inView;else if(!first||first.top>mid||last.bottom<mid)current=null;
        const beat=current;
        for(const [key,img] of Object.entries(portraits))img.classList.toggle('is-active',beat?.actor===key);
      };
      const watcher=new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));show();},{rootMargin:'-45% 0px -45% 0px'});
      beats.forEach(b=>watcher.observe(b.article));
      root.addEventListener('scroll',()=>{if(!visible.size)show();},{passive:true});
    }
    // Mount only nearby screens. Locked screens can be released and recreated deterministically.
    const mounted=new Map();
    const mount=({slot,scene})=>{
      if(mounted.has(slot))return;
      const frame=node('iframe','family-story__frame');frame.title=scene.title+' — '+story.cast[scene.actor].name;
      frame.width=433;frame.height=883;frame.src=sceneURL(scene).href;frame.loading='lazy';frame.referrerPolicy='same-origin';
      if(!scene.interactive){frame.inert=true;frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');frame.style.pointerEvents='none';}
      frame.addEventListener('load',()=>slot.classList.add('is-loaded'));
      slot.append(frame);mounted.set(slot,frame);
    };
    if('IntersectionObserver' in root){
      const bySlot=new Map(mounts.map(item=>[item.slot,item]));
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        const item=bySlot.get(entry.target);
        if(entry.isIntersecting)mount(item);
        else if(!item.scene.interactive){mounted.get(item.slot)?.remove();mounted.delete(item.slot);item.slot.classList.remove('is-loaded');}
      }),{rootMargin:'900px 0px'});
      mounts.forEach(item=>observer.observe(item.slot));
    }else mounts.forEach(mount);
    return section;
  }
  root.TurboFlowStory={render,sceneURL,pageURL,sequenceLoop,pushScreens};
})(window);
