/* ---------- floating background hearts ---------- */
const bgHearts = document.getElementById('bgHearts');
for (let i = 0; i < 22; i++) {
  const h = document.createElement('div');
  h.className = 'bg-heart';
  h.textContent = '♥';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (12 + Math.random() * 22) + 'px';
  h.style.animationDuration = (10 + Math.random() * 14) + 's';
  h.style.animationDelay = (Math.random() * -20) + 's';
  bgHearts.appendChild(h);
}

/* ---------- lock screen: tap-to-fill heart ---------- */
const lockScreen = document.getElementById('lockScreen');
const lockHeart = document.getElementById('lockHeart');
const lockFillRect = document.getElementById('lockFillRect');
let lockPercent = 0, lockRaf = null, lockIdle = null;
const LOCK_TAP = 10, LOCK_DRAIN = 0.9, LOCK_IDLE_DELAY = 450;

function setLockFill(p) {
  lockPercent = Math.max(0, Math.min(100, p));
  const h = (24 * lockPercent) / 100;
  lockFillRect.setAttribute('y', 24 - h);
  lockFillRect.setAttribute('height', h);
}
function lockDrainTick() {
  setLockFill(lockPercent - LOCK_DRAIN);
  if (lockPercent > 0) lockRaf = requestAnimationFrame(lockDrainTick);
  else lockRaf = null;
}
function lockTap() {
  clearTimeout(lockIdle);
  if (lockRaf) { cancelAnimationFrame(lockRaf); lockRaf = null; }
  lockHeart.classList.add('pressed');
  setTimeout(() => lockHeart.classList.remove('pressed'), 100);
  setFillWithBeat(lockPercent + LOCK_TAP);
  if (lockPercent >= 100) { megaExplode(); unlockSite(); return; }
  lockIdle = setTimeout(() => { lockRaf = requestAnimationFrame(lockDrainTick); }, LOCK_IDLE_DELAY);
}
function setFillWithBeat(p) { setLockFill(p); }
lockHeart.addEventListener('click', lockTap);
lockHeart.addEventListener('touchstart', (e) => { e.preventDefault(); lockTap(); }, { passive: false });

function unlockSite() {
  document.body.classList.remove('locked');
  setTimeout(() => lockScreen.classList.add('hidden'), 300);
}

function megaExplode() {
  const rect = lockHeart.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const emojis = ['💗','💕','💖','💓','♥','✨'];
  const burstFrom = (cx, cy, count, delay) => {
    setTimeout(() => {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'burst-particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * (window.innerWidth * 0.5);
        p.style.left = cx + 'px'; p.style.top = cy + 'px';
        p.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
        p.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
        p.style.animationDelay = (Math.random() * 0.15) + 's';
        p.style.fontSize = (16 + Math.random() * 20) + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1500);
      }
    }, delay);
  };
  burstFrom(originX, originY, 120, 0);
  burstFrom(window.innerWidth * 0.2, window.innerHeight * 0.3, 60, 200);
  burstFrom(window.innerWidth * 0.8, window.innerHeight * 0.3, 60, 350);
  burstFrom(window.innerWidth * 0.5, window.innerHeight * 0.7, 60, 500);
}

/* ---------- envelope ---------- */
const envelopeWrap = document.getElementById('envelopeWrap');
const envelopeFlap = document.getElementById('envelopeFlap');
const envelopeHeart = document.getElementById('envelopeHeart');
const envelopeHint = document.getElementById('envelopeHint');
const letterCard = document.getElementById('letterCard');
let envelopeOpened = false;
envelopeWrap.addEventListener('click', () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelopeFlap.classList.add('open');
  envelopeHeart.classList.add('hide');
  envelopeHint.classList.add('hide');
  setTimeout(() => letterCard.classList.add('open'), 350);
});

/* ---------- distance hold ---------- */
const distanceTouchZone = document.getElementById('distanceTouchZone');
const distanceSprite = document.getElementById('distanceSprite');
const holdHint = document.getElementById('holdHint');
let distPercent = 0, distRaf = null, distHolding = false;
const DIST_FILL = 1.4, DIST_DRAIN = 1.0;
function setDistPercent(p) {
  distPercent = Math.max(0, Math.min(100, p));
  distanceSprite.style.left = `calc(${distPercent}% - 12px)`;
}
function distTick() {
  if (distHolding) setDistPercent(distPercent + DIST_FILL);
  else setDistPercent(distPercent - DIST_DRAIN);
  if (distHolding || distPercent > 0) distRaf = requestAnimationFrame(distTick);
  else distRaf = null;
}
function distStart() { distHolding = true; holdHint.classList.add('hide'); if (!distRaf) distRaf = requestAnimationFrame(distTick); }
function distEnd() { distHolding = false; holdHint.classList.remove('hide'); if (!distRaf) distRaf = requestAnimationFrame(distTick); }
distanceTouchZone.addEventListener('mousedown', distStart);
distanceTouchZone.addEventListener('mouseup', distEnd);
distanceTouchZone.addEventListener('mouseleave', distEnd);
distanceTouchZone.addEventListener('touchstart', (e) => { e.preventDefault(); distStart(); }, { passive: false });
distanceTouchZone.addEventListener('touchend', distEnd);

/* ---------- checklist ---------- */
document.querySelectorAll('#checklist li').forEach(li => {
  li.addEventListener('click', () => {
    const checked = li.getAttribute('data-checked') === 'true';
    li.setAttribute('data-checked', (!checked).toString());
    li.classList.toggle('checked', !checked);
    li.querySelector('.check-box').classList.toggle('checked', !checked);
  });
});

/* ---------- carousel "me" button ---------- */
const meButton = document.getElementById('meButton');
let meModal = null;
meButton.addEventListener('click', () => {
  if (!meModal) {
    meModal = document.createElement('div');
    meModal.className = 'me-modal';
    meModal.innerHTML = '<div class="me-modal-card">replace with a gif of you 🎞️</div>';
    meModal.addEventListener('click', () => meModal.classList.remove('open'));
    document.body.appendChild(meModal);
  }
  requestAnimationFrame(() => meModal.classList.add('open'));
});

/* ---------- heartbeat mode ---------- */
const heartbeatSvg = document.getElementById('heartbeatSvg');
const fingerHint = document.getElementById('fingerHint');
const hiddenSentence = document.getElementById('hiddenSentence');
const sentences = ["You're safe with me.", "I'm proud of you.", "You're enough.", "I choose you.", "Te amo.", "Always."];
let sentenceIndex = 0, sentenceInterval = null, vibrateInterval = null;
function heartbeatStart() {
  heartbeatSvg.classList.add('beating');
  fingerHint.classList.add('hide');
  showNextSentence();
  sentenceInterval = setInterval(showNextSentence, 1400);
  if (navigator.vibrate) vibrateInterval = setInterval(() => navigator.vibrate(40), 550);
}
function heartbeatEnd() {
  heartbeatSvg.classList.remove('beating');
  fingerHint.classList.remove('hide');
  hiddenSentence.classList.remove('show');
  clearInterval(sentenceInterval);
  clearInterval(vibrateInterval);
}
function showNextSentence() {
  hiddenSentence.classList.remove('show');
  setTimeout(() => {
    hiddenSentence.textContent = sentences[sentenceIndex % sentences.length];
    sentenceIndex++;
    hiddenSentence.classList.add('show');
  }, 150);
}
heartbeatSvg.addEventListener('mousedown', heartbeatStart);
heartbeatSvg.addEventListener('mouseup', heartbeatEnd);
heartbeatSvg.addEventListener('mouseleave', heartbeatEnd);
heartbeatSvg.addEventListener('touchstart', (e) => { e.preventDefault(); heartbeatStart(); }, { passive: false });
heartbeatSvg.addEventListener('touchend', heartbeatEnd);

/* ---------- start over ---------- */
document.getElementById('startOverBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.body.classList.add('locked');
  lockScreen.classList.remove('hidden');
  setLockFill(0);
});

const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
if (carouselTrack && carouselDots) {
  const slideCount = carouselTrack.children.length;
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    carouselDots.appendChild(dot);
  }
  carouselTrack.addEventListener('scroll', () => {
    const index = Math.round(carouselTrack.scrollLeft / carouselTrack.clientWidth);
    [...carouselDots.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
  });
}
