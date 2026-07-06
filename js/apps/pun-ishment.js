import { rand, vibrate } from '../utils.js';

const puns = [
  'What do you call a fake noodle? An IMPASTA! 🍝',
  'Why did the scarecrow win an award? He was OUTSTANDING in his field!',
  'What do you call a bear with no teeth? A GUM-BO!',
  'Why don\'t eggs tell jokes? They\'d CRACK each other up!',
  'What do you call a duck who loves fireworks? A FIREQUACKER!',
  'I told my wife she was drawing eyebrows too high. She looked SURPRISED.',
  'Why did the potato turn red? Because it saw the SALAD DRESSING!',
  'What\'s a goose\'s favorite drink? Root BEAK-er!',
  'I used to hate facial hair but then it GREW on me.',
  'What do you call a sleeping bull? A BULL-DOZER!',
  'Why did the cookie go to the doctor? Because it felt CRUMBY!',
  'What\'s orange and sounds like a parrot? A CARROT! 🥕',
];

export default {
  id: 'pun-ishment',
  name: 'Pun-ishment',
  emoji: '😩',
  tagline: 'IRL · Read aloud. Cringe together.',

  render(root) {
    let last = '';

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#ffecd2,#fcb69f);color:#333;align-items:center;text-align:center">
        <h1 class="app-title" style="color:#333;text-shadow:2px 2px 0 #fff">PUN-ISHMENT</h1>
        <p class="app-tag" style="color:#555">Read the pun OUT LOUD. No mercy.</p>
        <div id="pun" class="card pop" style="width:100%;max-width:360px;min-height:140px;display:flex;align-items:center;justify-content:center;font-size:1.15rem;line-height:1.5;padding:1.5rem;background:rgba(255,255,255,0.7);color:#333;margin:1.5rem 0">
          Prepare for pain...
        </div>
        <button class="btn-big" id="btn" style="background:#333;color:#ffe135">DELIVER PUN 😩</button>
        <p style="font-size:0.75rem;margin-top:1rem;opacity:0.6">Groaning is mandatory.</p>
      </div>`;

    const punEl = root.querySelector('#pun');

    root.querySelector('#btn').addEventListener('click', () => {
      let p;
      do { p = rand(puns); } while (p === last);
      last = p;
      punEl.classList.remove('pop');
      void punEl.offsetWidth;
      punEl.classList.add('pop');
      punEl.textContent = p;
      vibrate([50, 30, 50]);
    });
  },
};
