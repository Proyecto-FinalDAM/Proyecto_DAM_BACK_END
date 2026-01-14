// App.js - Refactorizado y comentado
import Header from './header.js';
import Footer from './footer.js';
import {
  getUpcoming,
  getPlaying,
  getTrendingDayMovies,
  getTopMovies,
  getFamousPopular
} from './api.js';
import { loadMovies } from './loadMovies.js';
import { loadFamous } from './loadFamous.js';
import { enableMovieItemNavigation, enableFamousItemNavigation } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  // ==========================
  // Cargar header y footer
  // ==========================
  const header = new Header("header", "header.html");
  const footer = new Footer("footer", "footer.html");
  await header.load();
  await footer.load();

  // ==========================
  // Header scroll: reduce altura y se vuelve transparente
  // ==========================
  const mainHeader = document.querySelector('.main-header');
  if (mainHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    });
  }

  // ==========================
  // Cargar próximos estrenos
  // ==========================
  const upcomingData = await getUpcoming();
  loadMovies(
    upcomingData.results,
    'proximo-container',
    'btn-upcoming-prev',
    'btn-upcoming-next',
    1,
    196
  );

  // ==========================
  // Inicialización de paginación para secciones de películas
  // ==========================
  let currentPagePlaying = 1;
  let currentPageTrending = 1;
  let currentPageTop = 1;

  // ==========================
  // Cargar películas en cartelera
  // ==========================
  const playingData = await getPlaying(currentPagePlaying);
  loadMovies(
    playingData.results,
    'cartelera-container',
    'cartelera-prev',
    'cartelera-next',
    6,
    196,
    loadNextPagePlaying,
    true
  );

  // ==========================
  // Cargar películas trending (día)
  // ==========================
  const trendingData = await getTrendingDayMovies(currentPageTrending);
  loadMovies(
    trendingData.results,
    'trending-container',
    'trending-prev',
    'trending-next',
    6,
    196,
    loadNextPageTrending,
    true
  );

  // ==========================
  // Cargar películas top-rated
  // ==========================
  const topMoviesData = await getTopMovies(currentPageTop);
  loadMovies(
    topMoviesData.results,
    'top-movies-container',
    'top-movies-prev',
    'top-movies-next',
    6,
    196,
    loadNextPageTop,
    true
  );

  // ==========================
  // Cargar famosos populares
  // ==========================
  const popularFamousData = await getFamousPopular();
  loadFamous(
    popularFamousData.popularPeopleList,
    'famosos-wrapper',
    'famosos-prev',
    'famosos-next',
    6,
    150,
    null,
    true
  );

  // ==========================
  // Funciones de paginación
  // ==========================
  async function loadNextPagePlaying() {
    if (currentPagePlaying >= 1) return;
    currentPagePlaying++;
    const data = await getPlaying(currentPagePlaying);
    if (data.results.length) {
      loadMovies(
        data.results,
        'cartelera-container',
        'cartelera-prev',
        'cartelera-next',
        6,
        196,
        loadNextPagePlaying,
        true
      );
    }
  }

  async function loadNextPageTrending() {
    if (currentPageTrending >= 1) return;
    currentPageTrending++;
    const data = await getTrendingDayMovies(currentPageTrending);
    if (data.results.length) {
      loadMovies(
        data.results,
        'trending-container',
        'trending-prev',
        'trending-next',
        6,
        196,
        loadNextPageTrending,
        true
      );
    }
  }

  async function loadNextPageTop() {
    if (currentPageTop >= 5) return; // Limitar a 5 páginas
    currentPageTop++;
    const data = await getTopMovies(currentPageTop);
    if (data.results.length) {
      loadMovies(
        data.results,
        'top-movies-container',
        'top-movies-prev',
        'top-movies-next',
        6,
        196,
        loadNextPageTop,
        true
      );
    }
  }

  // ==========================
  // Habilitar navegación de items
  // ==========================
  enableMovieItemNavigation(); // Selección de películas
  enableFamousItemNavigation(); // Selección de famosos
});
