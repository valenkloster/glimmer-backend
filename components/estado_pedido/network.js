import express from 'express';
import { success } from '../../network/response.js';

import EstadoPedidoService from './service.js';
const service = new EstadoPedidoService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const estadoPedidos = await service.get();
    success(req, res, estadoPedidos, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const estadoPedido = await service.getById(req.params.id);
    success(req, res, estadoPedido, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await service.create(req.body);
    success(req, res, 'Estado Pedido created', 201);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Estado Pedido has been deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
