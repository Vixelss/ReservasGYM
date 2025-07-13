module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define(
    "Horario",
    {
      id_horario:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fecha:        DataTypes.DATEONLY,
      hora_inicio:  DataTypes.TIME,
      hora_fin:     DataTypes.TIME,
      cupo_max:     DataTypes.INTEGER,
      id_servicio:  DataTypes.INTEGER
    },
    { tableName: "horarios", timestamps: false }
  );

  Horario.associate = (models) => {
    Horario.belongsTo(models.Servicio, { foreignKey: "id_servicio" });
    Horario.hasMany(models.Reserva,   { foreignKey: "id_horario" });
  };

  return Horario;
};
