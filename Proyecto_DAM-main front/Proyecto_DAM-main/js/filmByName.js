import Header from './header.js';
import Footer from './footer.js';
import { getMoviesByName } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const header = new Header("header", "header.html");
  const footer = new Footer("footer", "footer.html");
  await header.load();
  await footer.load();

  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    const data = await getMoviesByName(query, 1);

    resultsContainer.innerHTML = '';
    data.results.forEach(movie => {
      const item = document.createElement('div');
      item.classList.add('search-result');
      item.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="${movie.title}">
        <span>${movie.title} (${movie.release_date ? movie.release_date.slice(0,4) : 'N/A'})</span>
      `;
      item.addEventListener('click', () => {
        window.location.href = `film.html?id=${movie.id}`;
      });
      resultsContainer.appendChild(item);
    });
  });

  // Cerrar el desplegable si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.innerHTML = '';
    }
  });
});
