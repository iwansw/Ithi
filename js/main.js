// PERWANAS site — mobile nav, dropdowns, accordion, gallery lightbox (vanilla JS)
(function () {
  'use strict';

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Hero slideshow */
  var heroSlides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  if (heroSlides.length > 1) {
    var heroDotsWrap = document.querySelector('.hero-dots');
    var heroDots = heroDotsWrap ? Array.prototype.slice.call(heroDotsWrap.querySelectorAll('button')) : [];
    var heroIndex = 0;
    var heroTimer;

    function showHeroSlide(i) {
      heroIndex = (i + heroSlides.length) % heroSlides.length;
      heroSlides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === heroIndex); });
      heroDots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === heroIndex); });
    }

    function startHeroTimer() {
      heroTimer = setInterval(function () { showHeroSlide(heroIndex + 1); }, 4500);
    }

    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showHeroSlide(i);
        clearInterval(heroTimer);
        startHeroTimer();
      });
    });

    startHeroTimer();
  }

  /* Dropdown submenus (tap to open on touch/mobile) */
  document.querySelectorAll('.main-nav .has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('is-open');
      }
    });
  });

  /* Accordion (Program Kerja) */
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = trigger.closest('.accordion-item');
      var panel = item.querySelector('.accordion-panel');
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.accordion-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* Gallery lightbox */
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.gallery-thumb'));
  if (thumbs.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Tutup">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Sebelumnya">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lightbox-next" aria-label="Berikutnya">&#8250;</button>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector('img');
    var lbCounter = lightbox.querySelector('.lightbox-counter');
    var current = 0;

    function show(index) {
      current = (index + thumbs.length) % thumbs.length;
      var full = thumbs[current].getAttribute('data-full') || thumbs[current].querySelector('img').src;
      lbImg.src = full;
      lbImg.alt = thumbs[current].querySelector('img').alt || '';
      lbCounter.textContent = (current + 1) + ' / ' + thumbs.length;
    }

    function open(index) {
      show(index);
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () { open(i); });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
