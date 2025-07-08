module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Rol", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: "roles",
    timestamps: false
  });
};
