package com.CineHub.dto;

import com.CineHub.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
// Ignora propiedades del JSON que no estén mapeadas en esta clase
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieCreditsResponse {

    private int id;
    private List<Cast> cast;
    private List<Crew> crew;

    // CONSTRUCTOR
    public MovieCreditsResponse() {
    }

    // GETTERS Y SETTERS
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Cast> getCast() {
        return cast;
    }

    public void setCast(List<Cast> cast) {
        this.cast = cast;
    }

    public List<Crew> getCrew() {
        return crew;
    }

    public void setCrew(List<Crew> crew) {
        this.crew = crew;
    }
}
