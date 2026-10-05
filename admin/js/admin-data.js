(function () {
  const STORAGE_KEY = 'greenspace_admin_data_store';

  const defaultData = {
    customers: [
      { id: 1, name: 'GreenTech Solutions', contact: 'Riya Shah', email: 'riya@greentech.solutions', activeRentals: 4, bookings: 6, paymentStatus: 'On Time', status: 'Active' },
      { id: 2, name: 'Bloom Events', contact: 'Neha Patel', email: 'neha@bloomevents.in', activeRentals: 2, bookings: 3, paymentStatus: 'Pending', status: 'Active' },
      { id: 3, name: 'Northwind Labs', contact: 'Arun Nair', email: 'arun@northwindlabs.com', activeRentals: 3, bookings: 4, paymentStatus: 'Paid', status: 'Active' },
      { id: 4, name: 'UrbanDesk Pvt Ltd', contact: 'Meera Rao', email: 'meera@urbandesk.co', activeRentals: 5, bookings: 8, paymentStatus: 'Due', status: 'Review' }
    ],
    requests: [
      { id: 'GS-1024', customer: 'GreenTech Solutions', service: 'Office Plant Rental', requestedDate: '08 Oct 2026', budget: '₹18,500', status: 'Pending' },
      { id: 'GS-1026', customer: 'Bloom Events', service: 'Corporate Event Plants', requestedDate: '09 Oct 2026', budget: '₹12,000', status: 'Quote Sent' },
      { id: 'GS-1031', customer: 'UrbanDesk Pvt Ltd', service: 'Monthly Plant Maintenance', requestedDate: '10 Oct 2026', budget: '₹8,500', status: 'Approved' },
      { id: 'GS-1038', customer: 'Northwind Labs', service: 'Reception Refresh', requestedDate: '12 Oct 2026', budget: '₹14,200', status: 'Under Review' },
      { id: 'GS-1042', customer: 'Fable Works', service: 'Office Green Wall', requestedDate: '14 Oct 2026', budget: '₹25,000', status: 'New' }
    ],
    bookings: [
      { id: 'BK-2041', customer: 'GreenTech Solutions', service: 'Office Installation', date: '08 Oct 2026', time: '10:30 AM', team: 'Field Team 2', status: 'Confirmed' },
      { id: 'BK-2048', customer: 'Bloom Events', service: 'Corporate Event Plants', date: '11 Oct 2026', time: '09:00 AM', team: 'Event Crew', status: 'Scheduled' },
      { id: 'BK-2052', customer: 'UrbanDesk Pvt Ltd', service: 'Monthly Plant Maintenance', date: '14 Oct 2026', time: '01:15 PM', team: 'Care Team 1', status: 'In Progress' },
      { id: 'BK-2056', customer: 'Northwind Labs', service: 'Reception Refresh', date: '16 Oct 2026', time: '11:00 AM', team: 'Design Team', status: 'Completed' }
    ],
    maintenance: [
      { customer: 'GreenTech Solutions', location: 'Bengaluru HQ', visitDate: '08 Oct 2026', health: 'Healthy', nextVisit: '22 Oct 2026', status: 'On Track' },
      { customer: 'Northwind Labs', location: 'Pune Office', visitDate: '09 Oct 2026', health: 'Needs Attention', nextVisit: '23 Oct 2026', status: 'Scheduled' },
      { customer: 'Bloom Events', location: 'Goa Venue', visitDate: '10 Oct 2026', health: 'Treatment Required', nextVisit: '25 Oct 2026', status: 'Monitor' },
      { customer: 'UrbanDesk Pvt Ltd', location: 'Hyderabad Campus', visitDate: '12 Oct 2026', health: 'Replacement Required', nextVisit: '27 Oct 2026', status: 'Action Needed' }
    ],
    payments: [
      { id: 'PMT-1018', customer: 'GreenTech Solutions', amount: '₹18,500', date: '08 Oct 2026', method: 'UPI', status: 'Paid' },
      { id: 'PMT-1019', customer: 'Bloom Events', amount: '₹12,000', date: '09 Oct 2026', method: 'Bank Transfer', status: 'Pending' },
      { id: 'PMT-1020', customer: 'Northwind Labs', amount: '₹24,000', date: '10 Oct 2026', method: 'Card', status: 'Failed' },
      { id: 'PMT-1021', customer: 'UrbanDesk Pvt Ltd', amount: '₹8,500', date: '11 Oct 2026', method: 'Wallet', status: 'Refunded' }
    ],
    blogPosts: [
      { title: 'How Office Plants Create Healthier Workspaces', category: 'Workplace Wellness', date: '02 Oct 2026', status: 'Published' },
      { title: 'Choosing the Right Plants for Low-Light Offices', category: 'Plant Care', date: '24 Sep 2026', status: 'Published' },
      { title: 'The Complete Guide to Corporate Plant Rentals', category: 'Office Plants', date: '15 Sep 2026', status: 'Draft' }
    ]
  };

  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : JSON.parse(JSON.stringify(defaultData));
    } catch (error) {
      return JSON.parse(JSON.stringify(defaultData));
    }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  window.AdminData = {
    key: STORAGE_KEY,
    load: loadData,
    save: saveData,
    default: defaultData
  };
})();
