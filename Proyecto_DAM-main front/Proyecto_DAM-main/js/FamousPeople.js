// famosos.js
// Módulo para cargar la lista de actores famosos y habilitar scroll horizontal

import { enableHorizontalScroll, enableFamousItemNavigation } from './utils.js';

const BASE_URL = "https://cinehub-backend-production.up.railway.app";

export function loadFamous() {
    const actorUrl = 'https://image.tmdb.org/t/p/w300'; // URL base para las imágenes de los actores
    const wrapper = document.getElementById('famosos-wrapper');
    if (!wrapper) return; // Si no existe el contenedor, salir
    wrapper.innerHTML = ""; // Limpiar contenido previo

    // Llamada a la API para obtener actores más populares
    fetch(`${BASE_URL}/famous/mostPopular`)
        .then(res => res.json())
        .then(data => {
            if (!data.results) return; // Si no hay resultados, salir

            // Recorrer los actores y crear elementos HTML
            data.results.forEach(actor => {
                const div = document.createElement('div');
                div.classList.add('actor-item'); // Clase para estilos de cada actor

                div.dataset.id = actor.id; // Almacenar el ID del actor para navegación
                // Imagen del actor
                const img = document.createElement('img');
                img.src = actor.profile_path ? actorUrl + actor.profile_path : 'fallback.jpg';
                img.alt = actor.name || 'Actor';

                // Nombre del actor
                const name = document.createElement('p');
                name.textContent = actor.name || 'N/D';

                // Popularidad del actor
                const pop = document.createElement('p');
                pop.textContent = actor.popularity ? actor.popularity.toFixed(1) : '0';

                // Añadir elementos al contenedor del actor
                div.appendChild(img);
                div.appendChild(name);
                div.appendChild(pop);
                wrapper.appendChild(div);
            });

            // Habilitar scroll horizontal con botones o scroll táctil
            enableHorizontalScroll('famosos-wrapper', 'famosos-prev', 'famosos-next');

            enableFamousItemNavigation();
        });
}
