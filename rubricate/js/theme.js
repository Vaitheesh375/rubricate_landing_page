/* Rubricate — theme.js */
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'rubricate-theme';

  // Apply saved theme immediately (also set by inline script in <head>)
  const saved = localStorage.getItem(STORAGE_KEY) || 'light';
  root.setAttribute('data-theme', saved);

  function bindThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle || toggle.dataset.bound === 'true') return;

    toggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
    });

    toggle.dataset.bound = 'true';
  }

  document.addEventListener('DOMContentLoaded', bindThemeToggle);
  document.addEventListener('layout:loaded', bindThemeToggle);
})();
