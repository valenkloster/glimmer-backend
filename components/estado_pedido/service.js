import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class EstadoPedidoService {
  constructor() {}

  async create(data) {
    const newOrderStatus = await models.Estado_Pedido.create(data);
    return newOrderStatus;
  }

  async get() {
    const orderStatus = await models.Estado_Pedido.findAll();
    return orderStatus;
  }

  async getById(id) {
    const orderStatus = await models.Estado_Pedido.findByPk(id);
    if (!orderStatus) {
      throw boom.notFound('Order Status not found');
    }
    return orderStatus;
  }

  async delete(id) {
    const orderStatus = await this.getById(id);
    await orderStatus.destroy();
  }
}

export default EstadoPedidoService;
