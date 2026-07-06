import { rand, randInt, vibrate } from '../utils.js';

const accusations = [
  'was seen doing the macarena in the parking lot',
  'put pineapple on someone ELSE\'S pizza',
  'talked to a plant for 20 minutes',
  'pretended to understand the conversation',
  'Googled "how to be cool" mid-party',
  'laughed at a joke they didn\'t understand',
  'has been the impostor this ENTIRE TIME',
  'secretly loves country music',
  'ate someone else\'s snack and blamed a ghost',
  'practiced their party smile in the bathroom mirror',
  'has never watched the movie everyone\'s talking about',
  'faked a phone call (not using this app — savage)',
];

export default {
  id: 'emergency-meeting',
  name: 'Emergency Meeting',
  emoji: '🚨',
  tagline: 'IRL · Among Us energy',

  render(root) {
    root.innerHTML = `
      <div class="app-shell" style="background:#1a1a2e;align-items:center;text-align:center;padding:0">
        <div style="background:#ff0000;padding:1rem;width:100%;animation:flash 0.5s infinite">
          <style>@keyframes flash{50%{background:#880000}}</style>
          <p style="font-family:Bangers,cursive;font-size:1.5rem;color:#fff">🚨 EMERGENCY MEETING 🚨</p>
        </div>
        <div style="padding:1.5rem;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <p style="font-size:0.85rem;opacity:0.7;margin-bottom:1rem">Someone is sus. Point at them. NOW.</p>
          <div id="accuse" class="card" style="width:100%;max-width:360px;padding:1.5rem;font-family:Bangers,cursive;font-size:1.2rem;line-height:1.5;color:#ff4444;min-height:120px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;border-color:#ff0000">
            Tap to reveal the accusation
          </div>
          <button class="btn-big" id="btn" style="background:#ff4444;color:#fff">WHO IS SUS? 👉</button>
          <p id="vote" style="margin-top:1.5rem;font-size:0.9rem;min-height:2rem;color:#b8ff00"></p>
        </div>
      </div>`;

    const accuse = root.querySelector('#accuse');
    const vote = root.querySelector('#vote');

    root.querySelector('#btn').addEventListener('click', () => {
      vibrate([100, 50, 100, 50, 200]);
      accuse.innerHTML = `The group accuses<br><span style="color:#ffe135;font-size:1.5rem">PLAYER ${randInt(1, 8)}</span><br>of being sus because they<br><em>${rand(accusations)}</em>`;
      vote.textContent = 'Vote now: eject or forgive? (House rules apply)';
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 500);
    });
  },
};
