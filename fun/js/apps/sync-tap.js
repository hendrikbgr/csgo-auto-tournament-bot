import { vibrate, confetti } from '../utils.js';

export default {
  id: 'sync-tap',
  name: 'Sync Tap',
  emoji: '🤝',
  tagline: '2P · Tap together or fail',

  render(root) {
    let p1 = false, p2 = false, round = 0, score = 0;

    root.innerHTML = `
      <div class="app-shell" style="background:#0d1b2a;align-items:center;text-align:center">
        <h1 class="app-title" style="color:#00f0ff">SYNC TAP</h1>
        <p class="app-tag">Both players tap YOUR buttons at the EXACT same time</p>
        <div style="font-family:Bangers,cursive;font-size:2rem;color:#ffe135;margin:1rem 0">Score: <span id="score">0</span></div>
        <div id="status" style="font-size:1.1rem;margin-bottom:1.5rem;min-height:2rem">Round 1 — GET READY...</div>
        <div style="display:flex;gap:1rem;width:100%;max-width:360px;margin-bottom:1rem">
          <button id="p1" style="flex:1;padding:2rem 0;border:4px solid #0044ff;border-radius:16px;background:rgba(0,68,255,0.3);color:#fff;font-family:Bangers,cursive;font-size:1.2rem;cursor:pointer">P1<br>TAP</button>
          <button id="p2" style="flex:1;padding:2rem 0;border:4px solid #ff0044;border-radius:16px;background:rgba(255,0,68,0.3);color:#fff;font-family:Bangers,cursive;font-size:1.2rem;cursor:pointer">P2<br>TAP</button>
        </div>
        <p style="font-size:0.75rem;opacity:0.6">You have 500ms sync window. Good luck, legends.</p>
        <div id="result" style="margin-top:1rem;font-family:Bangers,cursive;font-size:1.2rem;color:#b8ff00;min-height:2rem"></div>
      </div>`;

    const p1btn = root.querySelector('#p1');
    const p2btn = root.querySelector('#p2');
    const status = root.querySelector('#status');
    const result = root.querySelector('#result');
    const scoreEl = root.querySelector('#score');
    let p1time = 0, p2time = 0, active = false;

    function resetRound() {
      p1 = p2 = false;
      p1time = p2time = 0;
      active = true;
      round++;
      status.textContent = `Round ${round} — TAP NOW!`;
      result.textContent = '';
    }

    function check() {
      if (!p1 || !p2) return;
      active = false;
      const diff = Math.abs(p1time - p2time);
      if (diff < 500) {
        score++;
        scoreEl.textContent = score;
        result.textContent = `SYNCED! (${diff}ms apart) 🔥`;
        confetti(window.innerWidth / 2, 300, 15);
        vibrate([50, 30, 50]);
      } else {
        result.textContent = `FAIL! ${diff}ms apart. Pathetic. 😂`;
        vibrate([100, 50, 100]);
      }
      setTimeout(resetRound, 2000);
    }

    p1btn.addEventListener('click', () => {
      if (!active || p1) return;
      p1 = true; p1time = Date.now();
      p1btn.style.background = 'rgba(0,68,255,0.8)';
      vibrate(15);
      check();
    });

    p2btn.addEventListener('click', () => {
      if (!active || p2) return;
      p2 = true; p2time = Date.now();
      p2btn.style.background = 'rgba(255,0,68,0.8)';
      vibrate(15);
      check();
    });

    setTimeout(resetRound, 1500);
  },
};
