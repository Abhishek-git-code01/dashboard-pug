class Carousel {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.slide');
    this.nextBtn = container.querySelector('[data-next]');
    this.prevBtn = container.querySelector('[data-prev]');
    this.indicatorsContainer = container.querySelector('[data-indicators]');
    this.current = 0;
    this.autoScroll = container.getAttribute('data-autoscroll') === 'true';
    this.showIndicators = container.getAttribute('data-indicators') === 'true';
    this.showArrowsOnHover =container.dataset.hoverArrows === 'true';
    this.interval = parseInt(container.dataset.interval) || 3000;
    this.variant = container.dataset.variant;
    this.init();
  }

  init() {
    if (this.showArrowsOnHover) {
    this.container.classList.add('hover-arrows');
    }
    this.showSlide(this.current);

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }

    if (this.showIndicators) {
      this.variant === 'progress'
        ? this.createProgressBars()
        : this.createIndicators();
    }

    if (this.autoScroll) {
      this.startAutoScroll();
    }

    this.addHoverPause();
    this.addSwipeSupport();  // ← new: touch/drag to swipe
  }

  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.slides[index].classList.add('active');

    if (this.showIndicators) {
      this.variant === 'progress'
        ? this.updateProgressBars(index)
        : this.updateIndicators(index);
    }
  }

  nextSlide() {
    this.current = (this.current + 1) % this.slides.length;
    this.showSlide(this.current);
  }

  prevSlide() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.current);
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => this.nextSlide(), this.interval);
  }

  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
  }

  addHoverPause() {
    this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
    this.container.addEventListener('mouseleave', () => {
      if (this.autoScroll) this.startAutoScroll();
    });
  }

  // ── dot indicators (carousels 1 & 2) ─────────────────────────────────────
  createIndicators() {
    this.indicatorsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        this.current = index;
        this.showSlide(index);
      });
      this.indicatorsContainer.appendChild(dot);
    });
    this.updateIndicators(0);
  }

  updateIndicators(index) {
    this.indicatorsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // ── progress-bar indicators (carousel 3) ─────────────────────────────────
  createProgressBars() {
    this.indicatorsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const bar = document.createElement('div');
      bar.classList.add('progress-bar');

      const fill = document.createElement('div');
      fill.classList.add('progress-fill');
      bar.appendChild(fill);

      bar.addEventListener('click', () => {
        this.current = index;
        this.showSlide(index);
      });

      this.indicatorsContainer.appendChild(bar);
    });
    this.updateProgressBars(0);
  }

  updateProgressBars(index) {
    this.indicatorsContainer.querySelectorAll('.progress-bar').forEach((bar, i) => {
      const fill = bar.querySelector('.progress-fill');
      fill.style.transition = 'none';
      fill.style.width = i < index ? '100%' : '0%';

      if (i === index) {
        // slight delay so the transition resets before re-animating
        requestAnimationFrame(() => {
          fill.style.transition = `width ${this.interval}ms linear`;
          fill.style.width = '100%';
        });
      }
    });
  }

  // ── swipe / drag support (carousel 3 and any carousel) ───────────────────
  addSwipeSupport() {
    let startX = 0;
    this.container.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.nextSlide() : this.prevSlide();
      }
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach(el => new Carousel(el));
});