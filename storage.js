export const today = new Date().toISOString().slice(0,10);
const KEY = "dojoCultivationStore";
const $ = id => document.getElementById(id);

export function initStore(){
  if(!localStorage.getItem(KEY)) localStorage.setItem(KEY, "{}");
}

export function getStore(){
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export function setStore(data){
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function saveDaily(extra={}){
  const data = getStore();
  data[`daily-${today}`] = {
    date: today,
    morning: $("morning").checked,
    evening: $("evening").checked,
    ritualDone: $("ritualDone").checked,
    preceptDone: $("preceptDone").checked,
    nightDone: $("nightDone").checked,
    dailyBow: Number($("dailyBow").value || 0),
    dailyMeditation: Number($("dailyMeditation").value || 0),
    dailySeven: Number($("dailySeven").value || 0),
    dailyPatch: Number($("dailyPatch").value || 0),
    habit: $("habit").value,
    note: $("note").value,
    updatedAt: new Date().toLocaleString(),
    ...extra
  };
  setStore(data);
}

export function loadDaily(){
  const rec = getStore()[`daily-${today}`];
  if(!rec) return;
  ["morning","evening","ritualDone","preceptDone","nightDone"].forEach(k=>$(k).checked=!!rec[k]);
  ["dailyBow","dailyMeditation","dailySeven","dailyPatch","habit","note"].forEach(k=>$(k).value=rec[k] ?? "");
}

export function appendRecord(type, payload){
  const data = getStore();
  data[`${type}-${Date.now()}`] = { type, date: today, createdAt: new Date().toLocaleString(), ...payload };
  setStore(data);
}

function completionScore(rec){
  if(!rec) return 0;
  return (rec.morning?10:0)+(rec.evening?10:0)+(rec.ritualDone?20:0)+(rec.preceptDone?8:0)+(rec.nightDone?8:0)+Math.min(40, Math.floor((rec.dailyBow||0)/10))+Math.min(20,(rec.dailyMeditation||0)*3);
}

export function updateStats(){
  const data = getStore();
  const rec = data[`daily-${today}`] || {};
  const merit = completionScore(rec);
  $("meritValue").textContent = merit;
  const days = Object.keys(data).filter(k=>k.startsWith("daily-")).length;
  let level = "初發心";
  if(days >= 7) level = "精進";
  if(days >= 21) level = "穩定";
  if(days >= 49) level = "堅固";
  if(days >= 108) level = "不退轉";
  $("levelText").textContent = level;
}

export function renderHistory(){
  const data = getStore();
  const keys = Object.keys(data).sort().reverse();
  const list = $("historyList");
  if(!keys.length){ list.innerHTML = "<p>尚無紀錄。</p>"; return; }
  list.innerHTML = keys.map(k=>{
    const r = data[k];
    if(k.startsWith("daily-")){
      return `<div class="history-item"><h4>${r.date}｜每日修持</h4>
      <p>早課：${r.morning?"完成":"—"}｜晚課：${r.evening?"完成":"—"}｜儀軌：${r.ritualDone?"完成":"—"}</p>
      <p>叩首 ${r.dailyBow||0}｜靜坐 ${r.dailyMeditation||0} 分｜七佛 ${r.dailySeven||0}｜補缺 ${r.dailyPatch||0}</p>
      <p><strong>習氣：</strong>${r.habit||"—"}</p><p>${r.note||""}</p></div>`;
    }
    if(k.startsWith("zhancha-")){
      return `<div class="history-item"><h4>${r.createdAt}｜占察</h4><p>${r.result.type}｜${r.result.title}</p><p>${r.result.text}</p><p><strong>建議：</strong>${r.result.advice}</p></div>`;
    }
    if(k.startsWith("kowtow-")){
      return `<div class="history-item"><h4>${r.createdAt}｜叩首</h4><p>叩首數：${r.count}｜目標：${r.target}</p></div>`;
    }
    return `<div class="history-item"><h4>${r.createdAt||r.date}｜${r.type||"紀錄"}</h4><p>${r.message||""}</p></div>`;
  }).join("");
}

export function exportData(){
  const json = JSON.stringify(getStore(), null, 2);
  $("dataPreview").textContent = json;
  const blob = new Blob([json], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `cultivation-backup-${today}.json`;
  a.click();
}

export function importData(e){
  const file = e.target.files?.[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      setStore(JSON.parse(reader.result));
      loadDaily();
      updateStats();
      window.showToast?.("資料匯入完成");
    }catch{ alert("JSON 格式錯誤"); }
  };
  reader.readAsText(file);
}

export function clearData(){
  if(confirm("確定清除全部資料？此動作無法復原。")){
    localStorage.removeItem(KEY);
    localStorage.removeItem("dojoKowtowCount");
    location.reload();
  }
}