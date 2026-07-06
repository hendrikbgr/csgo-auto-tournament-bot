import { rand, randInt, vibrate } from '../utils.js';

const statuses = [
  'Downloading more RAM...',
  'Calibrating elbow sensors...',
  'Negotiating with geese...',
  'Reticulating splines (whatever that means)...',
  'Teaching potatoes to dance...',
  'Convincing button to not be pressed...',
  'Loading charisma.dll...',
  'Bribing the loading bar...',
  'Almost done (lying)...',
  'Consulting the vibes council...',
  'Compressing awkward moments...',
  'Installing personality update 2.0...',
  'Waiting for the loading bar to load...',
  'Synchronizing nostril data...',
  'Optimizing fun levels...',
];

export default {
  id: 'loading-hell',
  name: 'Loading Forever',
  emoji: '⏳',
  tagline: '1P · It will never finish',

  render(root) {
    let progress = 0, intervalId;

    root.innerHTML = `
      <div class="app-shell" style="background:#000;font-family:monospace;align-items:center;justify-content:center;text-align:center">
        <h1 class="app-title" style="color:#00ff00;font-family:monospace;font-size:1.5rem">LOADING...</h1>
        <div style="width:100%;max-width:320px;height:30px;border:2px solid #00ff00;background:#111;margin:2rem 0;overflow:hidden">
          <div id="bar" style="height:100%;width:0;background:#00ff00;transition:width 0.5s"></div>
        </div>
        <div id="pct" style="color:#00ff00;font-size:2rem;margin-bottom:1rem">0%</div>
        <div id="status" style="color:#00ff00;font-size:0.8rem;min-height:3rem;line-height:1.5">> Initializing...</div>
        <button class="btn-big" id="cancel" style="background:#ff0000;color:#fff;font-family:monospace;border-radius:0;margin-top:2rem;font-size:1rem">CANCEL</button>
        <p id="joke" style="margin-top:1rem;font-size:0.75rem;color:#ff2d95;min-height:2rem"></p>
      </div>`;

    const bar = root.querySelector('#bar');
    const pct = root.querySelector('#pct');
    const status = root.querySelector('#status');
    const joke = root.querySelector('#joke');

    intervalId = setInterval(() => {
      progress += randInt(1, 4);
      if (progress > 99) progress = 99;
      bar.style.width = progress + '%';
      pct.textContent = progress + '%';
      status.textContent = '> ' + rand(statuses);
      if (Math.random() > 0.7) vibrate(10);
    }, 800);

    root.querySelector('#cancel').addEventListener('click', () => {
      clearInterval(intervalId);
      joke.textContent = 'Cancel failed. Loading is eternal. Welcome to hell. 😂';
      vibrate([100, 50, 100, 50, 100]);
      root.querySelector('#cancel').textContent = 'STILL CANCELING...';
      root.querySelector('#cancel').disabled = true;
    });

    return () => clearInterval(intervalId);
  },
};
