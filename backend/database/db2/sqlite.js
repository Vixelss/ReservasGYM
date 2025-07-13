const { Sequelize } = require('sequelize');
const path = require('path');

const sqliteDB = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'reservas_aux.db'), // ruta absoluta segura
  logging: false
});

module.exports = sqliteDB;
