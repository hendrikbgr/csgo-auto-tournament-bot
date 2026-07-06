import { rand, randInt, vibrate } from '../utils.js';

const questions = [
  { q: 'How satisfied are you with your elbows?', opts: ['Very', 'Somewhat', 'Elbow?'] },
  { q: 'Would you recommend this app to a goose?', opts: ['Honk yes', 'Honk no', 'I am a goose'] },
  { q: 'Rate your experience from 1 to chaos', opts: ['1', '5', 'Chaos'] },
  { q: 'What brought you here today?', opts: ['Boredom', 'Destiny', 'A suspicious link'] },
  { q: 'How many potatoes is too many potatoes?', opts: ['3', '47', 'There is no limit'] },
  { q: 'Did you blink just now?', opts: ['No', 'Yes', 'I am blinking RIGHT NOW'] },
  { q: 'Your nostrils: left or right dominant?', opts: ['Left gang', 'Right gang', 'Both are CEOs'] },
  { q: 'How likely are you to press a button that says DO NOT PRESS?', opts: ['0%', '100%', 'Already pressed it'] },
  { q: 'Pick a snack to represent your soul', opts: ['Fry', 'Mystery meat', 'Air'] },
  { q: 'Would you rather fight 1 horse-sized duck or 100 duck-sized horses?', opts: ['Horse duck', 'Duck horses', 'Befriend all'] },
];

export default {
  id: 'exit-survey',
  name: 'Exit Survey Hell',
  emoji: '📋',
  tagline: '1P · You can never leave',

  render(root) {
    let q = 0;

    function show() {
      const item = questions[q % questions.length];
      root.innerHTML = `
        <div class="app-shell" style="background:#fff;color:#333">
          <div style="background:#673ab7;color:#fff;padding:0.5rem 1rem;margin:-1rem -1rem 1rem;font-size:0.8rem">Quick 10-second survey! (Lie)</div>
          <p style="font-size:0.75rem;opacity:0.6;margin-bottom:0.25rem">Question ${q + 1} of ∞</p>
          <h2 style="font-size:1.1rem;margin-bottom:1.5rem;line-height:1.4">${item.q}</h2>
          <div id="opts" style="display:flex;flex-direction:column;gap:0.5rem"></div>
          <div id="thanks" style="margin-top:1.5rem;text-align:center;font-size:0.85rem;color:#673ab7;min-height:2rem"></div>
        </div>`;

      const opts = root.querySelector('#opts');
      item.opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.style.cssText = 'padding:0.85rem;border:2px solid #ddd;border-radius:8px;background:#fafafa;font-size:1rem;cursor:pointer;text-align:left';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          q++;
          vibrate(15);
          root.querySelector('#thanks').textContent = rand([
            'Thanks! Loading next question...',
            'Your feedback is ignored. Next question!',
            'Interesting. Wrong, but interesting.',
            'Recorded. The ducks have been notified.',
          ]);
          setTimeout(show, randInt(600, 1200));
        });
        opts.appendChild(btn);
      });
    }

    show();
  },
};
