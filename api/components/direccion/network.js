import express from 'express';
import { success } from '../../../network/response.js';

import DireccionService from './service.js';
const service = new DireccionService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const address = await service.get();
    success(req, res, address, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const address = await service.getById(req.params.id);
    success(req, res, address, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const address = await service.create(req.body);
    success(req, res, address, 201);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await service.update(req.params.id, req.body);
    success(req, res, 'Address updated', 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Address deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
