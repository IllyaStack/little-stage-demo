/**
 * main.js
 * Handles all interactive behavior for the Little Stage website.
 * Depends on SITE_DATA from site-data.js.
 */

/**
 * Escapes HTML characters to prevent XSS.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
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
 * Initializes the navigation menu, handling scroll effects and mobile toggling.
 */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (mobileToggle && mobileMenu) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('active') && !nav.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Initializes scroll reveal animations using IntersectionObserver.
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
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * Renders upcoming events based on SITE_DATA.
 */
function renderEvents() {
  const container = document.getElementById('events-container');
  if (!container || typeof SITE_DATA === 'undefined' || !SITE_DATA.events) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = SITE_DATA.events
    .filter(event => {
      if (event.status !== 'upcoming') return false;
      const eventDate = new Date(event.date);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const months = ['JAN','FEB','MÄR','APR','MAI','JUN','JUL','AUG','SEP','OKT','NOV','DEZ'];

  if (upcomingEvents.length === 0) {
    const fallbackLink = SITE_DATA.social && SITE_DATA.social.facebook ? escapeHTML(SITE_DATA.social.facebook) : '#';
    container.innerHTML = `
      <div class="events-empty">
        <p>Momentan sind keine Events geplant.</p>
        <p>Schau bald wieder vorbei — oder folg uns auf <a href="${fallbackLink}">Facebook</a>.</p>
      </div>
    `;
  } else {
    container.innerHTML = upcomingEvents.map((event, index) => {
      const dateObj = new Date(event.date);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = months[dateObj.getMonth()];
      
      const delayClass = index < 3 ? `reveal-delay-${index + 1}` : '';

      return `
        <article class="event-card reveal ${delayClass}">
          <div class="event-card-image">
            <img src="${escapeHTML(event.image)}" alt="${escapeHTML(event.title)}" loading="lazy">
          </div>
          <div class="event-card-content">
            <div class="event-card-date">
              <span class="day">${day}</span>
              <span class="month">${month}</span>
            </div>
            <div class="event-card-info">
              <span class="event-card-genre">${escapeHTML(event.genre || '')}</span>
              <h3 class="event-card-title">${escapeHTML(event.title)}</h3>
              <p class="event-card-time">${escapeHTML(event.time)} Uhr</p>
              <a href="event-detail.html?id=${escapeHTML(event.id)}" class="event-card-link">Mehr erfahren →</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
    
    // Re-initialize reveal for newly added elements
    initScrollReveal();
  }
}

/**
 * Renders opening hours tables into all containers with class 'hours-container'.
 */
function renderHours() {
  if (typeof SITE_DATA === 'undefined' || !SITE_DATA.hours) return;
  const containers = document.querySelectorAll('.hours-container');
  
  if (containers.length === 0) return;

  const hoursRows = SITE_DATA.hours.map(entry => `
    <tr>
      <td>${escapeHTML(entry.days)}</td>
      <td>${escapeHTML(entry.open)} – ${escapeHTML(entry.close)}</td>
    </tr>
  `).join('');

  const hoursHTML = `
    <table>
      <tbody>
        ${hoursRows}
      </tbody>
    </table>
    ${SITE_DATA.hoursNote ? `<p class="hours-note">${escapeHTML(SITE_DATA.hoursNote)}</p>` : ''}
  `;

  containers.forEach(container => {
    container.innerHTML = hoursHTML;
  });
}

/**
 * Renders user reviews and populates Google rating data.
 */
function renderReviews() {
  if (typeof SITE_DATA === 'undefined') return;
  
  const container = document.getElementById('reviews-container');
  if (container && SITE_DATA.reviews) {
    container.innerHTML = SITE_DATA.reviews.map((review, index) => {
      const starsFull = '★'.repeat(review.rating);
      const starsEmpty = '☆'.repeat(5 - review.rating);
      const delayClass = index < 3 ? `reveal-delay-${index + 1}` : '';

      return `
        <div class="review-card reveal ${delayClass}">
          <div class="review-card-rating">${starsFull}${starsEmpty}</div>
          <p class="review-card-text">${escapeHTML(review.text)}</p>
          <p class="review-card-author">— ${escapeHTML(review.author)}, ${escapeHTML(review.source)}</p>
        </div>
      `;
    }).join('');
    initScrollReveal();
  }

  const ratingArea = document.getElementById('google-rating');
  if (ratingArea && SITE_DATA.google) {
    const { rating, reviewCount } = SITE_DATA.google;
    if (rating && reviewCount) {
      ratingArea.innerHTML = `
        <div class="google-rating-score">${escapeHTML(String(rating))}</div>
        <div class="google-rating-stars">★★★★★</div>
        <div class="google-rating-count">Basierend auf ${escapeHTML(String(reviewCount))} Google-Rezensionen</div>
      `;
    }
  }
}

/**
 * Renders the gallery images.
 */
function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container || typeof SITE_DATA === 'undefined' || !SITE_DATA.gallery) return;

  container.innerHTML = SITE_DATA.gallery.map((photo, index) => `
    <div class="gallery-item" data-index="${index}">
      <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || 'Galeriebild')}" loading="lazy">
    </div>
  `).join('');
}

/**
 * Initializes the lightbox functionality for the gallery.
 */
function initGallery() {
  if (typeof SITE_DATA === 'undefined' || !SITE_DATA.gallery || SITE_DATA.gallery.length === 0) return;
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  // Create lightbox DOM elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Bildergalerie');
  
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Schließen">×</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Vorheriges Bild">‹</button>
    <img class="lightbox-image" src="" alt="">
    <button class="lightbox-nav lightbox-next" aria-label="Nächstes Bild">›</button>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.lightbox-image');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  
  const updateLightbox = () => {
    const photo = SITE_DATA.gallery[currentIndex];
    if (photo) {
      imgEl.src = photo.src;
      imgEl.alt = photo.alt || 'Galeriebild';
    }
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
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

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx);
      }
    });
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
 * Renders footer specific information such as current year and hours.
 */
function renderFooter() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

/**
 * Initializes smooth scrolling behavior for internal anchor links.
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mobileToggle = document.querySelector('.nav-mobile-toggle');
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }

        const navHeight = 80; // Approximate fixed header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderEvents();
  renderHours();
  renderReviews();
  renderGallery();
  initGallery();
  renderFooter();
  initSmoothScroll();
  initScrollReveal();
});
