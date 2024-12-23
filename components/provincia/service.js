import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class ProvinciaService {
  constructor() {}

  async create(data) {
    const nuevaProvincia = await models.Provincia.create(data);
    return nuevaProvincia;
  }

  async get() {
    const provincias = await models.Provincia.findAll();
    return provincias;
  }

  async getById(id) {
    const provincia = await models.Provincia.findByPk(id, {
      include: ['pais'],
    });
    if (!provincia) {
      throw boom.notFound('Provincia not found');
    }
    return provincia;
  }

  async update(id, changes) {
    const provincia = await this.getById(id);
    const updatedProvincia = await provincia.update(changes);
    return updatedProvincia;
  }

  async delete(id) {
    const provincia = await this.getById(id);
    await provincia.destroy();
    return { rta: true };
  }
}

export default ProvinciaService;
