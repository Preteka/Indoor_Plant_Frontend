/**
 * GreenSpace Rentals - Pricing Page Interactive Controller
 * Features:
 * - FAQ Accordion with smooth toggle & ARIA accessibility
 * - 8-Step Booking Process Reveal
 * - Dynamic Pricing Factors Visuals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    if (button) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close others for neat single-expanded state
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.faq-button');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('open');
          button.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 2. 8-Step Booking Process Timeline Reveal
  const bookingTimeline = document.getElementById('pricingBookingTimeline');
  if (bookingTimeline) {
    const bookingCards = bookingTimeline.querySelectorAll('.pricing-process-step');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bookingCards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('revealed', 'active');
            }, i * 180);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(bookingTimeline);
  }

  // 3. Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
