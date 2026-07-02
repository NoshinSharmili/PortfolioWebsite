(function () {
  'use strict';

  // ── Theme toggle ──
  var themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('promi-theme', next); } catch (e) {}
  });

  // ── Mobile nav toggle ──
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Scroll spy ──
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var ids = ['contact', 'achievements', 'projects', 'education', 'skills', 'about', 'hero'];
  function onScroll() {
    var cur = 'hero';
    var atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 60;
    if (atBottom) {
      cur = 'contact';
    } else {
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) { cur = ids[i]; break; }
      }
    }
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === cur);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Footer year ──
  document.getElementById('year').textContent = new Date().getFullYear();

  // ── Contact form (client-side only) ──
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type=submit]');
    if (!btn) return;
    var original = btn.textContent;
    btn.textContent = 'Thanks — I’ll be in touch!';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 2600);
  });
})();
