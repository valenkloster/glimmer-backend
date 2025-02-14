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

  async createPayment(cart, shippingInfo) {
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
          unit_price: Number(shippingInfo.amounts.price_incl_tax),
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
        shipping_cost: shippingInfo.amounts.price_incl_tax,
        products_total: productsTotal,
      },
    };

    return await preference.create({ body: preferenceData });
  }

  async processOrder(
    sub,
    id_direccion,
    status,
    shippingCost,
    productsTotal,
    shippingDate,
  ) {
    if (status === 'approved') {
      try {
        const order = await orderService.createOrder(
          sub,
          id_direccion,
          shippingCost,
          productsTotal,
          shippingDate,
        );
        return order;
      } catch (error) {
        return error;
      }
    }
  }
}

export default PaymentService;
