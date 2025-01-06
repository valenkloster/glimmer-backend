import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;
import boom from '@hapi/boom';

class EstadoPedidoService {
  constructor() {}
  async getOrdersByStatus(id_estado_pedido) {
    const orders = await models.Pedido.findAll({
      where: { id_estado_pedido },
      include: [
        { association: 'cliente' },
        { association: 'cliente_direccion', include: ['direccion'] },
        { association: 'detalles', include: ['detalle'] },
      ],
    });

    if (!orders.length) {
      throw boom.notFound('No orders found for this status');
    }

    return orders;
  }
}

export default EstadoPedidoService;
