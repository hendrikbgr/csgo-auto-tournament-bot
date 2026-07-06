import { APPS, APP_MAP } from './apps/registry.js';
import { ShuffleBag } from './shuffle-bag.js';

const root = document.getElementById('app-root');
const devMenu = document.getElementById('dev-menu');
const devGrid = document.getElementById('dev-grid');
const devStats = document.getElementById('dev-stats');
const devClose = document.getElementById('dev-close');
const devTrigger = document.getElementById('dev-trigger');
const devReset = document.getElementById('dev-reset');

const bag = new ShuffleBag(APPS.map(a => a.id));
let cleanup = null;
let devTaps = 0;
let devTapTimer = null;

function launchApp(id) {
  const app = APP_MAP[id];
  if (!app) return;

  if (cleanup) {
    cleanup();
    cleanup = null;
  }

  root.innerHTML = '';
  document.title = `${app.emoji} ${app.name}`;
  const result = app.render(root);
  if (typeof result === 'function') cleanup = result;
}

function launchRandom() {
  const id = bag.next();
  launchApp(id);
}

function openDevMenu() {
  const stats = bag.getStats();
  devStats.innerHTML = `
    <strong>🛠 DEV MODE</strong><br>
    ${stats.total} apps total · ${stats.remaining} left in current cycle · ${stats.seen} shown this cycle<br>
    <span style="opacity:0.6">Tap any app to launch it directly</span>
  `;

  devGrid.innerHTML = '';
  APPS.forEach(app => {
    const btn = document.createElement('button');
    btn.className = 'dev-item';
    btn.innerHTML = `
      <span class="dev-item-emoji">${app.emoji}</span>
      <span class="dev-item-name">${app.name}</span>
      <span class="dev-item-tag">${app.tagline}</span>
    `;
    btn.addEventListener('click', () => {
      closeDevMenu();
      launchApp(app.id);
    });
    devGrid.appendChild(btn);
  });

  devMenu.hidden = false;
}

function closeDevMenu() {
  devMenu.hidden = true;
}

devClose.addEventListener('click', closeDevMenu);
devReset.addEventListener('click', () => {
  bag.reset();
  closeDevMenu();
  launchRandom();
});

function registerDevTrigger() {
  devTrigger.addEventListener('click', () => {
    devTaps++;
    clearTimeout(devTapTimer);
    devTapTimer = setTimeout(() => { devTaps = 0; }, 2500);
    if (devTaps >= 3) {
      devTaps = 0;
      openDevMenu();
    }
  });

  devTrigger.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    openDevMenu();
  });

  let holdTimer;
  devTrigger.addEventListener('touchstart', () => {
    holdTimer = setTimeout(openDevMenu, 800);
  }, { passive: true });
  devTrigger.addEventListener('touchend', () => clearTimeout(holdTimer));
}

devMenu.addEventListener('click', (e) => {
  if (e.target === devMenu) closeDevMenu();
});

function showBootError(message) {
  root.innerHTML = `
    <div class="app-shell" style="align-items:center;justify-content:center;text-align:center;gap:1rem">
      <p style="font-size:3rem">💥</p>
      <h1 class="app-title" style="color:#ff2d95">Oops, the chaos broke</h1>
      <p style="opacity:0.8;max-width:320px;line-height:1.5">${message}</p>
      <button class="btn-big" id="retry" style="background:#b8ff00;color:#000">TRY AGAIN</button>
      <button class="btn-big" id="dev-fallback" style="background:#7b2ff7;color:#fff">OPEN APP PICKER</button>
    </div>`;
  root.querySelector('#retry').addEventListener('click', () => location.reload());
  root.querySelector('#dev-fallback').addEventListener('click', openDevMenu);
}

try {
  registerDevTrigger();
  launchRandom();
} catch (err) {
  console.error(err);
  showBootError('Something exploded during launch. Tap below to recover.');
}
