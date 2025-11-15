package com.CineHub.entity;


public class Usuario {

    private int id;
    private String userName;
    private String lastName;
    private String pass;
    private String email;


    // CONSTRUCTOR
    public Usuario(){

    }

    public Usuario(int id, String userName, String lastName, String pass, String email) {
        this.id = id;
        this.userName = userName;
        this.lastName = lastName;
        this.pass = pass;
        this.email = email;
    }

    // GETTERS Y SETTERS

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", pass='" + pass + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
