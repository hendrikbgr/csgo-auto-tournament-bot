import { vibrate, confetti } from '../utils.js';

export default {
  id: 'tap-war',
  name: 'Tap War',
  emoji: '⚔️',
  tagline: '2P · Same phone. No mercy.',

  render(root) {
    let p1 = 0, p2 = 0, playing = false, timeLeft = 10, timerId;

    root.innerHTML = `
      <div class="app-shell" style="background:#1a0505;padding:0">
        <div style="padding:1rem;text-align:center">
          <h1 class="app-title" style="color:#ff4444">TAP WAR</h1>
          <p class="app-tag">Split screen. 10 seconds. Touch your color.</p>
          <div id="timer" style="font-family:Bangers,cursive;font-size:3rem;color:#ffe135">READY?</div>
        </div>
        <div style="display:flex;flex:1;min-height:55dvh">
          <button id="p1" style="flex:1;border:none;background:linear-gradient(#0044ff,#002288);font-family:Bangers,cursive;font-size:2rem;color:#fff;touch-action:manipulation">
            <span style="font-size:4rem;display:block">👈</span>
            <span id="s1">0</span>
            <div style="font-size:0.8rem;opacity:0.8">PLAYER 1</div>
          </button>
          <button id="p2" style="flex:1;border:none;background:linear-gradient(#ff0044,#880022);font-family:Bangers,cursive;font-size:2rem;color:#fff;touch-action:manipulation">
            <span style="font-size:4rem;display:block">👉</span>
            <span id="s2">0</span>
            <div style="font-size:0.8rem;opacity:0.8">PLAYER 2</div>
          </button>
        </div>
        <div id="result" style="padding:1rem;text-align:center;font-family:Bangers,cursive;font-size:1.3rem;min-height:3rem"></div>
        <button class="btn-big" id="start" style="background:#ffe135;color:#000;margin:0 auto 1rem;display:block">START BATTLE</button>
      </div>`;

    const start = root.querySelector('#start');
    const p1btn = root.querySelector('#p1');
    const p2btn = root.querySelector('#p2');
    const s1 = root.querySelector('#s1');
    const s2 = root.querySelector('#s2');
    const timer = root.querySelector('#timer');
    const result = root.querySelector('#result');

    function endGame() {
      playing = false;
      clearInterval(timerId);
      p1btn.style.opacity = p2btn.style.opacity = '0.5';
      let msg;
      if (p1 > p2) msg = '👈 PLAYER 1 WINS! (Player 2 was tapping air probably)';
      else if (p2 > p1) msg = '👉 PLAYER 2 WINS! (Player 1 fell asleep)';
      else msg = '🤝 TIE! You are equally chaotic.';
      result.textContent = msg;
      start.textContent = 'REMATCH';
      vibrate([100, 50, 100]);
      confetti(window.innerWidth / 2, window.innerHeight / 2, 20);
    }

    start.addEventListener('click', () => {
      p1 = p2 = 0;
      s1.textContent = s2.textContent = '0';
      result.textContent = '';
      playing = true;
      timeLeft = 10;
      p1btn.style.opacity = p2btn.style.opacity = '1';
      timer.textContent = timeLeft;
      clearInterval(timerId);
      timerId = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
      }, 1000);
    });

    p1btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!playing) return;
      p1++;
      s1.textContent = p1;
      vibrate(15);
      p1btn.style.transform = 'scale(0.98)';
      setTimeout(() => p1btn.style.transform = '', 50);
    });

    p2btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!playing) return;
      p2++;
      s2.textContent = p2;
      vibrate(15);
      p2btn.style.transform = 'scale(0.98)';
      setTimeout(() => p2btn.style.transform = '', 50);
    });

    return () => clearInterval(timerId);
  },
};
