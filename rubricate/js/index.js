/* Rubricate — index.js */
// Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
  reveals.forEach(el => { if (!el.classList.contains('visible')) observer.observe(el); });

  // Fallback: after 400ms, reveal anything still hidden
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 400);

  // FAQ accordion
  window.toggleFaq = function (questionEl) {
    const item = questionEl.closest('.faq-item');
    if (!item) return;

    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
    }
  };