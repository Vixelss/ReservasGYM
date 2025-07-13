module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre:     DataTypes.STRING,
      email:      DataTypes.STRING,
      password_hash: DataTypes.STRING,
      id_role:    DataTypes.INTEGER
    },
    { tableName: "usuarios", timestamps: false }
  );

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Rol,    { foreignKey: "id_role" });
    Usuario.hasMany(models.Reserva,  { foreignKey: "id_usuario" });
  };

  return Usuario;
};
