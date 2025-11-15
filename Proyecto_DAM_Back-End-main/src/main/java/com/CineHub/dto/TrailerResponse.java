package com.CineHub.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.CineHub.entity.Trailer;

import java.util.List;

// Ignora propiedades del JSON que no estén mapeadas en esta clase
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrailerResponse {

    private int id; // Id de la película
    @JsonProperty("results")
    private List<Trailer> trailerList;

    // CONSTRUCTOR
    public TrailerResponse(){

    }

    // GETTERS Y SETTERS

    public List<Trailer> getTrailerList() {
        return trailerList;
    }

    public void setTrailerList(List<Trailer> trailerList) {
        this.trailerList = trailerList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
