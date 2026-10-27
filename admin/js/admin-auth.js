/**
 * GreenSpace Admin Auth – Frontend Demo Mode
 *
 * DEMO NOTICE: requireAuth() protection is disabled for public frontend demonstration.
 * The Admin Dashboard is directly accessible without credentials in this build.
 * Do not use this configuration with confidential data or real administrative operations.
 *
 * The full authentication flow (login credentials, session storage, logout) remains
 * implemented and functional. Restore the redirect in requireAuth() for production use.
 */
(function () {
  const ADMIN_SESSION_KEY = 'greenspace_admin_session';
  const ADMIN_LOGGED_IN_KEY = 'greenspace_admin_logged_in';
  const ADMIN_AUTH_KEY = 'adminAuthenticated';
  const ADMIN_ROLE_KEY = 'userRole';

  // Demo admin session provisioned automatically for direct-access demonstration.
  // This does NOT grant real privileges — it only sets display values for the UI.
  function provisionDemoAdminSession() {
    if (!sessionStorage.getItem(ADMIN_SESSION_KEY)) {
      const demoAdmin = {
        email: 'admin@greenspace.com',
        name: 'Aarav Mehta',
        role: 'admin',
        isDemo: true,
        loggedInAt: new Date().toISOString()
      };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(demoAdmin));
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      sessionStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
      sessionStorage.setItem(ADMIN_ROLE_KEY, 'admin');
    }
  }

  function authState() {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function isLoggedIn() {
    return Boolean(
      sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' ||
      (sessionStorage.getItem(ADMIN_LOGGED_IN_KEY) === 'true' && authState())
    );
  }

  function logout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_LOGGED_IN_KEY);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    sessionStorage.removeItem(ADMIN_ROLE_KEY);
    window.location.href = '../login.html';
  }

  function requireAuth() {
    // DEMO MODE: Auth redirect disabled for public frontend demonstration.
    // To re-enable protection, uncomment the block below:
    //
    // const isProtected = document.body.getAttribute('data-protected') === 'true';
    // if (isProtected && !isLoggedIn()) {
    //   window.location.replace('../login.html');
    // }

    // Instead, provision a demo session for display purposes only.
    provisionDemoAdminSession();
  }

  function bindLogoutButtons() {
    document.querySelectorAll('.admin-logout').forEach((button) => {
      button.addEventListener('click', function () {
        logout();
      });
    });
  }

  window.GreenSpaceAdminAuth = {
    logout,
    isLoggedIn,
    requireAuth,
    provisionDemoAdminSession,
    bindLogoutButtons
  };
})();
