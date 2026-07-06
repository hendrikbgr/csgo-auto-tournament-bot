import { rand, vibrate } from '../utils.js';

const truths = [
  'What\'s the dumbest thing you\'ve ever done at a party?',
  'Who here would survive longest in a zombie apocalypse and why?',
  'What\'s your most embarrassing autocorrect fail?',
  'If your laugh was a food, what food would it be?',
  'What celebrity would play you in a movie about your life?',
  'What\'s the weirdest thing in your search history (keep it PG!)',
  'Who in this room is most likely to become famous for something silly?',
  'What\'s a talent you have that nobody expects?',
  'If you had to swap lives with someone here for a day, who?',
  'What\'s the worst advice you\'ve ever given someone?',
  'What song do you secretly love but would deny in public?',
  'What would your entrance theme song be?',
  'What\'s the most chaotic thing you\'ve eaten at 2am?',
  'If you were a potato, what kind of potato would you be?',
  'What\'s your go-to fake excuse to leave a boring conversation?',
];

export default {
  id: 'truth-bomb',
  name: 'Truth Bomb',
  emoji: '💣',
  tagline: 'IRL · Pass phone. Spill tea.',

  render(root) {
    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#ff0844,#ffb199);align-items:center;text-align:center">
        <h1 class="app-title" style="color:#fff">TRUTH BOMB</h1>
        <p class="app-tag">Pass the phone. Whoever holds it answers. No lies. (OK some lies.)</p>
        <div id="card" class="card pop" style="width:100%;max-width:360px;min-height:160px;display:flex;align-items:center;justify-content:center;font-size:1.15rem;line-height:1.5;padding:1.5rem;background:rgba(0,0,0,0.3);margin:1.5rem 0">
          Tap for a truth question
        </div>
        <button class="btn-big" id="next" style="background:#000;color:#ffe135">DROP TRUTH BOMB 💣</button>
        <p style="font-size:0.75rem;opacity:0.7;margin-top:1rem">Pass phone after reading. Answer OUT LOUD.</p>
      </div>`;

    const card = root.querySelector('#card');
    let last = '';

    root.querySelector('#next').addEventListener('click', () => {
      let q;
      do { q = rand(truths); } while (q === last && truths.length > 1);
      last = q;
      card.classList.remove('pop');
      void card.offsetWidth;
      card.classList.add('pop');
      card.textContent = q;
      vibrate([30, 20, 30]);
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 400);
    });
  },
};
