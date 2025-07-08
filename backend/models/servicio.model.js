module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Servicio", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    imagen: { type: DataTypes.STRING }
  }, {
    tableName: "servicios",
    timestamps: false
  });
};
