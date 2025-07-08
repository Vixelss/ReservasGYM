const { Sequelize } = require('sequelize');

const sqliteDB = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/database/db2/reservas_aux.db',
  logging: false
});

module.exports = sqliteDB;
