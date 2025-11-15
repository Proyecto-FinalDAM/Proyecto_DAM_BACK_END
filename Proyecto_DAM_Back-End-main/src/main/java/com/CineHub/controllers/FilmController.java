package com.CineHub.controllers;

import com.CineHub.dto.MovieCastCrewReponse;
import com.CineHub.dto.MovieCreditsResponse;
import com.CineHub.dto.MovieResponse;
import com.CineHub.entity.FilmDetails;
import com.CineHub.entity.Movie;
import com.CineHub.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/peliculas")
@CrossOrigin(origins = "*")
public class FilmController {

    private final MovieService movieService;

    public FilmController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Obtiene próximos estrenos
    @GetMapping("/upcoming")
    public MovieResponse proximasPeliculas(){
        return movieService.getUpcomingMovies();
    }

    // Obtiene películas y series en cartelera
    @GetMapping("/playing/{page}")
    public MovieResponse carteleraPeliculas(@PathVariable ("page") int page){

        return movieService.getNowPlaying(page);
    }

    // Obtiene películas tendencias del día
    @GetMapping("/trendingDayMovies/{page}")
    public MovieResponse trendingDay(@PathVariable ("page") int page){

        return movieService.getTrendingDayMovies(page);
    }

    // Obtiene el top películas mejor valoradas
    @GetMapping("/topMovies/{page}")
    public MovieResponse topMovies(@PathVariable ("page") int page){
        return movieService.getTopMovies(page);
    }

    // Obtiene peliculas populares
    @GetMapping("/popularMovies/{page}")
    public MovieResponse popularMovies(@PathVariable ("page") int page){
        return movieService.getPopularMovies(page);
    }
    // Obtiene detalles de una pelicula a través de su id
    @GetMapping("/details/{id}")
    public FilmDetails detallesPelicula(@PathVariable ("id") int idPelicula){
        return movieService.getFilmDetails(idPelicula);
    }

    // Obtiene películas relacionadas
    @GetMapping("/relatedMovies/{id}")
    public MovieResponse relatedMovies(@PathVariable ("id") int idPelicula){
        return movieService.getRelatedMovies(idPelicula);
    }

    // Obtiene películas de un actor mediante su id
    @GetMapping("/famousMovies/{idFamous}")
    public MovieCastCrewReponse getFamousMovies(@PathVariable("idFamous") int idFamous){
        return movieService.getFamousMovieCredits(idFamous);
    }

    // Filtro para buscar películas por género. Se usa el id de TMDB
    @GetMapping("/discoverGenre/{idGenre}/{page}")
    public MovieResponse discoverMoviesByGenre(@PathVariable ("idGenre") int idGenre,
                                               @PathVariable("page") int page){
        return movieService.getMoviesByGenre(idGenre, page);
    }

    // Buscar película por nombre
    @GetMapping("movie/{name}")
    public MovieResponse searchMovieByName(@PathVariable("name") String name){
        return movieService.getMovieByName(name);
    }
}