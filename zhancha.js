import { appendRecord } from "./storage.js";
import { bell } from "./sound.js";
const $ = id => document.getElementById(id);

const results = [
  {type:"善業", title:"修持精進", text:"近日願力與行動較能相應，宜穩定持續，不求速成。", advice:"保持每日定課，將功德回向冤親大德。"},
  {type:"善業", title:"懺悔轉化", text:"能見己過，即是轉業之始。此象重在發露懺悔、真實改過。", advice:"今日叩首時，專注默念「放下我執」。"},
  {type:"善業", title:"護法善緣", text:"有護持正法、利益有緣之善緣，宜以謙卑心承擔。", advice:"今日多做一件利他之事，不求回報。"},
  {type:"惡業警覺", title:"口業須慎", text:"言語容易生是非、急躁或辯勝心，須先觀照再回應。", advice:"今日少說一句衝動語，先深呼吸三次。"},
  {type:"惡業警覺", title:"懈怠散亂", text:"心力容易被外境牽動，修持需重新立穩。", advice:"先完成三分鐘靜坐，再完成今日最小定課。"},
  {type:"惡業警覺", title:"欲念牽引", text:"欲念生起時不必恐懼，重點是不隨、不續、不增長。", advice:"默念：這不是我，我在轉化它。"},
  {type:"因緣觀察", title:"暫勿急斷", text:"目前重點在穩定心念，不宜執著結果或急問吉凶。", advice:"先修懺悔與回向，三日後再觀察。"}
];

export function initZhancha(){
  $("startZhancha").addEventListener("click",()=>{
    $("zhanchaResult").innerHTML = "";
    $("zhanchaStatus").textContent = "靜心中：請調息、觀照自心。";
    ["wheel1","wheel2","wheel3"].forEach(id=>$(id).classList.add("spin"));
    setTimeout(()=>{
      ["wheel1","wheel2","wheel3"].forEach(id=>$(id).classList.remove("spin"));
      const result = results[Math.floor(Math.random()*results.length)];
      $("zhanchaStatus").textContent = "占察完成：請以懺悔、改過、精進之心閱讀。";
      $("zhanchaResult").innerHTML = `<h3>${result.type}｜${result.title}</h3><p>${result.text}</p><p><strong>修持建議：</strong>${result.advice}</p>`;
      appendRecord("zhancha", {result});
      bell();
    }, 2600);
  });
}