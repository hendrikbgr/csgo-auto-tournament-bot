import { vibrate } from '../utils.js';

export default {
  id: 'dont-press',
  name: "Don't Press",
  emoji: '🚫',
  tagline: '1P · Reverse psychology simulator',

  render(root) {
    let seconds = 0, timerId, pressed = false;

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#2a0a0a,#000);align-items:center;justify-content:center;text-align:center">
        <h1 class="app-title" style="color:#ff4444">DO NOT PRESS</h1>
        <p class="app-tag">The button is forbidden. You are strong. Probably.</p>
        <div id="timer" style="font-family:Bangers,cursive;font-size:4rem;color:#ffe135;margin:1rem 0">0.0s</div>
        <p id="msg" style="font-size:1rem;opacity:0.8;margin-bottom:2rem;max-width:280px">How long can you resist? (Spoiler: you won't)</p>
        <button id="btn" style="width:180px;height:180px;border-radius:50%;border:8px solid #ff0000;background:radial-gradient(#ff4444,#880000);color:#fff;font-family:Bangers,cursive;font-size:1.2rem;cursor:pointer;box-shadow:0 0 40px rgba(255,0,0,0.5);animation:pulse 1.5s infinite">
          DO NOT<br>PRESS
        </button>
        <style>@keyframes pulse{50%{transform:scale(1.05);box-shadow:0 0 60px rgba(255,0,0,0.8)}}</style>
        <div id="fail" style="margin-top:1.5rem;font-family:Bangers,cursive;font-size:1.2rem;color:#b8ff00;min-height:3rem"></div>
      </div>`;

    const btn = root.querySelector('#btn');
    const timer = root.querySelector('#timer');
    const fail = root.querySelector('#fail');
    const msg = root.querySelector('#msg');

    const start = Date.now();
    timerId = setInterval(() => {
      if (!pressed) {
        seconds = (Date.now() - start) / 1000;
        timer.textContent = seconds.toFixed(1) + 's';
        if (seconds > 5) msg.textContent = 'Impressive... the button is getting angry.';
        if (seconds > 10) msg.textContent = 'WAIT NO DON\'T— actually yes do it we\'re bored.';
      }
    }, 100);

    btn.addEventListener('click', () => {
      if (pressed) return;
      pressed = true;
      clearInterval(timerId);
      vibrate([200, 100, 200, 100, 300]);
      fail.innerHTML = `YOU LASTED ${seconds.toFixed(1)}s<br><span style="font-size:0.85rem;opacity:0.8">Weak. Beautiful. Predictable. 😂</span>`;
      btn.textContent = 'YOU\nPRESSED\nIT';
      btn.style.animation = 'none';
      btn.style.background = '#333';
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 500);
    });

    return () => clearInterval(timerId);
  },
};
