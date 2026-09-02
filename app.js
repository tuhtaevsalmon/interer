(function () {
  'use strict';

  var root = document.body.getAttribute('data-path-to-root') || './';
  var thankYou = root + 'thank-you-page.html';
  var home = root + 'index.html';
  var products = root + 'products/products.html';

  function scrollToEl(el) {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function findContactSection() {
    return document.getElementById('block-9') || document.getElementById('block-8');
  }

  document.querySelectorAll('header h3 a[href="/"], header .u-text-1 a[href="/"]').forEach(function (link) {
    link.setAttribute('href', home);
  });

  document.querySelectorAll('form').forEach(function (form) {
    var action = form.getAttribute('action') || '';
    if (action.indexOf('thank-you') === -1) {
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      window.location.href = thankYou;
    });

    form.querySelectorAll('.u-btn-submit').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      });
    });
  });

  document.querySelectorAll('a.u-btn[href="#"]').forEach(function (btn) {
    if (
      btn.classList.contains('u-btn-submit') ||
      btn.classList.contains('u-hamburger-link') ||
      btn.classList.contains('u-dialog-link') ||
      btn.classList.contains('u-payment-button') ||
      btn.classList.contains('u-product-control')
    ) {
      return;
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var contact = findContactSection();
      if (contact) {
        scrollToEl(contact);
        return;
      }
      var section = btn.closest('section');
      if (section && section.nextElementSibling && section.nextElementSibling.tagName === 'SECTION') {
        scrollToEl(section.nextElementSibling);
      }
    });
  });

  document.querySelectorAll('a.u-product-title-link[href="#"]').forEach(function (link) {
    link.setAttribute('href', products);
  });

  if (/thank-you-page\.html$/i.test(window.location.pathname)) {
    var sheet = document.querySelector('#block-2 .u-sheet-1, .u-section-1 .u-sheet-1');
    if (sheet && !sheet.querySelector('.app-home-btn')) {
      var btn = document.createElement('a');
      btn.href = home;
      btn.className = 'u-active-black u-align-center u-border-1 u-border-active-black u-border-black u-border-hover-black u-btn u-button-style u-hover-black u-none app-home-btn';
      btn.style.marginTop = '30px';
      btn.textContent = 'На главную';
      sheet.appendChild(btn);
    }
  }
})();
