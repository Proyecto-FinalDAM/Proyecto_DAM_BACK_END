package com.CineHub.dao;

import com.CineHub.entity.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.*;

public class UserDAO {

    private static final String GET_BY_EMAIL =
            "SELECT * FROM usuario WHERE email = ?";

    private static final String INSERT_USER =
            "INSERT INTO usuario(nombre, apellidos, email, contrasena) VALUES (?, ?, ?, ?)";

    private static final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    // ========================
    // Buscar usuario
    // ========================
    public static Usuario getUserByEmail(String email) {
        System.out.println("Buscando email: " + email);

        try (Connection conn = DAOSQL.conexion();
             PreparedStatement stmt = conn.prepareStatement(GET_BY_EMAIL)) {

            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                System.out.println("ENCONTRADO en BD");
                Usuario u = new Usuario();
                u.setId(rs.getInt("id"));
                u.setUserName(rs.getString("nombre"));
                u.setLastName(rs.getString("apellidos"));
                u.setEmail(rs.getString("email"));
                u.setPass(rs.getString("contrasena"));
                return u;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("NO encontrado");
        return null;
    }

    // ========================
    // Registro (HASH)
    // ========================
    public static boolean registerUser(Usuario user) {

        if (getUserByEmail(user.getEmail())
                != null) return false;

        try (Connection conn = DAOSQL.conexion();
             PreparedStatement stmt = conn.prepareStatement(INSERT_USER)) {

            stmt.setString(1, user.getUserName());
            stmt.setString(2, user.getLastName());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, encoder.encode(user.getPass()));

            stmt.executeUpdate();
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // ========================
    // Login (HASH)
    // ========================
    public static boolean loginUser(String email, String password) {

        Usuario user = getUserByEmail(email);
        if (user == null) return false;

        return encoder.matches(password, user.getPass());
    }
}
