import { rand, randInt, vibrate } from '../utils.js';

const dares = [
  'Do your best celebrity impression for 10 seconds',
  'Let someone rewrite your social bio out loud',
  'Speak only in questions for the next 3 minutes',
  'Do 5 pushups RIGHT NOW (or fake it dramatically)',
  'Let the group pick your next drink/snack',
  'Post the last photo in your camera roll (or describe it)',
  'Swap an item of clothing with someone',
  'Call a random contact and say "I just wanted to say you\'re cool"',
  'Do the worm. Or attempt it. We need video.',
  'Let someone go through your Spotify for 30 seconds',
  'Hold a plank while telling a story',
  'Compliment every person in the room individually',
  'Do an interpretive dance of your day',
  'Speak in an accent chosen by the group for 5 min',
  'Let someone draw on your hand with pen',
];

export default {
  id: 'dare-roulette',
  name: 'Dare Roulette',
  emoji: '🎰',
  tagline: 'IRL · Spin. Sweat. Regret.',

  render(root) {
    root.innerHTML = `
      <div class="app-shell" style="background:radial-gradient(circle,#ff006e,#8338ec,#3a0ca3);align-items:center;text-align:center">
        <h1 class="app-title">DARE ROULETTE</h1>
        <p class="app-tag">Not for the faint of heart · IRL dares only</p>
        <div id="slot" style="font-size:4rem;margin:1rem 0;letter-spacing:0.5rem">🎰🎲🎯</div>
        <div id="dare" class="card" style="width:100%;max-width:360px;min-height:120px;display:flex;align-items:center;justify-content:center;font-size:1.05rem;line-height:1.5;padding:1.5rem;margin-bottom:1.5rem;background:rgba(0,0,0,0.4)">
          Feeling lucky? (You shouldn't.)
        </div>
        <button class="btn-big" id="spin" style="background:#ffbe0b;color:#000">SPIN THE DARE 🎰</button>
        <button class="btn-big" id="chicken" style="background:transparent;color:#fff;border:3px solid #fff;margin-top:0.75rem;font-size:1rem">🐔 CHICKEN OUT</button>
      </div>`;

    const slot = root.querySelector('#slot');
    const dare = root.querySelector('#dare');
    const emojis = ['🎰', '🎲', '🎯', '💀', '🔥', '👀', '😱'];

    root.querySelector('#spin').addEventListener('click', () => {
      dare.textContent = 'Spinning...';
      let spins = 0;
      const id = setInterval(() => {
        slot.textContent = rand(emojis) + rand(emojis) + rand(emojis);
        vibrate(10);
        spins++;
        if (spins > 15) {
          clearInterval(id);
          dare.innerHTML = '<strong>YOUR DARE:</strong><br><br>' + rand(dares);
          dare.classList.add('pop');
          vibrate([100, 50, 100]);
        }
      }, 80);
    });

    root.querySelector('#chicken').addEventListener('click', () => {
      dare.textContent = 'Coward. But we respect the honesty. 😂';
      vibrate(30);
    });
  },
};
