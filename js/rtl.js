/**
 * GreenSpace Rentals - RTL / LTR Direction Manager
 * Persists direction preference via localStorage and updates layouts
 */

(function () {
  const DIR_KEY = 'greenspace_dir';

  function applyDirection(dir) {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('dir', dir);
    
    // Update RTL text labels across buttons
    const rtlTexts = document.querySelectorAll('.rtl-toggle-text');
    rtlTexts.forEach(txt => {
      txt.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });

    // Update icons if any
    const rtlIcons = document.querySelectorAll('.rtl-toggle-icon');
    rtlIcons.forEach(icon => {
      if (dir === 'rtl') {
        icon.setAttribute('data-lucide', 'align-left');
      } else {
        icon.setAttribute('data-lucide', 'align-right');
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Determine initial direction
  const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
  applyDirection(savedDir);

  window.toggleDirection = function () {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem(DIR_KEY, nextDir);
    applyDirection(nextDir);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.rtl-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleDirection();
      });
    });
    applyDirection(document.documentElement.getAttribute('dir') || 'ltr');
  });
})();
