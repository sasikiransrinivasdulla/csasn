/**
 * app.js — Application Bootstrap
 *
 * Entry point. Runs after all scripts are loaded.
 *
 * Execution order:
 *   1. Render all chapter accordion cards into #chapters-container.
 *   2. Bind accordion click events.
 *   3. Render sidebar navigation items.
 *   4. Init scroll spy for active chapter tracking.
 *   5. Init live search engine.
 *
 * Chapter card HTML template:
 *   Built from each chapter object in CHAPTERS (chapters.js).
 */

(function () {

  'use strict';

  // ── Render Chapter Cards ───────────────────────────────────

  function renderChapters() {
    const container = document.getElementById('chapters-container');
    if (!container || !Array.isArray(CHAPTERS)) return;

    container.innerHTML = '';

    CHAPTERS.forEach((chapter) => {
      const card = document.createElement('article');
      card.className = 'chapter-card';
      card.id = chapter.id;
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', `Chapter ${chapter.number}: ${chapter.title}`);

      // Build tag chips HTML
      const tagsHTML = (chapter.tags && chapter.tags.length)
        ? `<div class="chapter-tags" aria-hidden="true">
             ${chapter.tags.map(t => `<span class="tag">${t}</span>`).join('')}
           </div>`
        : '';

      card.innerHTML = `
        <!-- Accordion Header (clickable trigger) -->
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

        <!-- Accordion Body (CSS grid collapse) -->
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

  // ── Init ───────────────────────────────────────────────────

  function init() {
    // 1. Render chapters
    renderChapters();

    // 2. Bind accordion events
    accordion.bindEvents();

    // 3. Render sidebar nav + init scroll spy
    nav.init();

    // 4. Init search engine
    search.init();
  }

  // ── Boot on DOMContentLoaded ───────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
