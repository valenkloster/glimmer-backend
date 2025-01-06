import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;
import boom from '@hapi/boom';

class PedidoService {
  constructor() {}

  async createOrder(id_cliente, id_cliente_direccion) {
    const bag = await models.Carrito.findOne({ where: { id_cliente } });
    if (!bag) throw boom.notFound('Bag not found');

    const bagDetails = await models.Carrito_Detalle.findAll({
      where: { id_carrito: bag.id_carrito },
      include: ['detalle'],
    });
    if (!bagDetails.length) throw boom.badRequest('Bag is empty');

    // Create the order
    const newOrder = await models.Pedido.create({
      id_cliente,
      id_cliente_direccion,
      monto_total: bag.monto_total,
      id_estado_pedido: 2,
    });

    // Create order details and update stock
    for (const item of bagDetails) {
      const detail = item.detalle;
      await models.Pedido_Detalle.create({
        id_pedido: newOrder.id_pedido,
        id_detalle: detail.id_detalle,
        cantidad: item.cantidad,
        precio: item.precio,
      });

      detail.stock -= item.cantidad;
      await detail.save();
    }

    await models.Carrito_Detalle.destroy({
      where: { id_carrito: bag.id_carrito },
    });

    bag.monto_total = 0;
    await bag.save();
    return newOrder;
  }

  async getOrders(id_cliente) {
    const orders = await models.Pedido.findAll({
      where: { id_cliente },
      include: [
        {
          association: 'detalles',
          include: ['detalle'],
        },
        { association: 'cliente_direccion' },
        { association: 'estado' },
      ],
      order: [['fecha', 'DESC']],
    });
    return orders;
  }

  async getOrderById(id_pedido) {
    const order = await models.Pedido.findByPk(id_pedido, {
      include: [
        {
          association: 'cliente_direccion',
          include: ['direccion'], // Aquí incluimos la dirección asociada
        },
        {
          association: 'estado',
        },
        {
          association: 'detalles',
          include: ['detalle'], // Incluye el detalle de los productos
        },
      ],
    });
    if (!order) throw boom.notFound('Order not found');
    return order;
  }

  // async updateOrderStatus(id_pedido, id_estado_pedido) {
  //   const order = await models.Pedido.findByPk(id_pedido);
  //   if (!order) throw boom.notFound('Order not found');

  //   order.id_estado_pedido = id_estado_pedido;
  //   await order.save();
  //   return order;
  // }

  async searchOrders(filters) {
    const whereConditions = {};

    if (filters.id_estado_pedido) {
      whereConditions.id_estado_pedido = filters.id_estado_pedido;
    }

    if (filters.id_cliente_direccion) {
      whereConditions.id_cliente_direccion = filters.id_cliente_direccion;
    }

    const orders = await models.Pedido.findAll({
      where: whereConditions,
      include: [
        {
          association: 'cliente_direccion',
          include: ['direccion'], // Aquí incluimos la dirección asociada
        },
        {
          association: 'estado',
        },
        {
          association: 'detalles',
          include: ['detalle'], // Incluye el detalle de los productos
        },
      ],
    });

    return orders;
  }
}

export default PedidoService;
