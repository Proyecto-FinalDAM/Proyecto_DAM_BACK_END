package com.CineHub;

import com.CineHub.dao.UserDAO;
import com.CineHub.entity.Usuario;
import org.apache.catalina.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.CineHub.dao.UserDAO.getUsuarios;

@SpringBootApplication
public class CineHubApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(CineHubApplication.class);

		// Obtener puerto desde variable de entorno
		String port = System.getenv("PORT");
		if (port == null) port = "8080"; // fallback local

		Map<String, Object> props = new HashMap<>();
		props.put("server.port", port);
		app.setDefaultProperties(props);
		app.run(args);

        UserDAO userDAO = new UserDAO();

        List<Usuario> usuarioList = getUsuarios();

        assert usuarioList != null;
        for(Usuario u : usuarioList){
            System.out.println(u.toString());
        }
	}
}