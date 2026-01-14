export function initSlider(containerId, prevBtnId, nextBtnId, moviesPerPage, movieWidth, loadNextPageCallback = null) {
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  let offset = 0;
  const isMobile = window.innerWidth <= 768;
  let preloading = false; // evita doble petición mientras se carga la siguiente página

  // Calcula el offset máximo negativo según número de elementos y ancho
  const calcMaxOffset = () => -(Math.max(0, container.children.length - moviesPerPage) * movieWidth);

  const updateMaxOffset = () => {
    const maxOffset = calcMaxOffset();
    if (offset < maxOffset) offset = maxOffset;
    container.style.transform = `translateX(${offset}px)`;
  };

  container.sliderInstance = { updateMaxOffset };

  // Configuración para dispositivos móviles
  if (isMobile) {
    moviesPerPage = 1;
    movieWidth = container.parentElement.offsetWidth;
    container.style.overflowX = "auto";
    container.style.webkitOverflowScrolling = "touch";

    // Preload de la siguiente página si se llega al final
    container.addEventListener("scroll", async () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
        if (!preloading && loadNextPageCallback) {
          preloading = true;
          await loadNextPageCallback();
          updateMaxOffset();
          preloading = false;
        }
      }
    });
  } else {
    
    // Navegación con botones en escritorio
    nextBtn.addEventListener("click", async () => {
      const maxOffset = calcMaxOffset();
      if (offset > maxOffset) {
        offset -= moviesPerPage * movieWidth;
        if (offset < maxOffset) offset = maxOffset;
        container.style.transform = `translateX(${offset}px)`;

        // Pre-carga de siguientes elementos si estamos cerca del final
        const remaining = container.children.length - (Math.abs(offset) / movieWidth + moviesPerPage);
        if (remaining <= moviesPerPage * 2 && !preloading && loadNextPageCallback) {
          preloading = true;
          await loadNextPageCallback();
          updateMaxOffset();
          preloading = false;
        }
      }
    });

    prevBtn.addEventListener("click", () => {
      offset += moviesPerPage * movieWidth;
      if (offset > 0) offset = 0;
      container.style.transform = `translateX(${offset}px)`;
    });
  }

  

  // =========================
  // Swipe táctil seguro para móviles
  // =========================
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  container.addEventListener("touchstart", e => {
    // Guardamos la posición inicial del toque
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  container.addEventListener("touchend", e => {
    if (!isDragging) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    const deltaY = e.changedTouches[0].clientY - startY;

    // Solo consideramos swipe horizontal si el desplazamiento horizontal es mayor que vertical y supera 30px
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) prevBtn.click();
      else nextBtn.click();
    }

    // Si no hubo desplazamiento suficiente o fue principalmente vertical, no se dispara el click
    isDragging = false;
  }, { passive: true });

  return { updateMaxOffset };
}


// slider.js
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