import { rand, randInt, vibrate } from '../utils.js';

const commands = [
  { text: 'TOUCH YOUR NOSE', fake: false },
  { text: 'RAISE YOUR LEFT HAND', fake: false },
  { text: 'SPIN AROUND ONCE', fake: false },
  { text: 'CLAP THREE TIMES', fake: false },
  { text: 'JUMP!', fake: false },
  { text: 'MAKE YOUR BEST DUCK FACE', fake: false },
  { text: 'POINT AT THE CEILING', fake: false },
  { text: 'WHISPER "BANANA"', fake: false },
  { text: 'DO A TINY DANCE', fake: false },
  { text: 'Simon says touch your toes', fake: true },
  { text: 'Simon says clap once', fake: true },
  { text: 'Simon says freeze!', fake: true },
  { text: 'Simon says look confused', fake: true },
  { text: 'Simon says pat your head', fake: true },
  { text: 'Simon says wiggle', fake: true },
];

export default {
  id: 'simon-says',
  name: 'Simon Says IRL',
  emoji: '🗣️',
  tagline: 'IRL · Group game · Fall for it',

  render(root) {
    let score = 0, fails = 0, round = 0;

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#ff6b35,#f7931e);align-items:center;text-align:center">
        <h1 class="app-title" style="color:#000;text-shadow:1px 1px 0 #fff">SIMON SAYS</h1>
        <p class="app-tag" style="color:#000">IRL group game! Only obey if Simon says!</p>
        <div style="display:flex;gap:1.5rem;margin:1rem 0;font-family:Bangers,cursive">
          <span>✅ <span id="score">0</span></span>
          <span>💀 <span id="fails">0</span></span>
        </div>
        <div id="cmd" class="card" style="width:100%;max-width:360px;min-height:120px;display:flex;align-items:center;justify-content:center;font-family:Bangers,cursive;font-size:1.5rem;background:rgba(0,0,0,0.3);margin-bottom:1rem;padding:1.5rem">
          Press START. Obey ONLY Simon.
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center">
          <button class="btn-big" id="start" style="background:#000;color:#ffe135">START</button>
          <button class="btn-big" id="obey" style="background:#b8ff00;color:#000;display:none">I OBEYED ✓</button>
          <button class="btn-big" id="refuse" style="background:#ff4444;color:#fff;display:none">I REFUSED ✓</button>
        </div>
        <p id="feedback" style="margin-top:1rem;font-size:0.9rem;min-height:2.5rem"></p>
      </div>`;

    const cmd = root.querySelector('#cmd');
    const start = root.querySelector('#start');
    const obey = root.querySelector('#obey');
    const refuse = root.querySelector('#refuse');
    const feedback = root.querySelector('#feedback');
    const scoreEl = root.querySelector('#score');
    const failsEl = root.querySelector('#fails');
    let current = null, playing = false;

    function nextCmd() {
      current = rand(commands);
      const isSimon = current.text.toLowerCase().startsWith('simon says');
      cmd.textContent = current.text;
      cmd.classList.add('pop');
      obey.style.display = refuse.style.display = 'inline-block';
      feedback.textContent = isSimon ? '(Simon said it — you should obey!)' : '(NO Simon — do NOT obey!)';
    }

    start.addEventListener('click', () => {
      playing = true;
      start.style.display = 'none';
      nextCmd();
    });

    obey.addEventListener('click', () => {
      if (!playing) return;
      const isSimon = current.text.toLowerCase().startsWith('simon says');
      if (isSimon) { score++; scoreEl.textContent = score; feedback.textContent = '✅ Correct! Simon said so.'; vibrate(30); }
      else { fails++; failsEl.textContent = fails; feedback.textContent = '💀 WRONG! Simon didn\'t say! You fell for it!'; vibrate([100, 50, 100]); }
      setTimeout(nextCmd, 1500);
    });

    refuse.addEventListener('click', () => {
      if (!playing) return;
      const isSimon = current.text.toLowerCase().startsWith('simon says');
      if (!isSimon) { score++; scoreEl.textContent = score; feedback.textContent = '✅ Smart! No Simon = no action!'; vibrate(30); }
      else { fails++; failsEl.textContent = fails; feedback.textContent = '💀 Simon DID say! You were supposed to obey!'; vibrate([100, 50, 100]); }
      setTimeout(nextCmd, 1500);
    });
  },
};
