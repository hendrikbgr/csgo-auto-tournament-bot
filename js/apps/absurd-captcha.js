import { rand, vibrate } from '../utils.js';

const rounds = [
  { q: 'Select all squares with <strong>ducks wearing hats</strong>', imgs: ['🦆','🎩','🦆🎩','🐱','🦆','👒','🦆'], correct: [2, 4, 6] },
  { q: 'Select all images containing <strong>emotional support potatoes</strong>', imgs: ['🥔','😢','🥔💚','🍎','🥔','🧸','🥔✨'], correct: [2, 4, 6] },
  { q: 'Select every square that is <strong>definitely not a goose</strong> (trick question)', imgs: ['🦆','🦢','🦆','🦆','🦆','🦆','🦆'], correct: [0, 1, 2, 3, 4, 5, 6] },
  { q: 'Select all squares with <strong>main character energy</strong>', imgs: ['😎','🥱','✨','🫠','💅','🐸','🌟'], correct: [0, 2, 4, 6] },
];

export default {
  id: 'absurd-captcha',
  name: 'Absurd CAPTCHA',
  emoji: '🤖',
  tagline: '1P · Are you a robot? (yes)',

  render(root) {
    let round = rand(rounds);
    let selected = new Set();

    function renderRound() {
      selected = new Set();
      root.innerHTML = `
        <div class="app-shell" style="background:#f0f0f0;color:#333">
          <div style="background:#4285f4;color:#fff;padding:0.75rem;margin:-1rem -1rem 1rem;font-size:0.85rem">reCAPTCHA — Prove you're human (impossible edition)</div>
          <p style="font-size:0.95rem;margin-bottom:1rem;line-height:1.4">${round.q}</p>
          <div id="grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:1rem"></div>
          <div style="display:flex;gap:0.5rem;align-items:center">
            <button id="verify" style="background:#4285f4;color:#fff;border:none;padding:0.6rem 1.2rem;border-radius:4px;font-weight:bold;cursor:pointer">VERIFY</button>
            <span id="msg" style="font-size:0.8rem"></span>
          </div>
          <p id="fail" style="margin-top:1rem;font-size:0.85rem;color:#d93025;min-height:2rem"></p>
        </div>`;

      const grid = root.querySelector('#grid');
      round.imgs.forEach((emoji, i) => {
        const cell = document.createElement('button');
        cell.style.cssText = 'aspect-ratio:1;border:2px solid #ccc;background:#fff;font-size:2rem;cursor:pointer;border-radius:4px';
        cell.textContent = emoji;
        cell.addEventListener('click', () => {
          if (selected.has(i)) { selected.delete(i); cell.style.background = '#fff'; cell.style.borderColor = '#ccc'; }
          else { selected.add(i); cell.style.background = '#c8e6ff'; cell.style.borderColor = '#4285f4'; }
          vibrate(10);
        });
        grid.appendChild(cell);
      });

      root.querySelector('#verify').addEventListener('click', () => {
        const correct = round.correct.every(x => selected.has(x)) && selected.size === round.correct.length;
        const fail = root.querySelector('#fail');
        if (correct) {
          fail.style.color = '#188038';
          fail.textContent = '✓ Verified! You are... probably human. Welcome.';
          vibrate([50, 50, 50]);
        } else {
          fail.style.color = '#d93025';
          fail.textContent = rand([
            '✗ Wrong. The ducks are disappointed in you.',
            '✗ Incorrect. A goose reported this incident.',
            '✗ Failed. Please try again (you won\'t).',
            '✗ Nope. Robots would do better honestly.',
          ]);
          vibrate([100, 50, 100]);
          round = rand(rounds);
          setTimeout(renderRound, 1500);
        }
      });
    }

    renderRound();
  },
};
