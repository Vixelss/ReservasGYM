const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // reservas_gym
  process.env.DB_USER,     // root
  process.env.DB_PASSWORD, // root
  {
    host: process.env.DB_HOST,     // 127.0.0.1
    port: process.env.DB_PORT,     // 3307
    dialect: 'mysql',
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Usuario = require("./usuario.model")(sequelize, DataTypes);
db.Rol = require("./rol.model")(sequelize, DataTypes);
db.Servicio = require("./servicio.model")(sequelize, DataTypes);
db.Horario = require("./horario.model")(sequelize, DataTypes);
db.Reserva = require("./reserva.model")(sequelize, DataTypes);


// Relaciones corregidas
db.Usuario.belongsTo(db.Rol, { foreignKey: "id_role" });
db.Rol.hasMany(db.Usuario, { foreignKey: "id_role" });


db.Horario.belongsTo(db.Servicio, { foreignKey: "servicio_id" });
db.Servicio.hasMany(db.Horario, { foreignKey: "servicio_id" });

db.Reserva.belongsTo(db.Usuario, { foreignKey: "usuario_id" });
db.Reserva.belongsTo(db.Horario, { foreignKey: "horario_id" });

db.Usuario.hasMany(db.Reserva, { foreignKey: "usuario_id" });
db.Horario.hasMany(db.Reserva, { foreignKey: "horario_id" });

module.exports = db;
