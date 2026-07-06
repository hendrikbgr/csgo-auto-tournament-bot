import { rand, randInt, vibrate } from '../utils.js';

const potatoes = [
  { emoji: '🥔', name: 'Gary', desc: 'A round boi with dreams' },
  { emoji: '🍠', name: 'Steven', desc: 'Sweet potato, sweet soul' },
  { emoji: '🥔', name: 'Brenda', desc: 'Lumpy but confident' },
  { emoji: '🫎', name: 'Wait that\'s not—', desc: 'Disqualified potato' },
  { emoji: '🥔', name: 'Chad', desc: 'Too handsome for mash' },
  { emoji: '🍟', name: 'The Fry Former', desc: 'Already transcended' },
  { emoji: '🥔', name: 'Dumpling', desc: 'Small. Powerful. Moist.' },
  { emoji: '🥔', name: 'CEO Potato', desc: 'Runs three startups' },
];

export default {
  id: 'potato-judge',
  name: 'Potato Judge',
  emoji: '🥔',
  tagline: 'IRL · Rate potatoes. Become expert.',

  render(root) {
    let current = rand(potatoes);

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#8B4513,#3e1f0a);align-items:center;text-align:center">
        <h1 class="app-title" style="color:#ffe135">POTATO JUDGE</h1>
        <p class="app-tag">Official potato quality inspector certification exam</p>
        <div id="potato" style="font-size:6rem;margin:1rem 0">${current.emoji}</div>
        <p id="name" style="font-family:Bangers,cursive;font-size:1.5rem;color:#b8ff00">${current.name}</p>
        <p id="desc" style="font-size:0.85rem;opacity:0.8;margin-bottom:1.5rem">${current.desc}</p>
        <p style="font-size:0.9rem;margin-bottom:0.75rem">Rate this potato:</p>
        <div id="stars" style="display:flex;gap:0.35rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem"></div>
        <div id="verdict" style="font-family:Bangers,cursive;font-size:1.1rem;min-height:3rem;color:#ffe135"></div>
      </div>`;

    const stars = root.querySelector('#stars');
    const verdict = root.querySelector('#verdict');

    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.style.cssText = 'width:44px;height:44px;border-radius:50%;border:3px solid #000;background:#ffe135;font-family:Bangers,cursive;font-size:1rem;cursor:pointer';
      btn.addEventListener('click', () => {
        vibrate(30);
        const msgs = [
          `${i}/10? The potato is ${i >= 7 ? 'flattered' : 'offended'}.`,
          `Scored ${i}/10. Potato council has been notified.`,
          `${i}/10 — ${i === 10 ? 'PERFECT POTATO. You may pass.' : i === 1 ? 'RUDE. This potato has lawyers.' : 'Acceptable potato discourse.'}`,
        ];
        verdict.textContent = rand(msgs);
        setTimeout(() => {
          current = rand(potatoes);
          root.querySelector('#potato').textContent = current.emoji;
          root.querySelector('#name').textContent = current.name;
          root.querySelector('#desc').textContent = current.desc;
          verdict.textContent = '';
        }, 2000);
      });
      stars.appendChild(btn);
    }
  },
};
