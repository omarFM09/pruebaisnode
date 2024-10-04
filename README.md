#Estructura de BD:

create database postgres;

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    contraseña VARCHAR(255) NOT NULL,  -- Almacena la contraseña hasheada

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



CREATE OR REPLACE FUNCTION update_updated_at_column()

RETURNS TRIGGER AS $$

BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;

$$ LANGUAGE plpgsql;



CREATE TRIGGER update_users_updated_at

BEFORE UPDATE ON users

FOR EACH ROW

EXECUTE PROCEDURE update_updated_at_column();



CREATE TABLE tasks (

    id SERIAL PRIMARY KEY,

    usuario_id INTEGER NOT NULL,

    titulo VARCHAR(255) NOT NULL,

    descripcion TEXT,

    fecha_vencimiento DATE,

    estado VARCHAR(50) NOT NULL CHECK (estado IN ('pendiente', 'en progreso', 'completada')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE

);


---

en el directorio backend hacer: npm run server.js

y en la raíz para levantar el proyecto se hace: docker-compose up -- build

#En caso de que se dese reiniciar el servicio ejecutar: 

- docker-compose down
- docker-compose up --build

en ese orden.
Gracias.