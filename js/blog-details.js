/**
 * GreenSpace Rentals - Blog Detail Controller (Vanilla JavaScript)
 * Dynamically loads and renders selected article by URL query parameter ?id=X,
 * including cover media, full long-form HTML content, author box, sidebar, and related articles.
 */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const rawId = params.get('id');
  const blogId = Number(rawId) || 1;

  const articleHeaderEl = document.getElementById('articleHeader');
  const articleCoverEl = document.getElementById('articleCoverContainer');
  const articleBodyEl = document.getElementById('articleBodyContent');
  const articleAuthorEl = document.getElementById('articleAuthorCard');
  const sidebarRecentEl = document.getElementById('sidebarRecentPosts');
  const relatedPostsGrid = document.getElementById('relatedPostsGrid');
  const articleContainer = document.getElementById('articleMainContainer');
  const notFoundContainer = document.getElementById('articleNotFound');

  if (!window.blogPosts || !Array.isArray(window.blogPosts)) {
    console.error('Blog posts data not found in window.blogPosts');
    return;
  }

  const post = window.blogPosts.find(p => p.id === blogId);

  // 1. Handle Invalid ID
  if (!post) {
    if (articleContainer) articleContainer.classList.add('hidden');
    if (notFoundContainer) {
      notFoundContainer.classList.remove('hidden');
      notFoundContainer.innerHTML = `
        <div class="site-container py-24 sm:py-32 text-center max-w-2xl mx-auto">
          <div class="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <i data-lucide="file-question" class="w-10 h-10"></i>
          </div>
          <h1 class="text-3xl sm:text-5xl font-heading font-extrabold text-[#17352D] dark:text-white mb-4">
            Article Not Found
          </h1>
          <p class="text-base sm:text-lg text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-8">
            The article you're looking for doesn't exist or may have been moved. Explore our latest greenery guides and workplace ideas instead.
          </p>
          <a href="blog.html" class="btn-primary text-sm sm:text-base py-3 px-8 shadow-xl inline-flex items-center gap-2">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Back to Blog</span>
          </a>
        </div>
      `;
    }
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Update Page Title
  document.title = `${post.title} | GreenSpace Rentals Journal`;

  // 2. Render Article Header
  if (articleHeaderEl) {
    articleHeaderEl.innerHTML = `
      <!-- Eyebrow Category -->
      <div class="flex items-center gap-3 mb-5">
        <a href="blog.html" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/20 hover:bg-emerald-100 transition-colors">
          <i data-lucide="tag" class="w-3 h-3"></i>
          <span>${post.category}</span>
        </a>
        <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <i data-lucide="clock" class="w-3.5 h-3.5 text-emerald-500"></i>
          ${post.readTime}
        </span>
      </div>

      <!-- Main Article Title -->
      <h1 class="text-3xl sm:text-5xl lg:text-5xl font-heading font-extrabold text-[#17352D] dark:text-white leading-[1.18] tracking-tight mb-6">
        ${post.title}
      </h1>

      <!-- Subtitle / Excerpt Lead -->
      <p class="text-base sm:text-xl text-[#4B5B47] dark:text-[#B6CEBE] font-normal leading-relaxed mb-8 max-w-3xl">
        ${post.excerpt}
      </p>

      <!-- Author Metadata Strip -->
      <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[var(--border)]">
        <div class="flex items-center gap-3.5">
          <img 
            src="${post.authorPhoto}" 
            alt="${post.author}" 
            class="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm"
          >
          <div>
            <div class="text-sm font-bold text-[#17352D] dark:text-white">${post.author}</div>
            <div class="text-xs text-emerald-600 dark:text-emerald-400">${post.authorRole || 'Horticultural Specialist'}</div>
          </div>
        </div>

        <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div class="flex items-center gap-1.5">
            <i data-lucide="calendar" class="w-4 h-4 text-emerald-500"></i>
            <span>Published ${post.date}</span>
          </div>
          <button 
            onclick="navigator.clipboard.writeText(window.location.href); alert('Article link copied to clipboard!');" 
            class="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-gray-500 hover:text-emerald-600 transition-colors" 
            title="Share article link" 
            aria-label="Share article"
          >
            <i data-lucide="share-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }

  // 3. Render Cover Image
  if (articleCoverEl) {
    articleCoverEl.innerHTML = `
      <div class="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-[var(--border)] bg-emerald-950/20 max-h-[540px]">
        <img 
          src="${post.coverImage || post.image}" 
          alt="${post.title}" 
          class="w-full h-full object-cover max-h-[540px]"
        >
      </div>
    `;
  }

  // 4. Render Article Body Content
  if (articleBodyEl) {
    articleBodyEl.innerHTML = post.content;
  }

  // 5. Render Author Card
  if (articleAuthorEl) {
    articleAuthorEl.innerHTML = `
      <div class="glass-card p-8 sm:p-10 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img 
          src="${post.authorPhoto}" 
          alt="${post.author}" 
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-emerald-500 flex-shrink-0 shadow-md"
        >
        <div class="text-center sm:text-left flex-1">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Written by</div>
          <h3 class="font-heading font-bold text-xl text-[#17352D] dark:text-white mb-2">${post.author}</h3>
          <p class="text-xs sm:text-sm text-[#4B5B47] dark:text-[#B6CEBE] leading-relaxed mb-4">
            ${post.authorBio}
          </p>
          <div class="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <i data-lucide="sprout" class="w-3.5 h-3.5"></i>
            <span>GreenSpace Verified Contributor</span>
          </div>
        </div>
      </div>
    `;
  }

  // 6. Render Sidebar Recent Articles (3 posts)
  if (sidebarRecentEl) {
    const recentPosts = window.blogPosts.filter(p => p.id !== post.id).slice(0, 3);
    sidebarRecentEl.innerHTML = recentPosts.map(r => `
      <a href="blog-details.html?id=${r.id}" class="flex gap-4 group no-underline p-3 rounded-2xl hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 transition-colors">
        <img 
          src="${r.image}" 
          alt="${r.title}" 
          class="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[var(--border)] group-hover:scale-105 transition-transform"
        >
        <div class="flex-1 min-w-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            ${r.category}
          </span>
          <h4 class="font-heading font-bold text-xs sm:text-sm text-[#17352D] dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            ${r.title}
          </h4>
          <span class="text-[11px] text-gray-400 dark:text-gray-500 block mt-1">${r.date}</span>
        </div>
      </a>
    `).join('');
  }

  // 7. Render Related Articles (3 cards)
  if (relatedPostsGrid) {
    let related = [];
    if (post.relatedPosts && Array.isArray(post.relatedPosts)) {
      related = post.relatedPosts.map(id => window.blogPosts.find(p => p.id === id)).filter(Boolean);
    }
    if (related.length === 0) {
      related = window.blogPosts.filter(p => p.id !== post.id).slice(0, 3);
    }

    relatedPostsGrid.innerHTML = related.map(rel => `
      <article class="glass-card rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-md hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col group cursor-pointer" onclick="window.location.href='blog-details.html?id=${rel.id}'">
        <div class="relative overflow-hidden h-48 w-full bg-emerald-950/20">
          <img 
            src="${rel.image}" 
            alt="${rel.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
            loading="lazy"
          >
          <div class="absolute top-3 left-3">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-100 bg-white/90 dark:bg-[#0E2820]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 shadow-sm">
              ${rel.category}
            </span>
          </div>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-[11px] text-gray-400 dark:text-gray-500 mb-2">${rel.date}</div>
            <h3 class="font-heading font-bold text-base text-[#17352D] dark:text-white leading-snug mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
              <a href="blog-details.html?id=${rel.id}">${rel.title}</a>
            </h3>
          </div>
          <div class="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>Read Article</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
          </div>
        </div>
      </article>
    `).join('');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
