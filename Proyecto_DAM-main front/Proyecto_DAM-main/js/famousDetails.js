// famousDetails.js
// Módulo para cargar los datos de un famoso y su filmografía completa en la página

import Header from './header.js';
import Footer from './footer.js';
import { getFamousDetails, getFamousMovies } from './api.js';
import { loadMovies } from './loadMovies.js';
import { enableMovieItemNavigation } from './utils.js';

// Habilitar navegación al hacer clic en un famoso
enableMovieItemNavigation();

export async function loadFamous(idFamous) {
    try {
        // 1. Cargar Header y Footer
        const header = new Header("header", "header.html");
        const footer = new Footer("footer", "footer.html");
        await header.load();
        await footer.load();

        // 2. Obtener los datos del famoso desde la API
        const famousData = await getFamousDetails(idFamous);

        // 3. Actualizar el HTML con la información del famoso
        if (famousData) {
            document.getElementById('famous-name').textContent = famousData.name || '';
            document.getElementById('place-of-birth').textContent = ' - ' + (famousData.place_of_birth || '');
            document.getElementById('birth-age').textContent = famousData.birthday || '';
            document.getElementById('death-age').textContent = famousData.deathday || '';
            document.getElementById('known-for-department').textContent = famousData.known_for_department || '';

            const backdrop = document.getElementById('backdrop');
            backdrop.src = famousData.profile_path 
                ? `https://image.tmdb.org/t/p/w300${famousData.profile_path}` 
                : 'fallback.jpg';
            backdrop.alt = famousData.name || 'Foto del famoso';

            document.getElementById('biography').textContent = famousData.biography || 'Biografía no disponible.';
        }

        // 4. Cargar la filmografía del famoso
        await loadFamousMovies(idFamous);

    } catch (error) {
        console.error('Error cargando los datos del famoso:', error);
    }
}

async function loadFamousMovies(idFamous) {
    try {
        // 1. Llamada a la API para obtener las películas en las que ha participado (cast y crew)
        const famousMovies = await getFamousMovies(idFamous);

        // 2. Unificar cast y crew en un solo array para mostrarlas juntas
        const movies = [
            ...(famousMovies.cast || []),
            ...(famousMovies.crew || [])
        ];

        // 3. Inyectar películas en el carrusel usando la función cargarPeliculas
        loadMovies(
            movies,
            'filmografia-container',  // contenedor HTML
            'filmografia-prev',       // botón previo
            'filmografia-next',       // botón siguiente
            6,                        // número de elementos visibles
            196,                      // ancho de cada elemento en píxeles
            null,                     // callback de carga de siguiente página (no usado)
            true                      // append = true, añade elementos sin limpiar
        );

    } catch (error) {
        console.error('Error cargando la filmografía:', error);
    }
}
