/**
 * GreenSpace Rentals - Navigation, Mobile Drawer & Global Auth Profile Dropdown Manager
 * Manages Home 1 navbar states, dynamic "Login" vs "Profile" dropdown, mobile drawer, and active links.
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggleBtn = document.getElementById('mobileMenuToggle');
  const menuCloseBtn = document.getElementById('mobileMenuClose');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // 1. Mobile Menu Drawer
  function openMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add('active', 'is-open');
      mobileBackdrop.classList.add('active', 'is-open');
      document.body.style.overflow = 'hidden';
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove('active', 'is-open');
      mobileBackdrop.classList.remove('active', 'is-open');
      document.body.style.overflow = '';
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileMenu();
    });
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeAllProfileDropdowns();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  }, { passive: true });

  // 2. Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .hero-nav-link, .mobile-nav-link');
  
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      if (link.classList.contains('mobile-nav-link')) {
        link.classList.add('text-emerald-500', 'font-bold');
      }
    }
  });

  // 3. Dynamic Navbar Profile Dropdown (Logged In vs Logged Out State)
  function initNavbarAuth() {
    let currentUser = window.GreenSpaceAuth?.getCurrentUser();
    if (!currentUser && currentPath === 'profile.html') {
      // Auto-fallback demo user on profile page
      currentUser = window.GreenSpaceAuth?.login('customer@email.com', 'demo');
    }

    const loginLinks = document.querySelectorAll('a[href="login.html"]');

    if (currentUser) {
      // Update any pre-existing elements in profile.html
      const navAvatarInitial = document.getElementById('navAvatarInitial');
      const navUserName = document.getElementById('navUserName');
      if (navAvatarInitial) navAvatarInitial.textContent = currentUser.name.charAt(0).toUpperCase();
      if (navUserName) navUserName.textContent = currentUser.name;

      const profDropName = document.getElementById('profDropName');
      const profDropEmail = document.getElementById('profDropEmail');
      const profDropCompany = document.getElementById('profDropCompany');
      if (profDropName) profDropName.textContent = currentUser.name;
      if (profDropEmail) profDropEmail.textContent = currentUser.email;
      if (profDropCompany) profDropCompany.textContent = currentUser.company || 'ABC Technologies';

      // Find desktop login buttons to replace with Profile dropdown
      loginLinks.forEach(el => {
        // Only replace desktop/top nav login buttons, not inside mobile drawer or forms
        if (el.tagName === 'A' && el.classList.contains('hidden') && el.classList.contains('sm:inline-flex')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'profile-dropdown-wrapper relative z-50';
          wrapper.innerHTML = `
            <button type="button" class="profile-dropdown-btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#17352D] dark:bg-[#12382D] dark:text-emerald-200 border border-white/30 hover:bg-emerald-50 shadow-xl font-bold text-xs transition-all cursor-pointer focus:outline-none" aria-haspopup="true" aria-expanded="false">
              <div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold flex-shrink-0">
                ${currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span class="max-w-[100px] truncate font-semibold">${currentUser.name}</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform duration-200"></i>
            </button>

            <!-- Premium Home 1 Dropdown -->
            <div class="profile-dropdown-menu">
              <div class="p-3 mb-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)]">
                <div class="text-xs font-bold text-[var(--text-primary)]">${currentUser.name}</div>
                <div class="text-[11px] text-[var(--text-secondary)] truncate">${currentUser.email}</div>
                ${currentUser.company ? `<div class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">${currentUser.company}</div>` : ''}
              </div>

              <div class="space-y-0.5">
                <a href="profile.html?section=overview" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="layout-dashboard" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>Overview</span>
                  </span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 opacity-40"></i>
                </a>
                <a href="profile.html?section=requests" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="file-text" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>My Requests</span>
                  </span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">1</span>
                </a>
                <a href="profile.html?section=quotes" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="calculator" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>My Quotes</span>
                  </span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">1</span>
                </a>
                <a href="profile.html?section=bookings" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="calendar-check" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>My Bookings</span>
                  </span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 opacity-40"></i>
                </a>
                <a href="profile.html?section=maintenance" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="heart-pulse" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>Maintenance</span>
                  </span>
                  <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">28 Oct</span>
                </a>
                <a href="profile.html?section=plants" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="sprout" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>My Plants</span>
                  </span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">25</span>
                </a>
                <a href="profile.html?section=payments" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="receipt" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>Payments & Invoices</span>
                  </span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 opacity-40"></i>
                </a>
                <a href="profile.html?section=settings" class="profile-dropdown-item">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="settings" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    <span>Profile Settings</span>
                  </span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 opacity-40"></i>
                </a>
              </div>

              <div class="mt-2 pt-2 border-t border-[var(--border)]">
                <button type="button" class="global-logout-btn profile-dropdown-item w-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left cursor-pointer">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="log-out" class="w-4 h-4 text-rose-500"></i>
                    <span>Sign Out</span>
                  </span>
                </button>
              </div>
            </div>
          `;

          el.parentNode.replaceChild(wrapper, el);
        }
      });

      // Update mobile drawer login link
      const mobileLoginLinks = document.querySelectorAll('.mobile-nav-link[href="login.html"]');
      mobileLoginLinks.forEach(link => {
        link.href = "profile.html";
        link.innerHTML = `
          <div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold mr-2 flex-shrink-0">
            ${currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span>My GreenSpace (${currentUser.name})</span>
        `;
      });

      // Event listener for dropdown toggle
      document.querySelectorAll('.profile-dropdown-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const wrapper = btn.closest('.profile-dropdown-wrapper');
          const isOpen = wrapper.classList.contains('open');
          closeAllProfileDropdowns();
          if (!isOpen) {
            wrapper.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
          }
        };
      });

      // Global Logout
      document.querySelectorAll('.global-logout-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.preventDefault();
          window.GreenSpaceAuth?.logout();
          window.location.href = 'index.html';
        };
      });
    }
  }

  function closeAllProfileDropdowns() {
    document.querySelectorAll('.profile-dropdown-wrapper').forEach(w => {
      w.classList.remove('open');
      const btn = w.querySelector('.profile-dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Click outside to close dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-dropdown-wrapper')) {
      closeAllProfileDropdowns();
    }
  });

  // 4. Subtle Navbar Scroll Compact Effect
  const headerNav = document.querySelector('.profile-main-nav, .hero-pill-nav');
  if (headerNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 24) {
        headerNav.classList.add('is-scrolled');
      } else {
        headerNav.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  initNavbarAuth();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

