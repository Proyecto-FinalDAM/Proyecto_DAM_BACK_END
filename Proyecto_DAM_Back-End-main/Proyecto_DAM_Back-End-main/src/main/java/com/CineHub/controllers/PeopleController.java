package com.CineHub.controllers;


import com.CineHub.entity.Famous;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.CineHub.dto.MovieCreditsResponse;
import com.CineHub.dto.PeopleResponse;
import com.CineHub.service.PeopleService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/famous")
@CrossOrigin(origins = "*")
public class PeopleController {

    private final PeopleService peopleService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public PeopleController(PeopleService peopleService){
        this.peopleService = peopleService;
    }

    // Devuelve famosos más populares
    @GetMapping("/mostPopular")
    public PeopleResponse getMostPopularPeopleList(){

        return peopleService.getFamousPeople();
    }

    // Devuelve información de actores/actrices
    @GetMapping("/{idFamous}")
    public Famous getPeopleInfo(@PathVariable("idFamous") int idFamous){

        return peopleService.getFamousById(idFamous);
    }

    // Devuelve reparto principal de una película
    @GetMapping("/credits/{idPelicula}")
    public MovieCreditsResponse getCredits(@PathVariable("idPelicula") int idPelicula){
        return peopleService.getCast(idPelicula);
    }
}
