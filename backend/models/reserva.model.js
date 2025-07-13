module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define(
    "Reserva",
    {
      id_reserva: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_usuario: DataTypes.INTEGER,
      id_horario: DataTypes.INTEGER,
      fecha_reserva: DataTypes.DATEONLY
    },
    { tableName: "reservas", timestamps: false }
  );

  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Usuario, { foreignKey: "id_usuario" });
    Reserva.belongsTo(models.Horario, { foreignKey: "id_horario" });
  };

  return Reserva;
};

