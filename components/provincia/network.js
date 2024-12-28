import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../middleware/auth.handler.js';

import ProvinciaService from './service.js';
const service = new ProvinciaService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const state = await service.get();
    success(req, res, state, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const state = await service.getById(req.params.id);
    success(req, res, state, 200);
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
      success(req, res, 'State created', 201);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, 'State deleted', 200);
  } catch (error) {
    next(error);
  }
});

export default router;
