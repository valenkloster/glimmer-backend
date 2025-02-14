import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import CarritoService from '../carrito/service.js';
const cartService = new CarritoService();
import PaymentService from './service.js';
const paymentService = new PaymentService();

const router = express.Router();

router.post(
  '/create-payment',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { shippingCost } = req.body;
      const cart = await cartService.getBagByClient(sub);
      const preference = await paymentService.createPayment(cart, shippingCost);
      success(req, res, preference, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/create-order',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const {
        status,
        id_direccion,
        shippingCost,
        productsTotal,
        shippingDate,
      } = req.body;
      await paymentService.processOrder(
        sub,
        id_direccion,
        status,
        shippingCost,
        productsTotal,
        shippingDate,
      );
      success(req, res, 'Order created', 201);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
