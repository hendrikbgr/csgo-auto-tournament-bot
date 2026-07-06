import { vibrate, confetti } from '../utils.js';

export default {
  id: 'finger-soccer',
  name: 'Finger Soccer',
  emoji: '⚽',
  tagline: '2P · Flick to score (on a table)',

  render(root) {
    let p1score = 0, p2score = 0, ballX = 50, ballY = 50, turn = 1;

    root.innerHTML = `
      <div class="app-shell" style="background:#2d5016;padding:0.5rem">
        <div style="text-align:center;padding:0.5rem">
          <h1 class="app-title" style="font-size:1.5rem">FINGER SOCCER</h1>
          <p class="app-tag">Lay phone flat. Flick the ball toward the goal!</p>
          <div style="font-family:Bangers,cursive;font-size:1.2rem">🔵 <span id="s1">0</span> — <span id="s2">0</span> 🔴</div>
        </div>
        <div id="field" style="position:relative;width:100%;aspect-ratio:3/4;max-height:55dvh;background:linear-gradient(#3a7d2a,#2d5016);border:4px solid #fff;border-radius:8px;overflow:hidden;touch-action:none">
          <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:60%;height:8px;background:#ff4444;border-radius:0 0 8px 8px"></div>
          <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:60%;height:8px;background:#4488ff;border-radius:8px 8px 0 0"></div>
          <div style="position:absolute;top:50%;left:0;right:0;height:2px;background:rgba(255,255,255,0.5)"></div>
          <div id="ball" style="position:absolute;width:36px;height:36px;background:#fff;border-radius:50%;border:3px solid #000;font-size:1.2rem;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%);left:50%;top:50%;transition:left 0.3s ease-out,top 0.3s ease-out">⚽</div>
        </div>
        <p id="turn" style="text-align:center;margin-top:0.75rem;font-family:Bangers,cursive;color:#ffe135">🔵 P1's turn — tap where to flick!</p>
        <p id="msg" style="text-align:center;font-size:0.85rem;min-height:1.5rem;margin-top:0.25rem"></p>
      </div>`;

    const field = root.querySelector('#field');
    const ball = root.querySelector('#ball');
    const turnEl = root.querySelector('#turn');
    const msg = root.querySelector('#msg');
    const s1 = root.querySelector('#s1');
    const s2 = root.querySelector('#s2');

    function moveBall(x, y) {
      ballX = Math.max(5, Math.min(95, x));
      ballY = Math.max(5, Math.min(95, y));
      ball.style.left = ballX + '%';
      ball.style.top = ballY + '%';

      if (ballY < 8 && ballX > 20 && ballX < 80) {
        if (turn === 1) { p1score++; s1.textContent = p1score; msg.textContent = '🔵 GOAL! P1 scores!'; }
        else { p2score++; s2.textContent = p2score; msg.textContent = '🔴 GOAL! P2 scores!'; }
        confetti(window.innerWidth / 2, 100, 20);
        vibrate([50, 50, 100]);
        ballX = 50; ballY = 50;
        setTimeout(() => { ball.style.left = '50%'; ball.style.top = '50%'; }, 300);
      } else if (ballY > 92 && ballX > 20 && ballX < 80) {
        if (turn === 2) { p2score++; s2.textContent = p2score; msg.textContent = '🔴 GOAL! P2 scores!'; }
        else { p1score++; s1.textContent = p1score; msg.textContent = '🔵 GOAL! P1 scores!'; }
        confetti(window.innerWidth / 2, window.innerHeight - 100, 20);
        vibrate([50, 50, 100]);
        ballX = 50; ballY = 50;
        setTimeout(() => { ball.style.left = '50%'; ball.style.top = '50%'; }, 300);
      }

      turn = turn === 1 ? 2 : 1;
      turnEl.textContent = (turn === 1 ? '🔵 P1' : '🔴 P2') + "'s turn — tap where to flick!";
    }

    field.addEventListener('click', (e) => {
      const rect = field.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const dx = x - ballX, dy = y - ballY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      moveBall(ballX + (dx / dist) * 30, ballY + (dy / dist) * 30);
      vibrate(15);
    });
  },
};
