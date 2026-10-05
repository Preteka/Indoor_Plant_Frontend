/**
 * GreenSpace Rentals - Blog Data Source
 * Central repository for all 6 curated articles with comprehensive content, metadata, and relations.
 */

const blogPosts = [
  {
    id: 1,
    slug: "benefits-of-office-plants",
    category: "Workplace Wellness",
    title: "How Office Plants Create Healthier Workspaces",
    excerpt: "Discover the backed science behind biophilic integration in corporate environments, from boosting air filtration to enhancing cognitive focus by over 15%.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    author: "Elena Vance",
    authorRole: "Founder & Chief Biophilic Architect",
    authorBio: "Elena is a landscape architect with 12+ years championing human-centric biophilic design in modern corporate office towers.",
    authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    date: "October 02, 2026",
    readTime: "5 min read",
    relatedPosts: [2, 3, 6],
    content: `
      <p class="lead-text text-lg sm:text-xl font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed mb-6">
        As companies transition to hybrid working models, the office is no longer just a place to sit at a desk—it is a destination designed for collaboration, well-being, and mental rejuvenation. Incorporating live botanical plants directly addresses the physical and psychological needs of modern professionals.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">1. Natural Air Purification & VOC Reduction</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
        According to foundational clean-air studies, sealed modern office buildings often accumulate volatile organic compounds (VOCs) emitted from synthetic carpets, laminated furniture, and printer inks. Architectural plants such as the <em>Spathiphyllum (Peace Lily)</em>, <em>Sansevieria trifasciata (Snake Plant)</em>, and <em>Dracaena reflexa</em> absorb harmful compounds through their stomata while continuously elevating ambient oxygen and humidity levels.
      </p>

      <blockquote class="my-8 p-6 sm:p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border-l-4 border-emerald-500 italic text-emerald-900 dark:text-emerald-100 font-medium">
        "Workplaces with curated living greenery consistently report a 15% improvement in employee productivity and a 37% reduction in reported workplace tension and anxiety."
      </blockquote>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">2. Acoustic Softening in Open Floorplans</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
        Echoes and harsh sound reverberation in open-plan spaces cause fatigue and reduce conversational clarity. Large-leaf varieties like Fiddle Leaf Figs and living green divider walls act as natural acoustic baffles, absorbing mid-to-high frequency decibels and providing visual micro-privacy without constructing rigid drywall barriers.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">3. Restoring Cognitive Focus (Attention Restoration Theory)</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-6">
        Continuous screen exposure creates mental exhaustion known as directed attention fatigue. Glimpsing organic botanical forms provides 'soft fascination', allowing brain networks responsible for high-level problem solving to rest and recharge throughout the workday.
      </p>

      <div class="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-md my-8">
        <h4 class="font-heading font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
          <i data-lucide="check-circle-2" class="w-5 h-5"></i>
          Key GreenSpace Takeaways
        </h4>
        <ul class="space-y-2 text-sm text-[#4B5B47] dark:text-[#B6CEBE]">
          <li>• Place at least one floor plant per 100 square feet of office space for optimal ambient balance.</li>
          <li>• Group diverse textures (e.g., broad-leaf Monstera + vertical Snake Plants) to maximize biophilic engagement.</li>
          <li>• Utilize professional sub-irrigated rental planters to eliminate soil gnats and root rot.</li>
        </ul>
      </div>
    `
  },
  {
    id: 2,
    slug: "low-light-office-plants",
    category: "Plant Care",
    title: "Choosing the Right Plants for Low-Light Offices",
    excerpt: "Interior offices and windowless meeting rooms do not have to be barren. Learn the top resilient species that thrive beautifully under artificial LED lighting.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=85",
    author: "Dr. Julian Ross",
    authorRole: "Master Botanist & Soil Ecologist",
    authorBio: "Dr. Ross oversees horticultural diagnostics, plant acclimation protocols, and organic nutrient formulation across GreenSpace facilities.",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    date: "September 24, 2026",
    readTime: "6 min read",
    relatedPosts: [1, 3, 5],
    content: `
      <p class="lead-text text-lg sm:text-xl font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed mb-6">
        One of the most common misconceptions in commercial facility management is that live plants can only survive next to expansive floor-to-ceiling glass windows. In reality, multiple tropical understory species naturally thrive in low photon environments.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">Top 4 Low-Light Commercial Champions</h2>
      
      <div class="space-y-6 my-6">
        <div class="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-xl text-[#17352D] dark:text-white mb-2">1. Zamioculcas Zamiifolia (ZZ Plant)</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            Boasting glossy waxy emerald leaves that reflect ambient office light, the ZZ plant stores moisture in thick underground rhizomes. It tolerates deep shade, fluorescent fixtures, and irregular watering with graceful resilience.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-xl text-[#17352D] dark:text-white mb-2">2. Aglaonema (Chinese Evergreen)</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            With striking silver, cream, and pink variegations, Aglaonema varieties provide lush color contrast without demanding high foot-candles of light.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-xl text-[#17352D] dark:text-white mb-2">3. Sansevieria (Snake Plant / Laurentii)</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            Vertical architectural spears that occupy minimal floor footprint. Snake plants perform Crassulacean Acid Metabolism (CAM), releasing oxygen during nighttime hours even in dim rooms.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-xl text-[#17352D] dark:text-white mb-2">4. Aspidistra Elatior (Cast Iron Plant)</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            Virtually indestructible, this deep green foliage thrives in cold drafts, low lighting, and heavy traffic corridors where other species struggle.
          </p>
        </div>
      </div>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">How GreenSpace Calibrates Low-Light Care</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-6">
        Plants in low light consume significantly less water than those under bright sunlight. Overwatering is the #1 killer of corporate greenery. Our technicians use digital sub-surface moisture probes and specialized nursery rotation cycles to guarantee pristine vitality.
      </p>
    `
  },
  {
    id: 3,
    slug: "corporate-plant-rentals-guide",
    category: "Office Plants",
    title: "The Complete Guide to Corporate Plant Rentals",
    excerpt: "Why buying plants outright often fails for businesses, and how full-service rental subscriptions protect your budget and workplace aesthetic.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
    author: "Marcus Chen",
    authorRole: "Head of Operations & Logistics",
    authorBio: "Marcus coordinates our white-glove delivery fleet, custom architectural planter fittings, and scheduled maintenance routing nationwide.",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    date: "September 15, 2026",
    readTime: "7 min read",
    relatedPosts: [1, 2, 4],
    content: `
      <p class="lead-text text-lg sm:text-xl font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed mb-6">
        Purchasing corporate greenery seems straightforward at first glance—until administrative staff are burdened with watering schedules, dying leaves, messy soil spills, and expensive recurring replacements when plants deteriorate within weeks.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">Buying vs. Renting: The Financial & Operational Reality</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
        When an enterprise buys commercial plants directly, it absorbs 100% of the horticultural risk. Without proper lighting assessment, sub-irrigation planters, and scheduled pruning, up to 60% of office plants perish within the first 6 months.
      </p>

      <div class="overflow-x-auto my-8">
        <table class="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden shadow-md">
          <thead>
            <tr class="bg-emerald-800 text-white">
              <th class="p-4 font-heading font-bold">Feature</th>
              <th class="p-4 font-heading font-bold">Direct Purchase</th>
              <th class="p-4 font-heading font-bold bg-emerald-600">GreenSpace Subscription</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border)] bg-[var(--surface)] text-[#4B5B47] dark:text-[#B6CEBE]">
            <tr>
              <td class="p-4 font-medium text-[#17352D] dark:text-white">Upfront Capital Expenditure</td>
              <td class="p-4 text-rose-600 dark:text-rose-400 font-semibold">High ($5,000 - $20,000+)</td>
              <td class="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">$0 CapEx (Low Monthly OpEx)</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-[#17352D] dark:text-white">Maintenance Responsibility</td>
              <td class="p-4">Internal staff / Inconsistent</td>
              <td class="p-4 font-semibold text-emerald-600 dark:text-emerald-400">100% Certified Specialists</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-[#17352D] dark:text-white">Plant Replacement Guarantee</td>
              <td class="p-4 text-rose-600 dark:text-rose-400">Full replacement cost per plant</td>
              <td class="p-4 font-semibold text-emerald-600 dark:text-emerald-400">100% Free 48hr Swaps</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-[#17352D] dark:text-white">Planter Design Matching</td>
              <td class="p-4">Generic plastic pots</td>
              <td class="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Architectural Designer Planters</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">What's Included in Every GreenSpace Package</h2>
      <ul class="space-y-3 text-base text-[#4B5B47] dark:text-[#B6CEBE] mb-6">
        <li class="flex items-start gap-3">
          <i data-lucide="check" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span><strong>Tailored On-Site Botanical Curation:</strong> Comprehensive lighting, climate, and spatial analysis by our senior designers.</span>
        </li>
        <li class="flex items-start gap-3">
          <i data-lucide="check" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span><strong>Designer Sub-Irrigated Vessels:</strong> Clean self-watering containers that eliminate water stains on marble and carpet.</span>
        </li>
        <li class="flex items-start gap-3">
          <i data-lucide="check" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span><strong>Scheduled White-Glove Care:</strong> Bi-weekly visits including hydration, organic leaf polish, pruning, and health diagnostics.</span>
        </li>
        <li class="flex items-start gap-3">
          <i data-lucide="check" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span><strong>Zero-Friction Plant Swaps:</strong> Any plant that loses luster is replaced instantly at zero additional billing.</span>
        </li>
      </ul>
    `
  },
  {
    id: 4,
    slug: "greenery-transforms-events",
    category: "Events & Decor",
    title: "How Greenery Transforms Corporate Events",
    excerpt: "From luxury brand activations and gala arches to high-stakes tech summits, discover how temporary living plants elevate experiential aesthetics.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85",
    author: "Chloe Davies",
    authorRole: "Lead Event Greenery Designer",
    authorBio: "Chloe creates experiential botanical stage backdrops, VIP lounge foliage, and living floral photo opportunities for international conferences.",
    authorPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    date: "August 30, 2026",
    readTime: "5 min read",
    relatedPosts: [1, 3, 6],
    content: `
      <p class="lead-text text-lg sm:text-xl font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed mb-6">
        In event production, attendees judge an experience within the first seven seconds of entering a venue. Live biophilic installations create an immediate emotional impact that static foam cutouts and banner stands simply cannot replicate.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">1. Immersive Stage & Keynote Backdrops</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
        Rather than flat digital screens, layering lush Kentia palms, sculptural Monsteras, and living tropical walls frames speakers with organic prestige. On live video streams and photography, living foliage adds depth, cinematic contrast, and natural warmth.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">2. Intuitive Space Partitioning & Flow</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
        Large conference exhibition halls often feel cold and cavernous. Mobile planter troughs and dense bamboo clusters guide attendee foot traffic effortlessly while demarcating VIP greenrooms and quiet meeting pods without harsh stanchions.
      </p>

      <blockquote class="my-8 p-6 sm:p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border-l-4 border-emerald-500 italic text-emerald-900 dark:text-emerald-100 font-medium">
        "GreenSpace Rentals provided rapid deployment and teardown for our 2,000-person summit in under 3 hours. The atmosphere went from an empty concrete convention hall to an inspiring botanical oasis."
      </blockquote>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">3. Sustainable Alternative to Cut Flowers</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-6">
        Cut flowers generate immense organic waste and are discarded within hours. GreenSpace living event rentals return safely to our acclimation greenhouses after each event, aligning corporate summits with stringent zero-waste sustainability pledges.
      </p>
    `
  },
  {
    id: 5,
    slug: "plant-care-mistakes-to-avoid",
    category: "Plant Care",
    title: "Plant Care Mistakes Businesses Should Avoid",
    excerpt: "Avoid yellowing leaves, overwatering disasters, and improper pot placement. Master the essential rules of indoor plant stewardship with expert horticultural advice.",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80",
    coverImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1600&q=85",
    author: "Dr. Julian Ross",
    authorRole: "Master Botanist & Soil Ecologist",
    authorBio: "Dr. Ross oversees horticultural diagnostics, plant acclimation protocols, and organic nutrient formulation across GreenSpace facilities.",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    date: "August 18, 2026",
    readTime: "6 min read",
    relatedPosts: [2, 3, 6],
    content: `
      <p class="lead-text text-lg sm:text-xl font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed mb-6">
        Well-intentioned office workers often cause more harm than good when attempting amateur plant care. Understanding plant physiology prevents the most frequent office plant failures.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">The 5 Most Common Corporate Greenery Pitfalls</h2>
      
      <div class="space-y-4 my-6">
        <div class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-lg text-rose-600 dark:text-rose-400 mb-1">Mistake #1: The "Coffee Leftovers" Myth</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            Pouring lukewarm coffee, tea, or soda into planter soil alters soil pH drastically, introduces fungal gnats, and burns root hairs. Always use pure room-temperature water.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-lg text-rose-600 dark:text-rose-400 mb-1">Mistake #2: Overwatering by Committee</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            When multiple team members independently water a plant "just in case", roots suffocate in stagnant water, causing root rot. Sub-irrigated reservoirs solve this automatically.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-lg text-rose-600 dark:text-rose-400 mb-1">Mistake #3: Placing Plants Directly Below HVAC Vents</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            Blasts of dry air conditioning in summer or scorching heating air in winter causes sudden leaf drop and cellular desiccation. Keep plants at least 4 feet away from direct vent lines.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 class="font-heading font-bold text-lg text-rose-600 dark:text-rose-400 mb-1">Mistake #4: Ignoring Dust Accumulation on Leaves</h3>
          <p class="text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed">
            Office dust blocks sunlight from reaching chloroplasts, reducing photosynthetic efficiency by up to 40%. Professional bi-weekly wiping with organic neem solution restores full health.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 6,
    slug: "biophilic-design-modern-workplaces",
    category: "Sustainability",
    title: "Why Biophilic Design Matters in Modern Workplaces",
    excerpt: "Explore the psychological architecture connecting human biology with living natural elements, creating inspiring and sustainable commercial spaces.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    coverImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85",
    author: "Elena Vance",
    authorRole: "Founder & Chief Biophilic Architect",
    authorBio: "Elena is a landscape architect with 12+ years championing human-centric biophilic design in modern corporate office towers.",
    authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    date: "August 04, 2026",
    readTime: "6 min read",
    relatedPosts: [1, 3, 4],
    content: `
      <p class="lead-text text-lg sm:text-xl font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed mb-6">
        Human beings evolved in direct synchrony with natural circadian patterns, lush flora, and running water. Yet modern professionals spend upwards of 90% of their lives enclosed in synthetic indoor structures with artificial lighting and sterile drywall.
      </p>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">The 3 Pillars of Biophilic Workplace Architecture</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
        Biophilic design is not merely placing a single potted succulent on a reception desk. It is a holistic spatial framework designed to nurture human physiology:
      </p>

      <ul class="space-y-4 text-base text-[#4B5B47] dark:text-[#B6CEBE] my-6">
        <li class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <strong class="text-[#17352D] dark:text-white block text-lg mb-1">1. Direct Nature Interaction</strong>
          Incorporating living botanical species, organic sunlight diffusion, dynamic airflow, and natural soil microbiology into primary work areas.
        </li>
        <li class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <strong class="text-[#17352D] dark:text-white block text-lg mb-1">2. Indirect Natural Analogues</strong>
          Utilizing natural woods, stone composites, curvilinear geometry, and tactile earth-toned textures that echo patterns found in living forests.
        </li>
        <li class="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <strong class="text-[#17352D] dark:text-white block text-lg mb-1">3. Spatial Biophilia (Prospect & Refuge)</strong>
          Designing semi-sheltered biophilic reading nooks with clear visual sightlines across open collaborative lounges, satisfying innate human instincts for security and orientation.
        </li>
      </ul>

      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-[#17352D] dark:text-white mt-8 mb-4">Measurable Corporate ROI of Biophilic Spaces</h2>
      <p class="text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-6">
        Organizations investing in comprehensive indoor botanical infrastructure experience lower turnover rates, decreased absenteeism, and a distinct recruiting advantage among top-tier talent seeking wellness-oriented corporate culture.
      </p>
    `
  }
];

// Helper functions for data access & sync with admin store
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('gs_blog_posts');
    if (saved) {
      window.blogPosts = JSON.parse(saved);
    } else {
      window.blogPosts = blogPosts;
      localStorage.setItem('gs_blog_posts', JSON.stringify(blogPosts));
    }
  } catch (e) {
    window.blogPosts = blogPosts;
  }
}
