// filmList.js
import Header from './header.js';
import Footer from './footer.js';
import { getMoviesByGenre, getMoviesByName } from './api.js';
import { loadMovies } from './loadMovies.js';
import { enableMovieItemNavigation } from './utils.js';

// Lista de géneros con sus IDs y nombres
const genres = [
  { id: 28, name: 'Acción' },
  { id: 12, name: 'Aventura' },
  { id: 16, name: 'Animación' },
  { id: 35, name: 'Comedia' },
  { id: 80, name: 'Crimen' },
  { id: 99, name: 'Documental' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Familia' },
  { id: 14, name: 'Fantasía' },
  { id: 36, name: 'Historia' },
  { id: 27, name: 'Terror' },
  { id: 10402, name: 'Música' },
  { id: 9648, name: 'Misterio' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Ciencia ficción' },
  { id: 10770, name: 'Película de TV' },
  { id: 53, name: 'Suspense' },
  { id: 10752, name: 'Bélica' },
  { id: 37, name: 'Western' }
];

document.addEventListener('DOMContentLoaded', async () => {
  // Cargar header y footer
  const header = new Header("header", "header.html");
  const footer = new Footer("footer", "footer.html");
  await header.load();
  await footer.load();

  // Detectar búsqueda por query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  if (searchQuery) {
    await cargarBusqueda(searchQuery);
  } else {
    await renderByHash();
    // Escuchar cambios de hash para recargar cuando se seleccione otro género
    window.addEventListener("hashchange", async () => {
      await renderByHash();
    });
  }
});

/**
 * Renderiza películas según hash de URL (#genre-XX)
 */
async function renderByHash() {
  const main = document.getElementById('genres');
  main.innerHTML = "";

  const selectedGenreId = window.location.hash
    ? window.location.hash.replace('#genre-', '')
    : null;

  if (selectedGenreId) {
    const genre = genres.find(g => g.id == selectedGenreId);
    if (genre) await cargarGenero(genre);
  } else {
    for (const genre of genres) {
      await cargarGenero(genre);
    }
  }

  enableMovieItemNavigation();
}

/**
 * Carga películas de un género específico
 */
async function cargarGenero(genre) {
  const main = document.getElementById('genres');

  // Crear sección del género
  const section = document.createElement('section');
  section.id = `genre-${genre.id}`;
  section.className = 'carrusel-list';
  section.setAttribute('aria-label', `Listado de ${genre.name}`);
  section.innerHTML = `
    <h2 class="section-header">${genre.name}</h2>
    <div class="fila-peliculas">
      <div class="carrusel-controles">
        <button id="prev-${genre.id}" class="btn-scroll-prev">&#10094;</button>
        <div class="peliculas-wrapper">
          <div id="container-${genre.id}" class="peliculas-container"></div>
        </div>
        <button id="next-${genre.id}" class="btn-scroll-next">&#10095;</button>
      </div>
    </div>
  `;
  main.appendChild(section);

  let page = 1;
  const loadNextPage = async () => {
    page += 1;
    try {
      const nextData = await getMoviesByGenre(genre.id, page);
      if (nextData?.results?.length) {
        loadMovies(nextData.results, `container-${genre.id}`, `prev-${genre.id}`, `next-${genre.id}`, 6, 196, loadNextPage, true);
      } else page -= 1;
    } catch (err) {
      page -= 1;
      console.error(`Error cargando página ${page + 1} del género ${genre.name}`, err);
    }
  };

  // Carga inicial
  try {
    const moviesByGenre = await getMoviesByGenre(genre.id, page);
    if (moviesByGenre?.results?.length) {
      loadMovies(moviesByGenre.results, `container-${genre.id}`, `prev-${genre.id}`, `next-${genre.id}`, 6, 196, loadNextPage, false);
    }
  } catch (err) {
    console.error(`Error al cargar películas del género ${genre.name}:`, err);
  }
}

/**
 * Carga películas según búsqueda
 */
async function cargarBusqueda(query) {
  const main = document.getElementById('genres');
  main.innerHTML = ""; // limpiar contenido previo

  const section = document.createElement('section');
  section.className = 'carrusel-list';
  section.innerHTML = `
    <h2 class="section-header">Resultados de: ${query}</h2>
    <div class="fila-peliculas">
      <div class="peliculas-wrapper">
        <div id="search-results-container" class="peliculas-container"></div>
      </div>
    </div>
  `;
  main.appendChild(section);

  try {
    const data = await getMoviesByName(query, 1);
    if (data?.results?.length) {
      loadMovies(data.results, 'search-results-container', null, null, 6, 196);
    }
  } catch (err) {
    console.error('Error cargando búsqueda:', err);
  }

  enableMovieItemNavigation();
}
