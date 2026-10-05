/**
 * GreenSpace Rentals - Theme Manager (Dark / Light Mode)
 * Persists user preference via localStorage
 */

(function () {
  const THEME_KEY = 'greenspace_theme';

  function applyTheme(theme) {
    const htmlEl = document.documentElement;
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      htmlEl.setAttribute('data-theme', 'dark');
      document.body && document.body.setAttribute('data-theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      htmlEl.setAttribute('data-theme', 'light');
      document.body && document.body.setAttribute('data-theme', 'light');
    }
    
    // Update theme toggle button icons across the DOM
    const themeIcons = document.querySelectorAll('.theme-toggle-icon');
    themeIcons.forEach(icon => {
      if (theme === 'dark') {
        icon.setAttribute('data-lucide', 'sun');
      } else {
        icon.setAttribute('data-lucide', 'moon');
      }
    });

    const themeTexts = document.querySelectorAll('.theme-toggle-text');
    themeTexts.forEach(txt => {
      txt.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Determine initial theme
  const savedTheme = localStorage.getItem(THEME_KEY);
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
  
  applyTheme(initialTheme);

  // Global toggle function
  window.toggleTheme = function () {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    });
    applyTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });
})();
