module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Horario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    servicio_id: { type: DataTypes.INTEGER, allowNull: false },
    dia: { type: DataTypes.STRING, allowNull: false },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_fin: { type: DataTypes.TIME, allowNull: false },
    cupos: { type: DataTypes.INTEGER }
  }, {
    tableName: "horarios",
    timestamps: false
  });
};
