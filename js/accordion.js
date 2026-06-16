/**
 * accordion.js — Chapter Accordion Controller
 *
 * Manages open/closed state of chapter cards.
 * Uses the CSS grid-template-rows trick for smooth
 * height animation without JavaScript height calculation.
 *
 * Public API (used by app.js and search.js):
 *   accordion.toggle(cardEl)    — toggle a specific card
 *   accordion.open(cardEl)      — open a specific card
 *   accordion.close(cardEl)     — close a specific card
 *   accordion.openAll()         — expand all chapters
 *   accordion.closeAll()        — collapse all chapters
 *   accordion.openById(id)      — open chapter by chapter id
 */

const accordion = (() => {

  // ── Internal helpers ───────────────────────────────────────

  function _isOpen(cardEl) {
    return cardEl.classList.contains('is-open');
  }

  function _open(cardEl) {
    if (_isOpen(cardEl)) return;
    cardEl.classList.add('is-open');
    const header = cardEl.querySelector('.chapter-header');
    if (header) header.setAttribute('aria-expanded', 'true');
  }

  function _close(cardEl) {
    if (!_isOpen(cardEl)) return;
    cardEl.classList.remove('is-open');
    const header = cardEl.querySelector('.chapter-header');
    if (header) header.setAttribute('aria-expanded', 'false');
  }

  function _toggle(cardEl) {
    if (_isOpen(cardEl)) {
      _close(cardEl);
    } else {
      _open(cardEl);
    }
  }

  // ── Bulk operations ────────────────────────────────────────

  function openAll() {
    document.querySelectorAll('.chapter-card').forEach(_open);
  }

  function closeAll() {
    document.querySelectorAll('.chapter-card').forEach(_close);
  }

  function openById(chapterId) {
    const cardEl = document.getElementById(chapterId);
    if (cardEl) _open(cardEl);
  }

  // ── Event binding ──────────────────────────────────────────

  /**
   * Attach click listeners to all accordion headers.
   * Called once from app.js after chapters are rendered.
   */
  function bindEvents() {
    document.querySelectorAll('.chapter-header').forEach((header) => {
      header.addEventListener('click', () => {
        const card = header.closest('.chapter-card');
        if (card) _toggle(card);
      });

      // Keyboard: Enter / Space
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const card = header.closest('.chapter-card');
          if (card) _toggle(card);
        }
      });
    });

    // ── Expand All / Collapse All buttons ──────────────────
    const btnExpandAll  = document.getElementById('btn-expand-all');
    const btnCollapseAll = document.getElementById('btn-collapse-all');

    if (btnExpandAll)   btnExpandAll.addEventListener('click', openAll);
    if (btnCollapseAll) btnCollapseAll.addEventListener('click', closeAll);
  }

  // ── Public API ─────────────────────────────────────────────

  return {
    toggle:    _toggle,
    open:      _open,
    close:     _close,
    openAll,
    closeAll,
    openById,
    bindEvents,
  };

})();
