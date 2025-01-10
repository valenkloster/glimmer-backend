import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../../middleware/auth.handler.js';

import PaisService from './service.js';
const service = new PaisService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const countries = await service.get();
    success(req, res, countries, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const country = await service.getById(req.params.id);
    success(req, res, country, 200);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      await service.create(req.body);
      success(req, res, 'Country created', 201);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'Country deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
