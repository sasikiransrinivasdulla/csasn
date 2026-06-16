/**
 * search.js — Global Live Search Engine
 *
 * Strategy:
 *   1. Debounce keystrokes (150ms) to avoid excessive DOM updates.
 *   2. Lowercase normalize query + all chapter text for matching.
 *   3. Filter chapters — hide cards with no match.
 *   4. Highlight matching terms using <mark class="hl">.
 *   5. Auto-expand matched chapters, collapse non-matching ones.
 *   6. Update sidebar nav to show only matching chapters.
 *   7. Show/hide search results banner and no-results state.
 *
 * Highlight approach:
 *   We work with the *rendered* text of each chapter body.
 *   We store the original innerHTML on first search, and restore
 *   it on clear. This avoids re-rendering from data on every keystroke.
 *
 * Public API:
 *   search.init()   — call once after DOM is ready
 *   search.clear()  — programmatic clear
 */

const search = (() => {

  // ── State ──────────────────────────────────────────────────

  let _debounceTimer = null;
  const DEBOUNCE_MS  = 150;

  // Cache of original chapter body HTML { chapterId: originalHTML }
  const _originalHTML = {};

  // ── DOM refs (populated in init) ──────────────────────────

  let inputEl         = null;
  let clearBtnEl      = null;
  let statusEl        = null;
  let resultsBannerEl = null;
  let resultsTextEl   = null;
  let resultsClearEl  = null;
  let noResultsEl     = null;

  // ── Helpers ────────────────────────────────────────────────

  /**
   * Escape a string for use in a RegExp.
   */
  function _escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Wrap all occurrences of `query` inside `html` with <mark>.
   * Works on text nodes only — avoids breaking HTML tags.
   *
   * We do this via a simple innerHTML approach on a temporary element,
   * replacing only text content outside of tags.
   */
  function _highlight(html, query) {
    if (!query) return html;

    const escaped = _escapeRegex(query);
    // Only replace text outside of HTML tags
    // Regex: match text that is not inside < >
    const regex = new RegExp(`(?<!<[^>]*)(${escaped})(?![^<]*>)`, 'gi');
    return html.replace(regex, '<mark class="hl">$1</mark>');
  }

  /**
   * Strip all <mark class="hl"> wrappers from HTML string.
   */
  function _stripHighlights(html) {
    return html.replace(/<mark class="hl">(.*?)<\/mark>/gi, '$1');
  }

  // ── Core search logic ──────────────────────────────────────

  function _runSearch(query) {
    const q = query.trim().toLowerCase();
    const cards = document.querySelectorAll('.chapter-card');
    const navItems = document.querySelectorAll('.chapter-nav-item');

    let matchCount = 0;

    cards.forEach((card) => {
      const chapterId = card.id;
      const titleEl  = card.querySelector('.chapter-title');
      const bodyEl   = card.querySelector('.chapter-body');

      if (!bodyEl) return;

      // Cache original HTML (only once per session clear cycle)
      if (!_originalHTML[chapterId]) {
        _originalHTML[chapterId] = bodyEl.innerHTML;
      }

      // Restore original before re-matching
      bodyEl.innerHTML = _stripHighlights(bodyEl.innerHTML);

      const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
      const bodyText  = bodyEl.textContent.toLowerCase();

      const isMatch = !q || titleText.includes(q) || bodyText.includes(q);

      if (isMatch) {
        matchCount++;
        card.classList.remove('is-hidden');

        // Apply highlight and auto-expand if query exists
        if (q) {
          bodyEl.innerHTML = _highlight(bodyEl.innerHTML, query.trim());
          accordion.open(card);
        } else {
          // No query — restore collapsed state (don't force-close,
          // let accordion manage its own state)
        }
      } else {
        card.classList.add('is-hidden');
        accordion.close(card);
      }
    });

    // ── Update sidebar nav visibility ──────────────────────

    navItems.forEach((navItem) => {
      const chapterId = navItem.dataset.chapterId;
      const card = document.getElementById(chapterId);
      if (!card || card.classList.contains('is-hidden')) {
        navItem.classList.add('is-hidden');
      } else {
        navItem.classList.remove('is-hidden');
      }
    });

    // ── UI feedback ────────────────────────────────────────

    const hasQuery = q.length > 0;

    // Status text under search input
    if (statusEl) {
      if (hasQuery) {
        statusEl.textContent = `${matchCount} chapter${matchCount !== 1 ? 's' : ''} matched`;
        statusEl.removeAttribute('hidden');
      } else {
        statusEl.setAttribute('hidden', '');
      }
    }

    // Results banner in content area
    if (resultsBannerEl && resultsTextEl) {
      if (hasQuery) {
        resultsTextEl.textContent =
          `${matchCount} result${matchCount !== 1 ? 's' : ''} for "${query.trim()}"`;
        resultsBannerEl.removeAttribute('hidden');
      } else {
        resultsBannerEl.setAttribute('hidden', '');
      }
    }

    // No results state
    if (noResultsEl) {
      if (hasQuery && matchCount === 0) {
        noResultsEl.removeAttribute('hidden');
      } else {
        noResultsEl.setAttribute('hidden', '');
      }
    }

    // Clear button visibility
    if (clearBtnEl) {
      if (hasQuery) {
        clearBtnEl.removeAttribute('hidden');
      } else {
        clearBtnEl.setAttribute('hidden', '');
      }
    }
  }

  // ── Clear search ───────────────────────────────────────────

  function clear() {
    if (inputEl) inputEl.value = '';

    // Restore all chapter body HTML
    document.querySelectorAll('.chapter-card').forEach((card) => {
      const bodyEl = card.querySelector('.chapter-body');
      if (bodyEl && _originalHTML[card.id]) {
        bodyEl.innerHTML = _originalHTML[card.id];
        delete _originalHTML[card.id];
      }
      card.classList.remove('is-hidden');
    });

    // Restore all nav items
    document.querySelectorAll('.chapter-nav-item').forEach((item) => {
      item.classList.remove('is-hidden');
    });

    // Collapse all after clearing
    accordion.closeAll();

    // Hide UI elements
    if (statusEl)        statusEl.setAttribute('hidden', '');
    if (resultsBannerEl) resultsBannerEl.setAttribute('hidden', '');
    if (noResultsEl)     noResultsEl.setAttribute('hidden', '');
    if (clearBtnEl)      clearBtnEl.setAttribute('hidden', '');
  }

  // ── Init ───────────────────────────────────────────────────

  function init() {
    inputEl         = document.getElementById('search-input');
    clearBtnEl      = document.getElementById('search-clear');
    statusEl        = document.getElementById('search-status');
    resultsBannerEl = document.getElementById('search-results-banner');
    resultsTextEl   = document.getElementById('search-results-text');
    resultsClearEl  = document.getElementById('search-results-clear');
    noResultsEl     = document.getElementById('no-results');

    if (!inputEl) return;

    // Live search on input
    inputEl.addEventListener('input', (e) => {
      clearTimeout(_debounceTimer);
      _debounceTimer = setTimeout(() => {
        _runSearch(e.target.value);
      }, DEBOUNCE_MS);
    });

    // Clear on ESC key
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') clear();
    });

    // Clear button (inside search input)
    if (clearBtnEl) {
      clearBtnEl.addEventListener('click', () => {
        clear();
        inputEl.focus();
      });
    }

    // Clear button (in results banner)
    if (resultsClearEl) {
      resultsClearEl.addEventListener('click', () => {
        clear();
        inputEl.focus();
      });
    }
  }

  // ── Public API ─────────────────────────────────────────────

  return { init, clear };

})();
