import { vibrate } from '../utils.js';

export default {
  id: 'fake-call',
  name: 'Fake Mom Call',
  emoji: '📞',
  tagline: 'IRL · Instant party escape',

  render(root) {
    let ringing = false, intervalId;

    root.innerHTML = `
      <div class="app-shell" style="background:#111;align-items:center;justify-content:center;text-align:center;padding:0">
        <div id="screen" style="width:100%;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem">
          <p style="font-size:0.9rem;opacity:0.7;margin-bottom:2rem">Need to escape a conversation? We've got you.</p>
          <button class="btn-big" id="trigger" style="background:#25d366;color:#fff;font-size:1.3rem">📞 INCOMING CALL PRANK</button>
        </div>
      </div>`;

    root.querySelector('#trigger').addEventListener('click', () => {
      ringing = true;
      vibrate([500, 200, 500, 200, 500]);
      root.querySelector('#screen').innerHTML = `
        <div style="width:100%;min-height:100dvh;background:linear-gradient(#1a3a1a,#0a1a0a);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;animation:ring 0.5s infinite">
          <style>@keyframes ring{50%{background:linear-gradient(#2a5a2a,#1a2a1a)}}</style>
          <div style="width:120px;height:120px;border-radius:50%;background:#666;display:flex;align-items:center;justify-content:center;font-size:4rem;margin-bottom:1rem">👩</div>
          <p style="font-size:0.85rem;opacity:0.7">Incoming call...</p>
          <p style="font-family:Bangers,cursive;font-size:2rem;margin:0.5rem 0">MOM</p>
          <p style="font-size:0.8rem;opacity:0.6;margin-bottom:3rem">Mobile · Probably important</p>
          <div style="display:flex;gap:3rem">
            <button id="decline" style="width:70px;height:70px;border-radius:50%;border:none;background:#ff4444;color:#fff;font-size:1.5rem;cursor:pointer">✕</button>
            <button id="answer" style="width:70px;height:70px;border-radius:50%;border:none;background:#25d366;color:#fff;font-size:1.5rem;cursor:pointer;animation:pulse 0.8s infinite">📞</button>
          </div>
          <style>@keyframes pulse{50%{transform:scale(1.1)}}</style>
        </div>`;

      intervalId = setInterval(() => vibrate([300, 100, 300]), 2000);

      root.querySelector('#decline').addEventListener('click', () => {
        clearInterval(intervalId);
        root.querySelector('#screen').innerHTML = '<p style="font-size:1.2rem;padding:2rem">Call declined. You missed Mom\'s recipe for chaos soup. 😂</p>';
      });

      root.querySelector('#answer').addEventListener('click', () => {
        clearInterval(intervalId);
        vibrate(30);
        root.querySelector('#screen').innerHTML = `
          <div style="padding:2rem;text-align:center">
            <p style="font-size:4rem;margin-bottom:1rem">👩</p>
            <p style="font-family:Bangers,cursive;font-size:1.5rem;color:#25d366;margin-bottom:1rem">MOM</p>
            <p style="font-size:1.1rem;line-height:1.6;font-style:italic">"Hi sweetie! Just calling to say you're doing great and also <strong>come home, dinner is ready</strong>."</p>
            <p style="margin-top:2rem;font-size:0.85rem;opacity:0.6">(Say "thanks Mom" out loud for full effect)</p>
            <button class="btn-big" id="hangup" style="background:#ff4444;color:#fff;margin-top:2rem">HANG UP</button>
          </div>`;
        root.querySelector('#hangup').addEventListener('click', () => location.reload());
      });
    });

    return () => clearInterval(intervalId);
  },
};
