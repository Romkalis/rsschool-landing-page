// Simple endless slider without libraries.
// The track holds [clone of last, ...slides, clone of first]; after the animation reaches a clone
// the track jumps (without animation) to the real slide, so scrolling never ends.

const SWIPE_THRESHOLD = 50; // px
const CLICK_SUPPRESS = 5; // px moved before a click on a link is treated as a drag

class Slider {
  constructor(root) {
    this.root = root;
    this.viewport = root.querySelector('[data-slider-viewport]');
    this.track = root.querySelector('[data-slider-track]');
    this.prevButton = root.querySelector('[data-slider-prev]');
    this.nextButton = root.querySelector('[data-slider-next]');
    this.dots = [...root.querySelectorAll('[data-slider-dots] button')];
    this.slides = [...this.track.children];
    this.count = this.slides.length;
    // Position in the track, where 0 and count + 1 are clones
    this.index = 1;
    this.moving = false;
    this.drag = null;
    this.suppressClick = false;

    this.addClones();
    this.render();
    this.bind();
  }

  addClones() {
    const makeClone = (slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      return clone;
    };

    this.track.prepend(makeClone(this.slides[this.count - 1]));
    this.track.append(makeClone(this.slides[0]));
  }

  bind() {
    this.prevButton.addEventListener('click', () => this.go(-1));
    this.nextButton.addEventListener('click', () => this.go(1));
    this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goTo(i)));
    this.track.addEventListener('transitionend', (event) => {
      if (event.target === this.track && event.propertyName === 'transform') {
        this.finish();
      }
    });

    this.viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') this.go(-1);
      if (event.key === 'ArrowRight') this.go(1);
    });

    // The native drag of links and images would break the swipe
    this.viewport.addEventListener('dragstart', (event) => event.preventDefault());
    this.viewport.addEventListener('pointerdown', (event) => this.dragStart(event));
    this.viewport.addEventListener('pointermove', (event) => this.dragMove(event));
    this.viewport.addEventListener('pointerup', (event) => this.dragEnd(event));
    this.viewport.addEventListener('pointercancel', (event) => this.dragEnd(event));
    // A swipe over a link must not open it
    this.viewport.addEventListener(
      'click',
      (event) => {
        if (this.suppressClick) {
          event.preventDefault();
          event.stopPropagation();
          this.suppressClick = false;
        }
      },
      true,
    );
  }

  get current() {
    return (this.index - 1 + this.count) % this.count;
  }

  go(step) {
    if (this.moving) return;
    this.moveTo(this.index + step);
  }

  goTo(slide) {
    if (this.moving || slide === this.current) return;
    this.moveTo(slide + 1);
  }

  moveTo(index) {
    this.index = index;
    this.moving = true;
    this.render();

    // transitionend is not fired without animation (reduced motion) or in a background tab,
    // so a timer with the same duration finishes the move as well
    const duration = parseFloat(getComputedStyle(this.track).transitionDuration) * 1000 || 0;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.finish(), duration + 50);
  }

  // After the animation: leave the clone and jump to the matching real slide
  finish() {
    if (!this.moving) return;

    clearTimeout(this.timer);
    this.moving = false;

    if (this.index === 0) {
      this.jump(this.count);
    } else if (this.index === this.count + 1) {
      this.jump(1);
    }
  }

  jump(index) {
    this.track.classList.add('slider__track--still');
    this.index = index;
    this.render();
    // Force reflow so the jump is applied before the animation is turned back on
    void this.track.offsetWidth;
    this.track.classList.remove('slider__track--still');
  }

  render() {
    this.track.style.setProperty('--slider-index', this.index);
    this.dots.forEach((dot, i) => {
      const active = i === this.current;
      dot.classList.toggle('slider__dot--active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  dragStart(event) {
    if (this.moving || (event.pointerType === 'mouse' && event.button !== 0)) return;

    this.drag = { x: event.clientX, dx: 0, id: event.pointerId };
    this.track.classList.add('slider__track--still');
  }

  dragMove(event) {
    if (!this.drag || event.pointerId !== this.drag.id) return;

    this.drag.dx = event.clientX - this.drag.x;

    if (Math.abs(this.drag.dx) > CLICK_SUPPRESS) {
      this.viewport.setPointerCapture(event.pointerId);
      this.track.style.setProperty('--slider-drag', `${this.drag.dx}px`);
    }
  }

  dragEnd(event) {
    if (!this.drag || event.pointerId !== this.drag.id) return;

    const { dx } = this.drag;
    this.drag = null;
    this.suppressClick = Math.abs(dx) > CLICK_SUPPRESS;
    this.track.classList.remove('slider__track--still');
    this.track.style.removeProperty('--slider-drag');

    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      // Swipe to the left shows the next slide
      this.moveTo(this.index + (dx < 0 ? 1 : -1));
    }
  }
}

export function initSliders() {
  document.querySelectorAll('[data-slider]').forEach((root) => new Slider(root));
}
