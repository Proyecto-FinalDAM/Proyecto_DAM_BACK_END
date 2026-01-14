export class SingleMovieSlider {
  constructor(containerId, prevBtnId, nextBtnId, movies) {
    this.container = document.getElementById(containerId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.movies = movies;
    this.currentIndex = 0;

    this.renderAll();
    this.addEventListeners();
    this.addTouchSupport();

    requestAnimationFrame(() => this.scrollToCurrent(true));
  }

  renderAll() {
    this.container.innerHTML = '';
    this.movies.forEach(pelicula => {
      const articulo = document.createElement('article');
      articulo.classList.add('proximo-item');
      articulo.style.flex = '0 0 100%';
      articulo.style.margin = '0';

      const wrapper = document.createElement('div');
      wrapper.classList.add('proximo-wrapper');

      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/original${pelicula.backdrop_path}`;
      poster.alt = pelicula.title;
      poster.classList.add('poster');

      const info = document.createElement('div');
      info.classList.add('info');

      const title = document.createElement('h3');
      title.textContent = pelicula.title;

      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');
      const btnTrailer = document.createElement('button');
      btnTrailer.textContent = 'Trailer';
      btnTrailer.addEventListener('click', () => {
        window.location.href = `film.html?id=${pelicula.id}`;
      });
      btnContainer.appendChild(btnTrailer);

      info.appendChild(title);
      info.appendChild(btnContainer);
      wrapper.appendChild(poster);
      wrapper.appendChild(info);
      articulo.appendChild(wrapper);
      this.container.appendChild(articulo);
    });
  }

  scrollToCurrent(instant = false) {
    const currentItem = this.container.children[this.currentIndex];
    if (!currentItem) return;
    const offset = currentItem.offsetLeft - (this.container.offsetWidth - currentItem.offsetWidth) / 2;
    if (instant) this.container.scrollLeft = offset;
    else this.container.scrollTo({ left: offset, behavior: 'smooth' });
  }

  addEventListeners() {
    this.prevBtn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
      this.scrollToCurrent();
    });

    this.nextBtn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % this.movies.length;
      this.scrollToCurrent();
    });

    window.addEventListener('resize', () => this.scrollToCurrent(true));
  }

  addTouchSupport() {
    let startX = 0;
    let isDragging = false;

    this.container.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    this.container.addEventListener('touchend', e => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (deltaX > 50) this.prevBtn.click();
      else if (deltaX < -50) this.nextBtn.click();

      isDragging = false;
    }, { passive: true });
  }
}
