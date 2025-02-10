import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;
import boom from '@hapi/boom';
import { Op } from 'sequelize';
import EmailService from '../../../utils/EmailService/index.js';
import buildMail from '../../../utils/emails/orderConfirmation.js';
import buildOnWayMail from '../../../utils/emails/orderOnTheWay.js';
import buildOrderDeliveredMail from '../../../utils/emails/orderDelivered.js';
import config from '../../../config.js';

import UserService from '../user/service.js';
const service = new UserService();

class PedidoService {
  constructor() {}

  async sendOrderConfirmation(email, orderId) {
    const user = await service.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const order = await this.getOrderById(orderId);

    const welcomeEmail = buildMail(order);
    const mail = {
      from: config.mailerAddress,
      to: `${user.email}`,
      subject: '¡Gracias por tu compra!',
      html: welcomeEmail,
    };
    const rta = await EmailService.sendEmail(mail);
    return rta;
  }

  async sendOrderOnWay(id_user, orderId) {
    const user = await service.getById(id_user);
    if (!user) {
      throw new Error('User not found');
    }
    const order = await this.getOrderById(orderId);
    const onWayEmail = buildOnWayMail(order);
    const mail = {
      from: config.mailerAddress,
      to: `${user.email}`,
      subject: '¡Tu pedido está en camino!',
      html: onWayEmail,
    };
    const rta = await EmailService.sendEmail(mail);
    return rta;
  }

  async sendOrderDelivered(id_user) {
    const user = await service.getById(id_user);
    if (!user) {
      throw new Error('User not found');
    }
    const deliveredEmail = buildOrderDeliveredMail();
    const mail = {
      from: config.mailerAddress,
      to: `${user.email}`,
      subject: '¡Tu pedido ha sido entregado!',
      html: deliveredEmail,
    };
    const rta = await EmailService.sendEmail(mail);
    return rta;
  }

  async createOrder(id_cliente, id_direccion, shippingCost, productsTotal) {
    const bag = await models.Carrito.findOne({ where: { id_cliente } });
    if (!bag) throw boom.notFound('Bag not found');

    const bagDetails = await models.Carrito_Detalle.findAll({
      where: { id_carrito: bag.id_carrito },
      include: ['producto'],
    });
    if (!bagDetails.length) throw boom.badRequest('Bag is empty');

    if (!id_direccion) throw boom.badRequest('No address provided');

    const outOfStockItems = [];
    const availableItems = [];

    for (const item of bagDetails) {
      const producto = item.producto;
      if (producto.stock >= item.cantidad) {
        availableItems.push(item);
      } else {
        outOfStockItems.push(item.producto.nombre);
      }
    }

    if (availableItems.length === 0) {
      throw boom.badRequest('No products available in stock');
    }

    const newOrder = await models.Pedido.create({
      id_cliente,
      id_direccion,
      monto_productos: productsTotal,
      monto_envio: shippingCost,
      monto_total: productsTotal + shippingCost,
      id_estado_pedido: 2,
    });

    // Create order details and update stock
    for (const item of availableItems) {
      const producto = item.producto;
      await models.Pedido_Detalle.create({
        id_pedido: newOrder.id_pedido,
        id_producto: producto.id_producto,
        cantidad: item.cantidad,
        precio: item.precio,
      });

      producto.stock -= item.cantidad;
      await producto.save();
    }

    await models.Carrito_Detalle.destroy({
      where: { id_carrito: bag.id_carrito },
    });

    bag.monto_total = 0;
    await bag.save();

    const user = await service.getById(id_cliente);
    await this.sendOrderConfirmation(user.email, newOrder.id_pedido);

    return {
      message:
        outOfStockItems.length > 0
          ? `Order created successfully, but the following products were out of stock: ${outOfStockItems.join(', ')}`
          : 'Order created successfully',
      order: newOrder,
      outOfStockItems,
    };
  }

  async getAllOrders(filters = {}) {
    const { estado, searchTerm } = filters;

    const whereClause = {};

    if (estado) {
      whereClause.id_estado_pedido = estado;
    }

    if (searchTerm) {
      // Dividimos el término de búsqueda en palabras
      const searchTerms = searchTerm.split(' ').filter((term) => term !== '');

      // Si hay términos de búsqueda, creamos las condiciones
      if (searchTerms.length > 0) {
        whereClause[Op.or] = [
          // Búsqueda por ID si el término es un número
          ...(isNaN(searchTerm) ? [] : [{ id_pedido: parseInt(searchTerm) }]),

          // Búsqueda por cada término en nombre o apellido
          ...searchTerms.map((term) => ({
            [Op.or]: [
              { '$cliente.nombre$': { [Op.iLike]: `%${term}%` } },
              { '$cliente.apellido$': { [Op.iLike]: `%${term}%` } },
            ],
          })),
        ];
      }
    }

    const orders = await models.Pedido.findAll({
      where: whereClause,
      include: [
        {
          association: 'detalles',
          include: ['producto'],
        },
        { association: 'cliente' },
        { association: 'cliente_direccion' },
        { association: 'estado' },
      ],
      order: [['fecha', 'DESC']],
    });
    return orders;
  }

  async getOrders(id_cliente) {
    const orders = await models.Pedido.findAll({
      where: { id_cliente },
      include: [
        {
          association: 'detalles',
          include: ['producto'],
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
          association: 'detalles',
          include: ['producto'],
        },
        {
          association: 'cliente_direccion',
          include: [
            {
              association: 'localidad',
              include: [{ association: 'provincia', include: ['pais'] }],
            },
          ],
        },
        { association: 'estado' },
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

  async getMonthStats(month, year) {
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setSeconds(endDate.getSeconds() - 1);
    const orders = await models.Pedido.findAll({
      where: {
        fecha: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['id_pedido', 'fecha', 'monto_total'],
      order: [['fecha', 'ASC']],
    });

    return orders;
  }

  async getTopProducts(month, year) {
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setSeconds(endDate.getSeconds() - 1);

    const topProducts = await models.Pedido_Detalle.findAll({
      attributes: [
        'id_producto',
        [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_vendido'],
      ],
      include: [
        {
          model: models.Pedido,
          as: 'pedido',
          attributes: [],
          where: {
            fecha: {
              [Op.between]: [startDate, endDate],
            },
          },
        },
        {
          model: models.Producto,
          as: 'producto',
          attributes: ['nombre', 'marca', 'imagen'],
        },
      ],
      group: [
        'Pedido_Detalle.id_producto', // Referenciamos explícitamente la tabla
        'producto.id_producto',
        'producto.nombre',
        'producto.marca',
        'producto.imagen',
      ],
      order: [[sequelize.literal('total_vendido'), 'DESC']],
      limit: 5,
    });

    return topProducts.map((product) => ({
      productId: product.id_producto,
      name: product.producto.nombre,
      brand: product.producto.marca,
      image: product.producto.imagen,
      totalSold: product.get('total_vendido'),
    }));
  }

  async updateOrderStatus(id_pedido, id_estado_pedido) {
    const order = await models.Pedido.findByPk(id_pedido);
    if (!order) throw boom.notFound('Order not found');

    await order.update({ id_estado_pedido });

    if (id_estado_pedido === 3) {
      await this.sendOrderOnWay(order.id_cliente, order.id_pedido);
    } else if (id_estado_pedido === 1) {
      await this.sendOrderDelivered(order.id_cliente);
    }

    return order;
  }
}

export default PedidoService;
