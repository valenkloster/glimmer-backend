import { MercadoPagoConfig, Preference } from 'mercadopago';
import config from '../../../config.js';

class MercadoPagoService {
  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: config.mercadoPago,
    });
  }

  async createPayment(cart, id_direccion) {
    const preference = new Preference(this.client);
    const preferenceData = {
      items: cart.detalles.map((item) => ({
        title: `Producto ${item.id_producto}`,
        unit_price: Number(item.precio),
        quantity: item.cantidad,
        currency_id: 'ARS',
      })),
      external_reference: JSON.stringify({
        id_cliente: cart.id_cliente,
        id_direccion: id_direccion,
      }),
      back_urls: {
        success: `${config.clientDomain}/shop`,
        failure: `${config.clientDomain}/shop`
      },
      auto_return: 'approved',
    };

    return await preference.create({ body: preferenceData });
  }
}

export default MercadoPagoService;
