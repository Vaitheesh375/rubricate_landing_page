/* Rubricate — theme.js */
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'rubricate-theme';

  // Apply saved theme immediately (also set by inline script in <head>)
  const saved = localStorage.getItem(STORAGE_KEY) || 'light';
  root.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  });
})();
