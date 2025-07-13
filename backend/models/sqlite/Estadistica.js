const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db2/sqlite');


const Estadistica = sequelize.define('Estadistica', {
  id_estadistica: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  reservas_totales: DataTypes.INTEGER,
  usuarios_nuevos: DataTypes.INTEGER,
  servicio_mas_usado: DataTypes.STRING
}, {
  tableName: 'estadisticas_uso',
  timestamps: false
});

module.exports = Estadistica;
