import { rand, randInt, vibrate } from '../utils.js';

const warnings = [
  'Pass it LEFT! 🫲',
  'Pass it RIGHT! 🫱',
  'PASS IT NOW!!! 🔥',
  'HURRY UP SLOWPOKE',
  'THE POTATO IS IMPATIENT 🥔',
  'DO NOT DROP IT (the phone)',
  'SPIN AROUND THEN PASS',
  'WHISPER "BANANA" THEN PASS',
];

const explosions = [
  '💥 BOOM! Whoever holds it does 5 jumping jacks!',
  '💥 BOOM! Holder must speak in rhyme for 1 minute!',
  '💥 BOOM! Holder gives everyone a compliment!',
  '💥 BOOM! Holder is now DJ for 30 seconds!',
  '💥 BOOM! Holder does their best chicken impression!',
  '💥 BOOM! Holder owes the group a snack IOU!',
];

export default {
  id: 'hot-potato',
  name: 'Hot Potato',
  emoji: '🥔',
  tagline: 'IRL · Pass fast or perish',

  render(root) {
    let playing = false, intervalId, timeoutId;

    root.innerHTML = `
      <div class="app-shell" style="background:radial-gradient(circle,#ff6600,#330000);align-items:center;text-align:center">
        <h1 class="app-title" style="color:#ffe135">HOT POTATO</h1>
        <p class="app-tag">Circle up. Pass the phone. Panic.</p>
        <div id="potato" style="font-size:7rem;margin:1rem 0;transition:transform 0.1s">🥔</div>
        <div id="warn" style="font-family:Bangers,cursive;font-size:1.5rem;min-height:2.5rem;color:#fff;margin-bottom:1rem">Press start. Pass the phone around.</div>
        <div id="heat" style="width:100%;max-width:300px;height:24px;background:#330000;border:3px solid #000;border-radius:12px;overflow:hidden;margin-bottom:1rem">
          <div id="heatbar" style="height:100%;width:0;background:linear-gradient(#ffe135,#ff0000);transition:width 0.3s"></div>
        </div>
        <button class="btn-big" id="start" style="background:#ffe135;color:#000">START HOT POTATO</button>
        <div id="boom" style="margin-top:1.5rem;font-family:Bangers,cursive;font-size:1.2rem;color:#b8ff00;min-height:4rem"></div>
      </div>`;

    const start = root.querySelector('#start');
    const warn = root.querySelector('#warn');
    const heatbar = root.querySelector('#heatbar');
    const potato = root.querySelector('#potato');
    const boom = root.querySelector('#boom');

    start.addEventListener('click', () => {
      if (playing) return;
      playing = true;
      boom.textContent = '';
      start.disabled = true;
      let heat = 0;
      const explodeAt = randInt(8, 25);

      intervalId = setInterval(() => {
        heat += randInt(2, 6);
        heatbar.style.width = Math.min(heat, 100) + '%';
        potato.style.transform = `scale(${1 + heat / 200}) rotate(${heat * 2}deg)`;
        warn.textContent = rand(warnings);
        vibrate(20);
        if (heat >= explodeAt * 4) {
          clearInterval(intervalId);
          playing = false;
          start.disabled = false;
          start.textContent = 'AGAIN (if you dare)';
          potato.textContent = '💥';
          boom.innerHTML = rand(explosions);
          vibrate([200, 100, 200, 100, 400]);
          document.body.classList.add('shake');
          setTimeout(() => document.body.classList.remove('shake'), 500);
        }
      }, 800);
    });

    return () => { clearInterval(intervalId); clearTimeout(timeoutId); };
  },
};
