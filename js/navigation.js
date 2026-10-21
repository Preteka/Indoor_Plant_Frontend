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

  // 3. Profile Icon Dropdown – always-visible (not auth-gated)
  //    Shows: Login, Signup, User Dashboard, Admin Dashboard
  function initProfileIconDropdown() {
    document.querySelectorAll('.profile-icon-btn').forEach(btn => {
      // Avoid binding twice
      if (btn.dataset.navBound) return;
      btn.dataset.navBound = 'true';

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wrapper = btn.closest('.profile-dropdown-wrapper');
        if (!wrapper) return;
        const isOpen = wrapper.classList.contains('open');
        closeAllProfileDropdowns();
        if (!isOpen) {
          wrapper.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // User Dashboard link: provision demo session if not authenticated
    document.querySelectorAll('.nav-user-dashboard-link').forEach(link => {
      if (link.dataset.navBound) return;
      link.dataset.navBound = 'true';

      link.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllProfileDropdowns();
        const hasSession = sessionStorage.getItem('gs_current_user');
        if (!hasSession && window.GreenSpaceAuth && typeof window.GreenSpaceAuth.initDemoUser === 'function') {
          window.GreenSpaceAuth.initDemoUser();
        }
        window.location.href = link.getAttribute('href');
      });
    });

    // Close dropdown items (other links) after selection
    document.querySelectorAll('.profile-dropdown-wrapper .profile-dropdown-item').forEach(item => {
      if (item.classList.contains('nav-user-dashboard-link')) return; // handled above
      if (item.dataset.navBound) return;
      item.dataset.navBound = 'true';
      item.addEventListener('click', () => {
        closeAllProfileDropdowns();
      });
    });
  }

  // 4. Dynamic Navbar Profile Dropdown (Logged In vs Logged Out State)
  //    This handles the case where auth.js creates a full profile dropdown
  function initNavbarAuth() {
    let currentUser = window.GreenSpaceAuth?.getCurrentUser();
    if (!currentUser && currentPath === 'profile.html') {
      currentUser = window.GreenSpaceAuth?.login('customer@email.com', 'demo');
    }

    if (currentUser) {
      const profDropName = document.getElementById('profDropName');
      const profDropEmail = document.getElementById('profDropEmail');
      const profDropCompany = document.getElementById('profDropCompany');
      if (profDropName) profDropName.textContent = currentUser.name;
      if (profDropEmail) profDropEmail.textContent = currentUser.email;
      if (profDropCompany) profDropCompany.textContent = currentUser.company || 'ABC Technologies';

      // Update mobile drawer login link when logged in
      const mobileLoginLinks = document.querySelectorAll('.mobile-nav-link[href="login.html"]');
      mobileLoginLinks.forEach(link => {
        link.href = "user-dashboard/index.html";
        link.innerHTML = `
          <div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold mr-2 flex-shrink-0">
            ${currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span>User Dashboard (${currentUser.name})</span>
        `;
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
      const btn = w.querySelector('.profile-icon-btn, .profile-dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Click outside to close dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-dropdown-wrapper')) {
      closeAllProfileDropdowns();
    }
  });

  // 5. Fixed Navbar Scroll Compact & Glassmorphic Effect
  const fixedHeader = document.getElementById('siteHeader') || document.querySelector('.site-header-fixed, .profile-main-nav, .hero-pill-nav');
  if (fixedHeader) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 20) {
        fixedHeader.classList.add('is-scrolled');
      } else {
        fixedHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  initProfileIconDropdown();
  initNavbarAuth();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
