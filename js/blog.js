/**
 * GreenSpace Rentals - Blog Listing Controller (Vanilla JavaScript)
 * Handles search, category filtering, featured article rendering, blog grid rendering, and click events.
 */

document.addEventListener('DOMContentLoaded', () => {
  const blogListGrid = document.getElementById('blogListGrid');
  const featuredArticleContainer = document.getElementById('featuredArticleContainer');
  const searchInput = document.getElementById('blogSearchInput');
  const categoryButtons = document.querySelectorAll('.blog-cat-btn');
  const noResultsMessage = document.getElementById('blogNoResults');
  const blogCountDisplay = document.getElementById('blogCountDisplay');

  if (!window.blogPosts || !Array.isArray(window.blogPosts)) {
    console.error('Blog posts data not found in window.blogPosts');
    return;
  }

  let currentCategory = 'All';
  let currentSearchQuery = '';

  // 1. Render Featured Article (Default: Post #1)
  const renderFeaturedArticle = () => {
    if (!featuredArticleContainer) return;
    const featured = window.blogPosts[0];
    if (!featured) return;

    featuredArticleContainer.innerHTML = `
      <div class="glass-card rounded-[32px] overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-xl hover:border-emerald-500/40 transition-all duration-500 group">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <!-- Featured Image (Desktop Left, Mobile Top) -->
          <div class="lg:col-span-7 relative overflow-hidden h-[300px] sm:h-[400px] lg:h-[480px]">
            <img 
              src="${featured.coverImage || featured.image}" 
              alt="${featured.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            >
            <div class="absolute top-6 left-6 z-10">
              <span class="px-4 py-1.5 rounded-full bg-[#075B46] text-white text-xs font-bold tracking-wider uppercase shadow-lg border border-emerald-400/30 flex items-center gap-1.5">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-300"></i>
                Featured Article
              </span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>

          <!-- Featured Content (Desktop Right, Mobile Bottom) -->
          <div class="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
                  ${featured.category}
                </span>
                <span class="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                  ${featured.readTime}
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#17352D] dark:text-white leading-tight mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <a href="blog-details.html?id=${featured.id}" class="focus:outline-none focus:underline">
                  ${featured.title}
                </a>
              </h2>

              <p class="text-sm sm:text-base text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-6">
                ${featured.excerpt}
              </p>
            </div>

            <div class="pt-6 border-t border-[var(--border)] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img 
                  src="${featured.authorPhoto}" 
                  alt="${featured.author}" 
                  class="w-10 h-10 rounded-full object-cover border border-emerald-500/40 shadow-sm"
                >
                <div>
                  <div class="text-xs sm:text-sm font-bold text-[#17352D] dark:text-white">${featured.author}</div>
                  <div class="text-[11px] text-gray-500 dark:text-gray-400">${featured.date}</div>
                </div>
              </div>

              <a 
                href="blog-details.html?id=${featured.id}" 
                class="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-full inline-flex items-center gap-2 group-hover:bg-emerald-500 shadow-md"
                aria-label="Read featured article: ${featured.title}"
              >
                <span>Read Article</span>
                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  // 2. Render Main Blog Cards
  const renderBlogGrid = (posts) => {
    if (!blogListGrid) return;
    blogListGrid.innerHTML = '';

    if (posts.length === 0) {
      if (noResultsMessage) noResultsMessage.classList.remove('hidden');
      if (blogCountDisplay) blogCountDisplay.textContent = 'Showing 0 articles';
      return;
    }

    if (noResultsMessage) noResultsMessage.classList.add('hidden');
    if (blogCountDisplay) {
      blogCountDisplay.textContent = `Showing ${posts.length} article${posts.length > 1 ? 's' : ''}`;
    }

    posts.forEach((post, index) => {
      const card = document.createElement('article');
      card.className = `glass-card rounded-[28px] overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-md hover:shadow-xl hover:border-emerald-500/40 transition-all duration-400 flex flex-col group cursor-pointer`;
      card.style.animation = `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s both`;
      card.tabIndex = 0;
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', post.title);

      card.innerHTML = `
        <!-- Card Image -->
        <div class="relative overflow-hidden h-56 sm:h-60 w-full flex-shrink-0 bg-emerald-950/20">
          <img 
            src="${post.image}" 
            alt="${post.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
            loading="lazy"
          >
          <div class="absolute top-4 left-4">
            <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-100 bg-white/90 dark:bg-[#0E2820]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 dark:border-emerald-500/30 shadow-sm">
              ${post.category}
            </span>
          </div>
          <div class="absolute bottom-3 right-3">
            <span class="text-[10px] font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3"></i>
              ${post.readTime}
            </span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-[11px] text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-emerald-500"></i>
              <span>${post.date}</span>
            </div>

            <h3 class="font-heading font-bold text-lg sm:text-xl text-[#17352D] dark:text-white leading-snug mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
              <a href="blog-details.html?id=${post.id}" class="focus:outline-none">
                ${post.title}
              </a>
            </h3>

            <p class="text-xs sm:text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-6 line-clamp-3">
              ${post.excerpt}
            </p>
          </div>

          <!-- Card Footer (Author & Read Link) -->
          <div class="pt-4 border-t border-[var(--border)] flex items-center justify-between mt-auto">
            <div class="flex items-center gap-2.5">
              <img 
                src="${post.authorPhoto}" 
                alt="${post.author}" 
                class="w-8 h-8 rounded-full object-cover border border-emerald-500/30"
              >
              <div class="text-xs font-semibold text-[#17352D] dark:text-white truncate max-w-[110px]">
                ${post.author}
              </div>
            </div>

            <a 
              href="blog-details.html?id=${post.id}" 
              class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1.5 group/btn"
              aria-label="Read full article: ${post.title}"
            >
              <span>Read Article</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      `;

      // Direct click handler for whole card
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          window.location.href = `blog-details.html?id=${post.id}`;
        }
      });

      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('a')) {
            e.preventDefault();
            window.location.href = `blog-details.html?id=${post.id}`;
          }
        }
      });

      blogListGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // 3. Filter & Search Logic
  const filterPosts = () => {
    let results = window.blogPosts;

    // Filter by Category
    if (currentCategory && currentCategory !== 'All') {
      results = results.filter(post => 
        post.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (currentSearchQuery.trim() !== '') {
      const q = currentSearchQuery.toLowerCase().trim();
      results = results.filter(post => 
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q)
      );
    }

    renderBlogGrid(results);
  };

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      filterPosts();
    });
  }

  // Category Buttons Listener
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-md', 'active');
        b.classList.add('bg-white/80', 'dark:bg-[#12382D]', 'text-[#17352D]', 'dark:text-[#C5D7CE]');
      });

      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-md', 'active');
      btn.classList.remove('bg-white/80', 'dark:bg-[#12382D]', 'text-[#17352D]', 'dark:text-[#C5D7CE]');

      currentCategory = btn.getAttribute('data-category') || 'All';
      filterPosts();
    });
  });

  // Initial Rendering
  renderFeaturedArticle();
  renderBlogGrid(window.blogPosts);

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
