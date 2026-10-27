/**
 * GreenSpace Rentals - Contact Page Controller (Vanilla JavaScript)
 * Handles client-side form validation, inline error messaging, clean success state feedback,
 * and dynamic contact configuration.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccessBox = document.getElementById('contactSuccessBox');
  const submitBtn = document.getElementById('contactSubmitBtn');

  // Contact Configuration (Central & Editable)
  const contactConfig = {
    phone: "+1 (800) 555-PLANT",
    email: "hello@greenspacerentals.com",
    address: "100 Botanical Way, Suite 400, Green District",
    hours: {
      weekdays: "Monday – Friday: 9:00 AM – 6:00 PM",
      saturday: "Saturday: 9:00 AM – 2:00 PM",
      sunday: "Sunday: Closed"
    }
  };

  if (!contactForm) return;

  const fields = {
    name: {
      input: document.getElementById('contactName'),
      error: document.getElementById('errorName'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your full name.'
    },
    email: {
      input: document.getElementById('contactEmail'),
      error: document.getElementById('errorEmail'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Please enter a valid email address.'
    },
    phone: {
      input: document.getElementById('contactPhone'),
      error: document.getElementById('errorPhone'),
      validate: (val) => val.trim().length >= 7 ? '' : 'Please enter a valid contact phone number.'
    },
    subject: {
      input: document.getElementById('contactSubject'),
      error: document.getElementById('errorSubject'),
      validate: (val) => val.trim().length >= 3 ? '' : 'Please enter a subject or enquiry topic.'
    },
    message: {
      input: document.getElementById('contactMessage'),
      error: document.getElementById('errorMessage'),
      validate: (val) => val.trim().length >= 10 ? '' : 'Please provide details about your space or event (min 10 characters).'
    }
  };

  // Live input validation on blur / input
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.input) {
      field.input.addEventListener('blur', () => {
        const errorMsg = field.validate(field.input.value);
        showFieldError(field, errorMsg);
      });

      field.input.addEventListener('input', () => {
        if (field.input.classList.contains('border-rose-500')) {
          const errorMsg = field.validate(field.input.value);
          showFieldError(field, errorMsg);
        }
      });
    }
  });

  function showFieldError(field, errorMsg) {
    if (!field.input) return;
    if (errorMsg) {
      field.input.classList.add('border-rose-500', 'focus:ring-rose-400');
      field.input.classList.remove('border-[var(--border)]', 'focus:ring-emerald-400');
      if (field.error) {
        field.error.textContent = errorMsg;
        field.error.classList.remove('hidden');
      }
    } else {
      field.input.classList.remove('border-rose-500', 'focus:ring-rose-400');
      field.input.classList.add('border-[var(--border)]', 'focus:ring-emerald-400');
      if (field.error) {
        field.error.textContent = '';
        field.error.classList.add('hidden');
      }
    }
  }

  // Handle Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasErrors = false;

    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.input) {
        const errorMsg = field.validate(field.input.value);
        if (errorMsg) {
          showFieldError(field, errorMsg);
          hasErrors = true;
        } else {
          showFieldError(field, '');
        }
      }
    });

    if (hasErrors) {
      return;
    }

    // Submit state simulation
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">🌿</span>
        <span>Sending Message...</span>
      `;
    }

    setTimeout(() => {
      // Hide form fields & show clean inline success card
      contactForm.classList.add('hidden');
      if (formSuccessBox) {
        formSuccessBox.classList.remove('hidden');
      }

      if (window.showToast) {
        window.showToast('Message sent successfully! Our botanical team will be in touch shortly.');
      }
    }, 900);
  });

  // ==================== FAQ ACCORDION INTERACTION ====================
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      const iconBox = item.querySelector('.faq-icon-box');

      if (trigger && content) {
        const toggleAccordion = () => {
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

          // Close all other items for clean single-accordion experience
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              const otherTrigger = otherItem.querySelector('.faq-trigger');
              const otherContent = otherItem.querySelector('.faq-content');
              const otherIconBox = otherItem.querySelector('.faq-icon-box');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
              if (otherContent) otherContent.style.maxHeight = '0px';
              if (otherIconBox) otherIconBox.style.transform = 'rotate(0deg)';
              otherItem.classList.remove('border-emerald-500/50', 'shadow-lg');
            }
          });

          // Toggle current item
          if (!isExpanded) {
            trigger.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 40 + 'px';
            if (iconBox) iconBox.style.transform = 'rotate(45deg)';
            item.classList.add('border-emerald-500/50', 'shadow-lg');
          } else {
            trigger.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '0px';
            if (iconBox) iconBox.style.transform = 'rotate(0deg)';
            item.classList.remove('border-emerald-500/50', 'shadow-lg');
          }
        };

        trigger.addEventListener('click', toggleAccordion);

        // Keyboard navigation (Enter / Space)
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        });
      }
    });
  }
});

