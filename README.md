# ReservasGYM

Aplicación web para gestión de reservas de clases en un gimnasio, con doble autenticación (cliente y administrador), panel de control completo y registro de estadísticas de uso. Proyecto final desarrollado con Node.js, React y dos bases de datos: MySQL y SQLite.

## Tecnologías utilizadas

- Node.js + Express
- React + Vite
- Sequelize ORM
- MySQL (datos principales)
- SQLite (logs, contacto y estadísticas)
- JWT (autenticación)
- CSS modular

## Estructura del proyecto

ReservasGYM/
├── backend/         # API REST (Express)
├── frontend/        # Cliente (React)

## Instalación local

1. Clona el repositorio

```bash
git clone https://github.com/usuario/reservasgym.git
cd reservasgym
```

2. Crea los archivos .env en backend/ y frontend/

```bash
# backend/.env
PORT=4000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=reservasgym
JWT_SECRET=clave_secreta
```

```bash
# frontend/.env
VITE_API_URL=http://localhost:4000
```

3. Importa las bases de datos

```bash
# En MySQL
# (Usa phpMyAdmin o tu cliente favorito)
# Importa el archivo:
backup/schema.sql
```

SQLite se generará automáticamente al iniciar el backend.

4. Instala dependencias

```bash
cd backend
npm install

cd ../frontend
npm install
```

5. Ejecuta el proyecto

```bash
# En una terminal
cd backend
npm run dev
```

```bash
# En otra terminal
cd frontend
npm run dev
```

## Acceso local

Cliente: http://localhost:5173  
Panel de administración: http://localhost:5173/admin

## Funcionalidades implementadas

- Registro e inicio de sesión con JWT
- CRUD completo de usuarios, servicios, horarios y reservas (admin)
- Reserva de clases por parte de clientes
- Registro de logs de acceso en SQLite
- Opiniones públicas visibles
- Contacto vía formulario
- Panel de administración completo
- Control de roles y rutas protegidas por permisos

## Autor

Alex Vivanco  
Pontificia Universidad Católica del Ecuador  
Proyecto Final – Desarrollo basado en plataformas
