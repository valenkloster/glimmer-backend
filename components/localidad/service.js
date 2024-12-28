import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class LocalidadService {
  constructor() {}

  async create(data) {
    const place = await models.Localidad.create(data);
    return place;
  }

  async get() {
    const places = await models.Localidad.findAll();
    return places;
  }

  async getById(id) {
    const place = await models.Localidad.findByPk(id, {
      include: ['provincia'],
    });
    if (!place) {
      throw boom.notFound('Place not found');
    }
    return place;
  }

  async delete(id) {
    const place = await this.getById(id);
    await place.destroy();
  }
}

export default LocalidadService;
