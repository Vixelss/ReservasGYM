module.exports = (sequelize, DataTypes) => {
  const Servicio = sequelize.define(
    "Servicio",
    {
      id_servicio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre:      { type: DataTypes.STRING,  allowNull: false },
      descripcion: DataTypes.STRING,
      duracion_min: DataTypes.INTEGER
      // ❌ cupos eliminado porque se maneja en horarios
    },
    { tableName: "servicios", timestamps: false }
  );

  Servicio.associate = (models) => {
    Servicio.hasMany(models.Horario, { foreignKey: "id_servicio" });
  };

  return Servicio;
};
