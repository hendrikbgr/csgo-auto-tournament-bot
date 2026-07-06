document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const showreelTrigger = document.getElementById('showreel-trigger');
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalClose = document.querySelector('.modal-close');
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  // Nav scroll state
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Showreel modal
  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalVideo.play().catch(() => {});
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  showreelTrigger?.addEventListener('click', openModal);
  showreelTrigger?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
  });
  document.querySelectorAll('[data-open-reel]').forEach(el => el.addEventListener('click', openModal));
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => observer.observe(el));

  // Contact form
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.add('show');
    form.querySelector('.form-fields')?.setAttribute('aria-hidden', 'true');
    form.reset();
  });

  // Smooth stat counter on hero (optional subtle animation)
  const statNums = document.querySelectorAll('[data-count]');
  statNums.forEach(el => {
    const target = el.dataset.count;
    if (!target || target.includes('M') || target.includes('B') || target.includes('+')) return;
    const num = parseInt(target, 10);
    if (isNaN(num)) return;
    let current = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= num) { current = num; clearInterval(timer); }
      el.textContent = current + (el.dataset.suffix || '');
    }, 30);
  });
});
