import { vibrate, confetti } from '../utils.js';

const choices = ['🪨', '📄', '✂️'];
const names = ['Rock', 'Paper', 'Scissors'];
const beats = { 0: 2, 1: 0, 2: 1 };

export default {
  id: 'rps-duel',
  name: 'RPS Duel',
  emoji: '✂️',
  tagline: '2P · Hidden picks. Big drama.',

  render(root) {
    let p1pick = null, p2pick = null, p1ready = false, p2ready = false;

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#1a1a2e,#16213e);padding:0">
        <div style="padding:1rem;text-align:center">
          <h1 class="app-title">RPS DUEL</h1>
          <p class="app-tag">Pick secretly. Reveal. Scream.</p>
        </div>
        <div style="flex:1;display:flex;flex-direction:column">
          <div style="flex:1;background:rgba(0,100,255,0.2);padding:1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;border-bottom:3px dashed #fff">
            <p style="font-family:Bangers,cursive;margin-bottom:0.5rem">PLAYER 1 — pick hidden 👇</p>
            <div id="p1choices" style="display:flex;gap:0.5rem"></div>
            <p id="p1status" style="margin-top:0.5rem;font-size:0.8rem;opacity:0.7">Waiting...</p>
          </div>
          <div style="flex:1;background:rgba(255,0,100,0.2);padding:1rem;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <p style="font-family:Bangers,cursive;margin-bottom:0.5rem">PLAYER 2 — pick hidden 👇</p>
            <div id="p2choices" style="display:flex;gap:0.5rem"></div>
            <p id="p2status" style="margin-top:0.5rem;font-size:0.8rem;opacity:0.7">Waiting...</p>
          </div>
        </div>
        <div id="result" style="padding:1rem;text-align:center;font-family:Bangers,cursive;font-size:1.3rem;min-height:3rem"></div>
        <button class="btn-big" id="reveal" style="background:#ffe135;color:#000;margin:0 auto 1rem;display:block" disabled>REVEAL!</button>
      </div>`;

    function makeChoices(containerId, player) {
      const container = root.querySelector(containerId);
      choices.forEach((emoji, i) => {
        const btn = document.createElement('button');
        btn.style.cssText = 'width:64px;height:64px;font-size:2rem;border:3px solid #000;border-radius:12px;cursor:pointer;background:#fff';
        btn.textContent = emoji;
        btn.title = names[i];
        btn.addEventListener('click', () => {
          if (player === 1) { p1pick = i; p1ready = true; root.querySelector('#p1status').textContent = '✓ LOCKED IN'; }
          else { p2pick = i; p2ready = true; root.querySelector('#p2status').textContent = '✓ LOCKED IN'; }
          vibrate(20);
          if (p1ready && p2ready) root.querySelector('#reveal').disabled = false;
          container.querySelectorAll('button').forEach(b => b.style.opacity = '0.4');
          btn.style.opacity = '1';
          btn.style.background = '#b8ff00';
        });
        container.appendChild(btn);
      });
    }

    makeChoices('#p1choices', 1);
    makeChoices('#p2choices', 2);

    root.querySelector('#reveal').addEventListener('click', () => {
      const result = root.querySelector('#result');
      const r1 = choices[p1pick], r2 = choices[p2pick];
      let msg;
      if (p1pick === p2pick) msg = `TIE! ${r1} vs ${r2} — equally useless.`;
      else if (beats[p1pick] === p2pick) msg = `👈 P1 WINS! ${r1} destroys ${r2}!`;
      else msg = `👉 P2 WINS! ${r2} humiliates ${r1}!`;
      result.textContent = msg;
      confetti(window.innerWidth / 2, window.innerHeight / 2);
      vibrate([50, 50, 100]);
      root.querySelector('#reveal').textContent = 'PLAY AGAIN';
      root.querySelector('#reveal').onclick = () => location.reload();
    });
  },
};
