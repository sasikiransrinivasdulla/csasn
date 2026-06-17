/**
 * app.js — Application Bootstrap
 *
 * Merges CHAPTERS + CHAPTERS_2 + CHAPTERS_3 + CHAPTERS_4
 * into one ALL_CHAPTERS array, then renders everything.
 */

(function () {
  'use strict';

  // Merge all chapter data files into one array
  const ALL_CHAPTERS = [
    ...(typeof CHAPTERS   !== 'undefined' ? CHAPTERS   : []),
    ...(typeof CHAPTERS_2 !== 'undefined' ? CHAPTERS_2 : []),
    ...(typeof CHAPTERS_3 !== 'undefined' ? CHAPTERS_3 : []),
    ...(typeof CHAPTERS_4 !== 'undefined' ? CHAPTERS_4 : []),
  ];

  // ── Render Chapter Cards ─────────────────────────────────

  function renderChapters() {
    const container = document.getElementById('chapters-container');
    if (!container) return;
    container.innerHTML = '';

    ALL_CHAPTERS.forEach((chapter) => {
      const card = document.createElement('article');
      card.className = 'chapter-card';
      card.id = chapter.id;
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', `Chapter ${chapter.number}: ${chapter.title}`);

      const tagsHTML = (chapter.tags && chapter.tags.length)
        ? `<div class="chapter-tags" aria-hidden="true">
             ${chapter.tags.map(t => `<span class="tag">${t}</span>`).join('')}
           </div>`
        : '';

      card.innerHTML = `
        <button
          class="chapter-header"
          type="button"
          aria-expanded="false"
          aria-controls="body-${chapter.id}"
          id="header-${chapter.id}"
        >
          <span class="chapter-number" aria-hidden="true">${chapter.number}</span>
          <span class="chapter-title">${chapter.title}</span>
          <span class="chapter-meta" aria-hidden="true"></span>
          <span class="chapter-chevron" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
        </button>
        <div
          class="chapter-body-wrapper"
          id="body-${chapter.id}"
          role="region"
          aria-labelledby="header-${chapter.id}"
        >
          <div class="chapter-body-inner">
            <div class="chapter-body">
              ${tagsHTML}
              ${chapter.content}
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // ── Expose merged chapters for nav.js and search.js ──────

  window.__ALL_CHAPTERS = ALL_CHAPTERS;

  // ── Init ─────────────────────────────────────────────────

  function init() {
    renderChapters();
    accordion.bindEvents();
    nav.init();
    search.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
