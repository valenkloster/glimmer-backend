import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;
import boom from '@hapi/boom';

import ProductDetailService from '../detalle/service.js';
const productDetail = new ProductDetailService();

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

    if (!id_cliente_direccion) throw boom.badRequest('No address provided');

    const outOfStockItems = [];
    const availableItems = [];
    for (const item of bagDetails) {
      const detail = item.detalle;
      if (detail.stock >= item.cantidad) {
        availableItems.push(item);
      } else {
        const productName = await productDetail.getProductNameByDetail(
          item.id_detalle,
        );
        outOfStockItems.push(productName);
      }
    }

    if (availableItems.length === 0) {
      throw boom.badRequest('No products available in stock');
    }

    const newOrder = await models.Pedido.create({
      id_cliente,
      id_cliente_direccion,
      monto_total: 0,
      id_estado_pedido: 2,
    });

    // Create order details and update stock
    for (const item of availableItems) {
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

    newOrder.monto_total = await this.calculateTotalOrderPrice(
      newOrder.id_pedido,
    );
    await newOrder.save();

    await models.Carrito_Detalle.destroy({
      where: { id_carrito: bag.id_carrito },
    });

    bag.monto_total = 0;
    await bag.save();
    return {
      message:
        outOfStockItems.length > 0
          ? `Order created successfully, but the following products were out of stock: ${outOfStockItems.join(', ')}`
          : 'Order created successfully',
      order: newOrder,
      outOfStockItems,
    };
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

  async calculateTotalOrderPrice(id_pedido) {
    const orderDetail = await models.Pedido_Detalle.findAll({
      where: { id_pedido },
    });
    let totalPrice = 0;
    orderDetail.forEach((detail) => {
      totalPrice += parseFloat(detail.precio);
    });
    return totalPrice;
  }

  // async updateOrderStatus(id_pedido, id_estado_pedido) {
  //   const order = await models.Pedido.findByPk(id_pedido);
  //   if (!order) throw boom.notFound('Order not found');

  //   order.id_estado_pedido = id_estado_pedido;
  //   await order.save();
  //   return order;
  // }
}

export default PedidoService;
