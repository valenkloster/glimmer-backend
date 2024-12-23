import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class PaisService {
  constructor() {}

  async create(data) {
    const nuevoPais = await models.Pais.create(data);
    return nuevoPais;
  }

  async get() {
    const paises = await models.Pais.findAll();
    return paises;
  }

  async getById(id) {
    const pais = await models.Pais.findByPk(id);
    if (!pais) {
      throw boom.notFound('Pais not found');
    }
    return pais;
  }

  async delete(id) {
    const pais = await this.getById(id);
    await pais.destroy();
    return { rta: true };
  }
}

export default PaisService;
