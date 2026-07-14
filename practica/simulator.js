const {ranges,targets,validation}=window.G10_DATA;

const panoramaImage=document.getElementById("panoramaImage");
const panoramaWrap=document.getElementById("panoramaWrap");
const aimMarker=document.getElementById("aimMarker");
const scopeCanvas=document.getElementById("scopeCanvas");
const scopeCtx=scopeCanvas.getContext("2d");
scopeCtx.imageSmoothingEnabled = false; // crisper rendering

const drumH=document.getElementById("drumH");
const drumV=document.getElementById("drumV");
const directionRange=document.getElementById("directionRange");
const elevationRange=document.getElementById("elevationRange");

const state={direction:3100,elevation:2700,dragging:false};

function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function normalized(){
  return {
    x:(state.direction-ranges.directionMin)/(ranges.directionMax-ranges.directionMin),
    y:(ranges.elevationMax-state.elevation)/(ranges.elevationMax-ranges.elevationMin)
  };
}
function updateFromReadings(){
  state.direction=Number(directionRange.value);
  state.elevation=Number(elevationRange.value);
  render();
}
function updateFromPoint(clientX,clientY){
  const rect=panoramaWrap.getBoundingClientRect();
  const x=clamp((clientX-rect.left)/rect.width,0,1);
  const y=clamp((clientY-rect.top)/rect.height,0,1);
  state.direction=Math.round(ranges.directionMin+x*(ranges.directionMax-ranges.directionMin));
  state.elevation=Math.round(ranges.elevationMax-y*(ranges.elevationMax-ranges.elevationMin));
  directionRange.value=state.direction;
  elevationRange.value=state.elevation;
  render();
}
function drawScope(){
  if(!panoramaImage.complete)return;
  const p=normalized();
  const imageW=panoramaImage.naturalWidth;
  const imageH=panoramaImage.naturalHeight;
  const cropW=imageW*ranges.fieldOfView/(ranges.directionMax-ranges.directionMin);
  const cropH=imageH*ranges.fieldOfView/(ranges.elevationMax-ranges.elevationMin);
  let sx=p.x*imageW-cropW/2;
  let sy=p.y*imageH-cropH/2;
  sx=clamp(sx,0,imageW-cropW);
  sy=clamp(sy,0,imageH-cropH);

  const temp=document.createElement("canvas");
  temp.width=620; temp.height=620;
  const tctx=temp.getContext("2d");
  tctx.imageSmoothingEnabled = false;
  tctx.drawImage(panoramaImage,sx,sy,cropW,cropH,0,0,620,620);

  scopeCtx.clearRect(0,0,620,620);
  scopeCtx.save();
  scopeCtx.beginPath();
  scopeCtx.arc(310,310,310,0,Math.PI*2);
  scopeCtx.clip();
  scopeCtx.drawImage(temp,0,0);

  const vignette=scopeCtx.createRadialGradient(310,310,220,310,310,310);
  vignette.addColorStop(0,"rgba(0,0,0,0)");
  vignette.addColorStop(1,"rgba(0,0,0,.24)");
  scopeCtx.fillStyle=vignette;
  scopeCtx.fillRect(0,0,620,620);
  scopeCtx.restore();
}
function drawDrum(canvas, value, axisLabel){
  const ctx=canvas.getContext("2d");
  const W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle="#eef2ee"; ctx.fillRect(0,0,W,H);
  ctx.fillStyle="#0d2032"; ctx.font="900 20px Arial"; ctx.fillText(`LECTURA ${axisLabel}`,18,24);

  const coarse=Math.floor(value/100), fine=value%100;
  const coarseX=18, coarseY=38, coarseW=308, coarseH=138;
  ctx.fillStyle="#f9faf8"; ctx.fillRect(coarseX,coarseY,coarseW,coarseH);
  ctx.strokeStyle="#89978e"; ctx.lineWidth=2; ctx.strokeRect(coarseX,coarseY,coarseW,coarseH);
  const centerX=coarseX+coarseW/2, majorStep=52;

  for(let h=coarse-4; h<=coarse+4; h++){
    const x=centerX+(h-coarse)*majorStep;
    if(x<coarseX+8 || x>coarseX+coarseW-8) continue;
    ctx.strokeStyle="#304037"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(x, coarseY+72); ctx.lineTo(x, coarseY+116); ctx.stroke();
    if(h<coarse+4){
      const mid=x+majorStep/2;
      if(mid>=coarseX+8 && mid<=coarseX+coarseW-8){
        ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(mid, coarseY+86); ctx.lineTo(mid, coarseY+112); ctx.stroke();
      }
    }
    ctx.fillStyle="#23332a"; ctx.font="bold 24px Arial"; ctx.textAlign="center";
    ctx.fillText(String(h).padStart(2,"0"), x, coarseY+132);
  }
  // Flecha de centenas: vértice hacia la escalilla
  ctx.fillStyle="#d83f31";
  ctx.beginPath();
  ctx.moveTo(centerX, coarseY+68);
  ctx.lineTo(centerX-11, coarseY+48);
  ctx.lineTo(centerX+11, coarseY+48);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle="#d83f31";
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(centerX, coarseY+10);
  ctx.lineTo(centerX, coarseY+48);
  ctx.stroke();

  const fineX=350, fineY=22, fineW=170, fineH=186;
  ctx.fillStyle="#f8f9f7"; ctx.fillRect(fineX, fineY, fineW, fineH);
  ctx.strokeStyle="#89978e"; ctx.lineWidth=2; ctx.strokeRect(fineX, fineY, fineW, fineH);
  const centerY=fineY+fineH/2, pxPerUnit=4.2;

  for(let offset=-24; offset<=24; offset++){
    const raw=fine+offset;
    const wrapped=((raw%100)+100)%100;
    const y=centerY + offset*pxPerUnit;
    if(y<fineY+8 || y>fineY+fineH-8) continue;
    const major=wrapped%10===0;
    const medium=wrapped%5===0;
    ctx.strokeStyle="#324038"; ctx.lineWidth=major?2:1;
    ctx.beginPath();
    ctx.moveTo(fineX+16, y);
    ctx.lineTo(fineX + (major?78:medium?60:46), y);
    ctx.stroke();
    if(major){
      ctx.fillStyle="#23332a"; ctx.font="bold 18px Arial"; ctx.textAlign="right"; ctx.textBaseline="middle";
      ctx.fillText(String(wrapped).padStart(2,"0"), fineX+154, y);
    }
  }
  // Flecha de unidades: vértice hacia la escalilla
  ctx.fillStyle="#d83f31";
  ctx.beginPath();
  ctx.moveTo(fineX+18, centerY);
  ctx.lineTo(fineX-4, centerY-10);
  ctx.lineTo(fineX-4, centerY+10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle="#5d6d66"; ctx.font="12px Arial"; ctx.textAlign="left";
  ctx.fillText("Centenas", coarseX, H-14); ctx.fillText("Unidades (1ºº)", fineX, H-14);
}
function buildReticle(){
  const v=document.getElementById("verticalTicks");
  const h=document.getElementById("horizontalTicks");
  for(let i=-5;i<=5;i++){
    if(i===0) continue;
    const y=310+i*29;
    const len=Math.abs(i)%5===0?22:(Math.abs(i)%2===0?14:10);
    v.insertAdjacentHTML("beforeend",`<line x1="${310-len/2}" y1="${y}" x2="${310+len/2}" y2="${y}"/>`);
  }
  for(let i=-10;i<=10;i++){
    if(i===0) continue;
    const x=310+i*24;
    const len=Math.abs(i)%5===0?22:(Math.abs(i)%2===0?14:10);
    h.insertAdjacentHTML("beforeend",`<line x1="${x}" y1="${310-len/2}" x2="${x}" y2="${310+len/2}"/>`);
  }
}
function buildRulers(){
  const horizontal=document.getElementById("horizontalRuler");
  const vertical=document.getElementById("verticalRuler");
  for(let value=ranges.directionMin; value<=ranges.directionMax; value+=100){
    const pct=(value-ranges.directionMin)/(ranges.directionMax-ranges.directionMin)*100;
    const tick=document.createElement("span");
    tick.className="ruler-tick"; tick.style.left=`${pct}%`; tick.style.height=value%400===0||value===ranges.directionMax?"17px":"9px";
    horizontal.appendChild(tick);
    if(value%400===0 || value===ranges.directionMax){
      const label=document.createElement("span");
      label.className="ruler-label"; label.style.left=`${pct}%`; label.textContent=value;
      horizontal.appendChild(label);
    }
  }
  for(let value=ranges.elevationMax; value>=ranges.elevationMin; value-=100){
    const pct=(ranges.elevationMax-value)/(ranges.elevationMax-ranges.elevationMin)*100;
    const tick=document.createElement("span");
    tick.className="ruler-tick"; tick.style.top=`${pct}%`; tick.style.width=value%200===0?"16px":"9px";
    vertical.appendChild(tick);
    if(value%200===0){
      const label=document.createElement("span");
      label.className="ruler-label"; label.style.top=`${pct}%`; label.textContent=value;
      vertical.appendChild(label);
    }
  }
}
panoramaWrap.addEventListener("pointerdown",event=>{state.dragging=true; panoramaWrap.setPointerCapture(event.pointerId); updateFromPoint(event.clientX,event.clientY);});
panoramaWrap.addEventListener("pointermove",event=>{if(state.dragging) updateFromPoint(event.clientX,event.clientY);});
panoramaWrap.addEventListener("pointerup",()=>state.dragging=false);
panoramaWrap.addEventListener("pointercancel",()=>state.dragging=false);
directionRange.addEventListener("input",updateFromReadings);
elevationRange.addEventListener("input",updateFromReadings);
document.querySelectorAll("[data-axis]").forEach(button=>{
  button.addEventListener("click",()=>{
    const axis=button.dataset.axis, step=Number(button.dataset.step);
    if(axis==="x") directionRange.value=clamp(Number(directionRange.value)+step,ranges.directionMin,ranges.directionMax);
    else elevationRange.value=clamp(Number(elevationRange.value)+step,ranges.elevationMin,ranges.elevationMax);
    updateFromReadings();
  });
});
document.getElementById("resetButton").addEventListener("click",()=>{directionRange.value=3100; elevationRange.value=2700; updateFromReadings();});

const query=new URLSearchParams(location.search);
const exerciseId=Number(query.get("exercise"));
const activeTarget=targets.find(t=>t.id===exerciseId);
if(activeTarget){
  document.getElementById("exerciseBanner").classList.remove("hidden");
  document.getElementById("exerciseName").textContent=`${activeTarget.id}. ${activeTarget.name}`;
  document.getElementById("exerciseDescription").textContent=activeTarget.description;
  directionRange.value=clamp(activeTarget.direction+120,ranges.directionMin,ranges.directionMax);
  elevationRange.value=clamp(activeTarget.elevation-80,ranges.elevationMin,ranges.elevationMax);
  updateFromReadings();
  document.getElementById("answerForm").addEventListener("submit",event=>{
    event.preventDefault();
    const answerH=Number(document.getElementById("answerH").value);
    const answerV=Number(document.getElementById("answerV").value);
    const feedback=document.getElementById("exerciseFeedback");
    if(!Number.isFinite(answerH) || !Number.isFinite(answerV)){
      feedback.className="feedback error"; feedback.textContent="Escriba una lectura H y una lectura V antes de comprobar."; return;
    }
    const aimH=Math.abs(state.direction-activeTarget.direction);
    const aimV=Math.abs(state.elevation-activeTarget.elevation);
    const readH=Math.abs(answerH-state.direction);
    const readV=Math.abs(answerV-state.elevation);
    const aimOK=(aimH<=validation.aimTolerance)&&(aimV<=validation.aimTolerance);
    const readHOK=readH<=validation.readingTolerance;
    const readVOK=readV<=validation.readingTolerance;
    if(aimOK && readHOK && readVOK){
      feedback.className="feedback success";
      feedback.textContent="Ejercicio correcto: puntería válida y lecturas H y V correctas dentro de la tolerancia.";
      return;
    }
    const messages=[];
    if(!aimOK){
      const dirMsg=aimH<=validation.aimTolerance ? "dirección correcta" : (state.direction<activeTarget.direction ? "mueva la visual hacia la derecha" : "mueva la visual hacia la izquierda");
      const elevMsg=aimV<=validation.aimTolerance ? "elevación correcta" : (state.elevation<activeTarget.elevation ? "eleve la visual" : "baje la visual");
      messages.push(`Puntería: ${dirMsg}; ${elevMsg}.`);
    } else messages.push("Puntería correcta.");
    if(!readHOK || !readVOK){
      const rm=[]; if(!readHOK) rm.push("revise la lectura H"); if(!readVOK) rm.push("revise la lectura V");
      messages.push(`Lecturas: ${rm.join(" y ")}.`);
    } else messages.push("Lecturas correctas.");
    feedback.className="feedback error"; feedback.textContent=messages.join(" ");
  });
}

panoramaImage.addEventListener("load",render);
window.addEventListener("resize",render);
function render(){
  const p=normalized();
  aimMarker.style.left=`${p.x*100}%`;
  aimMarker.style.top=`${p.y*100}%`;
  drawScope();
  drawDrum(drumH,state.direction,"H");
  drawDrum(drumV,state.elevation,"V");
}
buildReticle(); buildRulers(); updateFromReadings();
