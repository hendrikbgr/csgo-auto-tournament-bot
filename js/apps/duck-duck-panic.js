import { rand, vibrate } from '../utils.js';

const noises = ['QUACK', 'HONK', 'MEOW', 'BORK', 'SQUEE', 'BOOP', 'YEET', 'BLERP'];

export default {
  id: 'duck-duck-panic',
  name: 'Duck Duck Panic',
  emoji: '🦆',
  tagline: 'IRL · Duck duck GOOSE but unhinged',

  render(root) {
    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#87CEEB,#4682B4);align-items:center;text-align:center">
        <h1 class="app-title" style="color:#000;text-shadow:1px 1px 0 #fff">DUCK DUCK PANIC</h1>
        <p class="app-tag">IRL circle game · Tap for each person · Last one is GOOSE</p>
        <div id="duck" style="font-size:5rem;margin:1rem 0;transition:transform 0.1s">🦆</div>
        <div id="label" style="font-family:Bangers,cursive;font-size:2rem;color:#000;margin-bottom:0.5rem">DUCK</div>
        <div id="count" style="font-size:1rem;opacity:0.7;margin-bottom:1.5rem">Tap count: 0</div>
        <button class="btn-big" id="tap" style="background:#ffe135;color:#000;width:100%;max-width:280px">TAP FOR NEXT PERSON</button>
        <div id="goose" style="margin-top:1.5rem;font-family:Bangers,cursive;font-size:1.3rem;color:#ff0044;min-height:3rem"></div>
        <button class="btn-big" id="reset" style="background:#000;color:#fff;margin-top:1rem;font-size:0.9rem;display:none">NEW ROUND</button>
      </div>`;

    let count = 0, gooseAt = 0, done = false;
    const tap = root.querySelector('#tap');
    const label = root.querySelector('#label');
    const countEl = root.querySelector('#count');
    const goose = root.querySelector('#goose');
    const duck = root.querySelector('#duck');
    const reset = root.querySelector('#reset');

    function newRound() {
      count = 0;
      done = false;
      gooseAt = Math.floor(Math.random() * 12) + 5;
      goose.textContent = '';
      reset.style.display = 'none';
      tap.style.display = 'inline-block';
      label.textContent = 'DUCK';
      duck.textContent = '🦆';
      countEl.textContent = 'Tap count: 0';
    }

    tap.addEventListener('click', () => {
      if (done) return;
      count++;
      countEl.textContent = 'Tap count: ' + count;
      vibrate(20);
      duck.style.transform = 'scale(1.2)';
      setTimeout(() => duck.style.transform = '', 100);

      if (count >= gooseAt) {
        done = true;
        label.textContent = rand(noises) + '!!!';
        duck.textContent = '🪿';
        goose.innerHTML = `<span style="font-size:2rem">🚨 GOOSE! 🚨</span><br><br>Last person tapped is the GOOSE!<br>Chase someone. House rules.`;
        vibrate([200, 100, 200, 100, 300]);
        tap.style.display = 'none';
        reset.style.display = 'inline-block';
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
      }
    });

    reset.addEventListener('click', newRound);
    newRound();
  },
};
