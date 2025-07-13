-- ──────────────────────────────────────────────────────────────
--  RECREAR BD  •  reservas_gym  •  XAMPP MySQL puerto 3307
-- ──────────────────────────────────────────────────────────────
DROP DATABASE IF EXISTS reservas_gym;
CREATE DATABASE reservas_gym DEFAULT CHARACTER SET utf8mb4;
USE reservas_gym;

-- ── 1) TABLA ROLES ────────────────────────────────────────────
CREATE TABLE roles (
  id_role  INT AUTO_INCREMENT PRIMARY KEY,
  nombre   VARCHAR(20) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO roles (nombre) VALUES
  ('admin'),
  ('cliente');

-- ── 2) TABLA USUARIOS ─────────────────────────────────────────
CREATE TABLE usuarios (
  id_usuario     INT AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(100) NOT NULL,
  email          VARCHAR(100) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  id_role        INT NOT NULL,
  FOREIGN KEY (id_role) REFERENCES roles(id_role)
) ENGINE=InnoDB;

-- Contraseñas ejemplo:
--  admin123  →  $2b$10$ESXSlLq7mY.K4znMlDg5e.Ofpx5qJOD9tuY5ku.UmTJ1qtND1Heum
--  cliente123→  $2b$10$zyG0c7N98xUFMjmtg0fgj.VENo1mDs1Vyf9KbkksiD3N9i6y7fYyu
INSERT INTO usuarios (nombre,email,password_hash,id_role) VALUES
  ('Admin Gym','admin@example.com','$2b$10$1kloW3PKmwKBhBE7RXA.IOQs3VWeotBdoyORa7BA6F2IjyP86g8EC',1),
  ('Juan Perez','juan@example.com','$2b$10$YFhYz8jLdqBUMb/Bz4rWk.HSjUm0X/Uz3AAtAdEjIyQMl4MgOsy5S',2);

-- ── 3) TABLA SERVICIOS ────────────────────────────────────────
CREATE TABLE servicios (
  id_servicio   INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(50) NOT NULL,
  descripcion   VARCHAR(255),
  duracion_min  INT
) ENGINE=InnoDB;

INSERT INTO servicios (nombre,descripcion,duracion_min) VALUES
  ('Yoga'   ,'Clase relajante y de estiramiento',60),
  ('Zumba'  ,'Clase de baile con música energética',50),
  ('Cardio' ,'Entrenamiento para mejorar la resistencia',45),
  ('CrossFit','Ejercicios funcionales de alta intensidad',60),
  ('Pilates','Fortalecimiento y control del cuerpo',50);

-- ── 4) TABLA HORARIOS ─────────────────────────────────────────
CREATE TABLE horarios (
  id_horario  INT AUTO_INCREMENT PRIMARY KEY,
  id_servicio INT NOT NULL,
  fecha       DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin    TIME NOT NULL,
  cupo_max    INT NOT NULL,
  FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
) ENGINE=InnoDB;

INSERT INTO horarios (id_servicio,fecha,hora_inicio,hora_fin,cupo_max) VALUES
  (1,'2025-07-08','08:00:00','09:00:00',20),
  (2,'2025-07-09','09:00:00','09:50:00',25),
  (3,'2025-07-10','07:00:00','07:45:00',15),
  (4,'2025-07-11','10:00:00','11:00:00',12),
  (5,'2025-07-12','12:00:00','12:50:00',18);

-- ── 5) TABLA RESERVAS ────────────────────────────────────────
CREATE TABLE reservas (
  id_reserva    INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario    INT NOT NULL,
  id_horario    INT NOT NULL,
  fecha_reserva DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado        VARCHAR(20) DEFAULT 'confirmado',
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_horario) REFERENCES horarios(id_horario),
  UNIQUE KEY uniq_usuario_horario (id_usuario,id_horario) -- evita dobles reservas
) ENGINE=InnoDB;

-- Reserva de ejemplo (Juan → Yoga)
INSERT INTO reservas (id_usuario,id_horario,estado) VALUES
  (2,1,'confirmado');

-- ──────────────────────────────────────────────────────────────
-- FIN DEL SCRIPT – BD lista para usar con tu aplicación Node
-- ──────────────────────────────────────────────────────────────
