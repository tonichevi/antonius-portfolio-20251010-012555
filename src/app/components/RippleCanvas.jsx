"use client";
import React, { useEffect, useRef } from "react";

export default function RippleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    let raf = 0, mounted = true;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(80, Math.floor(innerWidth/4));
    const h = Math.max(60, Math.floor(innerHeight/4));
    Object.assign(canvas.style,{
      position:"fixed", inset:"0", width:"100%", height:"100%",
      pointerEvents:"none", mixBlendMode:"screen", opacity:"0.75", zIndex:"1"
    });
    canvas.width = w*dpr; canvas.height = h*dpr;
    const ctx = canvas.getContext("2d"); ctx.scale(dpr,dpr);

    const size=w*h; let a=new Float32Array(size), b=new Float32Array(size);
    const damping=0.985, power=1.0, normalScale=32;
    const I=(x,y)=>y*w+x;

    function disturb(px,py,r=8,p=power){
      const cx=Math.max(1,Math.min(w-2,Math.floor(px/innerWidth*w)));
      const cy=Math.max(1,Math.min(h-2,Math.floor(py/innerHeight*h)));
      const r2=r*r;
      for(let y=-r;y<=r;y++){const yy=cy+y;if(yy<=0||yy>=h-1) continue;
        for(let x=-r;x<=r;x++){const xx=cx+x;if(xx<=0||xx>=w-1) continue;
          if(x*x+y*y<=r2) a[I(xx,yy)]+=p;
        }}
    }
    let lx=innerWidth/2, ly=innerHeight/2;
    function onMove(e){
      const x=e.touches?e.touches[0].clientX:e.clientX;
      const y=e.touches?e.touches[0].clientY:e.clientY;
      const v=Math.min(40,Math.hypot(x-lx,y-ly));
      disturb(x,y,8,0.5+v*0.03); lx=x; ly=y;
    }
    addEventListener("pointermove",onMove,{passive:true});
    addEventListener("touchmove",onMove,{passive:true});

    const img=ctx.createImageData(w,h), data=img.data;
    function loop(){
      for(let y=1;y<h-1;y++) for(let x=1;x<w-1;x++){
        const i=I(x,y);
        const sum=a[i-1]+a[i+1]+a[i-w]+a[i+w];
        b[i]=(sum/2 - b[i])*damping;
      }
      let t=a; a=b; b=t;
      let p=0;
      for(let y=1;y<h-1;y++) for(let x=1;x<w-1;x++){
        const i=I(x,y), nx=a[i-1]-a[i+1], ny=a[i-w]-a[i+w];
        const shade=128+(nx-ny)*normalScale;
        const r=Math.max(0,Math.min(255,shade*0.7));
        const g=Math.max(0,Math.min(255,shade*0.85));
        const bl=Math.max(0,Math.min(255,200+shade*0.3));
        data[p++]=r; data[p++]=g; data[p++]=bl; data[p++]=90;
      }
      ctx.putImageData(img,0,0);
      if(mounted) raf=requestAnimationFrame(loop);
    }
    disturb(innerWidth/2,innerHeight/2,12,1.5);
    raf=requestAnimationFrame(loop);
    return ()=>{mounted=false; cancelAnimationFrame(raf);
      removeEventListener("pointermove",onMove); removeEventListener("touchmove",onMove);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
