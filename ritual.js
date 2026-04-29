const $ = id => document.getElementById(id);

const steps = [
  {title:"入壇｜前調心", text:"作揖 → 跪<br><br>（調息）默念三遍五字箴言<br><br><blockquote>自心一點光明<br>與法界光明相應<br>無二無別</blockquote>"},
  {title:"覺醒觀照（三遍）", text:"<blockquote>若人欲了知<br>三世一切佛<br>應觀法界性<br>一切唯心造</blockquote>"},
  {title:"發願文", text:"感恩仙佛慈悲，給予弟子施竣傑懺悔之機，修行之法。<br><br>感恩上天垂憐，包容過往一切罪過錯，賜予改過之因緣。<br><br>弟子至心祈請上天加被，賜我覺察智慧，能觀自心，明辨善惡，遠離顛倒。"},
  {title:"本願", text:"願生生世世護持正法，永不退轉。<br><br>願此一生護持修身齊家班，道心堅定，實修實證。<br><br>願我認理實修，依教奉行，不偏不倚。"},
  {title:"修行願", text:"願我精進修持，專心準備淫戒課程。<br><br>以正知正見，自淨其意。<br><br>願我定期精進，不懈怠，不退轉。"},
  {title:"弘願", text:"願我以智慧德行，漸渡公司老闆一家，離迷入正，聞法得度。<br><br>願我代天宣化，弘法利生，使有緣眾生離苦得樂。"},
  {title:"冤親大德發願", text:"願我無始以來所結一切冤親債主，今皆轉為護法善緣、冤親大德。<br><br>今日至誠懺悔，回向功德。<br><br>願其離苦得樂，怨結化解，心開意解。"},
  {title:"願力總結", text:"願上天加靈加智慧，賜我勇氣與承擔。<br><br>願我一切起心動念皆趨於正，一切行為作為皆契於道，一切因緣際會皆為修行助緣。<br><br>弟子施竣傑，至誠發願，改過自新，永不再犯。"},
  {title:"正修行", text:"明明上帝十叩首"},
  {title:"懺悔文", text:"<blockquote>往昔所造諸惡業<br>皆由無始貪嗔癡<br>從身語意之所生<br>一切我今皆懺悔</blockquote>愚夫施竣傑，六萬多年來，身口意業及所有無明，造作無邊罪孽、無邊罪業、無邊惡業、無邊罪過錯。<br><br>一併叩求老母大慈大悲赦罪容寬。"},
  {title:"叩首修行", text:"（行三百至五百拜）或（行一千拜）<br><br>每一拜：身，叩首；心，默念「放下我執」。<br><br>觀想：黑氣排出，入地化光。<br><br>吸氣：光明入心。吐氣：業氣排出。"},
  {title:"七佛滅罪真言", text:"（行三至七遍）<br><br><blockquote>離婆離婆帝　求訶求訶帝　陀羅尼帝<br>尼訶囉帝　毗黎你帝　摩訶伽帝<br>真陵乾帝　莎婆訶</blockquote>"},
  {title:"補缺真言", text:"（行三至七遍）<br><br><blockquote>南謨喝囉怛那　哆囉夜耶<br>佉囉佉囉　俱住俱住<br>摩囉摩囉　虎囉 吽 賀賀<br>蘇怛拏 吽　潑抹拏 娑婆訶</blockquote>"},
  {title:"自性誓願（三遍）", text:"<blockquote>自性眾生誓願度<br>自性煩惱誓願斷<br>自性法門誓願學<br>自性佛道誓願成</blockquote>"},
  {title:"附錄｜淫戒專修", text:"願我遠離一切邪淫之念，轉為正氣，轉為精進，轉為定力。<br><br>若有淫念生起，願我當下覺察，不隨，不續，不增長。<br><br><blockquote>這不是我<br>我在轉化它</blockquote>"},
  {title:"夜間防護", text:"睡前不滑手機。<br><br>調息五至十次。<br><br>觀想：全身被光包覆。<br><br><blockquote>今日清淨<br>今夜安穩<br>不起妄念</blockquote>"},
  {title:"總結", text:"<blockquote>以懺悔清業<br>以叩首破執<br>以願力轉命<br>以回向圓滿</blockquote>"}
];

let index = 0;
let onComplete = ()=>{};

function draw(){
  $("ritualStepLabel").textContent = `${index+1} / ${steps.length}｜${steps[index].title}`;
  $("ritualReader").innerHTML = steps[index].text;
}

export function initRitual(doneCb){
  onComplete = doneCb || (()=>{});
  $("prevRitual").addEventListener("click",()=>{ index = Math.max(0,index-1); draw(); });
  $("nextRitual").addEventListener("click",()=>{ index = Math.min(steps.length-1,index+1); draw(); });
  $("completeRitual").addEventListener("click",()=>{
    $("ritualDone").checked = true;
    onComplete();
  });
  draw();
}