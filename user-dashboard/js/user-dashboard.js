/**
 * GreenSpace Rentals - User Dashboard Unified Data & UI Controller
 * Vanilla JavaScript • Clean State Management • Robust LocalStorage Bridge
 */

(function () {
  'use strict';

  // Storage Keys
  const USER_KEY = 'gs_current_user';
  const RENTALS_KEY = 'gs_user_rentals';
  const BOOKINGS_KEY = 'gs_customer_bookings';
  const MAINTENANCE_KEY = 'gs_user_maintenance';
  const HEALTH_KEY = 'gs_user_health_reports';
  const SUBSCRIPTIONS_KEY = 'gs_user_subscriptions';
  const PAYMENTS_KEY = 'gs_user_payments';
  const REVIEWS_KEY = 'gs_user_reviews';
  const NOTIFICATIONS_KEY = 'gs_user_notifications';

  // Default Botanical Plant Catalog Data
  const defaultPlants = [
    {
      id: "plant-1",
      name: "Monstera Deliciosa (Swiss Cheese Plant)",
      category: "Floor Specimen",
      tag: "Statement Foliage",
      price: 850,
      period: "/ month",
      size: "Large (4 - 5 ft)",
      light: "Medium to Bright Indirect",
      water: "Weekly (Every 7 days)",
      environment: "Corporate Boardrooms & Executive Cabins",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
      description: "Iconic split-leaf tropical statement plant that purifies indoor air and brings architectural sophistication to reception areas and conference suites."
    },
    {
      id: "plant-2",
      name: "Fiddle Leaf Fig (Ficus Lyrata)",
      category: "Floor Specimen",
      tag: "Architectural Favorite",
      price: 1100,
      period: "/ month",
      size: "Tall (5 - 6 ft)",
      light: "Bright Filtered Light",
      water: "Bi-weekly moisture check",
      environment: "Open-plan Tech Lounges & Atriums",
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
      description: "Dramatic violin-shaped foliage mounted in premium fiberstone cylindrical planters. A signature centerpiece for modern corporate aesthetics."
    },
    {
      id: "plant-3",
      name: "Snake Plant (Sansevieria Laurentii)",
      category: "Air Purifying",
      tag: "Zero-Stress Hardiness",
      price: 450,
      period: "/ month",
      size: "Medium (2.5 - 3 ft)",
      light: "Low to Any Light",
      water: "Every 14 - 21 days",
      environment: "Desk clusters, Hallways & Partition dividers",
      image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80",
      description: "NASA-certified top oxygen-producing indoor succulent with upright yellow-bordered blades. Thrives even under continuous fluorescent office lights."
    },
    {
      id: "plant-4",
      name: "Areca Palm Specimen (Dypsis Lutescens)",
      category: "Floor Specimen",
      tag: "Natural Humidifier",
      price: 950,
      period: "/ month",
      size: "Tall (5 - 6 ft)",
      light: "Bright Indirect Light",
      water: "Twice Weekly Mist & Water",
      environment: "Lobbies, Breakout Spaces & Event Stages",
      image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
      description: "Graceful feathery fronds that soften sharp office architecture while transpiring up to 1 liter of ambient moisture per day."
    },
    {
      id: "plant-5",
      name: "ZZ Plant (Zamioculcas Zamiifolia)",
      category: "Low Light",
      tag: "Indestructible Green",
      price: 520,
      period: "/ month",
      size: "Compact (2 - 2.5 ft)",
      light: "Shade & Windowless Rooms",
      water: "Monthly",
      environment: "Meeting rooms & Private workstations",
      image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80",
      description: "Glossy deep-emerald leaves with rhizomatous tubers that store water. Perfect for windowless conference pods and quiet reflection rooms."
    },
    {
      id: "plant-6",
      name: "Peace Lily (Spathiphyllum Sensation)",
      category: "Air Purifying",
      tag: "Flowering Foliage",
      price: 600,
      period: "/ month",
      size: "Medium (3 ft)",
      light: "Medium Filtered Light",
      water: "Weekly",
      environment: "Reception desks & Wellness lounges",
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
      description: "Broad ribbed dark foliage with striking ivory-white spathe blooms that remove VOCs, benzene, and formaldehyde from workplace air."
    },
    {
      id: "plant-7",
      name: "Dracaena Reflexa (Song of India)",
      category: "Desktop & Mid-Tier",
      tag: "Sculptural Stem",
      price: 480,
      period: "/ month",
      size: "Medium (2.5 ft)",
      light: "Bright Indirect",
      water: "Every 10 days",
      environment: "Foyer credenzas & Cafe corners",
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
      description: "Lively lime-and-forest variegated leaves on twisting architectural stems, paired with contemporary matte ceramic planters."
    },
    {
      id: "plant-8",
      name: "Bird of Paradise (Strelitzia Nicolai)",
      category: "Event Statement",
      tag: "Grand Luxury",
      price: 1450,
      period: "/ month",
      size: "Grand (6 - 7 ft)",
      light: "High Natural Light",
      water: "Weekly Thorough Drench",
      environment: "Main Atrium & Corporate Event Entrances",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
      description: "Stately banana-like evergreen foliage providing tropical opulence and dramatic height for high-ceilinged offices and premium galas."
    }
  ];

  // Initialize Default User Data if empty
  function initUserData() {
    // Current User - Default Demo User for Frontend Testing
    if (!sessionStorage.getItem(USER_KEY)) {
      const demoUser = {
        userId: "demo_user_greenspace",
        name: "GreenSpace Demo User",
        email: "demo.user@greenspace.local",
        company: "GreenSpace Botanical Demo",
        phone: "+91 98765 43210",
        address: "742 Evergreen Business Park, Tech Zone",
        city: "Coimbatore",
        state: "Tamil Nadu",
        postalCode: "641014",
        memberSince: "Development Demo",
        role: "user",
        accountType: "Demo",
        isDemo: true
      };
      sessionStorage.setItem(USER_KEY, JSON.stringify(demoUser));
    }

    // Rentals
    if (!localStorage.getItem(RENTALS_KEY)) {
      const initialRentals = [
        {
          rentalId: "GS-RENT-101",
          plantName: "Monstera Deliciosa (Swiss Cheese Plant)",
          category: "Floor Specimen",
          quantity: 15,
          unitPrice: 850,
          startDate: "02 Oct 2026",
          endDate: "02 Oct 2027",
          status: "ACTIVE",
          location: "ABC Technologies HQ - Executive Suites & Boardrooms",
          nextMaintenance: "28 Oct 2026",
          planterType: "Matte Charcoal Architectural Ceramic",
          healthStatus: "HEALTHY",
          image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
          notes: "Routine leaf polish and sub-irrigation reservoir check scheduled for upcoming visit."
        },
        {
          rentalId: "GS-RENT-102",
          plantName: "Snake Plant (Sansevieria Laurentii)",
          category: "Air Purifying",
          quantity: 10,
          unitPrice: 450,
          startDate: "02 Oct 2026",
          endDate: "02 Oct 2027",
          status: "ACTIVE",
          location: "ABC Technologies HQ - Open-Plan Workstation Dividers",
          nextMaintenance: "28 Oct 2026",
          planterType: "Sub-irrigation Fiberstone Planters",
          healthStatus: "HEALTHY",
          image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80",
          notes: "Thriving under ambient office lighting. Low moisture requirement maintained."
        },
        {
          rentalId: "GS-RENT-103",
          plantName: "Fiddle Leaf Fig (Ficus Lyrata)",
          category: "Floor Specimen",
          quantity: 2,
          unitPrice: 1100,
          startDate: "15 Sep 2026",
          endDate: "15 Mar 2027",
          status: "ACTIVE",
          location: "Manager Cabin A & Client Lounge",
          nextMaintenance: "28 Oct 2026",
          planterType: "Warm Terracotta Minimalist Vessels",
          healthStatus: "NEEDS ATTENTION",
          image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
          notes: "Positioned closer to window light zone. Additional nutrient feeding planned on next visit."
        }
      ];
      localStorage.setItem(RENTALS_KEY, JSON.stringify(initialRentals));
    }

    // Bookings
    if (!localStorage.getItem(BOOKINGS_KEY)) {
      const initialBookings = [
        {
          bookingId: "GS-B1025",
          quoteId: "GS-Q1025",
          userId: "user_preteka_1",
          customerName: "Preteka",
          company: "ABC Technologies",
          service: "Office Plant Rental (27 Specimen Plants)",
          bookingDate: "02 Oct 2026",
          scheduledDeliveryDate: "20 Oct 2026",
          deliveryAddress: "742 Evergreen Business Park, Tech Zone, Coimbatore",
          paymentStatus: "PAID",
          status: "CONFIRMED",
          team: "GreenSpace White-Glove Installation Team",
          itemsCount: 27,
          totalAmount: 33790
        },
        {
          bookingId: "GS-B0984",
          quoteId: "GS-Q0984",
          userId: "user_preteka_1",
          customerName: "Preteka",
          company: "ABC Technologies",
          service: "Quarterly Greenery Refresh & Soil Replacement",
          bookingDate: "10 Sep 2026",
          scheduledDeliveryDate: "15 Sep 2026",
          deliveryAddress: "742 Evergreen Business Park, Tech Zone, Coimbatore",
          paymentStatus: "PAID",
          status: "COMPLETED",
          team: "Elena Vance (Senior Horticulturalist)",
          itemsCount: 15,
          totalAmount: 8500
        }
      ];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
    }

    // Maintenance
    if (!localStorage.getItem(MAINTENANCE_KEY)) {
      const initialMaintenance = [
        {
          maintenanceId: "MNT-2026-441",
          rentalId: "GS-RENT-101",
          serviceType: "Bi-Weekly Comprehensive Plant Care",
          date: "28 Oct 2026",
          timeWindow: "10:30 AM – 12:30 PM",
          technician: "Elena Vance (Senior Horticulturalist)",
          status: "SCHEDULED",
          tasks: [
            "Precision moisture testing & root hydration",
            "Foliage dust removal & organic leaf shine",
            "Aesthetic trimming & deadheading",
            "Nutrient feeding & soil aerating"
          ],
          notes: "Includes specialized light check for Fiddle Leaf Fig in Manager Cabin A."
        },
        {
          maintenanceId: "MNT-2026-398",
          rentalId: "GS-RENT-101",
          serviceType: "Routine Plant Health Inspection & Polishing",
          date: "14 Oct 2026",
          timeWindow: "11:00 AM – 01:00 PM",
          technician: "Rajesh Kumar (Plant Care Specialist)",
          status: "COMPLETED",
          tasks: [
            "Reservoir replenishment in 25 planters",
            "Natural pest diagnostic audit",
            "Pruning lower yellowing leaves"
          ],
          notes: "All 25 plants in reception and boardroom found in prime health. Moisture metrics logged."
        }
      ];
      localStorage.setItem(MAINTENANCE_KEY, JSON.stringify(initialMaintenance));
    }

    // Health Reports
    if (!localStorage.getItem(HEALTH_KEY)) {
      const initialHealth = [
        {
          reportId: "REP-8821",
          plantName: "Monstera Deliciosa",
          rentalRef: "GS-RENT-101",
          inspectionDate: "14 Oct 2026",
          inspector: "Elena Vance",
          status: "HEALTHY",
          moistureLevel: "Optimal (45%)",
          lightLevel: "650 Lux (Ideal)",
          observations: "Vibrant foliage, robust fenestration, active new leaf unfurling.",
          wateringAdvice: "Keep weekly watering cycle at 1.5L per planter.",
          recommendations: "Continue current placement. Natural diffused window light is optimal."
        },
        {
          reportId: "REP-8822",
          plantName: "Snake Plant (Sansevieria)",
          rentalRef: "GS-RENT-102",
          inspectionDate: "14 Oct 2026",
          inspector: "Elena Vance",
          status: "HEALTHY",
          moistureLevel: "Dry (20% - Desired)",
          lightLevel: "320 Lux (Fluorescent)",
          observations: "Rigid upright leaves with vivid golden borders. Zero signs of overwatering.",
          wateringAdvice: "Do not add water until next inspection visit.",
          recommendations: "Maintain dust-free blade surface with microfiber wipe."
        },
        {
          reportId: "REP-8823",
          plantName: "Fiddle Leaf Fig",
          rentalRef: "GS-RENT-103",
          inspectionDate: "14 Oct 2026",
          inspector: "Elena Vance",
          status: "NEEDS ATTENTION",
          moistureLevel: "Slightly low (28%)",
          lightLevel: "420 Lux (Needs boosting)",
          observations: "Minor lower leaf edge browning due to AC draft vent proximity.",
          wateringAdvice: "Provide 800ml distilled water with gentle micronutrient dose.",
          recommendations: "Moved 1.5 meters away from direct AC blast toward north-facing window."
        }
      ];
      localStorage.setItem(HEALTH_KEY, JSON.stringify(initialHealth));
    }

    // Subscriptions
    if (!localStorage.getItem(SUBSCRIPTIONS_KEY)) {
      const initialSubscriptions = [
        {
          subscriptionId: "SUB-2026-904",
          planName: "Executive Workplace Greenery - Annual Plan",
          planTier: "Enterprise Premium",
          includedPlants: "27 Curated Specimen Plants & Designer Planters",
          servicesIncluded: "Bi-Weekly Scheduled Horticultural Care, Leaf Polish & 100% Free Plant Replacement Guarantee",
          billingFrequency: "Annual",
          amount: 33790,
          startDate: "02 Oct 2026",
          renewalDate: "02 Oct 2027",
          paymentStatus: "PAID",
          status: "ACTIVE"
        }
      ];
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(initialSubscriptions));
    }

    // Payments & Invoices
    if (!localStorage.getItem(PAYMENTS_KEY)) {
      const initialPayments = [
        {
          transactionId: "TXN-8921-GS",
          invoiceNumber: "INV-2026-081",
          relatedRef: "GS-B1025 (Annual Office Rental)",
          date: "02 Oct 2026",
          amount: 33790,
          tax: 2790,
          discount: 1450,
          paymentMethod: "Corporate Visa Ending in 4118",
          status: "PAID",
          notes: "Annual corporate contract billing. Includes white-glove installation and zero-fee maintenance."
        },
        {
          transactionId: "TXN-7612-GS",
          invoiceNumber: "INV-2026-054",
          relatedRef: "GS-B0984 (Greenery Refresh)",
          date: "10 Sep 2026",
          amount: 8500,
          tax: 720,
          discount: 0,
          paymentMethod: "UPI Transfer (ABC Tech Org)",
          status: "PAID",
          notes: "Quarterly seasonal foliage replacement and soil aeration."
        }
      ];
      localStorage.setItem(PAYMENTS_KEY, JSON.stringify(initialPayments));
    }

    // Reviews
    if (!localStorage.getItem(REVIEWS_KEY)) {
      const initialReviews = [
        {
          reviewId: "REV-201",
          serviceTitle: "Office Plant Rentals - Executive Floor",
          bookingRef: "GS-B0984",
          date: "18 Sep 2026",
          rating: 5,
          feedback: "The transformation in our executive suite and meeting rooms is remarkable. Elena and the team handled delivery without disrupting our office hours. The plants look vibrant and lush!",
          aspects: ["Punctuality", "Plant Vitality", "Professional Team"],
          companyReply: "Thank you Preteka! We take immense pride in keeping ABC Technologies' workspaces healthy and green."
        }
      ];
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(initialReviews));
    }

    // Notifications
    if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
      const initialNotifications = [
        {
          id: "NOTIF-1",
          title: "Maintenance Appointment Scheduled",
          message: "Elena Vance is scheduled to perform plant maintenance and leaf polish on 28 Oct 2026 at 10:30 AM.",
          type: "maintenance",
          link: "maintenance.html",
          timestamp: "2 hours ago",
          read: false
        },
        {
          id: "NOTIF-2",
          title: "New Plant Health Audit Logged",
          message: "Inspection reports for Monstera, Snake Plant, and Fiddle Leaf Fig have been published by the care specialist.",
          type: "health",
          link: "health-reports.html",
          timestamp: "14 Oct 2026",
          read: false
        },
        {
          id: "NOTIF-3",
          title: "Booking GS-B1025 Confirmed",
          message: "Your white-glove installation is confirmed for 20 Oct 2026 between 10:00 AM – 12:00 PM.",
          type: "booking",
          link: "bookings.html",
          timestamp: "02 Oct 2026",
          read: true
        },
        {
          id: "NOTIF-4",
          title: "Payment Receipt Available",
          message: "Invoice INV-2026-081 for ₹33,790 was successfully processed and receipt is ready for download.",
          type: "payment",
          link: "payments.html",
          timestamp: "02 Oct 2026",
          read: true
        }
      ];
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(initialNotifications));
    }
  }

  // Data Store Accessor
  const UserDashboardData = {
    getCurrentUser: function () {
      try {
        const raw = sessionStorage.getItem(USER_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return {
        userId: "demo_user_greenspace",
        name: "GreenSpace Demo User",
        email: "demo.user@greenspace.local",
        company: "GreenSpace Botanical Demo",
        phone: "+91 98765 43210",
        address: "742 Evergreen Business Park, Tech Zone",
        city: "Coimbatore",
        state: "Tamil Nadu",
        postalCode: "641014",
        memberSince: "Development Demo",
        role: "user",
        accountType: "Demo",
        isDemo: true
      };
    },

    updateCurrentUser: function (updates) {
      const current = this.getCurrentUser();
      const updated = { ...current, ...updates };
      sessionStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    },

    getRentals: function () {
      try {
        return JSON.parse(localStorage.getItem(RENTALS_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    getBookings: function () {
      try {
        return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    addBooking: function (bookingData) {
      const bookings = this.getBookings();
      const newBooking = {
        bookingId: "GS-B" + Math.floor(1000 + Math.random() * 9000),
        userId: this.getCurrentUser().userId,
        customerName: this.getCurrentUser().name,
        company: this.getCurrentUser().company,
        bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: "CONFIRMED",
        paymentStatus: "PENDING",
        team: "GreenSpace White-Glove Installation Team",
        ...bookingData
      };
      bookings.unshift(newBooking);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      this.addNotification({
        title: "Rental Booking Created",
        message: `Booking ${newBooking.bookingId} for ${newBooking.service || 'Plant Rental'} has been recorded.`,
        type: "booking",
        link: "bookings.html"
      });
      return newBooking;
    },

    getMaintenance: function () {
      try {
        return JSON.parse(localStorage.getItem(MAINTENANCE_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    scheduleMaintenance: function (data) {
      const records = this.getMaintenance();
      const newRecord = {
        maintenanceId: "MNT-2026-" + Math.floor(500 + Math.random() * 500),
        status: "SCHEDULED",
        technician: "Elena Vance (Senior Horticulturalist)",
        tasks: [
          "Nutrient check & root inspection",
          "Moisture reading and foliage shine",
          "Aesthetic pruning and diagnostics"
        ],
        ...data
      };
      records.unshift(newRecord);
      localStorage.setItem(MAINTENANCE_KEY, JSON.stringify(records));
      this.addNotification({
        title: "Maintenance Appointment Scheduled",
        message: `Appointment on ${data.date} (${data.timeWindow}) for ${data.rentalId} has been confirmed.`,
        type: "maintenance",
        link: "maintenance.html"
      });
      return newRecord;
    },

    getHealthReports: function () {
      try {
        return JSON.parse(localStorage.getItem(HEALTH_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    getSubscriptions: function () {
      try {
        return JSON.parse(localStorage.getItem(SUBSCRIPTIONS_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    getPayments: function () {
      try {
        return JSON.parse(localStorage.getItem(PAYMENTS_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    getReviews: function () {
      try {
        return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    addReview: function (reviewData) {
      const reviews = this.getReviews();
      const newReview = {
        reviewId: "REV-" + Math.floor(200 + Math.random() * 800),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        companyReply: "Thank you for your feedback! Our care team appreciates your partnership.",
        ...reviewData
      };
      reviews.unshift(newReview);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
      return newReview;
    },

    getNotifications: function () {
      try {
        return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    addNotification: function (notif) {
      const notifs = this.getNotifications();
      const item = {
        id: "NOTIF-" + Date.now(),
        timestamp: "Just now",
        read: false,
        ...notif
      };
      notifs.unshift(item);
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
      return item;
    },

    markNotificationRead: function (id) {
      const notifs = this.getNotifications();
      const item = notifs.find(n => n.id === id);
      if (item) {
        item.read = true;
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
      }
      return notifs;
    },

    markAllNotificationsRead: function () {
      const notifs = this.getNotifications();
      notifs.forEach(n => { n.read = true; });
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
      return notifs;
    },

    getCatalogPlants: function () {
      return defaultPlants;
    }
  };

  // Toast Notification Controller
  function showToast(message, type = 'success') {
    let container = document.getElementById('dashboardToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dashboardToastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `dashboard-toast ${type === 'danger' ? 'border-red-500' : ''}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="${type === 'danger' ? 'text-red-500' : 'text-emerald-500'}">
        ${type === 'danger' 
          ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
          : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'}
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Modal Open/Close Utility
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Theme & RTL synchronization
  function initThemeAndRTL() {
    const THEME_KEY = 'greenspace_theme';
    const DIR_KEY = 'greenspace_dir';

    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('dir', savedDir);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Bind toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        document.documentElement.setAttribute('data-theme', next);
        if (next === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        updateThemeIcons();
      };
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const current = document.documentElement.getAttribute('dir') || 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        localStorage.setItem(DIR_KEY, next);
        document.documentElement.setAttribute('dir', next);
        updateRTLIcons();
      };
    });

    function updateThemeIcons() {
      const isDark = document.documentElement.classList.contains('dark');
      document.querySelectorAll('.theme-toggle-text').forEach(t => {
        t.textContent = isDark ? 'Light' : 'Dark';
      });
    }

    function updateRTLIcons() {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      document.querySelectorAll('.rtl-toggle-text').forEach(t => {
        t.textContent = isRtl ? 'LTR' : 'RTL';
      });
    }

    updateThemeIcons();
    updateRTLIcons();
  }

  // Common UI Initialization
  function initCommonUI() {
    initUserData();
    initThemeAndRTL();

    const user = UserDashboardData.getCurrentUser();

    // Populate user elements across topbar and sidebar
    document.querySelectorAll('.current-user-name').forEach(el => {
      el.textContent = user.name || 'Preteka';
    });
    document.querySelectorAll('.current-user-email').forEach(el => {
      el.textContent = user.email || 'customer@email.com';
    });
    document.querySelectorAll('.current-user-company').forEach(el => {
      el.textContent = user.company || 'ABC Technologies';
    });
    document.querySelectorAll('.current-user-avatar').forEach(el => {
      el.textContent = (user.name || 'P').charAt(0).toUpperCase();
    });

    // Notifications Badge Counter
    const unreadCount = UserDashboardData.getNotifications().filter(n => !n.read).length;
    document.querySelectorAll('.unread-notification-count').forEach(el => {
      if (unreadCount > 0) {
        el.textContent = unreadCount;
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });

    // Mobile Sidebar Drawer
    const sidebar = document.getElementById('dashboardSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

    function openSidebar() {
      if (sidebar && backdrop) {
        sidebar.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeSidebar() {
      if (sidebar && backdrop) {
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (mobileMenuBtn) mobileMenuBtn.onclick = openSidebar;
    if (sidebarCloseBtn) sidebarCloseBtn.onclick = closeSidebar;
    if (backdrop) backdrop.onclick = closeSidebar;

    // Profile Dropdown
    const profilePill = document.getElementById('topbarProfilePill');
    const profileDropdown = document.getElementById('profileDropdownContainer');

    if (profilePill && profileDropdown) {
      profilePill.onclick = (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('open');
      };

      document.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target)) {
          profileDropdown.classList.remove('open');
        }
      });
    }

    // Modal Overlays click to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    document.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.onclick = () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      };
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSidebar();
        document.querySelectorAll('.modal-overlay.active').forEach(m => {
          m.classList.remove('active');
        });
        document.body.style.overflow = '';
        if (profileDropdown) profileDropdown.classList.remove('open');
      }
    });

    // Logout
    document.querySelectorAll('.dashboard-logout-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        sessionStorage.removeItem(USER_KEY);
        sessionStorage.removeItem('greenspace_admin_session');
        sessionStorage.removeItem('adminAuthenticated');
        window.location.href = '../index.html';
      };
    });

    // Active Nav Highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Public Interface
  window.GreenSpaceUserDashboard = {
    Data: UserDashboardData,
    showToast: showToast,
    openModal: openModal,
    closeModal: closeModal,
    init: initCommonUI
  };

  document.addEventListener('DOMContentLoaded', initCommonUI);
})();
