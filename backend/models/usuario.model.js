module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Usuario", {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    id_role: DataTypes.INTEGER  // 👈 aquí está el cambio
  }, {
    tableName: "usuarios",
    timestamps: false
  });
};
