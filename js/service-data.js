/**
 * GreenSpace Rentals - Central Service & Pricing Master Data
 * Used dynamically across Services, Service Details, Pricing, and Booking/Quote systems.
 */

window.greenSpaceData = {
  services: [
    {
      id: "office-rental",
      title: "Office Plant Rentals",
      badge: "Workplace Greenery",
      tagline: "Custom curated indoor plants, designer containers, and zero-maintenance care subscriptions for modern productive workplaces.",
      description: "Create a greener, more welcoming workplace with carefully selected indoor plants, designer planters, professional installation, and ongoing care. We transform executive suites, reception areas, open-plan offices, and meeting spaces into vibrant living environments.",
      heroImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      included: [
        "Plant selection tailored to natural lighting & spatial layout",
        "Designer planters & architectural ceramic/fiberstone vessels",
        "Safe delivery & white-glove placement",
        "Professional installation and styling",
        "Regular scheduled maintenance (watering, feeding, pruning)",
        "Plant replacement support if foliage declines"
      ],
      idealFor: [
        "Corporate headquarters & regional office branches",
        "Tech campuses & open-plan co-working spaces",
        "Executive boardrooms & client reception suites",
        "Architectural & creative agency studios",
        "Healthcare, wellness & finance lobbies"
      ],
      process: [
        {
          step: "01",
          title: "Space & Light Assessment",
          desc: "We analyze your office layout, foot traffic, temperature, and natural light levels to choose thriving species."
        },
        {
          step: "02",
          title: "Curated Plan & Planter Pairing",
          desc: "We select specimen floor plants, desktop greenery, and architectural planters matching your office interior."
        },
        {
          step: "03",
          title: "White-Glove Installation",
          desc: "Our installation crew delivers, positions, and installs the greenery seamlessly without interrupting your workday."
        },
        {
          step: "04",
          title: "Scheduled Maintenance & Care",
          desc: "Horticultural specialists visit on agreed schedules to water, polish, trim, and safeguard plant vitality."
        }
      ],
      specs: {
        commitment: "Flexible 6 or 12-month subscriptions",
        maintenance: "Weekly or bi-weekly scheduled visits included",
        planters: "Sub-irrigation designer containers included",
        guarantee: "100% Free replacement guarantee"
      },
      btnText: "Explore Office Rentals →",
      quoteBtnText: "Get an Office Rental Quote →"
    },
    {
      id: "event-rental",
      title: "Event Plant Rentals",
      badge: "Event Greenery",
      tagline: "Short-term botanical styling, luxury statement palms, and lush backdrop foliage for memorable corporate events and celebrations.",
      description: "Add natural atmosphere and polished greenery to corporate events, launches, exhibitions, celebrations, and special occasions. From towering statement palms to floral accents and lush room dividers, we deliver turn-key botanical styling.",
      heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      included: [
        "Curated event plant selection (palms, ficus, monsteras, ferns)",
        "Coordinated designer event planters & stands",
        "On-time delivery coordinated with event venue logistics",
        "On-site setup and precision placement",
        "Event-period support & emergency standby if requested",
        "Prompt breakdown & collection after the event finishes"
      ],
      idealFor: [
        "Product launches, brand activations & media events",
        "Corporate annual galas, awards nights & summits",
        "Exhibitions, trade booths & convention displays",
        "VIP lounge framing & photo backdrop staging",
        "Luxury private functions & celebration venues"
      ],
      process: [
        {
          step: "01",
          title: "Event Theme & Venue Brief",
          desc: "Tell us your event date, floorplan, venue access hours, and botanical aesthetic requirements."
        },
        {
          step: "02",
          title: "Concept & Staging Proposal",
          desc: "We propose a tailored staging package with statement focal plants, table greenery, and dividers."
        },
        {
          step: "03",
          title: "Flawless Delivery & Setup",
          desc: "Our crew arrives during load-in windows to place, dust, and stage every plant with lighting readiness."
        },
        {
          step: "04",
          title: "Seamless Post-Event Collection",
          desc: "When your event concludes, our crew safely removes all greenery without venue disruptions."
        }
      ],
      specs: {
        commitment: "1 day to 4-week short-term rental durations",
        maintenance: "Pre-treated & staged for optimal freshness throughout event",
        planters: "Premium event finishes (matte black, gold, terrazzo, woven)",
        guarantee: "Pristine show-ready foliage guarantee"
      },
      btnText: "Plan Your Event →",
      quoteBtnText: "Plan Event Greenery →"
    },
    {
      id: "installation",
      title: "Plant Installation",
      badge: "Professional Setup",
      tagline: "Expert architectural plant installation, living wall integrations, and precision positioning for flawless spatial balance.",
      description: "Our team delivers and positions plants professionally so every plant fits naturally into your space and design. We handle everything from large specimen trees and hanging foliage to architectural planter anchorings and multi-level floor plans.",
      heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      included: [
        "Comprehensive space assessment and floor load check",
        "Precision plant placement according to natural light zones",
        "Planter positioning with floor protection & waterproof saucers",
        "Professional sub-irrigation system assembly",
        "Final arrangement, foliage polishing & styling",
        "Discreet cleanup leaving your workplace pristine"
      ],
      idealFor: [
        "Newly leased or renovated corporate spaces",
        "Multi-story office towers & central atriums",
        "Hotels, lobbies & luxury residential common areas",
        "Restaurants & retail flagships requiring greenery barriers",
        "Custom architectural planter integrations"
      ],
      process: [
        {
          step: "01",
          title: "Site Inspection & Measurements",
          desc: "We review access points, freight elevators, ceiling heights, and floor protection needs."
        },
        {
          step: "02",
          title: "Pre-Potting & Acclimatization",
          desc: "Specimens are prepared in our greenhouse with premium sub-irrigation media before transit."
        },
        {
          step: "03",
          title: "White-Glove Placement",
          desc: "Trained technicians position heavy statement plants with zero impact to flooring or decor."
        },
        {
          step: "04",
          title: "Final Botanical Styling",
          desc: "We prune, top-dress with natural slate or moss, and inspect every angle for perfection."
        }
      ],
      specs: {
        commitment: "One-off installation or subscription setup",
        maintenance: "Can be paired with weekly care plans",
        planters: "Compatible with all custom built-in and free-standing planters",
        guarantee: "Floor & surface zero-scratch safety standard"
      },
      btnText: "Request Installation →",
      quoteBtnText: "Request Installation Quote →"
    },
    {
      id: "maintenance",
      title: "Plant Maintenance",
      badge: "Routine Care System",
      tagline: "Dedicated horticulturalists maintaining your plants with tailored watering, feeding, cleaning, and preventative health care.",
      description: "Keep your greenery healthy and attractive with scheduled professional care designed around your plants and environment. Never worry about overwatering, yellowing leaves, or dry soil again — our specialists handle every detail seamlessly.",
      heroImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      included: [
        "Precision moisture testing & root-level watering",
        "Seasonal organic fertilization & micronutrient balance",
        "Foliage dusting, shine conditioning & leaf cleaning",
        "Aesthetic pruning, shaping & deadhead removal",
        "Continuous soil aeration & root health checks",
        "Digital service logging and visit history records"
      ],
      idealFor: [
        "Offices with existing plant collections needing expert care",
        "Venues, restaurants & retail shops wanting pristine foliage",
        "Companies transitioning to zero-hassle operations",
        "Large commercial facilities with high plant density",
        "Executive suites demanding showroom-grade botanicals"
      ],
      process: [
        {
          step: "01",
          title: "Initial Botanical Health Audit",
          desc: "We catalogue every plant, record baseline moisture levels, and set a customized care schedule."
        },
        {
          step: "02",
          title: "Scheduled Specialist Visits",
          desc: "Uniformed technicians visit on fixed days with professional watering and care equipment."
        },
        {
          step: "03",
          title: "Comprehensive Treatment",
          desc: "Each plant receives individual moisture calibration, leaf wiping, organic feeding, and grooming."
        },
        {
          step: "04",
          title: "Digital Service Confirmation",
          desc: "You receive a brief summary logging technician visits, health observations, and actions taken."
        }
      ],
      specs: {
        commitment: "Ongoing monthly or annual maintenance agreements",
        maintenance: "Weekly or bi-weekly visits according to season",
        planters: "All vessel types maintained",
        guarantee: "Full replacement coverage for rented plants"
      },
      btnText: "View Maintenance →",
      quoteBtnText: "Request Maintenance Plan →"
    },
    {
      id: "health-check",
      title: "Plant Health Checks",
      badge: "Botanical Diagnostics",
      tagline: "Comprehensive diagnostic audits to detect plant stress, soil deficiencies, lighting issues, and pests before damage occurs.",
      description: "Regular health inspections help identify plant stress, pests, watering issues, and environmental problems before they become larger issues. Our certified plant specialists diagnose root rot, fungal infections, pest infestations, and lighting deficits.",
      heroImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
      included: [
        "Thorough foliage, stem & root zone inspection",
        "Pest & pathogen screening (spider mites, scale, gnats)",
        "Soil pH, moisture retention & nutrient assessment",
        "Environmental audit (lux levels, airflow, HVAC drafts)",
        "Detailed botanical health report with action items",
        "Organic treatment protocols and recovery recommendations"
      ],
      idealFor: [
        "Offices noticing yellowing, drooping, or spotted foliage",
        "Workspaces after seasonal HVAC transitions",
        "Businesses inheriting plants from previous tenants",
        "Preventative quarterly wellness checkups",
        "High-value statement specimen preservation"
      ],
      process: [
        {
          step: "01",
          title: "Visual & Diagnostic Screening",
          desc: "We examine leaf undersides, soil condition, root health, and environmental micro-climates."
        },
        {
          step: "02",
          title: "Pest & Moisture Testing",
          desc: "Using precision moisture meters and magnifying loupes, we pinpoint underlying issues."
        },
        {
          step: "03",
          title: "Diagnosis & Treatment Plan",
          desc: "We formulate an organic recovery strategy including pest isolation, repotting, or relocation."
        },
        {
          step: "04",
          title: "Follow-up & Monitoring",
          desc: "We track recovery progress to ensure foliage vitality returns to optimal health."
        }
      ],
      specs: {
        commitment: "One-time diagnostic visit or quarterly recurring audit",
        maintenance: "Includes immediate corrective care on site",
        planters: "All indoor plant species covered",
        guarantee: "Honest, science-backed botanical advice"
      },
      btnText: "Check Plant Health →",
      quoteBtnText: "Schedule Plant Health Check →"
    },
    {
      id: "replacement",
      title: "Plant Replacement",
      badge: "Foliage Refresh",
      tagline: "Hassle-free replacement of tired or declining greenery with fresh, vibrant specimens tailored to your workspace.",
      description: "When a plant is no longer healthy or suitable for its location, our team can recommend and arrange a suitable replacement. Under our subscription rental plans, replacements are fast, seamless, and completely included.",
      heroImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
      included: [
        "Rapid health & aesthetic suitability assessment",
        "Better-adapted replacement species recommendation",
        "Fresh nursery-grown premium plant selection",
        "Safe extraction and environmentally friendly disposal",
        "Installation of fresh plant with renewed soil blend",
        "Immediate post-planting styling and care calibration"
      ],
      idealFor: [
        "Subscription clients requiring guaranteed prime appearance",
        "Plants outgrowing compact office spaces",
        "Seasonal interior decor refreshes & variety updates",
        "Workspaces relocating plants to lower-light areas",
        "Clients with legacy plant collections needing revitalization"
      ],
      process: [
        {
          step: "01",
          title: "Evaluation & Selection",
          desc: "We review the current plant's condition and select a resilient alternative perfectly matched to the microclimate."
        },
        {
          step: "02",
          title: "Greenhouse Preparation",
          desc: "The replacement specimen is inspected, pruned, and conditioned in our nursery before transit."
        },
        {
          step: "03",
          title: "Discreet Swap-out",
          desc: "Our team removes the declining plant and installs the fresh specimen smoothly and cleanly."
        },
        {
          step: "04",
          title: "Establishment Monitoring",
          desc: "We closely monitor the new plant over its first weeks to guarantee thriving acclimation."
        }
      ],
      specs: {
        commitment: "Included in all active office subscription plans",
        maintenance: "Seamlessly integrates into ongoing schedule",
        planters: "Retains existing designer containers or provides upgrades",
        guarantee: "100% Healthy Nursery-Fresh Standard"
      },
      btnText: "Request Replacement →",
      quoteBtnText: "Request Replacement Support →"
    }
  ],

  officePlans: [
    {
      id: "starter-green",
      title: "Starter Green",
      subtitle: "For small offices and compact workspaces",
      badge: null,
      priceDisplay: "Custom Quote",
      priceSubtext: "Tailored to your space and plant count",
      description: "A simple starting solution for smaller workplaces that want professional indoor greenery without managing plant care themselves.",
      includes: [
        "Curated plant selection",
        "Standard planters",
        "Delivery",
        "Professional placement",
        "Scheduled maintenance",
        "Plant health checks"
      ],
      ctaText: "Get a Quote →",
      ctaParam: "starter-green"
    },
    {
      id: "workplace-green",
      title: "Workplace Green",
      subtitle: "For growing offices and professional workspaces",
      badge: "MOST POPULAR",
      priceDisplay: "Custom Quote",
      priceSubtext: "Tailored to your space and plant count",
      description: "A balanced plant rental solution combining professional greenery with ongoing maintenance and replacement support.",
      includes: [
        "Expanded plant selection",
        "Designer planters",
        "Delivery & installation",
        "Scheduled maintenance",
        "Health monitoring",
        "Replacement support"
      ],
      ctaText: "Get a Quote →",
      ctaParam: "workplace-green"
    },
    {
      id: "enterprise-green",
      title: "Enterprise Green",
      subtitle: "For large offices, multiple locations, and custom requirements",
      badge: null,
      priceDisplay: "Custom Quote",
      priceSubtext: "Tailored to your architectural scale",
      description: "A tailored greenery program designed around larger spaces, multiple areas, custom installation, and ongoing plant care.",
      includes: [
        "Custom plant selection",
        "Large-scale installation",
        "Dedicated maintenance schedule",
        "Plant health monitoring",
        "Replacement support",
        "Custom service coordination"
      ],
      ctaText: "Talk to Our Team →",
      ctaParam: "enterprise-green"
    }
  ],

  eventOptions: [
    {
      id: "small-event",
      title: "Small Event",
      suitableFor: "Meetings, private functions, compact corporate events",
      priceDisplay: "Custom Quote",
      priceSubtext: "Based on duration & plant quantity",
      includes: [
        "Plant selection",
        "Delivery",
        "Placement",
        "Event-period rental",
        "Collection"
      ],
      ctaText: "Plan My Event →"
    },
    {
      id: "corporate-event",
      title: "Corporate Event",
      suitableFor: "Launches, conferences, exhibitions, brand events",
      badge: "POPULAR",
      priceDisplay: "Custom Quote",
      priceSubtext: "Based on venue size & staging scope",
      includes: [
        "Curated plant selection",
        "Delivery",
        "Professional setup",
        "Event support",
        "Collection"
      ],
      ctaText: "Plan My Event →"
    },
    {
      id: "large-event",
      title: "Large Event",
      suitableFor: "Large venues, multi-area events, exhibitions, major corporate functions",
      priceDisplay: "Custom Quote",
      priceSubtext: "Comprehensive multi-zone event production",
      includes: [
        "Custom plant selection",
        "Large-scale setup",
        "Multiple delivery requirements",
        "Event coordination",
        "Collection"
      ],
      ctaText: "Request Custom Quote →"
    }
  ],

  pricingFactors: [
    {
      number: "01",
      icon: "trees",
      title: "Number of Plants",
      desc: "More plants and larger quantities affect the overall rental requirement."
    },
    {
      number: "02",
      icon: "scaling",
      title: "Plant Size",
      desc: "Large statement plants require different handling and space than smaller desk plants."
    },
    {
      number: "03",
      icon: "box",
      title: "Planter Selection",
      desc: "Standard and designer planters can have different costs."
    },
    {
      number: "04",
      icon: "truck",
      title: "Installation",
      desc: "Delivery, placement, setup, and large-scale installation requirements can affect the quote."
    },
    {
      number: "05",
      icon: "calendar-clock",
      title: "Rental Duration",
      desc: "Office subscriptions and short-term event rentals are priced differently based on duration."
    },
    {
      number: "06",
      icon: "heart-handshake",
      title: "Maintenance",
      desc: "The frequency and level of ongoing plant care influence the service plan."
    }
  ],

  bookingSteps: [
    {
      step: "01",
      title: "Choose Your Service",
      desc: "Select office rental, event rental, installation, maintenance, health check, or replacement."
    },
    {
      step: "02",
      title: "Tell Us What You Need",
      desc: "Submit your requirements, location, dates, estimated quantity, and contact information."
    },
    {
      step: "03",
      title: "We Review Your Request",
      desc: "Our team checks the requirements and contacts you if additional information or a site visit is needed."
    },
    {
      step: "04",
      title: "Receive Your Quote",
      desc: "We prepare your quotation based on your actual requirements."
    },
    {
      step: "05",
      title: "Approve Your Quote",
      desc: "Review the quotation and confirm that you would like to proceed."
    },
    {
      step: "06",
      title: "Complete Payment",
      desc: "After approval, complete the required payment through the available payment method."
    },
    {
      step: "07",
      title: "Booking Confirmed",
      desc: "Your service/installation/event is scheduled."
    },
    {
      step: "08",
      title: "Delivery, Installation & Care",
      desc: "Our team handles delivery, installation, maintenance, and agreed follow-up services."
    }
  ],

  faqs: [
    {
      q: "Why don't you show one fixed price for every plant?",
      a: "Plant rental requirements vary depending on plant quantity, plant size, planters, installation, rental duration, location, and maintenance requirements. We use these details to prepare a more accurate quote."
    },
    {
      q: "Is the consultation free?",
      a: "Initial phone and digital consultations, as well as space requirement reviews, are provided free of charge. For complex multi-floor installations, our team will confirm any applicable on-site assessment terms upfront."
    },
    {
      q: "Do office rentals include maintenance?",
      a: "Maintenance can be included as part of the selected service plan. The exact maintenance schedule and scope will be confirmed in the quotation."
    },
    {
      q: "Can I rent plants only for an event?",
      a: "Yes. Event rentals can be arranged for short-term requirements such as corporate events, launches, exhibitions, and special occasions."
    },
    {
      q: "What happens after I request a quote?",
      a: "Our team reviews your requirements, contacts you if additional information is needed, prepares the quotation, and sends it for your approval."
    },
    {
      q: "When do I pay?",
      a: "Payment is requested after the quotation has been prepared and approved, according to the agreed booking terms."
    }
  ]
};
