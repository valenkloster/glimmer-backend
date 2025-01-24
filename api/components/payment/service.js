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

  async createPayment(cart) {
    const preference = new Preference(this.client);
    const preferenceData = {
      items: cart.detalles.map((item) => ({
        title: `Producto ${item.producto.nombre}`,
        unit_price: Number(item.producto.precio),
        quantity: item.cantidad,
        currency_id: 'ARS',
      })),
      back_urls: {
        success: `${config.clientDomain}/success`,
        failure: `${config.clientDomain}/failure`,
      },
      auto_return: 'approved',
    };

    return await preference.create({ body: preferenceData });
  }

  async processOrder(sub, id_direccion, status) {
    if (status === 'approved') {
      try {
        await orderService.createOrder(sub, id_direccion);
      } catch (error) {
        return error;
      }
    }
  }
}

export default PaymentService;
