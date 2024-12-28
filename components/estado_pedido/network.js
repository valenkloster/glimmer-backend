import express from 'express';
import { success } from '../../network/response.js';

import EstadoPedidoService from './service.js';
const service = new EstadoPedidoService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const orderStatus = await service.get();
    success(req, res, orderStatus, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const orderStatus = await service.getById(req.params.id);
    success(req, res, orderStatus, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await service.create(req.body);
    success(req, res, 'Order Status created', 201);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Order Status deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
