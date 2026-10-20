(() => {
  const $ = id => document.getElementById(id);
  let rounds=[], index=0, streak=0, best=0, errors=0, start=0, timer, locked=false, sound=false, audio;
  const shuffle = array => {const a=[...array];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const phases=['01 / RECONOCE LA CONDICIÓN','02 / CONECTA LOS SÍMBOLOS','03 / INTERPRETA EL RESULTADO'];
  function time(){const s=Math.floor((Date.now()-start)/1000);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
  function beep(ok){if(!sound)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.frequency.value=ok?660:230;g.gain.setValueAtTime(.06,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.15);o.start();o.stop(audio.currentTime+.16);}catch{}}
  function begin(){
    clearInterval(timer);rounds=[0,1,2].flatMap(phase=>shuffle(window.DOMINO_BANK.filter(c=>c.phase===phase)).slice(0,2));
    index=0;streak=0;best=0;errors=0;locked=false;start=Date.now();$('history').replaceChildren();$('intro').hidden=true;$('results').hidden=true;$('game').hidden=false;$('clock').textContent='0:00';timer=setInterval(()=>{$('clock').textContent=time();},1000);render();
  }
  function render(){
    locked=false;const c=rounds[index];$('phase').textContent=phases[c.phase];$('round').textContent=`CONEXIÓN ${index+1} DE 6`;$('context').textContent=c.context;$('prompt').textContent=c.prompt;$('score').textContent=`${index} / 6`;$('streak').textContent=streak;$('feedback').textContent='';$('feedback').className='feedback';$('next').hidden=true;$('progress').style.width=`${index/6*100}%`;document.querySelector('[role=progressbar]').setAttribute('aria-valuenow',index);
    $('choices').replaceChildren();shuffle([{text:c.answer,ok:true},...c.wrong.map(text=>({text,ok:false}))]).forEach((choice,n)=>{
      const b=document.createElement('button');b.className='tile';b.setAttribute('aria-label',`${choice.text} Conectar ficha ${n+1}`);const a=document.createElement('span');a.className='answer';a.textContent=choice.text;const tail=document.createElement('span');tail.className='tail';const label=document.createElement('span');label.className='tail-label';label.textContent='● SIGUE';const outgoing=document.createElement('span');outgoing.textContent=rounds[index+1]?.prompt||'Cadena completa ✓';tail.append(label,outgoing);b.append(a,tail);b.addEventListener('click',()=>pick(b,choice));$('choices').append(b);
    });$('choices').firstElementChild.focus({preventScroll:true});
  }
  function pick(button,choice){
    if(locked)return;const c=rounds[index];beep(choice.ok);
    if(!choice.ok){errors++;streak=0;$('streak').textContent=0;button.classList.add('wrong');button.disabled=true;$('feedback').className='feedback error';$('feedback').textContent=c.error;const available=[...$('choices').children].find(b=>!b.disabled);available?.focus({preventScroll:true});return;}
    locked=true;streak++;best=Math.max(best,streak);button.classList.add('correct');[...$('choices').children].forEach(b=>b.disabled=true);$('feedback').className='feedback';$('feedback').textContent=c.why;$('score').textContent=`${index+1} / 6`;$('streak').textContent=streak;$('progress').style.width=`${(index+1)/6*100}%`;document.querySelector('[role=progressbar]').setAttribute('aria-valuenow',index+1);$('next').hidden=false;$('next').textContent=index===5?'Ver mi cadena completa →':'Siguiente conexión →';$('next').focus({preventScroll:true});
  }
  $('next').addEventListener('click',()=>{const c=rounds[index];const h=document.createElement('span');h.textContent=`✓ ${c.prompt} → ${c.answer}`;$('history').append(h);$('history').dataset.count=index+1;index++;if(index<6){render();return;}clearInterval(timer);$('game').hidden=true;$('results').hidden=false;$('summary').textContent=`6 conexiones · racha máxima ${best} · ${errors} ${errors===1?'error':'errores'} · ${time()}. Tu cadena se mantuvo en cada intento.`;$('replay').focus({preventScroll:true});});
  $('sound').addEventListener('click',()=>{sound=!sound;$('sound').textContent=`Sonido: ${sound?'on':'off'}`;$('sound').setAttribute('aria-pressed',sound);$('sound').setAttribute('aria-label',sound?'Silenciar sonido':'Activar sonido');if(sound)beep(true);});$('start').addEventListener('click',begin);$('replay').addEventListener('click',begin);
})();
