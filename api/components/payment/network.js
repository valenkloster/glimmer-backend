/* eslint-disable prettier/prettier */
import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import CarritoService from '../carrito/service.js';
const cartService = new CarritoService();
import MercadoPagoService from './service.js';
const mpService = new MercadoPagoService();
import PedidoService from '../pedido/service.js';
const orderService = new PedidoService();
import boom from '@hapi/boom';

const router = express.Router();

router.post(
  '/create-preference',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { id_direccion } = req.body;

      const cart = await cartService.getBagByClient(sub);
      const preference = await mpService.createPayment(cart, id_direccion);
      if (preference.api_response.status == 201) {
        await orderService.createOrder(sub, id_direccion);
      }
      success(req, res, preference, 201);
    } catch (error) {
      next(error);
    }
  },
);

// router.post(
//   '/process-payment',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res, next) => {
//     try {
//       const { sub } = req.user;
//       const { payment_id, id_direccion } = req.body;

//       const payment = await mpService.getPaymentStatus(payment_id);


//       if (payment.status === 'approved') {
//         const order = await orderService.createOrder(sub, id_direccion);
//         await order.save();
//         success(req, res, order, 201);
//       } else {
//         throw boom.badRequest('Pago no aprobado');
//       }
//     } catch (error) {
//       next(error);
//     }
//   },
// );

// router.get('/status/:id', async (req, res) => {
//   const { id } = req.params;
//   const payment = await mpService.getPaymentStatus(id);
//   res.json(payment);
// });

export default router;
