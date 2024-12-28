import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class PaisService {
  constructor() {}

  async create(data) {
    const newCountry = await models.Pais.create(data);
    return newCountry;
  }

  async get() {
    const countries = await models.Pais.findAll();
    return countries;
  }

  async getById(id) {
    const country = await models.Pais.findByPk(id);
    if (!country) {
      throw boom.notFound('Country not found');
    }
    return country;
  }

  async delete(id) {
    const country = await this.getById(id);
    await country.destroy();
  }
}

export default PaisService;
