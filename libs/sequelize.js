import { Sequelize } from 'sequelize';
import config from '../config.js';
import setupModels from '../api/associations.js';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize); // Configuramos los modelos

sequelize.sync({ alter: true });

export default sequelize;
