import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import config from '../../../config.js';

class MercadoPagoService {
  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: config.mercadoPago,
    });
  }

  async createPayment(cart) {
    const preference = new Preference(this.client);
    const payment = new Payment(this.client);
    const preferenceData = {
      items: cart.detalles.map((item) => ({
        title: `Producto ${item.producto.nombre}`,
        unit_price: Number(item.producto.precio),
        quantity: item.cantidad,
        currency_id: 'ARS',
      })),
      back_urls: {
        success: `${config.clientDomain}/success/?payment_id={payment_id}`,
        failure: `${config.clientDomain}/shop`,
      },
      auto_return: 'approved',
    };
    payment
      .capture({
        id: '<PAYMENT_ID>',
        transaction_amount: 12.34,
        requestOptions: {
          idempotencyKey: '<IDEMPOTENCY_KEY>',
        },
      })
      .then(console.log)
      .catch(console.log);
    const result = await preference.create({ body: preferenceData });
    return result;
  }
}

export default MercadoPagoService;
