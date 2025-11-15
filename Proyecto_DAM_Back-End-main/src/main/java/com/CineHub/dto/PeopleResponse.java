package com.CineHub.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.CineHub.entity.Famous;

import java.util.List;

// Ignora propiedades del JSON que no estén mapeadas en esta clase
@JsonIgnoreProperties(ignoreUnknown = true)
public class PeopleResponse {

    private int page;
    @JsonProperty("total_pages")
    private int totalPages;
    @JsonProperty("total_results")
    private int results;
    @JsonProperty("results") // El campo "results" del JSON mapea a popularPeopleList
    private List<Famous> popularFamousList;

    // CONSTRUCTOR
    public PeopleResponse(List<Famous> popularFamousList){
        this.popularFamousList = popularFamousList;
    }

    public PeopleResponse(){

    }

    // GETTERS Y SETTERS
    public int getPage(){
        return page;
    }

    public void setPage(int page){
        this.page = page;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getResults() {
        return results;
    }

    public void setResults(int results) {
        this.results = results;
    }

    public List<Famous> getPopularPeopleList(){
        return popularFamousList;
    }

    public void setPopularPeopleList(List<Famous> popularFamousList){
        this.popularFamousList = popularFamousList;
    }
}
