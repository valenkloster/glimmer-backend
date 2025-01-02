import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class ProductTonoService {
  async create(data) {
    const color = await models.ProductoTono.create(data);
    return color;
  }

  async getAll() {
    const colors = await models.ProductoTono.findAll();
    return colors;
  }

  async getById(id) {
    const color = await models.ProductoTono.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    return color;
  }

  async update(id, changes) {
    const color = await this.getById(id);
    await color.update(changes);
  }

  async delete(id) {
    const color = await this.getById(id);
    await color.destroy();
  }
}

export default ProductTonoService;
