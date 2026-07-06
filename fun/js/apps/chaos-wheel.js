import { rand, vibrate } from '../utils.js';

const tasks = [
  '🦆 Quack like a duck at a stranger (or a plant)',
  '🕺 Do your worst dance for 10 seconds RIGHT NOW',
  '📢 Shout "I AM THE MAIN CHARACTER" dramatically',
  '🤳 Take a selfie with the weirdest object nearby',
  '🫡 Salute the nearest wall with full sincerity',
  '🗣️ Speak in a British accent until someone notices',
  '🐸 Crouch like a frog for 5 seconds in public',
  '👏 Applaud yourself aggressively for 8 seconds',
  '🧊 Hold an ice cube… or pretend. Commit to the bit.',
  '🎤 Lip-sync to a song only you can hear',
  '🦶 Show someone your "signature walk"',
  '🥔 Declare your undying loyalty to a potato',
  '👀 Maintain eye contact with someone for 5 sec (IRL stare off!)',
  '🙃 Say "interesting choice" to literally anything',
  '🏃 Run in place like you\'re late for nonsense',
];

export default {
  id: 'chaos-wheel',
  name: 'Chaos Wheel',
  emoji: '🎡',
  tagline: 'IRL · Spin. Suffer. Smile.',

  render(root) {
    root.innerHTML = `
      <div class="app-shell" style="background:conic-gradient(from 0deg,#ff2d95,#b8ff00,#00f0ff,#7b2ff7,#ff2d95);align-items:center;justify-content:center">
        <h1 class="app-title" style="color:#000;text-shadow:2px 2px 0 #fff">CHAOS WHEEL</h1>
        <p class="app-tag" style="color:#000">Spin it. Do the thing. No take-backs.</p>
        <div id="wheel" style="width:min(280px,75vw);height:min(280px,75vw);border-radius:50%;border:8px solid #000;background:conic-gradient(#ff2d95 0 20%,#ffe135 20% 40%,#b8ff00 40% 60%,#00f0ff 60% 80%,#7b2ff7 80% 100%);display:flex;align-items:center;justify-content:center;font-size:4rem;margin:1rem 0;transition:transform 3s cubic-bezier(0.2,0.8,0.2,1)">🎡</div>
        <button class="btn-big" id="spin" style="background:#000;color:#b8ff00;margin-bottom:1rem">SPIN FOR CHAOS</button>
        <div class="card" id="task" style="width:100%;max-width:360px;text-align:center;font-size:1.05rem;min-height:100px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5)">
          Press spin. Accept your fate.
        </div>
      </div>`;

    const wheel = root.querySelector('#wheel');
    const spin = root.querySelector('#spin');
    const task = root.querySelector('#task');
    let spinning = false, rotation = 0;

    spin.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      spin.disabled = true;
      task.textContent = 'The wheel is deciding your destiny...';
      rotation += 1440 + Math.random() * 720;
      wheel.style.transform = `rotate(${rotation}deg)`;
      vibrate([50, 30, 50, 30, 50]);
      setTimeout(() => {
        task.innerHTML = `<strong>YOUR FATE:</strong><br><br>${rand(tasks)}`;
        task.classList.add('pop');
        spinning = false;
        spin.disabled = false;
        spin.textContent = 'SPIN AGAIN (coward)';
      }, 3000);
    });
  },
};
