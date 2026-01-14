
// Listener para seleccionar película
export function enableMovieItemNavigation() {
  document.body.addEventListener('click', e => {
    const item = e.target.closest('.pelicula-item');
    if (item) {
      const id = item.getAttribute('data-id');
      if (id) window.location.href = `film.html?id=${id}`;
    }
  });
}

// Listener para seleccional famosos
export function enableFamousItemNavigation() {
  document.body.addEventListener('click', e => {
    const item = e.target.closest('.actor-item');
    if (item) {
      const id = item.getAttribute('data-id');
      if (id) window.location.href = `famous.html?id=${id}`;
    }
  });
}


export function enableHorizontalScroll(wrapperId, prevBtnId, nextBtnId, itemWidth = 150, gap = 10, breakpoint = 768) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  const isMobile = window.innerWidth <= breakpoint;
  if (!isMobile) {
    const btnPrev = document.getElementById(prevBtnId);
    const btnNext = document.getElementById(nextBtnId);
    if (btnPrev && btnNext) {
      const scrollAmount = itemWidth + gap;
      btnPrev.addEventListener('click', () => wrapper.scrollBy({ left: -scrollAmount * 6, behavior: 'smooth' }));
      btnNext.addEventListener('click', () => wrapper.scrollBy({ left: scrollAmount * 6, behavior: 'smooth' }));
    }
  } else {
    wrapper.style.overflowX = 'auto';
    wrapper.style.webkitOverflowScrolling = 'touch';
    wrapper.style.scrollBehavior = 'smooth';
  }
}