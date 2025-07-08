module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Reserva", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    horario_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_reserva: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: "reservas",
    timestamps: false
  });
};
