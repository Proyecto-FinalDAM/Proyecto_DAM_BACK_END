# CineHub

CineHub es una web para explorar películas y series, mostrando información como próximos estrenos, tendencias, top movies, detalles de cada película, reparto y trailers. La aplicación consume datos desde un backend Spring Boot que se conecta a la API de TMDB.

## Tecnologías

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Spring Boot (Java)
- **API externa**: TMDB
- **Despliegue**: GitHub Pages (frontend), Railway (backend)

## Estructura del proyecto

### Frontend
- Carpeta `js/`: scripts principales
- Carpeta `css/`: estilos
- Archivos HTML principales
- Consume endpoints del backend a través de `fetch` o AJAX

### Backend
- Paquete `controllers`: endpoints para las películas y series
- Paquete `services`: lógica para construir URLs y procesar datos
- Paquete `dao`: acceso a la API TMDB
- Paquete `dto` y `entity`: estructuras de datos
- CORS configurado para permitir llamadas desde GitHub Pages y localhost

## Endpoints principales

- `/peliculas/upcoming` – Próximos estrenos  
- `/peliculas/playing` – Películas en cartelera  
- `/peliculas/trendingDayMovies` – Tendencias del día  
- `/peliculas/topMovies` – Top películas  
- `/peliculas/details?id=<id>` – Detalles de una película  
- `/famous/credits?id=<id>` – Reparto  
- `/trailer?id=<id>` – Trailer de la película

## Configuración local

1. Clonar el repositorio backend y frontend.  
2. Backend:  
   - Configurar `application.properties` con `server.port=${PORT:8080}`  
   - Ejecutar con Maven o Gradle: `./mvnw spring-boot:run`  
3. Frontend: abrir HTML en un servidor local (Live Server, VS Code)  
4. Asegurarse que `api.js` apunta a `http://localhost:8080` para pruebas locales

## Despliegue

- **Frontend**: GitHub Pages  
- **Backend**: Railway  
  - URL pública: `https://peliculasonlinehd-production.up.railway.app`  
  - Cambiar en `api.js` para producción:  
    ```javascript
    const BASE_URL = "https://peliculasonlinehd-production.up.railway.app";
    ```

## CORS

El backend permite llamadas desde:

- Local: `http://localhost:5500`  
- GitHub Pages: `https://carlosriberadonet.github.io`  
- Backend Railway: `https://peliculasonlinehd-production.up.railway.app`

## Notas

- El backend solo sirve endpoints de la API, no archivos estáticos.  
- Toda la interfaz se sirve desde GitHub Pages.  
- Se recomienda mantener los endpoints y las URLs sincronizadas en `api.js`.
