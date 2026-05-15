/* ============================================================
   script.js — Personal Archive
   Vanilla JS only. No dependencies.

   1. Terminal boot sequence (homepage only)
   2. Mobile nav toggle
   3. Active nav link via current page filename
   4. Reading progress bar (post pages only)
   ============================================================ */

/* ── 1. Terminal boot sequence ──
   Fades in each .boot-line on the homepage with a delay.
   Only runs if #bootLog exists on the page.
── */
(function () {
  var log = document.getElementById('bootLog');
  if (!log) return;

  var lines = log.querySelectorAll('.boot-line');
  lines.forEach(function (line, i) {
    setTimeout(function () {
      line.classList.add('visible');
    }, 180 + i * 320);
  });
})();


/* ── 2. Mobile nav toggle ── */
(function () {
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* close when any link is tapped */
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* close when clicking outside */
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── 3. Active nav link ──
   Adds .active to the nav link matching the current page filename.
── */
(function () {
  var page  = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-links a');

  links.forEach(function (link) {
    var href     = link.getAttribute('href') || '';
    var linkPage = href.split('/').pop().split('#')[0];
    if (linkPage === page) {
      link.classList.add('active');
    }
  });
})();


/* ── 4. Reading progress bar ──
   Looks for id="reading-progress". Only used on post-template.html.
── */
(function () {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;

  function update() {
    var scrolled = window.scrollY;
    var total    = document.documentElement.scrollHeight - window.innerHeight;
    var pct      = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
