import express from 'express';
import { success } from '../../network/response.js';
import LocalidadService from './service.js';

const router = express.Router();
const service = new LocalidadService();

router.get('/', async (req, res, next) => {
  try {
    const localidades = await service.get();
    success(req, res, localidades, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const localidad = await service.getById(req.params.id);
    success(req, res, localidad, 200);
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
      success(req, res, 'Localidad created', 201);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Localidad has been deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
