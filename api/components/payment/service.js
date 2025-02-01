import { MercadoPagoConfig, Preference } from 'mercadopago';
import config from '../../../config.js';
import PedidoService from '../pedido/service.js';
const orderService = new PedidoService();

class PaymentService {
  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: config.mercadoPago,
    });
  }

  async createPayment(cart, shippingCost) {
    const preference = new Preference(this.client);

    const productsTotal = cart.detalles
      .filter((item) => item.producto.stock > 0)
      .reduce(
        (sum, item) => sum + Number(item.producto.precio) * item.cantidad,
        0,
      );

    const preferenceData = {
      items: [
        ...cart.detalles
          .filter((item) => item.producto.stock > 0)
          .map((item) => ({
            title: `Producto ${item.producto.nombre}`,
            unit_price: Number(item.producto.precio),
            quantity: item.cantidad,
            currency_id: 'ARS',
          })),
        {
          title: 'Costo de envío',
          unit_price: Number(shippingCost),
          quantity: 1,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: `${config.clientDomain}/success`,
        failure: `${config.clientDomain}/failure`,
      },
      auto_return: 'approved',
      // Agregamos metadata para usar después
      metadata: {
        shipping_cost: shippingCost,
        products_total: productsTotal,
      },
    };

    return await preference.create({ body: preferenceData });
  }

  async processOrder(sub, id_direccion, status, shippingCost, productsTotal) {
    if (status === 'approved') {
      try {
        const order = await orderService.createOrder(
          sub,
          id_direccion,
          shippingCost,
          productsTotal,
          productsTotal + shippingCost,
        );
        return order;
      } catch (error) {
        return error;
      }
    }
  }
}

export default PaymentService;
