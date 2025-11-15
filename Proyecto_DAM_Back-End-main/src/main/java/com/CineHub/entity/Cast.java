package com.CineHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// Ignora propiedades del JSON que no estén mapeadas en esta clase
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cast extends Famous{

    @JsonProperty("cast_id")
    private int castId;
    private String character;
    @JsonProperty("credit_id")
    private String creditId;
    private int gender;
    private int order;
    // CONSTRUCTOR


    public Cast() {
    }

    // GETTERS Y SETTERS
    public int getCastId() {
        return castId;
    }

    public void setCastId(int castId) {
        this.castId = castId;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public String getCreditId() {
        return creditId;
    }

    public void setCreditId(String creditId) {
        this.creditId = creditId;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
