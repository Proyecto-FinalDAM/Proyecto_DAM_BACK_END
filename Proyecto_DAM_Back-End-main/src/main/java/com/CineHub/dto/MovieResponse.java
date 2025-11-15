package com.CineHub.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.CineHub.entity.Movie;

import java.util.List;

// Ignora propiedades del JSON que no estén mapeadas en esta clase
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieResponse {

    private int page;
    @JsonProperty("results") // El campo "results" del JSON mapea a peliculasList
    private List<Movie> peliculasList;

    // CONSTRUCTOR
    public MovieResponse(List<Movie> peliculasList){
        this.peliculasList = peliculasList;
    }

    public MovieResponse(){

    }

    // GETTERS Y SETTERS
    public int getPage(){
        return page;
    }

    public void setPage(int page){
        this.page = page;
    }

    public List<Movie> getPeliculasList(){
        return peliculasList;
    }

    public void setPeliculasList(List<Movie> peliculaList){
        this.peliculasList = peliculaList;
    }
}
