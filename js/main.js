document.addEventListener('DOMContentLoaded', () => {
  const showreelTriggers = [
    document.getElementById('showreel-trigger'),
    document.getElementById('showreel-card'),
    ...document.querySelectorAll('[data-open-reel]'),
  ].filter(Boolean);

  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalClose = document.querySelector('.modal-close');
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  function openModal() {
    modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalVideo?.play().catch(() => {});
  }

  function closeModal() {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  }

  showreelTriggers.forEach((el) => {
    el.addEventListener('click', openModal);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

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
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess?.classList.add('show');
    form.reset();
  });
});
