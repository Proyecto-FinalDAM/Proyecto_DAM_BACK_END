package com.CineHub.dto;

public class RegisterRequest {
    private String nombre;
    private String apellidos;
    private String email;
    private String password;

    public String getNombre() { return nombre; }
    public String getApellidos() { return apellidos; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
}
