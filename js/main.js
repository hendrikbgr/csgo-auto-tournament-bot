document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const modal = document.getElementById('modal');
  const reel = document.getElementById('reel');
  const closeBtn = document.getElementById('close-modal');

  const openers = [
    ...document.querySelectorAll('[data-open-reel]'),
    document.getElementById('hero-reel'),
  ].filter(Boolean);

  function openModal() {
    modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    reel?.play().catch(() => {});
  }

  function closeModal() {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
    if (reel) {
      reel.pause();
      reel.currentTime = 0;
    }
  }

  openers.forEach((el) => {
    el.addEventListener('click', openModal);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
});
