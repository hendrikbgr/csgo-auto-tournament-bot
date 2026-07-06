import { vibrate, confetti } from '../utils.js';

export default {
  id: 'stare-off',
  name: 'Stare Off',
  emoji: '👁️',
  tagline: 'IRL · 2 players. Zero blinking.',

  render(root) {
    let running = false, timerId, seconds = 0;

    root.innerHTML = `
      <div class="app-shell" style="background:#000;align-items:center;text-align:center">
        <h1 class="app-title" style="color:#fff;font-size:2.5rem">STARE OFF</h1>
        <p class="app-tag">Two humans. One phone between you. First to blink loses.</p>
        <div style="font-size:6rem;margin:1rem 0;animation:float 2s ease-in-out infinite">👁️👁️</div>
        <style>@keyframes float{50%{transform:translateY(-10px)}}</style>
        <div id="timer" style="font-family:Bangers,cursive;font-size:3.5rem;color:#ff2d95">READY</div>
        <p id="hint" style="margin:1rem 0;font-size:0.9rem;opacity:0.7">Place phone down. Stare into each other's soul.</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
          <button class="btn-big" id="start" style="background:#b8ff00;color:#000">START STARE</button>
          <button class="btn-big" id="blink" style="background:#ff4444;color:#fff;display:none">SOMEONE BLINKED!</button>
        </div>
        <div id="winner" style="margin-top:1.5rem;font-family:Bangers,cursive;font-size:1.4rem;color:#ffe135;min-height:3rem"></div>
      </div>`;

    const start = root.querySelector('#start');
    const blink = root.querySelector('#blink');
    const timer = root.querySelector('#timer');
    const winner = root.querySelector('#winner');
    const hint = root.querySelector('#hint');

    start.addEventListener('click', () => {
      running = true;
      seconds = 0;
      start.style.display = 'none';
      blink.style.display = 'inline-block';
      hint.textContent = 'DO NOT BLINK. DO NOT FLINCH. DO NOT EXIST.';
      timerId = setInterval(() => {
        seconds++;
        timer.textContent = seconds + 's';
        if (seconds === 5) vibrate(50);
        if (seconds === 15) hint.textContent = 'This is getting uncomfortable. Good.';
        if (seconds === 30) hint.textContent = 'Legendary stare energy detected.';
      }, 1000);
    });

    blink.addEventListener('click', () => {
      if (!running) return;
      running = false;
      clearInterval(timerId);
      vibrate([100, 50, 100]);
      confetti(window.innerWidth / 2, 200, 25);
      winner.innerHTML = `BLINKED AFTER ${seconds}s!<br><span style="font-size:0.9rem">The loser buys snacks. House rules.</span>`;
      blink.style.display = 'none';
      start.style.display = 'inline-block';
      start.textContent = 'REMATCH';
    });

    return () => clearInterval(timerId);
  },
};
