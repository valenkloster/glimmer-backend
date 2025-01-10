import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../../middleware/auth.handler.js';
import EstadoPedidoService from './service.js';

const router = express.Router();
const service = new EstadoPedidoService();

// Route to get orders by status ID
router.get(
  '/:id_estado_pedido',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id_estado_pedido } = req.params;
      const orders = await service.getOrdersByStatus(id_estado_pedido);
      success(req, res, orders, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
