CREATE DATABASE classBuddyBD;

//creasion de esquemas de seguridad y negocio
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

/*
    var usuarioMateriaId = integer("int_usuario_materia_id")
    var apunteTitulo = varchar("str_apunte_titulo", 255)
    var apunteTexto = text("str_apunte_texto")
    var apunteRecordatorio = time("time_recordatorio")
    var fechaCreacion = datetime("dt_fecha_creacion")
*/

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
