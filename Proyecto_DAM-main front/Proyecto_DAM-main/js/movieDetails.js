// movieDetails.js
// Módulo para cargar la información completa de una película, incluyendo reparto y películas relacionadas

import Header from './header.js';
import Footer from './footer.js';
import { getMovieDetails, getMovieCast, getUrlEmbed, getRelatedMovies } from './api.js';
import { loadMovies } from './loadMovies.js';
import { enableMovieItemNavigation, enableHorizontalScroll, enableFamousItemNavigation } from './utils.js';

let idRelatedMovies;

export async function loadMovie(idMovie) {
    idRelatedMovies = idMovie;

    // 1. Cargar Header y Footer
    const header = new Header("header", "header.html");
    const footer = new Footer("footer", "footer.html");
    await header.load();
    await footer.load();

    // 2. Obtener los datos de la película desde la API
    const movieData = await getMovieDetails(idMovie);

    // 3. Obtener créditos de la película (director, reparto y guionistas)
    const credits = await getMovieCast(idMovie);
    const director = credits.crew.find(member => member.job === 'Director');
    const cast = credits.cast;
    const writers = credits.crew.filter(member => member.job === 'Screenplay' || member.job === 'Writer');

    // 4. Obtener URL del trailer en versión embed
    const trailerUrlEmbed = await getUrlEmbed(idMovie);

    // 5. Actualizar el HTML con los datos principales de la película
    document.getElementById('title').textContent = movieData.title;
    document.getElementById('info').textContent = movieData.overview;
    document.getElementById('year').textContent = movieData.release_date.split('-')[0];
    document.getElementById('runtime').textContent = movieData.runtime + ' min';
    document.getElementById('rating').textContent = movieData.vote_average.toFixed(1);
    document.getElementById('backdrop').style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movieData.poster_path})`;
    document.getElementById('movie-trailer').src = trailerUrlEmbed;

    // 6. Géneros
    const genresContainer = document.getElementById('genres');
    genresContainer.innerHTML = '';
    const genresTitle = document.createElement('strong');
    genresTitle.textContent = 'Género: ';
    genresContainer.appendChild(genresTitle);
    movieData.genres.forEach(g => {
        const span = document.createElement('span');
        span.textContent = g.name + ' ';
        genresContainer.appendChild(span);
    });

    // 7. Director
    const directorContainer = document.getElementById('director');
    directorContainer.innerHTML = '';
    const nameDirector = document.createElement('strong');
    nameDirector.textContent = 'Director: ';
    directorContainer.appendChild(nameDirector);
    const directorName = document.createElement('span');
    directorName.textContent = director.name;
    directorContainer.appendChild(directorName);

    // 8. Reparto principal con fotos
    const castContainer = document.getElementById('cast');
    castContainer.innerHTML = '';
    const castWrapper = document.getElementById('famosos-wrapper');
    castWrapper.innerHTML = '';
    const actorImgUrl = 'https://image.tmdb.org/t/p/w200';

    cast.slice(0, 20).forEach(actor => {
        const actorDiv = document.createElement('div');
        actorDiv.classList.add('actor-item');
        actorDiv.dataset.id = actor.id;

        const img = document.createElement('img');
        img.src = actor.profile_path ? actorImgUrl + actor.profile_path : 'fallback.jpg';
        img.alt = actor.name || 'Actor';

        const name = document.createElement('p');
        name.textContent = actor.name || 'Sin nombre';

        actorDiv.appendChild(img);
        actorDiv.appendChild(name);
        castWrapper.appendChild(actorDiv);
    });

    // 9. Guionistas
    const writerContainer = document.getElementById('writers');
    writerContainer.innerHTML = '';
    const titleWriters = document.createElement('strong');
    titleWriters.textContent = 'Guionistas: ';
    writerContainer.appendChild(titleWriters);
    writers.forEach((writer, index, array) => {
        const span = document.createElement('span');
        span.textContent = writer.name + (index < array.length - 1 ? ', ' : '');
        writerContainer.appendChild(span);
    });

    // 10. Cargar películas relacionadas
    const relatedData = await getRelatedMovies(idRelatedMovies);
    if (relatedData.results.length) {
        loadMovies(
            relatedData.results,
            'related-container',
            'related-prev',
            'related-next',
            6,
            196,
            null, // Sin callback de siguiente página
            true
        );
    }

    // 11. Habilitar navegación por items de película
    enableMovieItemNavigation();
    enableFamousItemNavigation();

    // 12. Habilitar scroll horizontal para reparto
    enableHorizontalScroll('famosos-wrapper', 'cast-prev', 'cast-next');
}


