/**
 * GreenSpace Rentals - Quote & Requirement Flow Controller
 * Strictly enforces:
 * 1. Fill Requirement Form
 * 2. Continue to Review -> Check Authentication (Modal / Preserve in sessionStorage)
 * 3. Review Your Request (explicit verification)
 * 4. Submit Request -> Request Received (Under Review status & 7-step roadmap)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Views
  const formView = document.getElementById('quoteFormView');
  const reviewView = document.getElementById('quoteReviewView');
  const successView = document.getElementById('quoteSuccessView');
  const authModal = document.getElementById('authPromptModal');

  // Forms & Buttons
  const reqForm = document.getElementById('requirementForm');
  const btnEditDetails = document.getElementById('btnEditDetails');
  const btnFinalSubmitRequest = document.getElementById('btnFinalSubmitRequest');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSignInForm = document.getElementById('modalSignInForm');
  const modalSignUpForm = document.getElementById('modalSignUpForm');
  const modalTabSignIn = document.getElementById('modalTabSignIn');
  const modalTabSignUp = document.getElementById('modalTabSignUp');
  const navUserBadge = document.getElementById('navUserBadge');

  // State object
  let quoteState = {
    service: 'office-rental',
    serviceTitle: 'Office Plant Rentals',
    customerName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    spaceType: 'Corporate Office',
    spaceSize: '3,500 sq ft',
    estimatedPlants: '25 Plants',
    preferredDate: '20 October 2026',
    requirements: 'Office reception, meeting rooms and workspaces.'
  };

  // 1. Update user badge in top nav if logged in
  function updateNavAuth() {
    const currentUser = window.GreenSpaceAuth?.getCurrentUser();
    if (navUserBadge && currentUser) {
      navUserBadge.innerHTML = `
        <a href="profile.html" class="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500/30 transition-all shadow-md">
          <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
          <span>${currentUser.name} (My GreenSpace)</span>
        </a>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
  }
  updateNavAuth();

  // 2. Read URL Parameters for Service Pre-selection
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const planParam = urlParams.get('plan');
  const tierParam = urlParams.get('tier');

  if (serviceParam) {
    quoteState.service = serviceParam;
  }
  if (planParam && planParam.includes('green')) {
    quoteState.service = 'office-rental';
  }
  if (tierParam) {
    quoteState.service = 'event-rental';
  }

  // Radio options click handling
  const serviceOptions = document.querySelectorAll('.quote-service-option');
  serviceOptions.forEach(opt => {
    const sId = opt.getAttribute('data-service');
    if (sId === quoteState.service) {
      opt.classList.add('selected');
      const rad = opt.querySelector('input[type="radio"]');
      if (rad) rad.checked = true;
    } else {
      opt.classList.remove('selected');
    }

    opt.addEventListener('click', () => {
      serviceOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const rad = opt.querySelector('input[type="radio"]');
      if (rad) rad.checked = true;
      quoteState.service = sId;
      const titleH4 = opt.querySelector('h4');
      if (titleH4) quoteState.serviceTitle = titleH4.textContent.trim();
    });
  });

  // 3. Check for Preserved Pending Quote from Session
  const preservedQuote = window.GreenSpaceAuth?.getPendingQuote();
  const currentUser = window.GreenSpaceAuth?.getCurrentUser();

  if (currentUser) {
    // Autofill contact fields with authenticated user details
    const nameInput = document.getElementById('formCustName');
    const compInput = document.getElementById('formCustCompany');
    const emailInput = document.getElementById('formCustEmail');
    const phoneInput = document.getElementById('formCustPhone');

    if (nameInput) nameInput.value = currentUser.name;
    if (compInput) compInput.value = currentUser.company || 'ABC Technologies';
    if (emailInput) emailInput.value = currentUser.email;
    if (phoneInput) phoneInput.value = currentUser.phone || '+91 98765 43210';
  }

  if (preservedQuote) {
    // Restore form values
    quoteState = Object.assign(quoteState, preservedQuote);
    if (currentUser) {
      quoteState.customerName = currentUser.name;
      quoteState.email = currentUser.email;
      quoteState.company = currentUser.company || quoteState.company;
      quoteState.phone = currentUser.phone || quoteState.phone;
    }

    // Populate inputs
    if (document.getElementById('formCustName')) document.getElementById('formCustName').value = quoteState.customerName;
    if (document.getElementById('formCustCompany')) document.getElementById('formCustCompany').value = quoteState.company;
    if (document.getElementById('formCustEmail')) document.getElementById('formCustEmail').value = quoteState.email;
    if (document.getElementById('formCustPhone')) document.getElementById('formCustPhone').value = quoteState.phone;
    if (document.getElementById('formLocation')) document.getElementById('formLocation').value = quoteState.location;
    if (document.getElementById('formEstimatedPlants')) document.getElementById('formEstimatedPlants').value = quoteState.estimatedPlants;
    if (document.getElementById('formPreferredDate')) document.getElementById('formPreferredDate').value = quoteState.preferredDate;
    if (document.getElementById('formRequirements')) document.getElementById('formRequirements').value = quoteState.requirements;

    // If already logged in, jump straight to Review Step!
    if (currentUser) {
      showReviewStep();
    }
  }

  // Helper: Read form into state
  function readFormValues() {
    quoteState.customerName = document.getElementById('formCustName')?.value.trim() || 'Preteka';
    quoteState.company = document.getElementById('formCustCompany')?.value.trim() || 'ABC Technologies';
    quoteState.email = document.getElementById('formCustEmail')?.value.trim() || 'customer@email.com';
    quoteState.phone = document.getElementById('formCustPhone')?.value.trim() || '+91 98765 43210';
    quoteState.location = document.getElementById('formLocation')?.value.trim() || 'Coimbatore';
    quoteState.spaceType = document.getElementById('formSpaceType')?.value || 'Corporate Office';
    quoteState.estimatedPlants = document.getElementById('formEstimatedPlants')?.value || '25 Plants';
    quoteState.preferredDate = document.getElementById('formPreferredDate')?.value || '20 October 2026';
    quoteState.spaceSize = document.getElementById('formSpaceSize')?.value || '3,500 sq ft';
    quoteState.requirements = document.getElementById('formRequirements')?.value.trim() || 'Office reception, meeting rooms and workspaces.';

    const selectedRad = document.querySelector('input[name="selectedService"]:checked');
    if (selectedRad) {
      quoteState.service = selectedRad.value;
      const labelEl = selectedRad.closest('label');
      const h4 = labelEl?.querySelector('h4');
      if (h4) quoteState.serviceTitle = h4.textContent.trim();
    }
  }

  // 4. Handle "Continue to Review"
  if (reqForm) {
    reqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      readFormValues();

      if (!quoteState.customerName) {
        alert('Please enter your name.');
        return;
      }
      if (!quoteState.email || !quoteState.email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!quoteState.location) {
        alert('Please enter your location.');
        return;
      }

      // Preserve in sessionStorage
      window.GreenSpaceAuth?.savePendingQuote(quoteState);

      // Check Auth
      const user = window.GreenSpaceAuth?.getCurrentUser();
      if (!user) {
        // Show Auth Modal
        if (authModal) {
          authModal.classList.remove('hidden');
          if (document.getElementById('modalLoginEmail')) {
            document.getElementById('modalLoginEmail').value = quoteState.email;
          }
          if (document.getElementById('modalSignupEmail')) {
            document.getElementById('modalSignupEmail').value = quoteState.email;
          }
          if (document.getElementById('modalSignupName')) {
            document.getElementById('modalSignupName').value = quoteState.customerName;
          }
          if (document.getElementById('modalSignupPhone')) {
            document.getElementById('modalSignupPhone').value = quoteState.phone;
          }
        }
      } else {
        showReviewStep();
      }
    });
  }

  // Populate & Switch to Review Step
  function showReviewStep() {
    formView.classList.add('hidden');
    if (authModal) authModal.classList.add('hidden');
    reviewView.classList.remove('hidden');
    if (successView) successView.classList.add('hidden');

    const currentUser = window.GreenSpaceAuth?.getCurrentUser();
    if (currentUser) {
      quoteState.customerName = currentUser.name || quoteState.customerName;
      quoteState.email = currentUser.email || quoteState.email;
      quoteState.company = currentUser.company || quoteState.company;
      quoteState.phone = currentUser.phone || quoteState.phone;
    }

    document.getElementById('revService').textContent = quoteState.serviceTitle || "Office Plant Rental";
    document.getElementById('revCustomer').textContent = quoteState.customerName || "Preteka";
    document.getElementById('revCompany').textContent = quoteState.company || "ABC Technologies";
    document.getElementById('revEmail').textContent = quoteState.email || "customer@email.com";
    document.getElementById('revPhone').textContent = quoteState.phone || "+91 98765 43210";
    document.getElementById('revLocation').textContent = quoteState.location || "Coimbatore";
    document.getElementById('revPlants').textContent = quoteState.estimatedPlants || "25 Plants";
    document.getElementById('revDate').textContent = quoteState.preferredDate || "20 October 2026";
    document.getElementById('revRequirements').textContent = quoteState.requirements || "Office reception, meeting rooms and workspaces.";

    reviewView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateNavAuth();
  }

  // "Edit Details" -> Return to form
  if (btnEditDetails) {
    btnEditDetails.addEventListener('click', () => {
      reviewView.classList.add('hidden');
      formView.classList.remove('hidden');
      formView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // "Submit Request ->" -> Final Request Submission
  if (btnFinalSubmitRequest) {
    btnFinalSubmitRequest.addEventListener('click', () => {
      // Add request to storage
      const newRequest = window.GreenSpaceAuth?.addRequest(quoteState);
      window.GreenSpaceAuth?.clearPendingQuote();

      // Show Success View
      reviewView.classList.add('hidden');
      formView.classList.add('hidden');
      if (successView) {
        successView.classList.remove('hidden');
        document.getElementById('successCustName').textContent = quoteState.customerName || "Preteka";
        document.getElementById('successRefCode').textContent = newRequest ? newRequest.requestId : "GS-REQ-6602";
        successView.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Modal Auth Tab Switching
  if (modalTabSignIn && modalTabSignUp) {
    modalTabSignIn.addEventListener('click', () => {
      modalTabSignIn.classList.add('bg-[var(--surface)]', 'text-[var(--text-primary)]', 'shadow-sm');
      modalTabSignIn.classList.remove('text-[var(--text-muted)]');
      modalTabSignUp.classList.remove('bg-[var(--surface)]', 'text-[var(--text-primary)]', 'shadow-sm');
      modalTabSignUp.classList.add('text-[var(--text-muted)]');
      modalSignInForm.classList.remove('hidden');
      modalSignUpForm.classList.add('hidden');
    });

    modalTabSignUp.addEventListener('click', () => {
      modalTabSignUp.classList.add('bg-[var(--surface)]', 'text-[var(--text-primary)]', 'shadow-sm');
      modalTabSignUp.classList.remove('text-[var(--text-muted)]');
      modalTabSignIn.classList.remove('bg-[var(--surface)]', 'text-[var(--text-primary)]', 'shadow-sm');
      modalTabSignIn.classList.add('text-[var(--text-muted)]');
      modalSignUpForm.classList.remove('hidden');
      modalSignInForm.classList.add('hidden');
    });
  }

  // Modal Sign In Submit
  if (modalSignInForm) {
    modalSignInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('modalLoginEmail').value;
      const pass = document.getElementById('modalLoginPassword').value;
      window.GreenSpaceAuth.login(email, pass);
      showReviewStep();
    });
  }

  // Modal Sign Up Submit
  if (modalSignUpForm) {
    modalSignUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalSignupName').value;
      const email = document.getElementById('modalSignupEmail').value;
      const phone = document.getElementById('modalSignupPhone').value;
      const company = quoteState.company || 'ABC Technologies';
      window.GreenSpaceAuth.signup({ name, email, phone, company });
      showReviewStep();
    });
  }

  // Close modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      authModal.classList.add('hidden');
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
