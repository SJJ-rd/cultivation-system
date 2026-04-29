let ctx;
function audioCtx(){
  if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

export function beep(freq=440, duration=0.08, type="sine", gainValue=0.06){
  try{
    const ac = audioCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = gainValue;
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
    osc.stop(ac.currentTime + duration);
  }catch(e){}
}

export function bell(){
  beep(660, .35, "sine", .05);
  setTimeout(()=>beep(990, .45, "sine", .035), 120);
}

export function mokugyo(){
  beep(180, .055, "triangle", .055);
}