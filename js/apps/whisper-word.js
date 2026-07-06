import { rand, vibrate } from '../utils.js';

const words = [
  'MOIST', 'PLATYPUS', 'WIGGLE', 'NACHO', 'DISCOMBOBULATED',
  'FLOOF', 'BUNGUS', 'SQUEEGEE', 'PENGÜIN', 'WOMBATTACK',
  'BLORGFEST', 'SNEEZECORE', 'ELBOWFEST', 'QUACKATHON', 'SPAGHETTI',
  'BANANAPHONE', 'SHIMMY', 'GOOSEBUMPS', 'POTATOCE', 'FLUMMOX',
];

export default {
  id: 'whisper-word',
  name: 'Whisper Word',
  emoji: '🤫',
  tagline: 'IRL · Pass-the-phone classic',

  render(root) {
    let phase = 'intro';

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(#1a1a3e,#0a0a1a);align-items:center;text-align:center">
        <h1 class="app-title">WHISPER WORD</h1>
        <p class="app-tag">IRL party game · Pass the phone</p>
        <div id="phase" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:360px">
          <p style="font-size:1rem;line-height:1.5;margin-bottom:1.5rem">Player 1 reads the secret word, whispers it to Player 2. Player 2 must act it out WITHOUT speaking. Everyone else guesses.</p>
          <button class="btn-big" id="go" style="background:#7b2ff7;color:#fff">I AM PLAYER 1 👀</button>
        </div>
      </div>`;

    const phase = root.querySelector('#phase');

    root.querySelector('#go').addEventListener('click', () => {
      vibrate(30);
      phase.innerHTML = `
        <p style="font-size:0.85rem;opacity:0.7;margin-bottom:1rem">👀 ONLY PLAYER 1 LOOK 👀</p>
        <div class="card pop" style="font-family:Bangers,cursive;font-size:2.5rem;color:#b8ff00;padding:2rem;margin-bottom:1.5rem;word-break:break-word">${rand(words)}</div>
        <p style="font-size:0.9rem;margin-bottom:1rem">Whisper it to Player 2. Then pass the phone.</p>
        <button class="btn-big" id="pass" style="background:#ff2d95;color:#000">OK, PASS PHONE 📱</button>`;

      phase.querySelector('#pass').addEventListener('click', () => {
        vibrate(30);
        phase.innerHTML = `
          <p style="font-size:3rem;margin-bottom:1rem">🎭</p>
          <p style="font-family:Bangers,cursive;font-size:1.5rem;color:#00f0ff;margin-bottom:1rem">PLAYER 2: ACT IT OUT!</p>
          <p style="font-size:0.9rem;opacity:0.8;margin-bottom:1.5rem">No talking. Only vibes. Maximum chaos.</p>
          <button class="btn-big" id="again" style="background:#ffe135;color:#000">NEW WORD</button>`;
        phase.querySelector('#again').addEventListener('click', () => location.reload());
      });
    });
  },
};
