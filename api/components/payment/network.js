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

      console.log(preference)
      if (preference.api_response.status == 201) {
        //await orderService.createOrder(sub, id_direccion);
      }
      success(req, res, preference, 201);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
