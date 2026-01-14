package com.CineHub.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DAOSQL {

  //  private static final String URL = "jdbc:mysql://localhost:3306/usuarios";
  private static final String URL = "jdbc:mysql://localhost:3030/usuarios";
    private static final String USER = "root";
    private static final String PASS = "1234";

    public static Connection conexion(){
        try{
            System.out.println("BD conectada.");
            return DriverManager.getConnection(URL, USER, PASS);
        }catch(SQLException e){
            System.out.println("Error al conectar con la BD.");
            e.printStackTrace();
        }
        return null;
    }
}
