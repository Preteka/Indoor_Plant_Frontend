(function () {
  const ADMIN_SESSION_KEY = 'greenspace_admin_session';
  const ADMIN_LOGGED_IN_KEY = 'greenspace_admin_logged_in';
  const ADMIN_AUTH_KEY = 'adminAuthenticated';
  const ADMIN_ROLE_KEY = 'userRole';

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
    const isProtected = document.body.getAttribute('data-protected') === 'true';
    if (isProtected && !isLoggedIn()) {
      window.location.replace('../login.html');
    }
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
    bindLogoutButtons
  };
})();
