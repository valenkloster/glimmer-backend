import express from 'express';
import boom from '@hapi/boom';
import { success } from '../../../network/response.js';
import passport from 'passport';
import PedidoService from './service.js';

const router = express.Router();
const service = new PedidoService();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { id_direccion } = req.body;

      if (!id_direccion) {
        return res
          .status(400)
          .json({ message: 'Client address ID is required' });
      }

      const newOrder = await service.createOrder(sub, id_direccion);
      success(req, res, newOrder, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const orders = await service.getOrders(sub);
      success(req, res, orders, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/month-stats',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { month, year } = req.query;
      if (!month) throw boom.badRequest('Month parameter is required');
      if (!year) throw boom.badRequest('Year parameter is required');
      const stats = await service.getMonthStats(month, year);
      success(req, res, stats, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/top-products',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { month, year } = req.query;
      if (!month) throw boom.badRequest('Month parameter is required');
      if (!year) throw boom.badRequest('Year parameter is required');
      const stats = await service.getTopProducts(month, year);
      success(req, res, stats, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id_pedido',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const order = await service.getOrderById(req.params.id_pedido);
      success(req, res, order, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
