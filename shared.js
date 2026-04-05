/**
 * shared.js — Neon Deduction
 * Single source of truth for the phantom mask icon.
 * Injects into every .top-logo and .mask-icon on the page.
 */
(function () {

  /* ── Phantom mask SVG (viewBox 0 0 100 130) ──────────────────── */
  const MASK_SVG = `<svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Face silhouette -->
  <ellipse cx="50" cy="66" rx="43" ry="57" fill="#040112" stroke="rgba(123,47,255,0.15)" stroke-width="1"/>

  <!-- PHANTOM HALF-MASK (covers viewer's left — character's right side) -->
  <path d="M52,7 C43,6 28,10 17,22 C6,34 3,54 5,74 C8,94 20,112 34,120 C42,124 50,123 52,118 L52,7Z"
        fill="#07011c" stroke="#7B2FFF" stroke-width="2.5"/>

  <!-- Inner bevel -->
  <path d="M52,11 C44,10 31,14 21,25 C11,36 9,55 11,73 C14,91 24,107 36,115 C42,118 50,117 52,113"
        fill="none" stroke="rgba(123,47,255,0.22)" stroke-width="0.8"/>

  <!-- Eye opening -->
  <path d="M7,58 C12,42 32,37 50,48 C49,55 45,64 36,67 C22,71 5,65 7,60Z" fill="#020009"/>
  <path d="M7,58 C12,42 32,37 50,48 C49,55 45,64 36,67 C22,71 5,65 7,60Z"
        fill="none" stroke="#00F5FF" stroke-width="2.2"/>

  <!-- Crown accent line -->
  <path d="M52,7 C45,3 34,1 26,5 C19,9 12,16 8,24"
        stroke="#FF2D78" stroke-width="1.8" fill="none" stroke-linecap="round"/>

  <!-- Cheekbone accent -->
  <path d="M7,92 C13,102 22,112 32,118"
        stroke="rgba(0,245,255,0.38)" stroke-width="1.3" fill="none" stroke-linecap="round"/>

  <!-- Mask vertical edge (centre split) -->
  <line x1="52" y1="7" x2="52" y2="118" stroke="rgba(123,47,255,0.5)" stroke-width="1.2" stroke-dasharray="3,4"/>

  <!-- Unmasked right: ghost eye -->
  <path d="M55,56 C61,46 77,46 85,54 C81,64 63,65 55,60Z"
        fill="none" stroke="rgba(0,245,255,0.28)" stroke-width="1.5"/>

  <!-- Unmasked right: ghost mouth -->
  <path d="M56,98 C64,93 76,93 84,98"
        stroke="rgba(255,45,120,0.32)" stroke-width="1.3" fill="none" stroke-linecap="round"/>

  <!-- Crown dot -->
  <circle cx="28" cy="7" r="2.5" fill="#FF2D78" opacity="0.88"/>
</svg>`;

  function makeSvgElement(svgString, w, h) {
    const tmp = document.createElement('div');
    tmp.innerHTML = svgString;
    const svg = tmp.firstElementChild;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Top-bar logos ─────────────────────────────────────────── */
    document.querySelectorAll('.top-logo').forEach(function (logo) {
      // Remove any previously-inserted SVG so re-runs are idempotent
      const old = logo.querySelector('svg');
      if (old) old.remove();
      const svg = makeSvgElement(MASK_SVG, 16, 21);
      svg.style.flexShrink = '0';
      logo.insertBefore(svg, logo.firstChild);
    });

    /* ── Large hero mask on index.html ────────────────────────── */
    const hero = document.querySelector('.mask-icon');
    if (hero) {
      hero.innerHTML = '';
      const svg = makeSvgElement(MASK_SVG, '100%', '100%');
      svg.style.overflow = 'visible';
      hero.appendChild(svg);
    }

  });

})();
