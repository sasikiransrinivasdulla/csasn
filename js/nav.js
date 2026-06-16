/**
 * nav.js — Sidebar Chapter Navigation Controller
 *
 * Responsibilities:
 *   1. Render chapter nav items from CHAPTERS data.
 *   2. Handle click → smooth scroll to chapter card.
 *   3. Track active chapter using IntersectionObserver.
 *   4. Update active nav highlight as user scrolls.
 *
 * Called from app.js after chapter cards are rendered.
 */

const nav = (() => {

  // ── Render sidebar nav items ───────────────────────────────

  function renderNav() {
    const listEl = document.getElementById('chapter-nav-list');
    if (!listEl || !Array.isArray(CHAPTERS)) return;

    listEl.innerHTML = '';

    CHAPTERS.forEach((chapter) => {
      const li = document.createElement('li');
      li.className = 'chapter-nav-item';
      li.dataset.chapterId = chapter.id;
      li.setAttribute('role', 'listitem');

      const btn = document.createElement('button');
      btn.className = 'chapter-nav-btn';
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', `Go to ${chapter.title}`);
      btn.dataset.target = chapter.id;

      btn.innerHTML = `
        <span class="chapter-nav-number" aria-hidden="true">${chapter.number}</span>
        <span class="chapter-nav-label">${chapter.title}</span>
      `;

      btn.addEventListener('click', () => {
        _scrollToChapter(chapter.id);
        _setActive(chapter.id);
      });

      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  // ── Scroll to chapter card ─────────────────────────────────

  function _scrollToChapter(chapterId) {
    const card = document.getElementById(chapterId);
    if (!card) return;

    // Expand the chapter on nav click
    accordion.open(card);

    // Scroll card into view with offset for breathing room
    const yOffset = -24;
    const y = card.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // ── Set active nav item ────────────────────────────────────

  function _setActive(chapterId) {
    document.querySelectorAll('.chapter-nav-btn').forEach((btn) => {
      if (btn.dataset.target === chapterId) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  // ── IntersectionObserver — active chapter on scroll ────────

  function _initScrollSpy() {
    const cards = document.querySelectorAll('.chapter-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first entry that is intersecting
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          _setActive(visible.target.id);
        }
      },
      {
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      }
    );

    cards.forEach((card) => observer.observe(card));
  }

  // ── Public API ─────────────────────────────────────────────

  function init() {
    renderNav();
    _initScrollSpy();
  }

  return { init, setActive: _setActive };

})();
