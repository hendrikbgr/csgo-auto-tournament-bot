export function vibrate(pattern = 30) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

export function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function confetti(x, y, count = 14) {
  const colors = ['#ff2d95', '#b8ff00', '#00f0ff', '#ffe135', '#7b2ff7', '#ff6b35'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;left:${x + (Math.random() - 0.5) * 80}px;top:${y}px;
      width:${randInt(6, 12)}px;height:${randInt(6, 12)}px;
      background:${rand(colors)};border-radius:${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events:none;z-index:99999;
      animation:confettiFall ${0.8 + Math.random() * 0.8}s ease-out forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
  if (!document.getElementById('confetti-style')) {
    const s = document.createElement('style');
    s.id = 'confetti-style';
    s.textContent = '@keyframes confettiFall{to{opacity:0;transform:translateY(100vh) rotate(720deg)}}';
    document.head.appendChild(s);
  }
}

export function pickUnique(arr, last, count = 1) {
  const pool = arr.filter(x => x !== last);
  const shuffled = shuffle([...(pool.length ? pool : arr)]);
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function countdown(root, seconds, onTick, onDone) {
  let left = seconds;
  onTick(left);
  const id = setInterval(() => {
    left--;
    if (left <= 0) {
      clearInterval(id);
      onDone();
    } else {
      onTick(left);
    }
  }, 1000);
  return () => clearInterval(id);
}
