module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    "Rol",
    {
      id_role: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre:  DataTypes.STRING
    },
    { tableName: "roles", timestamps: false }
  );

  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, { foreignKey: "id_role" });
  };

  return Rol;
};
