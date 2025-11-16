package com.CineHub.dao;

import com.CineHub.entity.Usuario;
import org.mindrot.jbcrypt.BCrypt;

import java.sql.*;

public class UserDAO {

    private static final String GET_USUARIOS = "SELECT * FROM usuario";
    private static final String GET_USER_BY_EMAIL = "SELECT * FROM usuario WHERE email = ?";
    private static final String REGISTER_USER = "INSERT INTO usuario(nombre, apellidos, email, contrasena) VALUES(?, ?, ?, ?)";

    static DAOSQL daoSQL = new DAOSQL();

    // Obtener todos los usuarios
    public static List<Usuario> getUsuarios() { ... }

    // ----------------------------------------------------------
    //  Obtener usuario por email
    // ----------------------------------------------------------
    public static Usuario getUserByEmail(String email) {

        try (Connection conn = DAOSQL.conexion()) {
            PreparedStatement stmt = conn.prepareStatement(GET_USER_BY_EMAIL);
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
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

        return null; // No existe
    }

    // ----------------------------------------------------------
    //  Registrar usuario (hasheando contraseña)
    // ----------------------------------------------------------
    public static boolean registerUser(Usuario user) {

        // 1. ¿Existe el email?
        if (getUserByEmail(user.getEmail()) != null) {
            System.out.println(" Email ya registrado");
            return false;
        }

        // 2. Hashear contraseña
        String hashed = BCrypt.hashpw(user.getPass(), BCrypt.gensalt());

        try (Connection conn = DAOSQL.conexion()) {
            PreparedStatement stmt = conn.prepareStatement(REGISTER_USER);

            stmt.setString(1, user.getUserName());
            stmt.setString(2, user.getLastName());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, hashed);

            stmt.executeUpdate();
            System.out.println(" Usuario registrado correctamente");
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // ----------------------------------------------------------
    //  Login (verificar credenciales)
    // ----------------------------------------------------------
    public static boolean loginUser(String email, String passIntroducida) {

        Usuario user = getUserByEmail(email);

        if (user == null) {
            System.out.println(" Usuario no encontrado");
            return false;
        }

        // Compara hash
        boolean ok = BCrypt.checkpw(passIntroducida, user.getPass());

        if (ok) {
            System.out.println(" Login correcto");
            return true;
        } else {
            System.out.println(" Contraseña incorrecta");
            return false;
        }
    }
}

