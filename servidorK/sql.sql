CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    str_usuario_nombre VARCHAR(255),
    str_usuario_apellido VARCHAR(255),
    str_usuario_rol VARCHAR(255),
    str_usuario_telefono VARCHAR(255),
    str_usuario_correo VARCHAR(255),
    str_usuario_contraseña VARCHAR(255),
    str_pais_id INTEGER REFERENCES paises(int_pais_id),
    str_nivel_estudio VARCHAR(255),
    str_usuario_estado VARCHAR(255),
    dt_fecha_creacion TIMESTAMP DEFAULT current_timestamp
);