import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class LocalidadService {
  constructor() {}

  async create(data) {
    const nuevaLocalidad = await models.Localidad.create(data);
    return nuevaLocalidad;
  }

  async get() {
    const localidades = await models.Localidad.findAll();
    return localidades;
  }

  async getById(id) {
    const localidad = await models.Localidad.findByPk(id);
    if (!localidad) {
      throw boom.notFound('Localidad not found');
    }
    return localidad;
  }

  async delete(id) {
    const localidad = await this.getById(id);
    await localidad.destroy();
    return { rta: true };
  }
}

export default LocalidadService;
