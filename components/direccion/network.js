import express from 'express';
import { success } from '../../network/response.js';
import DireccionService from './service.js';

const router = express.Router();
const service = new DireccionService();

router.get('/', async (req, res, next) => {
  try {
    const direcciones = await service.get();
    success(req, res, direcciones, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const direccion = await service.getById(req.params.id);
    success(req, res, direccion, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await service.create(req.body);
    success(req, res, 'Direccion created', 201);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await service.update(req.params.id, req.body);
    success(req, res, 'Direccion updated', 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Direccion has been deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
