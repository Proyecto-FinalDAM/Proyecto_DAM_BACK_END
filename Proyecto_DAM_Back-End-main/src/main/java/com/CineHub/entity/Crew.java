package com.CineHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
// Ignora propiedades del JSON que no estén mapeadas en esta clase
@JsonIgnoreProperties(ignoreUnknown = true)
public class Crew {

    @JsonProperty("credit_id")
    private String creditId;
    private String department;
    private int gender;
    private int id;
    private String job;
    private String name;
    @JsonProperty("profile_path")
    private String profilePath;

    // CONSTRUCTOR

    public Crew() {
    }

    // GETTERS Y SETTERS
    public String getCreditId() {
        return creditId;
    }

    public void setCreditId(String creditId) {
        this.creditId = creditId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePath() {
        return profilePath;
    }

    public void setProfilePath(String profilePath) {
        this.profilePath = profilePath;
    }
}
