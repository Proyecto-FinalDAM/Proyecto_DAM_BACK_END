package com.CineHub.controllers;

import com.CineHub.dao.UserDAO;
import com.CineHub.dto.LoginRequest;
import com.CineHub.dto.RegisterRequest;
import com.CineHub.entity.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {

    // ========================
    // LOGIN
    // ========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // ✅ NORMALIZAR EMAIL
        String email = request.getEmail().trim().toLowerCase();

        Usuario user = UserDAO.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales incorrectas");
        }

        boolean ok = UserDAO.loginUser(email, request.getPassword());

        if (!ok) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales incorrectas");
        }

        // ⚠️ Nunca devolver contraseña
        user.setPass(null);

        return ResponseEntity.ok(user);
    }

    // ========================
    // REGISTER
    // ========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        // ✅ NORMALIZAR EMAIL
        String email = request.getEmail().trim().toLowerCase();

        Usuario u = new Usuario();
        u.setUserName(request.getNombre().trim());
        u.setLastName(request.getApellidos().trim());
        u.setEmail(email);
        u.setPass(request.getPassword());

        boolean ok = UserDAO.registerUser(u);

        if (!ok) {
            return ResponseEntity
                    .badRequest()
                    .body("Usuario ya existe");
        }

        return ResponseEntity.ok("Usuario registrado correctamente");
    }
}
