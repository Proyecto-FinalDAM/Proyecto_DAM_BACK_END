package com.CineHub.service;

import com.CineHub.entity.Famous;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.CineHub.dao.ApiDAO;
import com.CineHub.dto.MovieCreditsResponse;
import com.CineHub.dto.PeopleResponse;
import org.springframework.stereotype.Service;

@Service
public class PeopleService {

    private final ApiDAO apiDAO;
    private final ObjectMapper mapper = new ObjectMapper();

    public PeopleService(ApiDAO apiDAO){

        this.apiDAO = apiDAO;
    }

    // Obtiene lista de famosos
    public PeopleResponse getFamousPeople(){
        String peopleUrl = "https://api.themoviedb.org/3/person/popular";
        try{
            String json = apiDAO.getFromApiKey(peopleUrl);
            return mapper.readValue(json, PeopleResponse.class);
        } catch(Exception e){
            System.out.println("Error al obtener la lista de famosos desde getFamousPeople");
            e.printStackTrace();
        }
        return null;
    }

    // Obtiene reparto de actores/actrices principales de una película
    public MovieCreditsResponse getCast(int idPelicula){
        String castUrl = "https://api.themoviedb.org/3/movie/" + idPelicula + "/credits";
        try{
            String json = apiDAO.getFromApiKey(castUrl);
            return mapper.readValue(json, MovieCreditsResponse.class);
        } catch(Exception e){
            System.out.println("Error al obtener la lista de cast desde getCast");
            e.printStackTrace();
        }
        return null;
    }

    // Obtiene información de actor/actriz mediante su id
    public Famous getFamousById(int id){
        String famousUrl = "https://api.themoviedb.org/3/person/" + id;
        try{
            String json = apiDAO.getFromApiKey(famousUrl);
            return mapper.readValue(json, Famous.class);
        } catch (Exception e){
            System.out.println("Error al obtener actor desde getFamousById");
            e.printStackTrace();
        }
        return null;
    }
}
