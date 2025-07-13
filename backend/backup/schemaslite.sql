-- Tabla de opiniones de usuarios
CREATE TABLE IF NOT EXISTS opiniones (
  id_opinion INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario TEXT,
  servicio TEXT,
  comentario TEXT,
  puntuacion INTEGER,
  fecha DATE
);

-- Tabla de mensajes desde el formulario de contacto
CREATE TABLE IF NOT EXISTS contacto (
  id_mensaje INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  correo TEXT,
  asunto TEXT,
  contenido TEXT
);

-- Tabla de logs de acceso
CREATE TABLE IF NOT EXISTS logs_acceso (
  id_log INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_email TEXT,
  fecha_hora DATETIME,
  ip TEXT,
  navegador TEXT
);

-- Tabla de estadísticas generales del sistema
CREATE TABLE IF NOT EXISTS estadisticas_uso (
  id_estadistica INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha DATE,
  reservas_totales INTEGER,
  usuarios_nuevos INTEGER,
  servicio_mas_usado TEXT
);
