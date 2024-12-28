import express from 'express';
import { success } from '../../network/response.js';

import PaisService from './service.js';
const service = new PaisService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const paises = await service.get();
    success(req, res, paises, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pais = await service.getById(req.params.id);
    success(req, res, pais, 200);
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
      success(req, res, 'Pais created', 201);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Pais has been deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
