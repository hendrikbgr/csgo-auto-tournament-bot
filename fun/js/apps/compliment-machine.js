export default {
  id: 'compliment-machine',
  name: 'Compliment Machine',
  emoji: '💅',
  tagline: '1P · FDA unapproved praise',

  render(root) {
    const compliments = [
      'Your elbows radiate <strong>quiet confidence</strong>. Other elbows are jealous.',
      'Scientists agree: you blink with the grace of a <strong>seasoned professional</strong>.',
      'If awkwardness were a sport, you\'d still win because your <strong>vibes are Olympic</strong>.',
      'Somewhere, a goose looked at you and thought: <strong>"respect."</strong>',
      'Your left nostril has <strong>main character energy</strong>. We don\'t make the rules.',
      'Statistically, you are <strong>cooler than 97% of potatoes</strong>. That\'s math.',
      'You\'re the human equivalent of finding an <strong>extra fry</strong> at the bottom of the bag.',
      'Your knees? <strong>Underrated legends.</strong> Holding you up since day one.',
      'You walk like someone who <strong>has a secret</strong> but it\'s just that you like snacks.',
      'Your finger strength is <strong>absolutely elite</strong> for pressing buttons.',
    ];
    let last = -1, clicks = 0;

    root.innerHTML = `
      <div class="app-shell" style="background:radial-gradient(circle at 30% 70%,#ff2d95,transparent 50%),radial-gradient(circle at 70% 30%,#00f0ff,transparent 45%),#1a0a2e">
        <div style="background:#b8ff00;color:#000;text-align:center;padding:0.4rem;font-family:Bangers,cursive;font-size:0.85rem;margin:-1rem -1rem 1rem;animation:wiggle 0.3s infinite alternate">🎉 LEGALLY REQUIRED TO SMILE 🎉</div>
        <style>@keyframes wiggle{to{transform:rotate(1deg)}}</style>
        <h1 class="app-title" style="text-shadow:3px 3px 0 #ff2d95">Compliment Machine™</h1>
        <p class="app-tag">✅ FDA UNAPPROVED ✅</p>
        <div class="card" id="box" style="min-height:120px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:1.1rem;flex:1;margin-bottom:1rem;border-color:#b8ff00">
          Tap the button. Receive devastating praise.
        </div>
        <button class="btn-big" id="btn" style="background:#ffe135;color:#000;width:100%;max-width:320px;margin:0 auto">GIMME PRAISE 🙏</button>
        <p style="text-align:center;font-size:0.7rem;opacity:0.6;margin-top:0.5rem">Scientifically accurate: <span id="sci">0%</span></p>
      </div>`;

    const box = root.querySelector('#box');
    const btn = root.querySelector('#btn');
    const sci = root.querySelector('#sci');

    btn.addEventListener('click', () => {
      clicks++;
      let idx;
      do { idx = Math.floor(Math.random() * compliments.length); } while (idx === last && compliments.length > 1);
      last = idx;
      box.classList.remove('pop');
      void box.offsetWidth;
      box.classList.add('pop');
      box.innerHTML = compliments[idx];
      sci.textContent = Math.floor(Math.random() * 4) + '%';
      if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
      const texts = ['GIMME PRAISE 🙏', 'MORE!!! 😤', 'AGAIN!!! 🔥', 'FEED ME 🫡'];
      btn.textContent = texts[Math.min(clicks, texts.length - 1)];
    });
  },
};
