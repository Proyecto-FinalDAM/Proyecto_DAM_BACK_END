// peliculas.js
import { initSlider } from './slider.js';
import { SingleMovieSlider } from './SingleMovieSlider.js';

/**
 * Renderiza películas en un contenedor
 * @param {Array} peliculas - Array de películas a mostrar
 * @param {HTMLElement} contenedor - Contenedor donde se insertan
 * @param {boolean} append - Si true, añade al final; si false, limpia el contenedor
 */

  /**
   * Función principal para cargar películas y configurar slider
   */
  export function loadMovies(
    peliculas,
    contenedorId,
    prevBtnId,
    nextBtnId,
    elementosVisibles,
    anchoElemento,
    loadNextPageCallback = null,
    append = false
  ) {
    const contenedor = document.getElementById(contenedorId);

    // Slider especial para Proximos Estrenos
    if (contenedorId === 'proximo-container') {
      new SingleMovieSlider(contenedorId, prevBtnId, nextBtnId, peliculas);
      return;
    }

    // Renderizamos nuevas películas (append = true al cargar siguiente página)
    renderPeliculas(peliculas, contenedor, append);

    // Guardamos instancia de slider en el contenedor para no reinicializar
    if (!contenedor.sliderInstance) {
      contenedor.sliderInstance = initSlider(
        contenedorId,
        prevBtnId,
        nextBtnId,
        elementosVisibles,
        anchoElemento,
        loadNextPageCallback
      );
    } else {
      // Si ya existe el slider, solo recalculamos maxOffset
      contenedor.sliderInstance.updateMaxOffset?.();
    }
  }

  function renderPeliculas(peliculas, contenedor, append = false) {
  if (!append) contenedor.innerHTML = '';

  // Evitar duplicados comprobando IDs existentes
  const existingIds = Array.from(contenedor.children).map(c => Number(c.dataset.id));

  peliculas.forEach(pelicula => {
    if (existingIds.includes(pelicula.id)) return;

      const articulo = document.createElement('article');
      articulo.classList.add('pelicula-item');
      articulo.setAttribute('data-id', pelicula.id);
      articulo.setAttribute('role', 'listitem');
      articulo.setAttribute('aria-label', pelicula.title);

      const img = document.createElement('img');
      img.src = 'https://image.tmdb.org/t/p/w300' + pelicula.poster_path;
      img.alt = pelicula.title;
      img.classList.add('thumbnail');

      const vote = document.createElement('div');
      vote.classList.add('vote');
      const star = document.createElement('span');
      star.textContent = '★';
      star.style.color = 'gold';
      const score = document.createElement('span');
      score.textContent = pelicula.vote_average?.toFixed(1) ?? 'N/A';
      vote.appendChild(star);
      vote.appendChild(score);

      const title = document.createElement('h3');
      title.classList.add('pelicula-title');
      title.textContent = pelicula.title;

      const releaseYear = document.createElement('span');
      releaseYear.classList.add('pelicula-release-year');
      releaseYear.textContent = pelicula.release_date ? new Date(pelicula.release_date).getFullYear() : 'N/A';

      articulo.appendChild(img);
      articulo.appendChild(vote);
      articulo.appendChild(title);
      articulo.appendChild(releaseYear);

      contenedor.appendChild(articulo);
    });
  }