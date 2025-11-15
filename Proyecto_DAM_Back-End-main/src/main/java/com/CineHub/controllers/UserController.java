package com.CineHub.controllers;

import com.CineHub.dao.UserDAO;
import com.CineHub.entity.Usuario;

public class UserController {

    public static void registrarUsuario(String nombre, String apellidos, String email, String pass) {

        Usuario u = new Usuario();
        u.setUserName(nombre);
        u.setLastName(apellidos);
        u.setEmail(email);
        u.setPass(pass);

        boolean registrado = UserDAO.registerUser(u);

        if (registrado) {
            System.out.println("🎉 Usuario creado con éxito");
        } else {
            System.out.println("⚠ No se pudo registrar el usuario");
        }
    }

    public static void loginUsuario(String email, String pass) {

        boolean ok = UserDAO.loginUser(email, pass);

        if (ok) {
            System.out.println("🎉 Bienvenido " + email);
        } else {
            System.out.println("❌ Login incorrecto");
        }
    }
}
