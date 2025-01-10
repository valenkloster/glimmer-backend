import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;

class ProvinciaService {
  constructor() {}

  async create(data) {
    const newState = await models.Provincia.create(data);
    return newState;
  }

  async get() {
    const states = await models.Provincia.findAll();
    return states;
  }

  async getById(id) {
    const state = await models.Provincia.findByPk(id, {
      include: ['pais'],
    });
    if (!state) {
      throw boom.notFound('State not found');
    }
    return state;
  }

  async delete(id) {
    const state = await this.getById(id);
    await state.destroy();
  }
}

export default ProvinciaService;
