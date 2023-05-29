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

CREATE TABLE tb_usuario_materia (
    id SERIAL PRIMARY KEY,
    int_usuario_id INT,
    int_materia_id INT,
    str_materia_acro VARCHAR(255),
    str_materia_color VARCHAR(255),
    str_nombre_profesor VARCHAR(255),
    FOREIGN KEY (int_usuario_id) REFERENCES tb_usuario(int_usuario_id),
    FOREIGN KEY (int_materia_id) REFERENCES tb_materia(int_materia_id)
);
INSERT INTO tb_usuario_materia (int_usuario_id, int_materia_id, str_materia_acro, str_materia_color, str_nombre_profesor)
VALUES
    (1, 1, 'MAT101', 'Rojo', 'Profesor A'),
    (1, 2, 'FIS201', 'Azul', 'Profesor B'),
    (2, 1, 'MAT101', 'Rojo', 'Profesor A'),
    (2, 3, 'ENG301', 'Verde', 'Profesor C');

CREATE TABLE tb_horario (
    id SERIAL PRIMARY KEY,
    int_usuario_materia_id INT,
    time_hora_inicio TIME,
    time_hora_fin TIME,
    str_dia VARCHAR(255),
    FOREIGN KEY (int_usuario_materia_id) REFERENCES tb_usuario_materia(d)
);
INSERT INTO tb_horario (int_usuario_materia_id, time_hora_inicio, time_hora_fin, str_dia)
VALUES
    (1, '09:00:00', '11:00:00', 'Lunes'),
    (1, '14:00:00', '16:00:00', 'Miércoles'),
    (2, '10:30:00', '12:30:00', 'Martes'),
    (2, '13:00:00', '15:00:00', 'Jueves');
