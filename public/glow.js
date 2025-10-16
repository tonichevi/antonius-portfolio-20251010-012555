(function(){
  const r=document.documentElement;
  let x=innerWidth/2, y=innerHeight/2, tx=x, ty=y;
  function lerp(a,b,t){return a+(b-a)*t}
  function step(){ x=lerp(x,tx,0.18); y=lerp(y,ty,0.18);
    r.style.setProperty('--mx',x+'px'); r.style.setProperty('--my',y+'px');
    requestAnimationFrame(step);
  }
  addEventListener('mousemove',e=>{tx=e.clientX; ty=e.clientY;},{passive:true});
  addEventListener('touchmove',e=>{
    if(e.touches && e.touches[0]){tx=e.touches[0].clientX; ty=e.touches[0].clientY;}
  },{passive:true});
  step();
})();
