import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../middleware/auth.handler.js';

import ProductDetailService from '../producto_detalle/service.js';
const productDetailService = new ProductDetailService();

const router = express.Router();

router.get('/producto/:id', async (req, res, next) => {
  try {
    const details = await productDetailService.getAllByProduct(req.params.id);
    success(req, res, details, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const detail = await productDetailService.getById(req.params.id);
    success(req, res, detail, 200);
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
      const newDetail = await productDetailService.create(req.body);
      success(req, res, newDetail, 201);
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
      await productDetailService.update(req.params.id, req.body);
      success(req, res, 'Detail updated', 200);
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
      await productDetailService.delete(req.params.id);
      success(req, res, 'Detail deleted', 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
