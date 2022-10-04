import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const db = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS ?? "",
  {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: true, // define los campos de auditoria (createdAt y updatedAt)
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // tiempo nates de marcar un error
      idle: 10000, // tiempo que debe de transcurrir para liberar una conexion a bd y liberar memoria
    },
    operatorsAliases: false,
  }
);

export default db;
