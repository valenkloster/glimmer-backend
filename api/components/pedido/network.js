import express from 'express';
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
      const { id_cliente_direccion } = req.body;

      if (!id_cliente_direccion) {
        return res
          .status(400)
          .json({ message: 'Client address ID is required' });
      }

      const newOrder = await service.createOrder(sub, id_cliente_direccion);
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

// router.patch(
//   '/:id_pedido/status',
//   passport.authenticate('jwt', { session: false }),
//   checkRoles('admin'),
//   async (req, res, next) => {
//     try {
//       const { id_pedido } = req.params;
//       const { id_estado_pedido } = req.body;
//       const updatedOrder = await service.updateOrderStatus(
//         id_pedido,
//         id_estado_pedido,
//       );
//       success(req, res, updatedOrder, 200);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

export default router;
