package com.CineHub.dao;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Repository
public class ApiDAO {

    // Cliente HTTP para realizar peticiones REST
    private final RestTemplate restTemplate = new RestTemplate();

    // Token Bearer de acceso para la API TMDB
    private final String BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmIyNGFiMmQzODIyNjFlY" +
            "jRiYWI2ODk0OWQ0NDliMSIsIm5iZiI6MTc1NDYxMzE0My4wNDgsInN1YiI6IjY4OTU0NTk3N2I0ZGYyYjA" +
            "0YjA3Yzg5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPTJI_FGi5ApA8sY0T61Zv" +
            "X--gONMVDhlVi_hTeEpvU";

    private final String API_KEY = "96b24ab2d382261eb4bab68949d449b1";

    // Conexión a la API mediante BEARER_TOKEN v4 → devuelve siempre JSON en String
    public String getFromApi(String url, int page) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("Authorization", "Bearer " + BEARER_TOKEN);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // construir la URL con el parámetro page
        String fullUrl = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .toUriString();

        ResponseEntity<String> response = restTemplate.exchange(
                fullUrl,
                HttpMethod.GET,
                entity,
                String.class
        );
        return response.getBody();
    }

    // Conexión a URL con API KEY
    public String getFromApiKey(String urlFilm) {

        String url = urlFilm + "?api_key=" + API_KEY;

        System.out.println("Esta es la url construida: " + url);

        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
        return response.getBody();
    }

    // Conexión a URL con API KEY + número de página
    public String getFromApiKeyPage(String urlFilm, int page) {

        String url = urlFilm + "?api_key=" + API_KEY + "&region=ES&language=es-ES&page=" + page;

        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
        return response.getBody();
    }

    // Conexión a url con API + género + página
    public String getFromApiKeyGenrePage(String urlFilm, int genre, int page) {

        String url = urlFilm + "?api_key=" + API_KEY + "&language=es-ES&with_genres=" + genre + "&page=" + page;
        System.out.println("URL: " + url);
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
        return response.getBody();
    }

    // Conexión a url con API + texto
    public String getFromApiKeyText(String urlFilm, String text) {

        String url = urlFilm + "?api_key=" + API_KEY + "&language=es-ES&query=" + text + "&page=1&include_adult=true";

        System.out.println("Esta es la url construida: " + url);

        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
        return response.getBody();
    }
}
