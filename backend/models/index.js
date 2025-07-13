const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// siempre pasando (sequelize, DataTypes)
db.Usuario  = require("./usuario.model")(sequelize, DataTypes);
db.Rol      = require("./rol.model")(sequelize, DataTypes);
db.Servicio = require("./servicio.model")(sequelize, DataTypes);
db.Horario  = require("./horario.model")(sequelize, DataTypes);
db.Reserva  = require("./reserva.model")(sequelize, DataTypes);

// relaciones
db.Horario.belongsTo(db.Servicio, { foreignKey: "id_servicio" });
db.Servicio.hasMany(db.Horario,   { foreignKey: "id_servicio" });

db.Usuario.belongsTo(db.Rol, { foreignKey: "id_role" });
db.Rol.hasMany(db.Usuario,   { foreignKey: "id_role" });

db.Reserva.belongsTo(db.Usuario,  { foreignKey: "id_usuario" });
db.Reserva.belongsTo(db.Horario,  { foreignKey: "id_horario" });
db.Usuario.hasMany(db.Reserva,    { foreignKey: "id_usuario" });
db.Horario.hasMany(db.Reserva,    { foreignKey: "id_horario" });

module.exports = db;
