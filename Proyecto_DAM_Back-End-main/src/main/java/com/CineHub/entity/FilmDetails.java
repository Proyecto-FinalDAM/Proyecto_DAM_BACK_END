package com.CineHub.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class FilmDetails {
    public boolean adult;

    @JsonProperty("backdrop_path")
    public String backdropPath;

    @JsonProperty("belongs_to_collection")
    public Object belongsToCollection;

    public int budget;
    public List<Genre> genres;
    public String homepage;
    public int id;

    @JsonProperty("imdb_id")
    public String imdbId;

    @JsonProperty("origin_country")
    public List<String> originCountry;

    @JsonProperty("original_language")
    public String originalLanguage;

    @JsonProperty("original_title")
    public String originalTitle;

    public String overview;
    public double popularity;

    @JsonProperty("poster_path")
    public String posterPath;

    @JsonProperty("production_companies")
    public List<ProductionCompany> productionCompanies;

    @JsonProperty("production_countries")
    public List<ProductionCountry> productionCountries;

    @JsonProperty("release_date")
    public String releaseDate;

    public long revenue;
    public int runtime;

    @JsonProperty("spoken_languages")
    public List<SpokenLanguage> spokenLanguages;

    public String status;
    public String tagline;
    public String title;
    public boolean video;

    @JsonProperty("vote_average")
    public double voteAverage;

    @JsonProperty("vote_count")
    public int voteCount;

    public static class Genre {
        public int id;
        public String name;
    }

    public static class ProductionCompany {
        public int id;
        @JsonProperty("logo_path")
        public String logoPath;
        public String name;
        @JsonProperty("origin_country")
        public String originCountry;
    }

    public static class ProductionCountry {
        @JsonProperty("iso_3166_1")
        public String iso3166_1;
        public String name;
    }

    public static class SpokenLanguage {
        @JsonProperty("english_name")
        public String englishName;
        @JsonProperty("iso_639_1")
        public String iso639_1;
        public String name;
    }
}