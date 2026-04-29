import { bell } from "./sound.js";
const $ = id => document.getElementById(id);

let remain = 180;
let timer = null;
let onDone = ()=>{};

function draw(){
  const m = String(Math.floor(remain/60)).padStart(2,"0");
  const s = String(remain%60).padStart(2,"0");
  $("timerText").textContent = `${m}:${s}`;
}

export function initMeditation(doneCb){
  onDone = doneCb || (()=>{});
  $("startTimer").addEventListener("click",()=>{
    bell();
    clearInterval(timer);
    timer = setInterval(()=>{
      remain--;
      draw();
      if(remain <= 0){
        clearInterval(timer);
        $("dailyMeditation").value = Math.max(Number($("dailyMeditation").value || 0), 3);
        bell();
        window.showToast?.("三分鐘靜坐完成");
        onDone();
      }
    },1000);
  });
  $("resetTimer").addEventListener("click",()=>{ clearInterval(timer); remain = 180; draw(); });
  $("completeDedication").addEventListener("click",()=>{
    bell();
    window.showToast?.("回向完成，今日功德已成 🪷");
    onDone();
  });
  draw();
}