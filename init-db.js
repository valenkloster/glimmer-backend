import { Sequelize } from 'sequelize';
import config from './config.js';
import setupModels from './api/associations.js';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

setupModels(sequelize);

async function initDB() {
  try {
    await sequelize.sync({ force: true });
    console.log('¡Tablas creadas exitosamente!');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  } finally {
    await sequelize.close();
  }
}

initDB();
