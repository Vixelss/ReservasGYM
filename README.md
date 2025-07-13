ReservasGYM
Aplicación web para gestión de reservas de clases en un gimnasio, con doble autenticación (cliente y administrador), panel de control completo y registro de estadísticas de uso. Proyecto final desarrollado con Node.js, React y dos bases de datos: MySQL y SQLite.

Tecnologías utilizadas
Node.js + Express

React + Vite

Sequelize ORM

MySQL (datos principales)

SQLite (logs, contacto y estadísticas)

JWT (autenticación)

CSS modular

Estructura del proyecto
ReservasGYM/
├── backend/ # API REST (Express)
├── frontend/ # Cliente (React)
├── backup/ # Scripts SQL para MySQL y SQLite
└── .env.example # Variables de entorno de ejemplo

Instalación local
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/usuario/reservasgym.git
cd reservasgym
Crea los archivos .env en las carpetas backend/ y frontend/:

backend/.env

ini
Copiar
Editar
PORT=4000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=reservasgym
JWT_SECRET=clave_secreta
frontend/.env

ini
Copiar
Editar
VITE_API_URL=http://localhost:4000
Importa las bases de datos:

En MySQL: importa backup/schema.sql

SQLite se generará automáticamente al iniciar el backend

Instala dependencias:

bash
Copiar
Editar
cd backend
npm install

cd ../frontend
npm install
Ejecuta el proyecto:

bash
Copiar
Editar
# En una terminal
cd backend
npm run dev

# En otra terminal
cd frontend
npm run dev
Abre el navegador:

Cliente: http://localhost:5173

Panel admin: http://localhost:5173/admin (requiere login de administrador)

Despliegue en línea
El backend está desplegado en Render:

https://reservasgym-backend.onrender.com

Y el frontend en Vercel:

https://reservasgym.vercel.app

Recuerda configurar en Vercel la variable:

ini
Copiar
Editar
VITE_API_URL=https://reservasgym-backend.onrender.com
Y en Render todas las variables necesarias del backend:

ini
Copiar
Editar
PORT=4000
DB_HOST=tu_host_mysql
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=reservasgym
JWT_SECRET=clave_secreta
Funcionalidades implementadas
Registro e inicio de sesión con JWT

CRUD completo de usuarios, servicios, horarios y reservas (admin)

Reserva de clases por clientes

Registro de logs de acceso

Contacto y opiniones públicas

Panel de administración completo

Control de roles y acceso protegido

Autor
Alex Vivanco
Pontificia Universidad Católica del Ecuador
Proyecto Final – Desarrollo basado en plataformas







Preguntar a ChatGPT
