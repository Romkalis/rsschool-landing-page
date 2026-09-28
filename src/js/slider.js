function initSlider(slider) {
  const track = slider.querySelector('[data-slider-track]');
  const slides = track.children;

  const prevButton = slider.querySelector('[data-slider-prev]');
  const nextButton = slider.querySelector('[data-slider-next]');
  const dots = [...slider.querySelectorAll('[data-slider-dots] button')];

  let currentSlide = 0;

  function render() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      const active = i === currentSlide;
      dot.classList.toggle('slider__dot--active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    render();
  }

  function prevSlide() {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    render();
  }

  function goToSlide(index) {
    currentSlide = index;
    render();
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  render();
}

export function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(initSlider);
}
