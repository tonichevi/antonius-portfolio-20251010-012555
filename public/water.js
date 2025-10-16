(function(){
  const DPR = Math.min(devicePixelRatio||1, 2);
  let W = Math.floor(innerWidth/2), H = Math.floor(innerHeight/2);
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d', {alpha:true, desynchronized:true});
  Object.assign(c.style, {
    position:'fixed', inset:'0', zIndex:'50', pointerEvents:'none', mixBlendMode:'overlay'
  });
  document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(c));
  if (document.body) document.body.appendChild(c);

  function resize(){
    W = Math.max(64, Math.floor(innerWidth/2));
    H = Math.max(64, Math.floor(innerHeight/2));
    c.width = Math.floor(W*DPR);
    c.height = Math.floor(H*DPR);
    c.style.width = innerWidth+'px';
    c.style.height = innerHeight+'px';
    imgData = ctx.createImageData(c.width, c.height);
    map0 = new Float32Array(W*H).fill(0);
    map1 = new Float32Array(W*H).fill(0);
  }
  let map0=new Float32Array(1), map1=new Float32Array(1), imgData=null;
  resize(); addEventListener('resize', resize);

  const DAMP = 0.988;
  const SCALE = 1.6;
  const LIGHT = [0.4, -0.25, 1.0]; // light direction (screen space)
  let tx = W/2, ty = H/2, lastDrop = 0;

  function idx(x,y){ return y*W + x }
  function drop(px,py,r=8,amp=1.2){
    px=Math.floor(px); py=Math.floor(py);
    const r2 = r*r;
    for(let y=Math.max(1,py-r); y<Math.min(H-1,py+r); y++){
      const dy=y-py; const dy2=dy*dy;
      for(let x=Math.max(1,px-r); x<Math.min(W-1,px+r); x++){
        const dx=x-px; const d2=dx*dx+dy2;
        if(d2<r2){
          const k = Math.cos(Math.PI*d2/r2)*amp;
          map0[idx(x,y)] += k;
        }
      }
    }
  }

  let t=0;
  function step(){
    // simulate wave equation
    for(let y=1;y<H-1;y++){
      let row=y*W;
      for(let x=1;x<W-1;x++){
        const i=row+x;
        const val = (
          map0[i-1]+map0[i+1]+map0[i-W]+map0[i+W]
        )*0.5 - map1[i];
        map1[i] = val * DAMP;
      }
    }
    // swap buffers
    let tmp=map0; map0=map1; map1=tmp;

    // render shaded normal map
    const data = imgData.data;
    let p=0;
    for(let y=1;y<H-1;y++){
      let row=y*W;
      for(let x=1;x<W-1;x++){
        const i=row+x;
        const hL = map0[i-1], hR = map0[i+1], hU = map0[i-W], hD = map0[i+W];
        let nx=(hL - hR), ny=(hU - hD), nz=1.0;
        // normalize small normal
        const inv = 1/Math.sqrt(nx*nx+ny*ny+nz*nz);
        nx*=inv; ny*=inv; nz*=inv;
        const shade = Math.max(0, nx*LIGHT[0]+ny*LIGHT[1]+nz*LIGHT[2]);
        const val = Math.min(255, Math.max(0, 128 + (shade-0.7)*220));
        data[p++] = val;       // R
        data[p++] = val;       // G
        data[p++] = val+10;    // B slight blue
        data[p++] = 42;        // alpha (overlayed)
      }
    }
    // upscale draw
    ctx.putImageData(imgData, 0, 0);
    ctx.imageSmoothingEnabled = true;
    if (DPR!==1){
      ctx.setTransform(1,0,0,1,0,0);
      ctx.drawImage(c, 0,0, c.width, c.height, 0,0, innerWidth, innerHeight);
    }

    // gentle ambient ripples
    t+=0.016;
    if (t>0.04){ t=0; drop(tx,ty, 5, 0.35); }
    requestAnimationFrame(step);
  }

  // pointer input (convert to simulation coords)
  function toSim(x,y){ return [x*(W/innerWidth), y*(H/innerHeight)] }
  addEventListener('mousemove', e=>{ [tx,ty]=toSim(e.clientX,e.clientY); if(Date.now()-lastDrop>28){ drop(tx,ty,7,1.0); lastDrop=Date.now(); } }, {passive:true});
  addEventListener('mousedown', e=>{ const [x,y]=toSim(e.clientX,e.clientY); drop(x,y,10,1.8); }, {passive:true});
  addEventListener('touchmove', e=>{ if(e.touches[0]){ const [x,y]=toSim(e.touches[0].clientX,e.touches[0].clientY); tx=x; ty=y; drop(x,y,8,1.2);} }, {passive:true});
  addEventListener('touchstart', e=>{ if(e.touches[0]){ const [x,y]=toSim(e.touches[0].clientX,e.touches[0].clientY); drop(x,y,12,2.0);} }, {passive:true});

  step();
})();
