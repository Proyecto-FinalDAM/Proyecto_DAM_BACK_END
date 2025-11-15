package com.CineHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Trailer {
    private String key;
    private String site;
    private String type;
    private String name;
    private String id;
    private int size;

    // CONSTRUCTOR
    public Trailer(String key, String site, String type, String name, String id, int size) {
        this.key = key;
        this.site = site;
        this.type = type;
        this.name = name;
        this.id = id;
        this.size = size;
    }

    public Trailer(){

    }

    // GETTERS Y SETTERS
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
