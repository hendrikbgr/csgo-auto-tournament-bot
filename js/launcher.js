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

devTrigger.addEventListener('click', () => {
  devTaps++;
  clearTimeout(devTapTimer);
  devTapTimer = setTimeout(() => { devTaps = 0; }, 2000);
  if (devTaps >= 5) {
    devTaps = 0;
    openDevMenu();
  }
});

devMenu.addEventListener('click', (e) => {
  if (e.target === devMenu) closeDevMenu();
});

launchRandom();
