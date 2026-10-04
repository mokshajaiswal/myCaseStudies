// Decorative success check in a white circle. tone='success' (default, green) or 'action' (blue, for blue screens).
// The check is a heavy 34-unit stroke (Phosphor bold is 24) so it holds up at a glance.
// animated=true choreographs the arrival: the circle springs in, a halo ripples out and the check draws itself.
// It plays once, when first in view.
TurboUI.successIndicator=({tone='success',animated=false}={})=>{
 const root=document.createElement('span');root.className='th-success-indicator'+(tone==='action'?' th-success-indicator--action':'');
 root.dataset.inspectorVariant=tone;root.setAttribute('aria-hidden','true');root.innerHTML=TurboIcons.render('success-heavy',{size:40});
 if(!animated)return root;
 root.classList.add('th-success-indicator--animated');
 root.querySelector('polyline')?.setAttribute('pathLength','1');
 root.play=()=>{root.classList.remove('is-playing');void root.offsetWidth;root.classList.add('is-playing');};
 // Story embeds load off-screen, so wait until the indicator is actually seen.
 if('IntersectionObserver' in window){const seen=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){seen.disconnect();root.play();}},{threshold:.6});seen.observe(root);}else root.play();
 return root;
};
