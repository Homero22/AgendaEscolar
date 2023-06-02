CREATE DATABASE classBuddyBD;

--creasion de esquemas de seguridad y negocio
CREATE SCHEMA seguridad;
CREATE SCHEMA negocio;

CREATE TABLE seguridad.tb_usuarios (
    id BIGSERIAL PRIMARY KEY,
    str_usuario_nombre VARCHAR(255),
    str_usuario_apellido VARCHAR(255),
    str_usuario_rol VARCHAR(255),
    str_usuario_telefono VARCHAR(255),
    str_usuario_correo VARCHAR(255),
    str_usuario_contraseña VARCHAR(255),
    str_pais_id INTEGER,
    str_nivel_estudio VARCHAR(255),
    str_usuario_estado VARCHAR(255),
    dt_fecha_creacion TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE seguridad.tb_pais(
    id serial PRIMARY KEY,
    str_pais_nombre varchar,
    str_pais_acronimo varchar,
    str_pais_estado varchar default 'ACTIVO'
);
<<<<<<< HEAD
INSERT INTO seguridad.tb_pais (str_pais_nombre, str_pais_acronimo)
VALUES ('Nombre del país', 'Acronimo');


//Tarea
create table negocio.tb_tarea (
  id serial,
  int_usuario_materia_id int,
  str_tarea_titulo text,
  str_tarea_descripcion text,
  dt_fecha_creacion timestamp default  now(),
  dt_fecha_fin time,
  str_tarea_estado varchar(15),
  time_recordatorio time
);
=======

create table negocio.tb_apuntes (
    id BIGSERIAL PRIMARY KEY,
    int_usuario_materia_id INT,
    str_apunte_titulo VARCHAR(255),
    str_apunte_texto TEXT,
    int_apunte_materia INT,
    time_recordatorio TIME,
    dt_fecha_creacion TIMESTAMP DEFAULT current_timestamp
)

CREATE TABLE negocio.tb_tarea (
    id BIGSERIAL PRIMARY KEY,
    int_usuario_materia_id INT,
    str_tarea_titulo TEXT,
    str_tarea_descripcion TEXT,
    dt_fecha_creacion TIMESTAMP DEFAULT current_timestamp
    dt_fecha_fin TIMESTAMP 
    str_tarea_estado VARCHAR(15) DEFAULT 'PENDIENTE',
    time_recordatorio TIME,
)

CREATE TABLE negocio.tb_apuntes(
    id BIGSERIAL PRIMARY KEY,
    int_usuario_materia_id INT,
    str_apunte_titulo VARCHAR(255),
    str_apunte_texto TEXT,
    time_recordatorio TIME,
    dt_fecha_creacion TIMESTAMP DEFAULT current_timestamp
)

CREATE TABLE negocio.tb_usuario_materia (
    id SERIAL PRIMARY KEY,
    int_usuario_id INT,
    int_materia_id INT,
    str_materia_acro VARCHAR(255),
    str_materia_color VARCHAR(255),
    str_nombre_profesor VARCHAR(255)
);

CREATE TABLE negocio.tb_horario (
    id SERIAL PRIMARY KEY,
    int_usuario_materia_id INT,
    time_hora_inicio TIME,
    time_hora_fin TIME,
    str_dia VARCHAR(255)
);

--FORANIAS
-- ALTER TABLE negocio.tb_usuario_materia ADD CONSTRAINT fk_usuario_materia_usuario FOREIGN KEY (int_usuario_id) REFERENCES seguridad.tb_usuarios(id);
-- ALTER TABLE negocio.tb_usuario_materia ADD CONSTRAINT fk_usuario_materia_materia FOREIGN KEY (int_materia_id) REFERENCES negocio.tb_materia(id);

>>>>>>> f9dde74c475cc7591a7f6a33ab62829f4d807d76
