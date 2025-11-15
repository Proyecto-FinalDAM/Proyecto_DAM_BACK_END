CREATE DATABASE usuarios;

USE usuarios;

CREATE TABLE usuario(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(30),
apellidos VARCHAR(50),
email VARCHAR(50) NOT NULL UNIQUE,
contrasena VARCHAR(50) NOT NULL
);

INSERT INTO usuario(nombre, apellidos, email, contrasena) VALUES('Carlos', 'Ribera Donet', 'carlos@dam.com', '1234');

SELECT * FROM usuario;