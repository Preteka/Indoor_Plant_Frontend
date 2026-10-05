/**
 * GreenSpace Rentals - Authentication & Customer Lifecycle Data Layer
 * Handles temporary session preservation, user auth state, and lifecycle records.
 * Structured cleanly so a Node.js/Express + Firebase/MongoDB backend can easily plug in.
 */

window.GreenSpaceAuth = (function() {
  const SESSION_USER_KEY = 'gs_current_user';
  const PENDING_QUOTE_KEY = 'pendingQuote';
  const REQUESTS_KEY = 'gs_customer_requests';
  const QUOTES_KEY = 'gs_customer_quotes';
  const BOOKINGS_KEY = 'gs_customer_bookings';
  const PAYMENTS_KEY = 'gs_customer_payments';

  // Seed default demo user if not set
  function initDefaults() {
    if (!sessionStorage.getItem(SESSION_USER_KEY)) {
      // Default demo state: empty or unauthenticated initially, with pre-configured default demo profile available
    }

    if (!localStorage.getItem(REQUESTS_KEY)) {
      const initialRequests = [
        {
          requestId: "GS-REQ-6602",
          userId: "user_preteka_1",
          customerName: "Preteka",
          company: "ABC Technologies",
          email: "customer@email.com",
          phone: "+91 98765 43210",
          service: "office-rental",
          serviceTitle: "Office Plant Rentals",
          location: "Coimbatore",
          spaceType: "Corporate Office",
          spaceSize: "3,500 sq ft",
          estimatedPlants: "25",
          preferredDate: "20 October 2026",
          requirements: "Office reception, meeting rooms and executive workspaces.",
          status: "UNDER REVIEW", // NEW, UNDER REVIEW, CONSULTATION SCHEDULED, QUOTE READY, QUOTE APPROVED, PAYMENT PENDING, PAID, BOOKING CONFIRMED, INSTALLATION SCHEDULED, ACTIVE, MAINTENANCE
          createdAt: "02 Oct 2026",
          consultation: {
            scheduled: true,
            date: "20 October 2026",
            time: "11:00 AM",
            assignedStaff: "Elena Vance (Senior Horticulturalist)",
            notes: "On-site assessment of natural light zones in reception and boardrooms."
          }
        }
      ];
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(initialRequests));
    }

    if (!localStorage.getItem(QUOTES_KEY)) {
      const initialQuotes = [
        {
          quoteId: "GS-Q1025",
          requestId: "GS-REQ-6602",
          userId: "user_preteka_1",
          customerName: "Preteka",
          company: "ABC Technologies",
          service: "Office Plant Rental",
          items: [
            { name: "Curated Statement Plants (Ficus, Monstera, Palms)", quantity: 15, unitPrice: 850, total: 12750 },
            { name: "Desk & Mid-Tier Foliage (ZZ Plants, Sansevieria)", quantity: 10, unitPrice: 450, total: 4500 },
            { name: "Architectural Ceramic & Sub-irrigation Planters", quantity: 25, unitPrice: 380, total: 9500 },
            { name: "White-Glove Delivery & Installation", quantity: 1, unitPrice: 2500, total: 2500 },
            { name: "Monthly Routine Maintenance & Replacement Guarantee", quantity: 1, unitPrice: 3200, total: 3200 }
          ],
          subtotal: 32450,
          discount: 1450,
          tax: 2790,
          total: 33790,
          validity: "Valid until 30 October 2026",
          terms: "Includes weekly care, leaf polishing, nutrient feeding, and 100% free plant replacement guarantee.",
          status: "QUOTE READY" // QUOTE READY, APPROVED, DECLINED
        }
      ];
      localStorage.setItem(QUOTES_KEY, JSON.stringify(initialQuotes));
    }

    if (!localStorage.getItem(BOOKINGS_KEY)) {
      const initialBookings = [
        {
          bookingId: "GS-B1025",
          quoteId: "GS-Q1025",
          userId: "user_preteka_1",
          customerName: "Preteka",
          company: "ABC Technologies",
          service: "Office Plant Rental",
          paymentStatus: "PAID",
          status: "CONFIRMED",
          installation: {
            status: "SCHEDULED", // SCHEDULED, IN PROGRESS, COMPLETED
            date: "20 October 2026",
            timeWindow: "10:00 AM – 12:00 PM",
            team: "GreenSpace White-Glove Installation Team",
            notes: "Ground floor reception & 2nd floor conference suites."
          },
          activeRental: {
            plantCount: 25,
            location: "Coimbatore - ABC Technologies Campus",
            nextMaintenance: "28 October 2026",
            status: "ACTIVE",
            tasks: [
              "Precision root watering",
              "Aesthetic pruning & shaping",
              "Foliage shine & dust removal",
              "Plant health & pest diagnostic audit",
              "Soil moisture check"
            ]
          },
          plantHealth: [
            { plant: "Monstera Deliciosa", location: "Executive Boardroom", health: "HEALTHY", lastChecked: "02 Oct 2026" },
            { plant: "Snake Plant (Sansevieria)", location: "Reception Entryway", health: "HEALTHY", lastChecked: "02 Oct 2026" },
            { plant: "Fiddle Leaf Fig", location: "Manager Cabin A", health: "NEEDS ATTENTION", lastChecked: "02 Oct 2026", notes: "Relocating closer to diffused window light" },
            { plant: "Areca Palm Specimen", location: "Main Hallway", health: "HEALTHY", lastChecked: "02 Oct 2026" }
          ]
        }
      ];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
    }
  }

  initDefaults();

  return {
    // Current authenticated user
    getCurrentUser: function() {
      const raw = sessionStorage.getItem(SESSION_USER_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch(e) {
        return null;
      }
    },

    // Login
    login: function(email, password) {
      const user = {
        userId: "user_" + (email.split('@')[0] || 'customer'),
        name: email.split('@')[0] ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) : "Preteka",
        email: email,
        company: "ABC Technologies",
        phone: "+91 98765 43210"
      };
      sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
      return user;
    },

    // Signup
    signup: function(userData) {
      const user = {
        userId: "user_" + Date.now(),
        name: userData.name || "Preteka",
        email: userData.email,
        company: userData.company || "ABC Technologies",
        phone: userData.phone || "+91 98765 43210"
      };
      sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
      return user;
    },

    // Logout
    logout: function() {
      sessionStorage.removeItem(SESSION_USER_KEY);
    },

    // Temporary Quote Preservation before login
    savePendingQuote: function(data) {
      sessionStorage.setItem(PENDING_QUOTE_KEY, JSON.stringify(data));
    },

    getPendingQuote: function() {
      const raw = sessionStorage.getItem(PENDING_QUOTE_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch(e) {
        return null;
      }
    },

    clearPendingQuote: function() {
      sessionStorage.removeItem(PENDING_QUOTE_KEY);
    },

    // Requests
    getRequests: function() {
      const raw = localStorage.getItem(REQUESTS_KEY);
      return raw ? JSON.parse(raw) : [];
    },

    addRequest: function(reqData) {
      const requests = this.getRequests();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newReq = {
        requestId: `GS-REQ-${randomNum}`,
        userId: reqData.userId || (this.getCurrentUser()?.userId || 'guest_user'),
        customerName: reqData.customerName || (this.getCurrentUser()?.name || 'Customer'),
        company: reqData.company || (this.getCurrentUser()?.company || 'Company'),
        email: reqData.email || (this.getCurrentUser()?.email || 'customer@email.com'),
        phone: reqData.phone || (this.getCurrentUser()?.phone || '+91 98765 43210'),
        service: reqData.service || 'office-rental',
        serviceTitle: reqData.serviceTitle || 'Office Plant Rentals',
        location: reqData.location || 'Coimbatore',
        spaceType: reqData.spaceType || 'Corporate Office',
        spaceSize: reqData.spaceSize || 'Approx 2,500 sq ft',
        estimatedPlants: reqData.estimatedPlants || '25 Plants',
        preferredDate: reqData.preferredDate || '20 October 2026',
        requirements: reqData.requirements || 'Office spaces, lobby and conference rooms.',
        status: 'UNDER REVIEW',
        createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };

      requests.unshift(newReq);
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
      return newReq;
    },

    // Quotes
    getQuotes: function() {
      const raw = localStorage.getItem(QUOTES_KEY);
      return raw ? JSON.parse(raw) : [];
    },

    approveQuote: function(quoteId) {
      const quotes = this.getQuotes();
      const quote = quotes.find(q => q.quoteId === quoteId);
      if (quote) {
        quote.status = 'APPROVED';
        localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
      }
      return quote;
    },

    // Bookings
    getBookings: function() {
      const raw = localStorage.getItem(BOOKINGS_KEY);
      return raw ? JSON.parse(raw) : [];
    },

    addBookingFromQuote: function(quoteId, paymentRef) {
      const bookings = this.getBookings();
      const quotes = this.getQuotes();
      const quote = quotes.find(q => q.quoteId === quoteId);

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newBooking = {
        bookingId: `GS-B${randomNum}`,
        quoteId: quoteId,
        userId: this.getCurrentUser()?.userId || 'user_preteka_1',
        customerName: this.getCurrentUser()?.name || 'Preteka',
        company: this.getCurrentUser()?.company || 'ABC Technologies',
        service: quote ? quote.service : 'Office Plant Rental',
        paymentStatus: 'PAID',
        paymentRef: paymentRef,
        status: 'CONFIRMED',
        installation: {
          status: 'SCHEDULED',
          date: '20 October 2026',
          timeWindow: '10:00 AM – 12:00 PM',
          team: 'GreenSpace White-Glove Installation Team',
          notes: 'Installation confirmed. Nursery plants pre-treated.'
        },
        activeRental: {
          plantCount: quote ? 25 : 15,
          location: 'Customer Workplace Premises',
          nextMaintenance: '28 October 2026',
          status: 'ACTIVE',
          tasks: [
            'Precision moisture testing',
            'Foliage cleaning & shine application',
            'Nutrient dosing',
            'Pruning & deadheading',
            'Health audit'
          ]
        }
      };

      bookings.unshift(newBooking);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return newBooking;
    }
  };
})();
