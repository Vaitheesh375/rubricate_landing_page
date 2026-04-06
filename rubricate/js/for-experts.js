/* Rubricate — for-experts.js */
const reveals = document.querySelectorAll('.reveal');
  // Immediately reveal elements already in viewport
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
  reveals.forEach(el => { if (!el.classList.contains('visible')) observer.observe(el); });

  // Fallback: after 400ms, reveal anything still hidden
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 400);