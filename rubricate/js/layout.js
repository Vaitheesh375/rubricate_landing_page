/* Rubricate — shared header/footer loader */
(function () {
  async function loadInto(targetId, filePath) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const response = await fetch(filePath, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Failed to load ' + filePath);
    target.innerHTML = await response.text();
  }

  function updateHeaderLinks() {
    const headerRoot = document.getElementById('site-header');
    if (!headerRoot) return;

    const page = location.pathname.split('/').pop() || 'index.html';
    const navLinks = headerRoot.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === page) link.classList.add('active');
      else link.classList.remove('active');
    });

    // Legal pages can opt into app links using body[data-header-cta="app"].
    if (document.body.getAttribute('data-header-cta') === 'app') {
      const applyLink = headerRoot.querySelector('[data-role="apply-link"]');
      const hireLink = headerRoot.querySelector('[data-role="hire-link"]');
      if (applyLink) applyLink.setAttribute('href', 'https://app.rubricate.net/talent/sign_in');
      if (hireLink) hireLink.setAttribute('href', 'https://app.rubricate.net/company/sign_in');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
      loadInto('site-header', 'header.html'),
      loadInto('site-footer', 'footer.html')
    ]).then(function () {
      updateHeaderLinks();
      document.dispatchEvent(new CustomEvent('layout:loaded'));
    }).catch(function (err) {
      console.error(err);
    });
  });
})();
