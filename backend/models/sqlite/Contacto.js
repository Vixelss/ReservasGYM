const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db2/sqlite');


const Contacto = sequelize.define('Contacto', {
  id_mensaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  correo: DataTypes.STRING,
  asunto: DataTypes.STRING,
  contenido: DataTypes.TEXT
}, {
  tableName: 'contacto',
  timestamps: false
});

module.exports = Contacto;
