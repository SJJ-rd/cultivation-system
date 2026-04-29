import { initStore, saveDaily, loadDaily, appendRecord, renderHistory, exportData, importData, clearData, updateStats, today } from "./modules/storage.js";
import { beep, bell, mokugyo } from "./modules/sound.js";
import { initKowtow, getKowtowCount } from "./modules/kowtow.js";
import { initRitual } from "./modules/ritual.js";
import { initMeditation } from "./modules/meditation.js";
import { initZhancha } from "./modules/zhancha.js";

const $ = (id) => document.getElementById(id);
const pages = {
  0: "kowtowPage",
  1: "ritualPage",
  2: "meditationPage",
  3: "meditationPage"
};
let currentStep = Number(localStorage.getItem("dojoCurrentStep") || 0);

const wisdom = [
  "先觀心，再行動。",
  "今日少一分執著，多一分清明。",
  "慢下來，願力才會穩。",
  "不怕念起，只怕覺遲。",
  "修行不在遠方，就在當下這一念。",
  "以懺悔清業，以願力轉命。"
];

function showToast(msg){
  $("toast").textContent = msg;
  $("toast").classList.add("show");
  setTimeout(()=>$("toast").classList.remove("show"), 2200);
}
window.showToast = showToast;

function showPage(id){
  document.querySelectorAll(".page,.nav").forEach(x=>x.classList.remove("active"));
  $(id).classList.add("active");
  const nav = [...document.querySelectorAll(".nav")].find(n=>n.dataset.page===id);
  if(nav) nav.classList.add("active");
  if(id==="historyPage") renderHistory();
}
window.showPage = showPage;

function drawSteps(){
  const names = ["kowtow","ritual","meditation","dedication"];
  names.forEach((n,i)=>{
    const el = $(`step-${n}`);
    el.classList.toggle("active", i===currentStep);
    el.classList.toggle("done", i<currentStep);
  });
  localStorage.setItem("dojoCurrentStep", String(currentStep));
}

function completeStep(){
  if(currentStep < 3) currentStep += 1;
  else {
    appendRecord("complete", { message: "今日流程完成", bow: getKowtowCount() });
    bell();
    showToast("今日功德已成，回向圓滿 🪷");
  }
  drawSteps();
  updateStats();
}

document.querySelectorAll(".nav").forEach(btn=>{
  btn.addEventListener("click",()=>showPage(btn.dataset.page));
});

$("enterBtn").addEventListener("click",()=>{
  bell();
  $("enterGate").style.display = "none";
});
$("silentEnterBtn").addEventListener("click",()=>{
  $("enterGate").style.display = "none";
});

$("goCurrentStep").addEventListener("click",()=>showPage(pages[currentStep]));
$("completeCurrentStep").addEventListener("click",completeStep);

$("saveDaily").addEventListener("click",()=>{
  saveDaily();
  updateStats();
  showToast("今日修持已儲存");
});

$("refreshHistory").addEventListener("click",renderHistory);
$("exportData").addEventListener("click",exportData);
$("importData").addEventListener("change",importData);
$("clearData").addEventListener("click",clearData);
$("todayText").textContent = today;
$("wisdomText").textContent = wisdom[new Date().getDate() % wisdom.length];

initStore();
initKowtow(updateStats);
initRitual(()=>{ currentStep = Math.max(currentStep, 2); drawSteps(); updateStats(); showToast("儀軌已完成"); });
initMeditation(()=>{ currentStep = Math.max(currentStep, 3); drawSteps(); updateStats(); });
initZhancha();
loadDaily();
drawSteps();
updateStats();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
}