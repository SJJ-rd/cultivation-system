import { appendRecord, saveDaily } from "./storage.js";
import { mokugyo } from "./sound.js";

const $ = id => document.getElementById(id);
let count = Number(localStorage.getItem("dojoKowtowCount") || 0);
let onChange = ()=>{};

export function getKowtowCount(){ return count; }

function draw(){
  $("kowtowCount").textContent = count;
  $("kowtowCountSmall").textContent = count;
  $("dailyBow").value = count;
  const target = Number($("kowtowTarget").value || 108);
  const pct = Math.min(100, Math.round(count / target * 100));
  $("kowtowProgress").style.width = pct + "%";
  $("kowtowProgressText").textContent = `${count} / ${target}`;
  localStorage.setItem("dojoKowtowCount", String(count));
  onChange();
}

function add(n){
  count = Math.max(0, count + n);
  if(n>0) mokugyo();
  $("kowtowOrb").classList.remove("breathing");
  void $("kowtowOrb").offsetWidth;
  $("kowtowOrb").classList.add("breathing");
  draw();
}

export function initKowtow(cb){
  onChange = cb || (()=>{});
  $("kowtowOne").addEventListener("click",()=>add(1));
  $("kowtowTen").addEventListener("click",()=>add(10));
  $("kowtowUndo").addEventListener("click",()=>add(-1));
  $("kowtowReset").addEventListener("click",()=>{ if(confirm("確定重設叩首數？")){count=0;draw();} });
  $("kowtowTarget").addEventListener("change",draw);
  $("saveKowtow").addEventListener("click",()=>{
    const target = Number($("kowtowTarget").value || 108);
    appendRecord("kowtow", {count, target});
    saveDaily({dailyBow: count});
    window.showToast?.("叩首紀錄已儲存");
  });
  draw();
}