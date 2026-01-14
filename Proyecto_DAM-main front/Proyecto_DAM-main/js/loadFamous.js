// loadFamous.js
import { enableHorizontalScroll } from './slider.js';

/**
 * Renderiza la lista de actores/famosos y configura el scroll
 * @param {Array} actors - Lista de actores/famosos
 * @param {string} contenedorId - ID del contenedor donde se insertan
 * @param {string} prevBtnId - ID del botón anterior
 * @param {string} nextBtnId - ID del botón siguiente */
export function loadFamous(
  actors,
  contenedorId,
  prevBtnId,
  nextBtnId,
) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  renderFamous(actors, contenedor);

  // Configura scroll horizontal simple
  enableHorizontalScroll(contenedorId, prevBtnId, nextBtnId, 150, 10);
}

/**
 * Inserta los actores en el contenedor
 */
function renderFamous(actors, contenedor) {
  contenedor.innerHTML = ''; // limpia contenido previo

  actors.forEach(actor => {
    const div = document.createElement('div');
    div.classList.add('actor-item');
    div.dataset.id = actor.id;

    const img = document.createElement('img');
    img.src = actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'fallback.jpg';
    img.alt = actor.name || 'Actor';
    div.appendChild(img);

    const name = document.createElement('p');
    name.textContent = actor.name || 'N/D';
    div.appendChild(name);

    const pop = document.createElement('p');
    pop.textContent = actor.popularity ? actor.popularity.toFixed(1) : '0';
    div.appendChild(pop);

    contenedor.appendChild(div);
  });
}
