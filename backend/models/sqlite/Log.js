const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db2/sqlite');


const Log = sequelize.define('Log', {
  id_log: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ip: DataTypes.STRING,
  navegador: DataTypes.STRING
}, {
  tableName: 'logs_acceso',
  timestamps: false
});

module.exports = Log;
