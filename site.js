// Trovelo's site menu: the phone's Menu button, and on the home page the
// Features link lit while the features are on screen.
(function () {
  'use strict';
  var nav = document.querySelector('.tn');
  if (!nav) return;
  var btn = nav.querySelector('.tn-menu');
  var dim = document.querySelector('.tn-dim');

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? (btn.dataset.close || 'Close menu') : (btn.dataset.open || 'Open menu'));
    if (dim) dim.hidden = !open;
  }
  btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  if (dim) dim.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); }
  });
  nav.querySelectorAll('.tn-links a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  window.matchMedia('(min-width: 760px)').addEventListener('change', function (m) {
    if (m.matches) setOpen(false);
  });

  // Home page: from the first feature down to the closing call, Features is lit.
  var first = document.getElementById('features');
  var last = document.getElementById('get');
  var link = nav.querySelector('.tn-l[href="/#features"]');
  if (!first || !last || !link) return;
  var queued = false;
  function mark() {
    queued = false;
    var mid = window.innerHeight / 2;
    var inside = first.getBoundingClientRect().top < mid && last.getBoundingClientRect().top > mid;
    link.classList.toggle('on', inside);
  }
  document.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(mark); }
  }, { capture: true, passive: true });
  window.addEventListener('resize', mark);
  mark();

  // Arriving from another page at /#features: the page lays itself out with
  // script, so jump to the section once it has, and again as pictures settle,
  // unless the visitor has started scrolling by then.
  if (location.hash === '#features') {
    var page = first.closest('.app-page') || document.documentElement;
    var moved = false;
    ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
      window.addEventListener(type, function () { moved = true; }, { once: true, passive: true });
    });
    var jump = function () {
      if (moved) return;
      page.style.scrollBehavior = 'auto';
      first.scrollIntoView();
      page.style.scrollBehavior = '';
    };
    window.addEventListener('load', function () { jump(); setTimeout(jump, 500); });
  }
})();
