/**
 * GreenSpace Rentals - Dynamic Service Details Controller
 * Loads service data by ?service=ID query param and renders full rich layout.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service') || 'office-rental';

  const services = window.greenSpaceData?.services || [];
  const currentService = services.find(s => s.id === serviceId) || services[0];

  if (!currentService) {
    console.error('Service data not found');
    return;
  }

  // Update Page Title and Meta
  document.title = `${currentService.title} | GreenSpace Rentals Services`;

  // Hero Elements
  const heroBadge = document.getElementById('serviceHeroBadge');
  const heroTitle = document.getElementById('serviceHeroTitle');
  const heroDescription = document.getElementById('serviceHeroDescription');
  const heroImg = document.getElementById('serviceHeroImage');
  const breadcrumbCurrent = document.getElementById('serviceBreadcrumbCurrent');
  const quoteCtaBtn = document.getElementById('serviceQuoteCtaBtn');

  if (heroBadge) heroBadge.textContent = currentService.badge;
  if (heroTitle) heroTitle.textContent = currentService.title;
  if (heroDescription) heroDescription.textContent = currentService.description;
  if (heroImg) {
    heroImg.src = currentService.heroImage;
    heroImg.alt = currentService.title;
  }
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentService.title;
  if (quoteCtaBtn) {
    quoteCtaBtn.href = `quote.html?service=${currentService.id}`;
    quoteCtaBtn.querySelector('span') ? quoteCtaBtn.querySelector('span').textContent = currentService.quoteBtnText : null;
  }

  // What's Included List
  const includedContainer = document.getElementById('serviceIncludedList');
  if (includedContainer) {
    includedContainer.innerHTML = currentService.included.map(item => `
      <div class="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/40 transition-all shadow-sm">
        <div class="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
        </div>
        <span class="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-relaxed">${item}</span>
      </div>
    `).join('');
  }

  // Ideal For List
  const idealForContainer = document.getElementById('serviceIdealForList');
  if (idealForContainer) {
    idealForContainer.innerHTML = currentService.idealFor.map(item => `
      <div class="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)]">
        <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0"></i>
        <span class="text-sm font-semibold text-[var(--text-primary)]">${item}</span>
      </div>
    `).join('');
  }

  // Process Steps
  const processContainer = document.getElementById('serviceProcessList');
  if (processContainer) {
    processContainer.innerHTML = currentService.process.map(step => `
      <div class="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/40 transition-all shadow-sm">
        <span class="text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-2 block font-heading">${step.step} / PHASE</span>
        <h4 class="text-lg font-bold text-[var(--text-primary)] mb-2 font-heading">${step.title}</h4>
        <p class="text-sm text-[var(--text-secondary)] leading-relaxed">${step.desc}</p>
      </div>
    `).join('');
  }

  // Specifications
  const specsContainer = document.getElementById('serviceSpecsList');
  if (specsContainer && currentService.specs) {
    specsContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
        <span class="text-xs text-[var(--text-muted)] block mb-1 uppercase font-bold tracking-wider">Commitment</span>
        <span class="text-sm font-bold text-[var(--text-primary)]">${currentService.specs.commitment}</span>
      </div>
      <div class="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
        <span class="text-xs text-[var(--text-muted)] block mb-1 uppercase font-bold tracking-wider">Care Schedule</span>
        <span class="text-sm font-bold text-[var(--text-primary)]">${currentService.specs.maintenance}</span>
      </div>
      <div class="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
        <span class="text-xs text-[var(--text-muted)] block mb-1 uppercase font-bold tracking-wider">Planters</span>
        <span class="text-sm font-bold text-[var(--text-primary)]">${currentService.specs.planters}</span>
      </div>
      <div class="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
        <span class="text-xs text-[var(--text-muted)] block mb-1 uppercase font-bold tracking-wider">Guarantee</span>
        <span class="text-sm font-bold text-[var(--text-primary)]">${currentService.specs.guarantee}</span>
      </div>
    `;
  }

  // Other Services Navigation Grid
  const otherServicesGrid = document.getElementById('otherServicesGrid');
  if (otherServicesGrid) {
    const others = services.filter(s => s.id !== currentService.id).slice(0, 3);
    otherServicesGrid.innerHTML = others.map(s => `
      <a href="service-details.html?service=${s.id}" class="group block p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all shadow-md">
        <div class="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800 relative">
          <img src="${s.heroImage}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-[#071B15]/80 text-emerald-300 backdrop-blur-md">${s.badge}</span>
        </div>
        <h4 class="text-xl font-bold text-[var(--text-primary)] mb-2 font-heading group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${s.title}</h4>
        <p class="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed">${s.description}</p>
        <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Learn More <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </span>
      </a>
    `).join('');
  }

  // Refresh Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
