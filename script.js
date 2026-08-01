async function loadDiary() {
  const timeline = document.getElementById('timeline');
  const emptyState = document.getElementById('empty-state');

  try {
    const res = await fetch('entries.json', { cache: 'no-store' });
    const data = await res.json();

    if (data.names) document.getElementById('couple-names').textContent = data.names;
    if (data.tagline) document.getElementById('tagline').textContent = data.tagline;

    const entries = (data.entries || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    if (entries.length === 0) {
      emptyState.hidden = false;
      return;
    }

    for (const entry of entries) {
      const card = document.createElement('article');
      card.className = 'entry';

      const dateEl = document.createElement('span');
      dateEl.className = 'entry-date';
      dateEl.textContent = formatDate(entry.date);
      card.appendChild(dateEl);

      const titleEl = document.createElement('h2');
      titleEl.textContent = entry.title || '';
      card.appendChild(titleEl);

      const paragraphs = (entry.body || '').split('\n\n');
      for (const para of paragraphs) {
        if (!para.trim()) continue;
        const p = document.createElement('p');
        p.textContent = para;
        card.appendChild(p);
      }

      if (entry.image) {
        const img = document.createElement('img');
        img.src = entry.image;
        img.alt = entry.title || 'a memory';
        img.loading = 'lazy';
        card.appendChild(img);
      }

      timeline.appendChild(card);
    }
  } catch (err) {
    emptyState.hidden = false;
    console.error('Could not load entries.json', err);
  }
}

function formatDate(str) {
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

let percent = 0, rafId = null, idleTimeout = null;
  const TAP_AMOUNT = 14, DRAIN_RATE = 1.1, IDLE_DELAY = 500;

  function setFill(p) {
    percent = Math.max(0, Math.min(100, p));
    const h = (24 * percent) / 100;
    fillRect.setAttribute('y', 24 - h);
    fillRect.setAttribute('height', h);
  }
  function drainTick() {
    setFill(percent - DRAIN_RATE);
    if (percent > 0) { rafId = requestAnimationFrame(drainTick); }
    else { rafId = null; glow.classList.remove('active'); }
  }
  function tap() {
    clearTimeout(idleTimeout);
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    heartSvg.classList.add('pressed');
    glow.classList.add('active');
    setTimeout(() => heartSvg.classList.remove('pressed'), 120);
    setFill(percent + TAP_AMOUNT);
    if (percent >= 100) { explode(); setFill(0); glow.classList.remove('active'); return; }
    idleTimeout = setTimeout(() => { rafId = requestAnimationFrame(drainTick); }, IDLE_DELAY);
  }
  heartSvg.addEventListener('click', tap);
  heartSvg.addEventListener('touchstart', (e) => { e.preventDefault(); tap(); }, { passive: false });
loadDiary();


