INSERT INTO seguridad.tb_usuarios (str_usuario_nombre, str_usuario_apellido, str_usuario_rol, str_usuario_telefono, str_usuario_correo, str_usuario_contraseña, str_pais_id, str_nivel_estudio, str_usuario_estado, dt_fecha_creacion)
VALUES ('John', 'Doe', 'Usuario', '123456789', 'john.doe@example.com', 'secreto', 1, 'Licenciatura', 'ACTIVO', current_timestamp);

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