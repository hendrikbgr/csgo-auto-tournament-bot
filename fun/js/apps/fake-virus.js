import { randInt, vibrate } from '../utils.js';

const threats = [
  'Suspicious elbow.exe',
  'TooMuchCharisma.dll',
  'GooseProtocol.sys',
  'UnfinishedHomework.bug',
  'MainCharacterEnergy.vbs',
  'WeirdVibes.tmp',
  'MomCallingSoon.dat',
  'PotatoAdmirer.log',
];

export default {
  id: 'fake-virus',
  name: 'Fake Virus Scan',
  emoji: '🦠',
  tagline: '1P · Pure panic. Zero viruses.',

  render(root) {
    root.innerHTML = `
      <div class="app-shell" style="background:#000;font-family:monospace">
        <h1 class="app-title" style="color:#0f0;font-family:monospace">⚠ VIRUS DETECTED ⚠</h1>
        <p class="app-tag" style="color:#0f0">CRITICAL THREAT LEVEL: SILLY</p>
        <div style="border:2px solid #0f0;padding:1rem;margin-bottom:1rem;flex:1">
          <div id="scanline" style="color:#0f0;font-size:0.75rem;line-height:1.6;min-height:180px">> Initializing panic protocol...</div>
          <div style="background:#111;height:20px;border:1px solid #0f0;margin-top:1rem">
            <div id="bar" style="height:100%;width:0;background:#0f0;transition:width 0.3s"></div>
          </div>
          <div id="pct" style="color:#0f0;margin-top:0.5rem;text-align:right">0%</div>
        </div>
        <button class="btn-big" id="scan" style="background:#0f0;color:#000;font-family:monospace;border-radius:0;width:100%">EMERGENCY SCAN</button>
        <p id="punchline" style="color:#ff2d95;text-align:center;margin-top:1rem;font-size:0.85rem;min-height:2.5rem"></p>
      </div>`;

    const scanline = root.querySelector('#scanline');
    const bar = root.querySelector('#bar');
    const pct = root.querySelector('#pct');
    const scan = root.querySelector('#scan');
    const punchline = root.querySelector('#punchline');
    let scanning = false;

    scan.addEventListener('click', () => {
      if (scanning) return;
      scanning = true;
      scan.disabled = true;
      punchline.textContent = '';
      let progress = 0;
      const lines = [];
      const interval = setInterval(() => {
        progress += randInt(3, 12);
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';
        pct.textContent = progress + '%';
        if (Math.random() > 0.4) {
          lines.push('> DELETING ' + threats[randInt(0, threats.length - 1)] + '... FAILED (too powerful)');
          scanline.innerHTML = lines.slice(-8).join('<br>');
        }
        vibrate(10);
        if (progress >= 100) {
          clearInterval(interval);
          scanline.innerHTML += '<br><br>> SCAN COMPLETE<br>> RESULT: YOU ARE TOO AWESOME TO QUARANTINE';
          punchline.textContent = '😂 GOTCHA. Your phone is fine. Your humor is not.';
          document.body.classList.add('shake');
          setTimeout(() => document.body.classList.remove('shake'), 500);
          scanning = false;
          scan.disabled = false;
          scan.textContent = 'SCAN AGAIN (still fine)';
        }
      }, 400);
    });
  },
};
