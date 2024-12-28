import express from 'express';
import { success } from '../../network/response.js';

import ProvinciaService from './service.js';
const service = new ProvinciaService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const provincia = await service.get();
    success(req, res, provincia, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const provincia = await service.getById(req.params.id);
    success(req, res, provincia, 200);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  // checkRoles('admin'),
  async (req, res, next) => {
    try {
      await service.create(req.body);
      success(req, res, 'Provincia created', 201);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Provincia has been deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
