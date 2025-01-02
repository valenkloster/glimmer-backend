import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../middleware/auth.handler.js';

import ProductColorService from '../producto_tono/service.js';
const productColorService = new ProductColorService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const colors = await productColorService.getAll();
    success(req, res, colors, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const tono = await productColorService.getById(req.params.id);
    success(req, res, tono, 200);
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
      const newTono = await productColorService.create(req.body);
      success(req, res, newTono, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      await productColorService.update(req.params.id, req.body);
      success(req, res, 'Color updated', 200);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      await productColorService.delete(req.params.id);
      success(req, res, 'Color deleted', 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
