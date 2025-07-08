require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mysqlDB = require('./database/db1/mysql');
const sqliteDB = require('./database/db2/sqlite');

// Middlewares
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Montar rutas
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Reservas GYM funcionando 🏋️‍♂️');
});

// Conexión y arranque
(async () => {
  try {
    await mysqlDB.authenticate();
    console.log('✅ Conectado a MySQL');

    await sqliteDB.authenticate();
    console.log('✅ Conectado a SQLite');

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ Error conectando a las bases de datos:', error);
  }
})();
