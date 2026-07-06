import { rand, vibrate } from '../utils.js';

const pairs = [
  ['Only speak in rhymes forever', 'Only walk backwards in public'],
  ['Have elbows that glow in the dark', 'Have a theme song play when you enter rooms'],
  ['Fight a goose in a tuxedo', 'Debate a potato on live TV'],
  ['Sneeze glitter', 'Cough confetti'],
  ['Your laugh echoes for 5 seconds', 'Your blinks make a shutter sound'],
  ['Always smell like fries', 'Always smell like fresh laundry (suspiciously)'],
  ['Hands replaced with spatulas', 'Feet replaced with roller skates (permanent)'],
  ['Every meal is soup', 'Every drink is chunky'],
  ['A duck follows you everywhere', 'A narrator describes your life out loud'],
  ['Teleport but only 3 feet', 'Fly but only 1 inch off the ground'],
  ['Be famous for something embarrassing', 'Be unknown but incredibly cool'],
  ['Swap voices with your friend', 'Swap dance moves with a random stranger'],
];

export default {
  id: 'would-you-rather',
  name: 'Would You Rather',
  emoji: '🤯',
  tagline: 'IRL · Debate until someone snaps',

  render(root) {
    let current = rand(pairs);

    root.innerHTML = `
      <div class="app-shell" style="background:linear-gradient(135deg,#667eea,#764ba2);align-items:center">
        <h1 class="app-title">WOULD YOU RATHER</h1>
        <p class="app-tag">Unhinged edition · Pick a side. Defend it. Chaos.</p>
        <button id="a" class="card" style="width:100%;max-width:360px;padding:1.5rem;margin-bottom:0.75rem;cursor:pointer;border-color:#b8ff00;font-size:1rem;line-height:1.4;text-align:center;background:rgba(0,0,0,0.3)"></button>
        <p style="font-family:Bangers,cursive;font-size:1.2rem;margin:0.5rem 0;color:#ffe135">— OR —</p>
        <button id="b" class="card" style="width:100%;max-width:360px;padding:1.5rem;margin-bottom:1rem;cursor:pointer;border-color:#ff2d95;font-size:1rem;line-height:1.4;text-align:center;background:rgba(0,0,0,0.3)"></button>
        <div id="picked" style="font-family:Bangers,cursive;font-size:1.1rem;text-align:center;min-height:2.5rem;margin-bottom:1rem"></div>
        <button class="btn-big" id="next" style="background:#ffe135;color:#000">NEXT NIGHTMARE</button>
      </div>`;

    const a = root.querySelector('#a');
    const b = root.querySelector('#b');
    const picked = root.querySelector('#picked');

    function show() {
      current = rand(pairs);
      a.textContent = '🅰️ ' + current[0];
      b.textContent = '🅱️ ' + current[1];
      picked.textContent = '';
    }

    [a, b].forEach((btn, i) => {
      btn.addEventListener('click', () => {
        vibrate(30);
        picked.innerHTML = `You chose: <span style="color:#b8ff00">${current[i]}</span><br><span style="font-size:0.8rem;opacity:0.8">Now argue with someone who picked the other one.</span>`;
        btn.classList.add('pop');
      });
    });

    root.querySelector('#next').addEventListener('click', () => { show(); vibrate(15); });
    show();
  },
};
