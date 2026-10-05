/**
 * GreenSpace Rentals - Main Interactive & Motion Engine
 * Features:
 * - Scroll Progress Indicator
 * - Custom Botanical Cursor
 * - Hero Text Staggered Entrance
 * - Scroll Reveal & Parallax Engine
 * - Animated Number Counters
 * - SVG Flower Growth & Blooming System
 * - Before & After Office Transformation Slider
 * - Care Video Modal Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Scroll Progress Bar
  const scrollProgressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }
  }, { passive: true });

  // 3. Custom Botanical Cursor (Desktop only)
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }, { passive: true });

    const interactives = document.querySelectorAll('a, button, input, select, textarea, .glass-card, .compare-wrapper');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // 4. Hero Text Entrance Sequence
  setTimeout(() => {
    const heroReveals = document.querySelectorAll('.hero-reveal-inner');
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 220);
    });
  }, 150);

  // 5. Scroll-Triggered Reveal Engine (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Animated Counter Up
  const counterElements = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current) + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(c => counterObserver.observe(c));

  // 7. Interactive Parallax Floating Cards (About section & Decorative leaves)
  const parallaxContainer = document.querySelector('.parallax-zone');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  if (parallaxContainer && parallaxLayers.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-parallax-speed') || '0.2');
        layer.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
      });
    }, { passive: true });
  }

  // 8. FLOWER GROWING & BLOOMING ANIMATION (Final CTA Section)
  const finalCta = document.getElementById('finalCtaSection');
  if (finalCta) {
    const ctaObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          finalCta.classList.add('cta-bloomed');

          // Add gentle breeze sway after blooming sequence finishes
          setTimeout(() => {
            const plants = finalCta.querySelectorAll('.cta-botanical-cluster, .botanical-bloom-plant, .botanical-plant');
            plants.forEach(p => p.classList.add('sway-active'));
          }, 2400);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    ctaObserver.observe(finalCta);
  }

  // 8b. PROGRESSIVE TREE & BOTANICAL GROWTH JOURNEY (Four Simple Steps Section)
  const stepsGrowthSection = document.getElementById('stepsGrowthSection') || document.getElementById('howItWorksSection');
  if (stepsGrowthSection) {
    const journeyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stepsGrowthSection.classList.add('step-tree-active', 'journey-active');
          const cards = stepsGrowthSection.querySelectorAll('.step-stage-card, .growth-step-card');
          const plantWraps = stepsGrowthSection.querySelectorAll('.growth-plant-wrap');

          // Progressive 4-phase activation: Step 01 (100ms), Step 02 (1000ms), Step 03 (1900ms), Step 04 (2800ms)
          const timings = [100, 1000, 1900, 2800];

          timings.forEach((time, index) => {
            setTimeout(() => {
              if (cards[index]) {
                cards[index].classList.add('stage-active', 'active');
              }
              if (plantWraps && plantWraps[index]) {
                setTimeout(() => plantWraps[index].classList.add('sway-ready'), 600);
              }
            }, time);
          });

          // Activate subtle calming breeze sway after tree growth finishes
          setTimeout(() => {
            stepsGrowthSection.classList.add('tree-sway-active');
          }, 3800);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    journeyObserver.observe(stepsGrowthSection);
  }

  // 8c. ABOUT US: INTERACTIVE BOTANICAL PLANT GROWTH (HERO SECTION)
  const aboutPlantCard = document.getElementById('aboutPlantCard') || document.querySelector('.about-plant-card');
  const plantTreeBtn = document.getElementById('plantTreeBtn') || document.querySelector('.plant-tree-btn');

  if (aboutPlantCard) {
    let growthTimeout = null;
    let swayTimeout = null;

    const startGrowth = (isReset = false) => {
      if (aboutPlantCard.classList.contains('is-grown') && !isReset) {
        return;
      }

      if (growthTimeout) clearTimeout(growthTimeout);
      if (swayTimeout) clearTimeout(swayTimeout);

      if (isReset) {
        aboutPlantCard.classList.remove('is-grown', 'plant-swaying', 'is-growing');
        void aboutPlantCard.offsetWidth; // Force reflow
      }

      aboutPlantCard.classList.add('is-growing');
      if (plantTreeBtn) plantTreeBtn.setAttribute('aria-expanded', 'true');

      // Mature botanical plant state reached after ~2.7s (allowing full 19-leaf natural expansion)
      growthTimeout = setTimeout(() => {
        aboutPlantCard.classList.add('is-grown');
        aboutPlantCard.classList.remove('is-growing');
        // Gentle botanical idle sway after full maturity
        swayTimeout = setTimeout(() => {
          aboutPlantCard.classList.add('plant-swaying');
        }, 350);
      }, 2700);
    };

    // Button hover & focus triggers growth on desktop
    if (plantTreeBtn) {
      plantTreeBtn.addEventListener('mouseenter', () => startGrowth(false));
      plantTreeBtn.addEventListener('focus', () => startGrowth(false));

      // Click / Mobile Tap on button toggles / regrows
      plantTreeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (aboutPlantCard.classList.contains('is-grown')) {
          startGrowth(true); // reset and re-grow on subsequent taps
        } else {
          startGrowth(false);
        }
      });

      // Keyboard accessibility (Enter / Space)
      plantTreeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (aboutPlantCard.classList.contains('is-grown')) {
            startGrowth(true);
          } else {
            startGrowth(false);
          }
        }
      });
    }

    // Card hover & tap support
    aboutPlantCard.addEventListener('mouseenter', () => startGrowth(false));
    aboutPlantCard.addEventListener('click', (e) => {
      // If user clicked inside card (not on button itself)
      if (e.target !== plantTreeBtn && !plantTreeBtn?.contains(e.target)) {
        if (aboutPlantCard.classList.contains('is-grown')) {
          startGrowth(true);
        } else {
          startGrowth(false);
        }
      }
    });
  }

  // 8d. ABOUT US: BOTANICAL TIMELINE SCROLL OBSERVER (OUR GROWTH)
  const aboutGrowthTimeline = document.getElementById('aboutGrowthTimeline');
  if (aboutGrowthTimeline) {
    const timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutGrowthTimeline.classList.add('timeline-in-view');
          const yearNodes = aboutGrowthTimeline.querySelectorAll('.growth-year-node');
          
          // Progressive activation of 2022 -> 2023 -> 2024 -> 2025 -> 2026
          const timings = [150, 600, 1050, 1500, 1950];
          timings.forEach((delay, idx) => {
            setTimeout(() => {
              if (yearNodes[idx]) {
                yearNodes[idx].classList.add('node-active');
              }
            }, delay);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    timelineObserver.observe(aboutGrowthTimeline);
  }


  // 9. Interactive Before & After Office Transformation Slider (Pointer Events + Accessibility)
  const compareBox = document.getElementById('compareInteractiveBox');
  const compareBeforeLayer = document.getElementById('compareBeforeLayer');
  const compareHandle = document.getElementById('compareDragHandle');
  const compareLine = document.getElementById('compareDividerLine');

  if (compareBox && compareBeforeLayer && compareHandle) {
    let isDragging = false;
    let hasTeased = false;

    const setSliderPosition = (percentage) => {
      const clamped = Math.max(0, Math.min(100, percentage));
      compareBeforeLayer.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
      compareHandle.style.left = `${clamped}%`;
      if (compareLine) compareLine.style.left = `${clamped}%`;
      compareHandle.setAttribute('aria-valuenow', Math.round(clamped));
    };

    const getPercentageFromEvent = (e) => {
      const rect = compareBox.getBoundingClientRect();
      const x = e.clientX - rect.left;
      return (x / rect.width) * 100;
    };

    const onPointerDown = (e) => {
      isDragging = true;
      compareBox.classList.add('is-dragging');
      try {
        compareBox.setPointerCapture(e.pointerId);
      } catch(err) {}
      setSliderPosition(getPercentageFromEvent(e));
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      setSliderPosition(getPercentageFromEvent(e));
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      compareBox.classList.remove('is-dragging');
      try {
        compareBox.releasePointerCapture(e.pointerId);
      } catch(err) {}
    };

    compareBox.addEventListener('pointerdown', onPointerDown);
    compareBox.addEventListener('pointermove', onPointerMove);
    compareBox.addEventListener('pointerup', onPointerUp);
    compareBox.addEventListener('pointercancel', onPointerUp);

    // Keyboard support for accessibility
    compareHandle.addEventListener('keydown', (e) => {
      const current = parseFloat(compareHandle.getAttribute('aria-valuenow') || '50');
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSliderPosition(current - 5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSliderPosition(current + 5);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setSliderPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setSliderPosition(100);
      }
    });

    // Initial subtle hint animation on scroll view (50% -> 58% -> 50%) once
    const compareObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTeased) {
          hasTeased = true;
          obs.unobserve(entry.target);
          setTimeout(() => {
            if (!isDragging) {
              compareBox.classList.add('teasing');
              setSliderPosition(58);
              setTimeout(() => {
                if (!isDragging) {
                  setSliderPosition(50);
                  setTimeout(() => compareBox.classList.remove('teasing'), 500);
                }
              }, 500);
            }
          }, 600);
        }
      });
    }, { threshold: 0.25 });

    compareObserver.observe(compareBox);
    setSliderPosition(50);
  }




  // 10. Care Video Modal Handler
  const openCareModalBtns = document.querySelectorAll('.open-care-modal');
  const careModal = document.getElementById('careVideoModal');
  const closeCareModalBtn = document.getElementById('closeCareModal');
  const careVideoEl = document.getElementById('careModalVideo');

  if (openCareModalBtns.length > 0 && careModal) {
    openCareModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        careModal.classList.remove('hidden');
        careModal.classList.add('flex');
        if (careVideoEl) {
          careVideoEl.currentTime = 0;
          careVideoEl.play().catch(() => {});
        }
      });
    });

    const closeModal = () => {
      careModal.classList.add('hidden');
      careModal.classList.remove('flex');
      if (careVideoEl) {
        careVideoEl.pause();
      }
    };

    if (closeCareModalBtn) {
      closeCareModalBtn.addEventListener('click', closeModal);
    }
    careModal.addEventListener('click', (e) => {
      if (e.target === careModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !careModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // 11. Interactive Pricing Toggle (Monthly / Quarterly / Yearly)
  const pricingButtons = document.querySelectorAll('.pricing-btn');
  const pricingValues = document.querySelectorAll('.pricing-val');

  if (pricingButtons.length > 0 && pricingValues.length > 0) {
    pricingButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        pricingButtons.forEach(b => {
          b.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
          b.classList.add('text-gray-600', 'dark:text-gray-300');
        });
        btn.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        btn.classList.remove('text-gray-600', 'dark:text-gray-300');

        const period = btn.getAttribute('data-period');
        pricingValues.forEach(val => {
          const monthly = parseFloat(val.getAttribute('data-monthly') || '0');
          if (period === 'quarterly') {
            const discounted = Math.round(monthly * 0.9);
            val.textContent = `$${discounted}`;
          } else if (period === 'yearly') {
            const discounted = Math.round(monthly * 0.8);
            val.textContent = `$${discounted}`;
          } else {
            val.textContent = `$${monthly}`;
          }
        });
      });
    });
  }

  // 12. Toast System
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  window.showToast = function(msg) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };
});
