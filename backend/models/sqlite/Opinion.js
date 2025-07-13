const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db2/sqlite');


const Opinion = sequelize.define('Opinion', {
  id_opinion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: DataTypes.STRING,
  servicio: DataTypes.STRING,
  comentario: DataTypes.TEXT,
  puntuacion: DataTypes.INTEGER,
  fecha: DataTypes.DATEONLY
}, {
  tableName: 'opiniones',
  timestamps: false
});

module.exports = Opinion;
