const birthDate = new Date('2005-08-31T00:00:00');

(function(){
  const wrap = document.getElementById('bgHearts');
  const total = window.innerWidth < 600 ? 20 : 34;
  for(let i=0;i<total;i++){
    const el = document.createElement('span');
    const isBalloon = i % 2 === 0;
    el.textContent = isBalloon ? '🎈' : '♥';
    el.className = isBalloon ? 'balloon' : 'heart';
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = (isBalloon ? 20 + Math.random()*16 : 12 + Math.random()*18) + 'px';
    el.style.animationDuration = (16 + Math.random()*16) + 's';
    el.style.animationDelay = (Math.random()*18) + 's';
    wrap.appendChild(el);
  }
})();

const bgSong = document.getElementById('bgSong');
function tryStartSong(){
  if(!bgSong) return;
  bgSong.muted = false;
  bgSong.play().catch(()=>{});
}
window.addEventListener('load', ()=>{
  if(bgSong) bgSong.play().catch(()=>{});
});
['click','touchstart','keydown'].forEach(evt=>{
  document.addEventListener(evt, tryStartSong, {once:true});
});

const slideOrder = ['slide-intro','slide-cake','slide-time','slide-surprise','slide-favorites','slide-letter','slide-end'];
const progress = document.getElementById('progress');
slideOrder.forEach(id=>{
  const dot = document.createElement('span');
  dot.dataset.id = id;
  progress.appendChild(dot);
});

function showSlide(id){
  document.querySelectorAll('.slide').forEach(s=>s.classList.remove('show'));
  document.getElementById(id).classList.add('show');
  document.querySelectorAll('.progress span').forEach(dot=>{
    dot.classList.toggle('current', dot.dataset.id === id);
  });
}
showSlide('slide-intro');

document.querySelectorAll('.nextBtn').forEach(btn=>{
  btn.addEventListener('click', ()=> showSlide(btn.dataset.next));
});
document.querySelectorAll('.backBtn').forEach(btn=>{
  btn.addEventListener('click', ()=> showSlide(btn.dataset.back));
});

function updateAge(){
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  let hours = now.getHours() - birthDate.getHours();
  let minutes = now.getMinutes() - birthDate.getMinutes();
  let seconds = now.getSeconds() - birthDate.getSeconds();

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
  document.querySelectorAll('.num').forEach(el=>{
    el.textContent = map[el.dataset.unit];
  });
}
updateAge();
setInterval(updateAge, 1000);

let confettiFiredOn = null;
function updateCountdown(){
  const now = new Date();
  const year = (now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() > 31))
    ? now.getFullYear() + 1 : now.getFullYear();
  const next = new Date(year, 7, 31, 0, 0, 0);
  const isToday = now.getMonth() === 7 && now.getDate() === 31;

  const tag = document.getElementById('countdownTag');
  const value = document.getElementById('countdownValue');

  if(isToday){
    tag.textContent = "today's the day";
    value.textContent = "happy birthday, bruv 🎂";
    const todayKey = now.toDateString();
    if(confettiFiredOn !== todayKey){
      confettiFiredOn = todayKey;
      fireConfetti();
    }
    return;
  }

  const diff = next - now;
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  tag.textContent = 'counting down to your day';
  value.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById('countdown').addEventListener('click', ()=>{
  openPopup("this doesn't stop counting. neither do I.");
  fireConfetti(2200);
});

const notes = [
  "I'd be here for you through every birthday, every challenge, and every triumph. I love you!",
  "Today is a celebration of you, and I hope you feel the love and joy that surrounds you.",
  "Mahal na mahal kita. I love you more than words can say, and I hope you feel it every day.",
  "Every struggle you've walked through, yet still standing and choosing kindness after. That's the bravest thing I've ever seen.",
  "To meet you is a blessing. To love you is a gift. To be with you is a privilege. Happy birthday, bruv.",
  "Happy birthday to the woman who turned every day into a celebration of love, laughter, and light.",
  "I want to remind you of how amazing person you are. The traits and personality that makes you unique.",
  "I have every reason to be grateful you exist. and I hope you find it in this website.",
  "Blue for the calm you carry. White for how honest you are. Pink for how soft your heart is."
];
const faceIcons = ['♥','✦','☺','♥','✦','☺','♥','✦','☺'];

(function(){
  const grid = document.getElementById('cards');
  const shuffled = [...notes].sort(()=>Math.random()-0.5);
  shuffled.forEach((note, i)=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="cardFlip">
        <div class="face faceFront">${faceIcons[i % faceIcons.length]}</div>
        <div class="face faceBack">${note}</div>
      </div>`;
    card.addEventListener('click', ()=>{
      if(!card.classList.contains('flipped')){
        const rect = card.getBoundingClientRect();
        spark(rect.left + rect.width/2, rect.top + rect.height/2);
      }
      card.classList.toggle('flipped');
    });
    grid.appendChild(card);
  });
})();

document.getElementById('sealBtn').addEventListener('click', function(){
  const letter = document.getElementById('letter');
  letter.classList.add('show');
  requestAnimationFrame(()=> letter.classList.add('reveal'));
  this.classList.add('hidden');
  spark(window.innerWidth/2, window.innerHeight*0.4);
});

document.querySelector('.title').addEventListener('click', (e)=>{
  spark(e.clientX, e.clientY);
});

const blowBtn = document.getElementById('blowBtn');
if(blowBtn){
  blowBtn.addEventListener('click', function(){
    if(this.classList.contains('done')) return;
    document.querySelectorAll('.flame').forEach(f=> f.classList.add('out'));
    this.classList.add('done');
    this.textContent = 'wish sent 🎈';
    const rect = document.getElementById('cakeWrap').getBoundingClientRect();
    balloonBurst(rect.left + rect.width/2, rect.top);
    fireConfetti(3000);
    openPopup('Happy birthday! I hope your wish comes true. I love you always, in all ways.');
  });
}

const oneMoreBtn = document.getElementById('oneMoreBtn');
if(oneMoreBtn){
  oneMoreBtn.addEventListener('click', (e)=>{
    balloonBurst(e.clientX, e.clientY);
    fireConfetti(4000);
    document.getElementById('surprisePhoto').classList.add('show');
  });
}

function balloonBurst(x, y){
  for(let i=0;i<7;i++){
    const b = document.createElement('span');
    b.textContent = '🎈';
    b.style.position = 'fixed';
    b.style.left = (x + (Math.random()*80 - 40)) + 'px';
    b.style.top = y + 'px';
    b.style.fontSize = (20 + Math.random()*16) + 'px';
    b.style.pointerEvents = 'none';
    b.style.zIndex = 40;
    b.style.transition = 'transform 1.6s ease-out, opacity 1.6s ease-out';
    document.body.appendChild(b);
    requestAnimationFrame(()=>{
      b.style.transform = `translateY(-${260 + Math.random()*160}px) translateX(${Math.random()*60 - 30}px) rotate(${Math.random()*30-15}deg)`;
      b.style.opacity = '0';
    });
    setTimeout(()=> b.remove(), 1650);
  }
}

const overlay = document.getElementById('overlay');
const popupText = document.getElementById('popupText');
function openPopup(text){
  popupText.textContent = text;
  overlay.classList.add('open');
}
function closePopup(){ overlay.classList.remove('open'); }
document.getElementById('closeBtn').addEventListener('click', closePopup);
overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closePopup(); });

function spark(x, y){
  for(let i=0;i<9;i++){
    const p = document.createElement('span');
    p.textContent = '♥';
    p.style.position = 'fixed';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.fontSize = (10 + Math.random()*12) + 'px';
    p.style.pointerEvents = 'none';
    p.style.zIndex = 40;
    p.style.color = Math.random() > 0.5 ? '#E496AF' : '#4F7A9C';
    p.style.transition = 'transform 0.8s cubic-bezier(.2,.7,.3,1), opacity 0.8s ease';
    document.body.appendChild(p);
    const angle = Math.random()*Math.PI*2;
    const dist = 34 + Math.random()*60;
    requestAnimationFrame(()=>{
      p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist - 24}px) rotate(${Math.random()*180-90}deg)`;
      p.style.opacity = '0';
    });
    setTimeout(()=> p.remove(), 850);
  }
}

let confettiRunning = false;
function fireConfetti(duration = 5000){
  if(confettiRunning) return;
  confettiRunning = true;
  const canvas = document.getElementById('confetti');
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const colors = ['#E496AF','#AECBE3','#E5B569','#FFFBF4','#4F7A9C'];
  const pieces = Array.from({length:120}, ()=>({
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
      p.y += p.speed; p.x += p.drift; p.tilt += 0.05;
      if(p.y > canvas.height + 20){ p.y = -20; p.x = Math.random()*canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
      ctx.restore();
    });
    if(now - start < duration){ requestAnimationFrame(frame); }
    else{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.style.display = 'none';
      confettiRunning = false;
    }
  }
  requestAnimationFrame(frame);
}
window.addEventListener('resize', ()=>{
  const canvas = document.getElementById('confetti');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
playBtn.addEventListener('click', ()=>{
  if(music.paused){
    music.play().catch(()=>{
      openPopup("no music available");
    });
    playIcon.textContent = '❚❚';
    playBtn.classList.add('playing');
  } else {
    music.pause();
    playIcon.textContent = '♪';
    playBtn.classList.remove('playing');
  }
});
