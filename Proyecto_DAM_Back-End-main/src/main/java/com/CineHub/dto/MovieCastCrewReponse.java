package com.CineHub.dto;

import com.CineHub.entity.MovieCast;
import com.CineHub.entity.MovieCrew;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieCastCrewReponse {

    @JsonProperty("id")
    private int famousId;
    @JsonProperty("cast")
    private List<MovieCast> movieCast;
    @JsonProperty("crew")
    private List<MovieCrew> movieCrew;

    // CONSTRUCTOR
    public MovieCastCrewReponse(List<MovieCast> movieCast, List<MovieCrew> movieCrew) {
        this.movieCast = movieCast;
        this.movieCrew = movieCrew;
    }

    public MovieCastCrewReponse(){

    }

    // GETTERS Y SETTERS
    public int getFamousId() {
        return famousId;
    }

    public void setFamousId(int famousId) {
        this.famousId = famousId;
    }

    public List<MovieCast> getMovieCast() {
        return movieCast;
    }

    public void setMovieCast(List<MovieCast> movieCast) {
        this.movieCast = movieCast;
    }

    public List<MovieCrew> getMovieCrew() {
        return movieCrew;
    }

    public void setMovieCrew(List<MovieCrew> movieCrew) {
        this.movieCrew = movieCrew;
    }
}
