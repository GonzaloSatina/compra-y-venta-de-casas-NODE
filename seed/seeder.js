import { exit } from "node:process";

import categorias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuarios.js";
import { Categoria, Precio, Usuario } from "../models/index.js";
import db from "../config/db.js";

const importarDatos = async () => {
  try {
    // Autenticar en la BD
    await db.authenticate();

    // Generar las columnas
    await db.sync();

    // Insertamos los datos
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
      Usuario.bulkCreate(usuarios),
    ]);
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    // await Promise.all([
    //   Categoria.destroy({ where: {}, truncate: true }),
    //   Precio.destroy({ where: {}, truncate: true }),
    // ]);

    // Otra forma de eliminar
    await db.sync({ force: true });
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") importarDatos();
if (process.argv[2] === "-e") eliminarDatos();
