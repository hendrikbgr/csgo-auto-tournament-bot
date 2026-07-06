document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const reel = document.getElementById('reel');
  const openBtn = document.getElementById('open-reel');
  const closeBtn = document.getElementById('close-modal');

  function open() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    reel.play().catch(() => {});
  }

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    reel.pause();
    reel.currentTime = 0;
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  modal?.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
});
