import { randInt, vibrate } from '../utils.js';

export default {
  id: 'reaction-ninja',
  name: 'Reaction Ninja',
  emoji: '⚡',
  tagline: '2P · Fastest finger wins',

  render(root) {
    let state = 'wait', startTime, timeoutId, p1time = null, p2time = null;

    root.innerHTML = `
      <div class="app-shell" style="background:#111;align-items:center;justify-content:center;text-align:center;padding:0">
        <div id="arena" style="width:100%;min-height:100dvh;display:flex;flex-direction:column">
          <div style="padding:1rem">
            <h1 class="app-title" style="font-size:1.4rem">REACTION NINJA</h1>
            <p class="app-tag">Wait for GREEN. Both players tap. Fastest wins.</p>
          </div>
          <button id="zone" style="flex:1;border:none;font-family:Bangers,cursive;font-size:2rem;cursor:pointer;touch-action:manipulation;background:#ff4444;color:#fff;transition:background 0.1s">
            WAIT...<br><span style="font-size:1rem;opacity:0.8">Don't tap yet!</span>
          </button>
          <div id="result" style="padding:1.5rem;font-family:Bangers,cursive;font-size:1.2rem;color:#b8ff00;min-height:4rem;background:#000"></div>
        </div>
      </div>`;

    const zone = root.querySelector('#zone');
    const result = root.querySelector('#result');

    function startRound() {
      clearTimeout(timeoutId);
      state = 'wait';
      p1time = p2time = null;
      zone.style.background = '#ff4444';
      zone.style.color = '#fff';
      zone.innerHTML = 'WAIT...<br><span style="font-size:1rem;opacity:0.8">Don\'t tap yet!</span>';
      result.textContent = '';
      timeoutId = setTimeout(() => {
        state = 'go';
        startTime = Date.now();
        zone.style.background = '#00ff00';
        zone.style.color = '#000';
        zone.innerHTML = 'TAP NOW!!!<br><span style="font-size:1rem">BOTH PLAYERS!</span>';
        vibrate(100);
      }, randInt(2000, 6000));
    }

    zone.addEventListener('click', () => {
      if (state === 'wait') {
        clearTimeout(timeoutId);
        state = 'fail';
        zone.style.background = '#333';
        zone.style.color = '#fff';
        zone.innerHTML = 'TOO EARLY!<br><span style="font-size:1rem">Patience, ninja.</span>';
        result.textContent = '😂 False start! Tap again to retry.';
        vibrate([200, 100, 200]);
        return;
      }
      if (state === 'fail') {
        startRound();
        return;
      }
      if (state === 'go') {
        const time = Date.now() - startTime;
        if (p1time === null) {
          p1time = time;
          result.textContent = `P1: ${time}ms — P2 TAP NOW!`;
          vibrate(30);
        } else if (p2time === null) {
          p2time = time;
          state = 'done';
          zone.style.background = '#7b2ff7';
          zone.style.color = '#fff';
          zone.innerHTML = 'ROUND OVER';
          const winner = p1time < p2time ? 'P1' : p2time < p1time ? 'P2' : 'TIE';
          result.innerHTML = `P1: ${p1time}ms | P2: ${p2time}ms<br><br>${winner === 'TIE' ? '🤝 TIE — equally slow' : '🏆 ' + winner + ' WINS!'}`;
          vibrate([50, 50, 100]);
          setTimeout(startRound, 3000);
        }
      }
    });

    startRound();
    return () => clearTimeout(timeoutId);
  },
};
