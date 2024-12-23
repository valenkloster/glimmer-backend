import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class EstadoPedidoService {
  constructor() {}

  async create(data) {
    const nuevoEstadoPedido = await models.Estado_Pedido.create(data);
    return nuevoEstadoPedido;
  }

  async get() {
    const estadosPedidos = await models.Estado_Pedido.findAll();
    return estadosPedidos;
  }

  async getById(id) {
    const estadoPedido = await models.Estado_Pedido.findByPk(id);
    if (!estadoPedido) {
      throw boom.notFound('Estado Pedido not found');
    }
    return estadoPedido;
  }

  async delete(id) {
    const estadoPedido = await this.getById(id);
    await estadoPedido.destroy();
    return { rta: true };
  }
}

export default EstadoPedidoService;
