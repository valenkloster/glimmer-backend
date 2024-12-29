import { Sequelize } from 'sequelize';
import config from '../config.js';
import setupModels from '../components/associations.js'; // Importamos el setup

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  // logging: (msg) => console.log(msg), // Imprime las queries (Opcional: puedes desactivar en producción)
  logging: false,
});

setupModels(sequelize); // Configuramos los modelos

sequelize.sync({ alter: true }); // Sincroniza el esquema con la base de datos

export default sequelize;
