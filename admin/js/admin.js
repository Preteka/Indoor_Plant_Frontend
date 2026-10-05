document.addEventListener('DOMContentLoaded', function () {
  const page = document.body.dataset.page || '';
  const root = document.documentElement;

  /* ==========================================================================
     Sidebar & Navigation Icons (Crisp Inline SVGs)
     ========================================================================== */
  function getNavIcon(label) {
    const icons = {
      Dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
      Requests: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      Bookings: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>',
      Maintenance: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
      Customers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      Blog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="14" y2="10"/></svg>',
      Payments: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="7" cy="15" r="1"/></svg>',
      Settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
      Logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'
    };
    return icons[label] || icons.Dashboard;
  }

  function setupNavIcons() {
    document.querySelectorAll('.admin-nav-item').forEach(function (item) {
      const label = item.querySelector('span')?.textContent?.trim() || item.textContent.trim();
      if (!item.dataset.iconReady) {
        const iconHtml = '<span class="nav-item-icon">' + getNavIcon(label) + '</span>';
        const labelMarkup = '<span class="nav-item-label">' + label + '</span>';
        item.innerHTML = iconHtml + labelMarkup;
        item.dataset.iconReady = 'true';
      }
    });
  }

  /* ==========================================================================
     Theme & RTL Toolbar Controls
     ========================================================================== */
  function updateToolbarButtons() {
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const icon = theme === 'dark'
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      button.innerHTML = '<span class="toolbar-icon">' + icon + '</span><span>' + (theme === 'dark' ? 'Light' : 'Dark') + '</span>';
    });

    document.querySelectorAll('.rtl-toggle').forEach(function (button) {
      const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="17 11 21 7 17 3"/><line x1="21" y1="7" x2="9" y2="7"/><polyline points="7 21 3 17 7 13"/><line x1="3" y1="17" x2="15" y2="17"/></svg>';
      button.innerHTML = '<span class="toolbar-icon">' + icon + '</span><span>' + (dir === 'rtl' ? 'LTR' : 'RTL') + '</span>';
    });
  }

  function setTheme(theme) {
    if (!theme) {
      theme = localStorage.getItem('greenspace_admin_theme') || 'light';
    }
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('greenspace_admin_theme', theme);
    updateToolbarButtons();
  }

  function setDir(dir) {
    if (!dir) {
      dir = localStorage.getItem('greenspace_admin_direction') || 'ltr';
    }
    document.documentElement.setAttribute('dir', dir);
    document.body.setAttribute('dir', dir);
    localStorage.setItem('greenspace_admin_direction', dir);
    updateToolbarButtons();
  }

  function setupThemeAndDirection() {
    const currentTheme = localStorage.getItem('greenspace_admin_theme') || 'light';
    const currentDir = localStorage.getItem('greenspace_admin_direction') || 'ltr';

    setTheme(currentTheme);
    setDir(currentDir);

    const themeToggleSwitch = document.getElementById('settingsThemeToggle');
    if (themeToggleSwitch) {
      themeToggleSwitch.checked = (currentTheme === 'dark');
      themeToggleSwitch.addEventListener('change', function () {
        setTheme(themeToggleSwitch.checked ? 'dark' : 'light');
      });
    }

    const rtlToggleSwitch = document.getElementById('settingsRtlToggle');
    if (rtlToggleSwitch) {
      rtlToggleSwitch.checked = (currentDir === 'rtl');
      rtlToggleSwitch.addEventListener('change', function () {
        setDir(rtlToggleSwitch.checked ? 'rtl' : 'ltr');
      });
    }

    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        if (themeToggleSwitch) themeToggleSwitch.checked = (next === 'dark');
      });
    });

    document.querySelectorAll('.rtl-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        setDir(next);
        if (rtlToggleSwitch) rtlToggleSwitch.checked = (next === 'rtl');
      });
    });
  }

  /* ==========================================================================
     Mobile Navigation Drawer
     ========================================================================== */
  function setupMobileNav() {
    const shell = document.querySelector('.admin-shell');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navItems = document.querySelectorAll('.admin-nav-item');

    function openMenu() {
      if (!shell || !backdrop) return;
      shell.classList.add('menu-open');
      backdrop.classList.add('is-open');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      if (!shell || !backdrop) return;
      shell.classList.remove('menu-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        shell.classList.contains('menu-open') ? closeMenu() : openMenu();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    navItems.forEach(function (item) {
      item.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1200) closeMenu();
    });
  }

  /* ==========================================================================
     Active Navigation Highlighting
     ========================================================================== */
  function setupActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.admin-nav-item').forEach(function (link) {
      if (link.tagName === 'A' && link.getAttribute('href') === path) {
        document.querySelectorAll('.admin-nav-item').forEach(function (item) { item.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     Scroll & Stagger Reveal Animations
     ========================================================================== */
  function setupRevealAnimations() {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================================================
     Numeric Counter Animation for Stat Cards
     ========================================================================== */
  function animateNumberCounters() {
    document.querySelectorAll('.stat-card[data-count]').forEach(function (card) {
      const target = parseInt(card.getAttribute('data-count'), 10);
      const heading = card.querySelector('h3');
      if (!target || !heading) return;

      const isCurrency = heading.textContent.includes('₹');
      const isLakh = heading.textContent.includes('L');

      if (isLakh) return; // Keep formatted lakh strings pristine

      let start = 0;
      const duration = 900;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(function () {
        start += increment;
        if (start >= target) {
          heading.textContent = isCurrency ? '₹' + target.toLocaleString() : target.toLocaleString();
          clearInterval(timer);
        } else {
          heading.textContent = isCurrency ? '₹' + Math.floor(start).toLocaleString() : Math.floor(start).toLocaleString();
        }
      }, stepTime);
    });
  }

  /* Helper to get customer initials */
  function getInitials(name) {
    if (!name) return 'GS';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  /* Helper to map status to badge class */
  function getStatusClass(status) {
    const map = {
      'Pending': 'warning',
      'Under Review': 'warning',
      'New': 'info',
      'Quote Sent': 'info',
      'Scheduled': 'info',
      'In Progress': 'warning',
      'Approved': 'success',
      'Confirmed': 'success',
      'Healthy': 'success',
      'On Track': 'success',
      'Paid': 'success',
      'Active': 'success',
      'Completed': 'success',
      'Published': 'success',
      'Draft': 'warning',
      'Failed': 'danger',
      'Rejected': 'danger',
      'Treatment Required': 'danger',
      'Replacement Required': 'danger',
      'Action Needed': 'danger',
      'Monitor': 'danger'
    };
    return map[status] || 'info';
  }

  /* ==========================================================================
     Dashboard Dynamic Rendering
     ========================================================================== */
  function renderDashboard() {
    const data = window.AdminData?.load?.();
    if (!data) return;

    const requestsRoot = document.getElementById('dashboardRequests');
    if (requestsRoot) {
      requestsRoot.innerHTML = data.requests.slice(0, 4).map(function (request) {
        const initials = getInitials(request.customer);
        const badgeClass = getStatusClass(request.status);
        return `
          <div class="request-row">
            <span class="customer-avatar-badge">${initials}</span>
            <div class="request-meta">
              <strong>${request.customer}</strong>
              <span>${request.service}</span>
            </div>
            <div class="request-meta">
              <strong>${request.requestedDate}</strong>
              <span>${request.budget}</span>
            </div>
            <span class="status-pill ${badgeClass}">${request.status}</span>
            <a href="request-details.html" class="row-action-arrow" aria-label="View request details">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>`;
      }).join('');
    }

    const bookingsRoot = document.getElementById('dashboardBookings');
    if (bookingsRoot) {
      bookingsRoot.innerHTML = data.bookings.slice(0, 3).map(function (booking) {
        const initials = getInitials(booking.customer);
        const badgeClass = getStatusClass(booking.status);
        return `
          <div class="booking-item">
            <span class="customer-avatar-badge">${initials}</span>
            <div class="request-meta">
              <strong>${booking.customer}</strong>
              <span>${booking.service}</span>
            </div>
            <div class="request-meta">
              <strong>${booking.date}</strong>
              <span>${booking.time}</span>
            </div>
            <span class="status-pill ${badgeClass}">${booking.status}</span>
            <a href="bookings.html" class="row-action-arrow" aria-label="View booking">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>`;
      }).join('');
    }

    animateNumberCounters();
  }

  /* ==========================================================================
     Requests Page Rendering
     ========================================================================== */
  function renderRequests() {
    const data = window.AdminData?.load?.();
    const tableBody = document.getElementById('requestsTableBody');
    if (!tableBody || !data) return;

    tableBody.innerHTML = data.requests.map(function (request) {
      const initials = getInitials(request.customer);
      const badgeClass = getStatusClass(request.status);
      return `
        <tr>
          <td><strong>${request.id}</strong></td>
          <td>
            <div class="customer-cell">
              <span class="customer-avatar-badge">${initials}</span>
              <div>
                <strong>${request.customer}</strong>
              </div>
            </div>
          </td>
          <td>${request.service}</td>
          <td>${request.requestedDate}</td>
          <td><strong>${request.budget}</strong></td>
          <td><span class="status-pill ${badgeClass}">${request.status}</span></td>
          <td><a class="link-button" href="request-details.html">View →</a></td>
        </tr>
      `;
    }).join('');
  }

  /* ==========================================================================
     Tabs & Filter Interactions
     ========================================================================== */
  function bindTabSwitches() {
    // Segmented tabs (e.g. on Bookings page)
    document.querySelectorAll('.tab-strip .tab').forEach(function (button) {
      button.addEventListener('click', function () {
        const parent = button.closest('.tab-strip');
        if (!parent) return;
        parent.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        button.classList.add('active');

        const filter = button.textContent.trim().toLowerCase();
        const tableBody = document.querySelector('.admin-table tbody');
        if (!tableBody) return;

        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(function (row) {
          if (filter === 'all') {
            row.style.display = '';
            return;
          }
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(filter) ? '' : 'none';
        });
      });
    });

    // Customer profile tab list
    document.querySelectorAll('.tab-list .tab').forEach(function (button) {
      button.addEventListener('click', function () {
        const tabName = button.getAttribute('data-tab');
        const parent = button.closest('.tab-list');
        if (!parent) return;
        parent.querySelectorAll('.tab').forEach(function (tab) { tab.classList.toggle('active', tab === button); });

        const panel = document.querySelector('.tab-panel[data-panel="' + tabName + '"]');
        document.querySelectorAll('.tab-panel').forEach(function (pane) {
          pane.classList.toggle('active', pane === panel);
        });
      });
    });
  }

  function setupRequestSearch() {
    const input = document.getElementById('requestSearch');
    const tableBody = document.getElementById('requestsTableBody');
    if (!input || !tableBody) return;

    input.addEventListener('input', function () {
      const query = input.value.trim().toLowerCase();
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  /* ==========================================================================
     Authentication Integration
     ========================================================================== */
  function setupAuth() {
    window.GreenSpaceAdminAuth?.requireAuth?.();
    window.GreenSpaceAdminAuth?.bindLogoutButtons?.();
  }

  /* Initialize All Modules */
  setupNavIcons();
  setupThemeAndDirection();
  setupMobileNav();
  setupActiveNav();
  setupRevealAnimations();
  if (page === 'dashboard') renderDashboard();
  if (page === 'requests') renderRequests();
  setupAuth();
  bindTabSwitches();
  setupRequestSearch();
});
