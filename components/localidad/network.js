import express from 'express';
import { success } from '../../network/response.js';
import LocalidadService from './service.js';
import passport from 'passport';

const router = express.Router();
const service = new LocalidadService();

router.get('/', async (req, res, next) => {
  try {
    const places = await service.get();
    success(req, res, places, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const place = await service.getById(req.params.id);
    success(req, res, place, 200);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  async (req, res, next) => {
    try {
      await service.create(req.body);
      success(req, res, 'Place created', 201);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Place deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
