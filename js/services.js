/**
 * GreenSpace Rentals - Services Page Interactive Controller
 * Features:
 * - 6-Step Botanical Process Connector Progress
 * - Care Promise Micro-animations
 * - Staggered Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Botanical Process 6-Step Progressive Timeline Animation
  const processSection = document.getElementById('processTimelineSection');
  if (processSection) {
    const stepCards = processSection.querySelectorAll('.process-step-card');
    const connectorPath = document.getElementById('botanicalConnectorPath');

    const processObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processSection.classList.add('journey-active');

          // Progressive activation of 6 steps
          const stepDelays = [150, 600, 1050, 1500, 1950, 2400];
          stepCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('active', 'revealed');
            }, stepDelays[idx] || (idx * 400));
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    processObserver.observe(processSection);
  }

  // 2. Re-initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
