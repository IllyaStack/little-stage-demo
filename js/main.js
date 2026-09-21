/**
 * LITTLE STAGE — main.js
 * =======================
 * Interaktive Funktionen für Navigation, Event-Rendering, Öffnungszeiten,
 * Vorschau-Bewertungen, Lightbox-Galerie und Demo-Formular-Handling.
 * 
 * Basiert ausschließlich auf Vanilla JavaScript.
 * Greift auf SITE_DATA aus site-data.js zu.
 */

/**
 * HTML-Escaping zur sicheren Textausgabe
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 1. Navigation & Mobile Menu
 */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (mobileToggle && mobileMenu) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      mobileToggle.setAttribute('aria-expanded', String(newState));
      mobileToggle.classList.toggle('active', newState);
      mobileMenu.classList.toggle('active', newState);
      
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    const closeMenu = () => {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Klick auf Menü-Link schließt das Menü
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        closeMenu();
      }
    });

    // Klick außerhalb schließt das Menü
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('active') && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    // Escape-Taste schließt das Menü
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Reset bei Fenstergrößenänderung auf Desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }
}

/**
 * 2. Scroll Reveal Animations (IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal:not(.visible)');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * 3. Events Rendering (Homepage: 3 Demo-Event Cards mit dezentem Badge)
 */
function renderEvents() {
  const container = document.getElementById('events-container');
  if (!container || typeof SITE_DATA === 'undefined' || !SITE_DATA.events) return;

  const events = SITE_DATA.events.slice(0, 3);
  const months = ['JAN','FEB','MÄR','APR','MAI','JUN','JUL','AUG','SEP','OKT','NOV','DEZ'];

  if (events.length === 0) {
    container.innerHTML = `
      <div class="events-empty">
        <p>Momentan sind keine Events gelistet.</p>
        <p>Aktuelle Termine erfährst du auch auf unserer <a href="${escapeHTML(SITE_DATA.social.facebook)}" target="_blank" rel="noopener">Facebook-Seite</a>.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = events.map((event, index) => {
    const dateObj = new Date(event.date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = months[dateObj.getMonth()] || 'OKT';
    const delayClass = `reveal-delay-${Math.min(index + 1, 3)}`;

    return `
      <article class="event-card reveal ${delayClass}">
        <div class="event-card-image">
          <!-- Bildhinweis: Vor Veröffentlichung durch Originalfoto der Little Stage ersetzen -->
          <img src="${escapeHTML(event.image)}" alt="${escapeHTML(event.title)}" loading="lazy">
          <span class="event-demo-badge">Beispiel</span>
        </div>
        <div class="event-card-content">
          <div class="event-card-date">
            <span class="day">${day}</span>
            <span class="month">${month}</span>
          </div>
          <div class="event-card-info">
            <span class="event-card-genre">${escapeHTML(event.genre || 'Live-Musik')}</span>
            <h3 class="event-card-title">${escapeHTML(event.title)}</h3>
            <p class="event-card-time">Beginn: ${escapeHTML(event.time)} Uhr</p>
            <a href="event-detail.html?id=${escapeHTML(event.id)}" class="event-card-link">Mehr erfahren <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  initScrollReveal();
}

/**
 * 4. Öffnungszeiten (Sicherer neutraler Status aus zentraler Datenquelle)
 */
function renderHours() {
  if (typeof SITE_DATA === 'undefined' || !SITE_DATA.hours) return;
  const containers = document.querySelectorAll('.hours-container');
  if (containers.length === 0) return;

  const hoursData = SITE_DATA.hours;

  const hoursHTML = `
    <div class="hours-card">
      <p class="hours-status-title">${escapeHTML(hoursData.statusText)}</p>
      <p class="hours-status-desc">${escapeHTML(hoursData.notice)}</p>
      <div class="hours-actions">
        <a href="${escapeHTML(SITE_DATA.business.phoneHref)}" class="btn btn-outline btn-small">
          📞 ${escapeHTML(SITE_DATA.business.phoneDisplay)}
        </a>
      </div>
    </div>
  `;

  containers.forEach(container => {
    container.innerHTML = hoursHTML;
  });
}

/**
 * 6. Galerie Rendering
 */
function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container || typeof SITE_DATA === 'undefined' || !SITE_DATA.gallery) return;

  container.innerHTML = SITE_DATA.gallery.map((photo, index) => `
    <div class="gallery-item" data-index="${index}" tabindex="0" role="button" aria-label="Bild vergrößern: ${escapeHTML(photo.alt)}">
      <!-- Bildhinweis: Vor Veröffentlichung durch Originalfoto der Little Stage ersetzen -->
      <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || 'Einblick ins Little Stage')}" loading="lazy">
    </div>
  `).join('');
}

/**
 * 7. Lightbox Funktionalität für die Galerie
 */
function initGallery() {
  if (typeof SITE_DATA === 'undefined' || !SITE_DATA.gallery || SITE_DATA.gallery.length === 0) return;

  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Bildergalerie Vergrößerung');
    
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Schließen">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Vorheriges Bild">&#8249;</button>
      <div class="lightbox-image-wrapper">
        <img class="lightbox-image" src="" alt="">
        <p class="lightbox-caption"></p>
      </div>
      <button class="lightbox-nav lightbox-next" aria-label="Nächstes Bild">&#8250;</button>
    `;
    document.body.appendChild(lightbox);
  }

  const imgEl = lightbox.querySelector('.lightbox-image');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');
  let currentIndex = 0;

  const updateLightbox = () => {
    const photo = SITE_DATA.gallery[currentIndex];
    if (photo) {
      imgEl.src = photo.src;
      imgEl.alt = photo.alt || 'Galeriebild Little Stage';
      if (captionEl) {
        captionEl.textContent = photo.alt || '';
      }
    }
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : SITE_DATA.gallery.length - 1;
    updateLightbox();
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex < SITE_DATA.gallery.length - 1) ? currentIndex + 1 : 0;
    updateLightbox();
  };

  galleryContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const idx = parseInt(item.getAttribute('data-index'), 10);
    if (!isNaN(idx)) {
      openLightbox(idx);
    }
  });

  galleryContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.gallery-item');
      if (item) {
        e.preventDefault();
        const idx = parseInt(item.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          openLightbox(idx);
        }
      }
    }
  });

  btnClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  btnPrev.addEventListener('click', showPrev);
  btnNext.addEventListener('click', showNext);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });
}

/**
 * 8. Footer Copyright-Jahr
 */
function renderFooter() {
  const yearEls = document.querySelectorAll('#copyright-year, .current-year');
  const currentYear = new Date().getFullYear().toString();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}

/**
 * 9. Smooth Scroll für interne Sprungmarken
 */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]:not([href="#"])');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();

      // Mobile Menu schließen falls geöffnet
      const mobileToggle = document.querySelector('.nav-mobile-toggle');
      const mobileMenu = document.querySelector('.nav-mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileToggle?.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

/**
 * 10. Sichere Demo-Formularverarbeitung (Dezente Inline-Nachricht)
 * Auf /feiern und /bands wird beim Absenden ein geschmackvoller Inline-Hinweis
 * direkt unterhalb des Buttons platziert. Das Formular bleibt sichtbar.
 * Sobald der Nutzer Felder bearbeitet, verschwindet der Hinweis wieder.
 */
function initDemoForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Wenn der Nutzer ein Feld bearbeitet, Hinweis ausblenden
    form.addEventListener('input', () => {
      const notice = form.querySelector('.form-demo-inline-notice');
      if (notice) notice.remove();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Native HTML5-Validierung
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Bereits bestehenden Hinweis entfernen
      const existingNotice = form.querySelector('.form-demo-inline-notice');
      if (existingNotice) existingNotice.remove();

      const isBandForm = form.id === 'bands-form' || !!form.querySelector('#band_name') || window.location.pathname.includes('bands');
      const noticeText = isBandForm
        ? 'Demo-Version: In der finalen Website wird die Anfrage direkt an Little Stage gesendet.'
        : 'Demo-Version: In der finalen Website wird diese Anfrage direkt an Little Stage gesendet.';

      const notice = document.createElement('div');
      notice.className = 'form-demo-inline-notice';
      notice.setAttribute('role', 'status');
      notice.innerHTML = `
        <span class="notice-icon" aria-hidden="true">ℹ️</span>
        <span>${escapeHTML(noticeText)}</span>
      `;

      // Direkt nach dem Absende-Button einfügen
      const submitBtn = form.querySelector('button[type="submit"]') || form.lastElementChild;
      if (submitBtn && submitBtn.parentNode) {
        submitBtn.insertAdjacentElement('afterend', notice);
      } else {
        form.appendChild(notice);
      }
    });
  });
}

// Globaler DOMContentLoaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderEvents();
  renderHours();
  renderGallery();
  initGallery();
  renderFooter();
  initSmoothScroll();
  initDemoForms();
  initScrollReveal();
});
