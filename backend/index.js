require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Conexión a bases de datos
const mysqlDB = require('./database/db1/mysql');
const sqliteDB = require('./database/db2/sqlite');

// Middleware global
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Rutas MySQL principales
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservas', require('./routes/reservas'));
app.use('/api/horarios', require('./routes/horarios'));
app.use('/api/clases', require('./routes/clases'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/usuarios', require('./routes/usuarios'));

// ✅ Rutas SQLite
app.use('/api/opiniones', require('./routes/sqlite/opiniones'));
app.use('/api/contacto', require('./routes/sqlite/contacto'));
app.use('/api/logs', require('./routes/sqlite/logs'));
app.use('/api/estadisticas', require('./routes/sqlite/estadisticas'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Reservas GYM funcionando 🏋️‍♂️');
});

// Arranque de servidor
(async () => {
  try {
    await mysqlDB.authenticate();
    console.log('✅ Conectado a MySQL');

    await sqliteDB.authenticate();
    console.log('✅ Conectado a SQLite');

    // 🧩 Crear tablas MySQL automáticamente
    require('./models'); // asegúrate de que importa todos tus modelos
    await mysqlDB.sync(); // usar solo una vez


    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ Error conectando a las bases de datos:', error);
  }
})();
