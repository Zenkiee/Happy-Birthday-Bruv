/* ==========================================================
   Gemmaima's birthday site
   All timing is computed live in the visitor's browser clock.
   ========================================================== */

const BIRTH_DATE = new Date('2005-08-31T00:00:00');

/* ---------------- ambient floating paws/hearts ---------------- */
(function ambient(){
  const wrap = document.getElementById('ambient');
  const glyphs = ['♥','🐾'];
  const total = window.innerWidth < 600 ? 10 : 18;
  for(let i=0;i<total;i++){
    const el = document.createElement('span');
    el.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = (14 + Math.random()*22) + 'px';
    el.style.animationDuration = (14 + Math.random()*16) + 's';
    el.style.animationDelay = (Math.random()*18) + 's';
    wrap.appendChild(el);
  }
})();

/* ---------------- hero enter button: scroll down ---------------- */
document.getElementById('enterBtn').addEventListener('click', ()=>{
  document.getElementById('counter-section').scrollIntoView({behavior:'smooth'});
  burst(window.innerWidth/2, window.innerHeight*0.15);
});

/* ---------------- live "time alive" counter ---------------- */
function updateAgeCounter(){
  const now = new Date();
  let years = now.getFullYear() - BIRTH_DATE.getFullYear();
  let months = now.getMonth() - BIRTH_DATE.getMonth();
  let days = now.getDate() - BIRTH_DATE.getDate();
  let hours = now.getHours() - BIRTH_DATE.getHours();
  let minutes = now.getMinutes() - BIRTH_DATE.getMinutes();
  let seconds = now.getSeconds() - BIRTH_DATE.getSeconds();

  if(seconds < 0){ seconds += 60; minutes--; }
  if(minutes < 0){ minutes += 60; hours--; }
  if(hours < 0){ hours += 24; days--; }
  if(days < 0){
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if(months < 0){ months += 12; years--; }

  const map = {years, months, days, hours, minutes, seconds};
  document.querySelectorAll('.counter-num').forEach(el=>{
    el.textContent = map[el.dataset.unit];
  });
}
updateAgeCounter();
setInterval(updateAgeCounter, 1000);

/* ---------------- birthday countdown ---------------- */
function updateBirthdayCountdown(){
  const now = new Date();
  const year = now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() > 31)
    ? now.getFullYear() + 1 : now.getFullYear();
  let next = new Date(year, 7, 31, 0, 0, 0); // Aug = month 7

  const isBirthdayToday = now.getMonth() === 7 && now.getDate() === 31;
  const label = document.getElementById('countdownLabel');
  const value = document.getElementById('countdownValue');

  if(isBirthdayToday){
    label.textContent = "today's the day";
    value.textContent = "happy birthday, bruv 🎂";
    startConfetti();
    return;
  }

  const diff = next - now;
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  label.textContent = 'counting down to your day';
  value.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);

/* clicking the "and counting. always." caption = bonus surprise */
document.querySelector('.counter-caption').addEventListener('click', ()=>{
  openModal("this website doesn't stop counting. neither do I.");
  startConfetti(2500);
});
document.querySelector('.counter-caption').style.cursor = 'pointer';

/* ---------------- surprise trail ---------------- */
const messages = [
  "Six days. That's all the time we've ever had in the same room — and somehow it was enough to know I wanted a lifetime of the rest, even from far away.",
  "You call it distance. I call it the space where I got really good at missing someone on purpose.",
  "You're soft in a world that kept asking you to be hard. I hope you know that's not weakness — that's you winning, every single day.",
  "Every struggle you've walked through and still chose to be kind afterward? That's the bravest thing I've ever watched someone do.",
  "If you were a dog you'd be the one greeting everyone at the door like they've been gone for years. If you were a cat, you'd pretend not to care and fall asleep on my chest anyway. Somehow, bruv, you're both.",
  "Blue for the calm you carry. White for how honest you are. Pink for how soft your heart stayed, even after everything.",
  "You are, hands down, the most surprising person I have ever loved — and I say that as someone who built you a whole website just to prove it.",
  "Happy birthday to the girl who turned 'long distance' into 'long story, still going.'",
  "Somewhere out there a cat and a dog are being best friends, purely out of spite for logic. That's us, kind of.",
  "I don't need a reason to be grateful you exist. But if you need one written down: this whole page is it."
];

function shuffledIcons(n){
  const icons = [];
  for(let i=0;i<n;i++) icons.push(i % 3 === 0 ? 'heart' : 'paw');
  return icons.sort(()=>Math.random()-0.5);
}

const pawSVG = `<svg viewBox="0 0 100 100"><path d="M50 58c-14 0-26 12-26 24 0 8 6 12 14 12 6 0 9-3 12-3s6 3 12 3c8 0 14-4 14-12 0-12-12-24-26-24z"/><ellipse cx="22" cy="42" rx="9" ry="12"/><ellipse cx="42" cy="28" rx="9" ry="13"/><ellipse cx="58" cy="28" rx="9" ry="13"/><ellipse cx="78" cy="42" rx="9" ry="12"/></svg>`;
const heartSVG = `<svg viewBox="0 0 100 100"><path d="M50 88C20 66 6 48 6 30 6 14 18 4 32 4c9 0 16 5 18 13 2-8 9-13 18-13 14 0 26 10 26 26 0 18-14 36-44 58z"/></svg>`;

(function buildTrail(){
  const grid = document.getElementById('trailGrid');
  const icons = shuffledIcons(messages.length);
  const shuffledMsgs = [...messages].sort(()=>Math.random()-0.5);

  shuffledMsgs.forEach((msg, i)=>{
    const card = document.createElement('div');
    card.className = 'trail-card';
    card.innerHTML = `
      <div class="trail-card-inner">
        <div class="trail-face trail-front">
          <span class="paw-icon">${icons[i]==='paw' ? pawSVG : heartSVG}</span>
          <span class="tap-hint">tap me</span>
        </div>
        <div class="trail-face trail-back">${msg}</div>
      </div>`;
    card.addEventListener('click', ()=>{
      if(!card.classList.contains('flipped')){
        const rect = card.getBoundingClientRect();
        burst(rect.left + rect.width/2, rect.top + rect.height/2);
      }
      card.classList.toggle('flipped');
    });
    grid.appendChild(card);
  });
})();

/* ---------------- letter reveal ---------------- */
document.getElementById('letterSeal').addEventListener('click', function(){
  const body = document.getElementById('letterBody');
  body.classList.add('show');
  requestAnimationFrame(()=> body.classList.add('reveal'));
  this.classList.add('hidden');
  burst(window.innerWidth/2, window.innerHeight*0.5);
});

/* ---------------- click-for-surprise on hero title ---------------- */
['hero-name','hero-nickname'].forEach(cls=>{
  const el = document.querySelector('.' + cls);
  if(!el) return;
  el.style.cursor = 'pointer';
  el.addEventListener('click', (e)=>{
    burst(e.clientX, e.clientY);
  });
});

/* ---------------- modal ---------------- */
const overlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
function openModal(text){
  modalText.textContent = text;
  overlay.classList.add('open');
}
function closeModal(){ overlay.classList.remove('open'); }
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeModal(); });

/* ---------------- tiny particle burst (paws + hearts) ---------------- */
function burst(x, y){
  const n = 10;
  for(let i=0;i<n;i++){
    const p = document.createElement('span');
    p.textContent = Math.random() > 0.5 ? '♥' : '🐾';
    p.style.position = 'fixed';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.fontSize = (12 + Math.random()*14) + 'px';
    p.style.pointerEvents = 'none';
    p.style.zIndex = 40;
    p.style.color = Math.random() > 0.5 ? '#E496AF' : '#4F7A9C';
    p.style.transition = 'transform 0.9s cubic-bezier(.2,.7,.3,1), opacity 0.9s ease';
    document.body.appendChild(p);
    const angle = Math.random()*Math.PI*2;
    const dist = 40 + Math.random()*80;
    requestAnimationFrame(()=>{
      p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist - 30}px) rotate(${Math.random()*180-90}deg)`;
      p.style.opacity = '0';
    });
    setTimeout(()=> p.remove(), 950);
  }
}

/* ---------------- confetti (canvas) for the birthday moment ---------------- */
let confettiRunning = false;
function startConfetti(duration = 5000){
  if(confettiRunning) return;
  confettiRunning = true;
  const canvas = document.getElementById('confettiCanvas');
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const colors = ['#E496AF','#AECBE3','#E5B569','#FFFBF4','#4F7A9C'];
  const pieces = Array.from({length:140}, ()=>({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height,
    r: 4 + Math.random()*6,
    speed: 2 + Math.random()*3,
    drift: Math.random()*2 - 1,
    color: colors[Math.floor(Math.random()*colors.length)],
    tilt: Math.random()*Math.PI
  }));

  const start = performance.now();
  function frame(now){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.y += p.speed;
      p.x += p.drift;
      p.tilt += 0.05;
      if(p.y > canvas.height + 20){ p.y = -20; p.x = Math.random()*canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
      ctx.restore();
    });
    if(now - start < duration){
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.style.display = 'none';
      confettiRunning = false;
    }
  }
  requestAnimationFrame(frame);
}
window.addEventListener('resize', ()=>{
  const canvas = document.getElementById('confettiCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ---------------- background music toggle ---------------- */
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
musicToggle.addEventListener('click', ()=>{
  if(music.paused){
    music.play().catch(()=>{
      openModal("add your own White Ferrari mp3 to assets/audio/ — see the README!");
    });
    musicIcon.textContent = '❚❚';
    musicToggle.classList.add('playing');
  } else {
    music.pause();
    musicIcon.textContent = '♪';
    musicToggle.classList.remove('playing');
  }
});
