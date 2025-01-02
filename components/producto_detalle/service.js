import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class ProductDetalleService {
  async create(data) {
    const detail = await models.ProductoDetalle.create(data);
    return detail;
  }

  async getAllByProduct(productId) {
    const details = await models.ProductoDetalle.findAll({
      where: { id_producto: productId },
    });
    return details;
  }

  async getById(id) {
    const detail = await models.ProductoDetalle.findByPk(id);
    if (!detail) {
      throw boom.notFound('Detail not found');
    }
    return detail;
  }

  async update(id, changes) {
    const detail = await this.getById(id);
    await detail.update(changes);
  }

  async delete(id) {
    const detail = await this.getById(id);
    await detail.destroy();
  }
}

export default ProductDetalleService;
