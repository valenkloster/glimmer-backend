import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import boom from '@hapi/boom';

import CarritoService from './service.js';
const service = new CarritoService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const bag = await service.getBagByClient(sub);
      res.status(200).json(bag);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/add/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { id_producto, cantidad = 1 } = req.body;

      if (cantidad <= 0) {
        throw boom.badRequest('Quantity must be greater than zero');
      }
      await service.addProductToBag(sub, id_producto, cantidad);
      success(req, res, 'Product added', 200);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/update/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { id_producto, cantidad } = req.body;
      if (cantidad <= 0) {
        throw boom.badRequest('Quantity must be greater than zero');
      }
      const bagDetail = await service.updateProductInBag(
        sub,
        id_producto,
        cantidad,
      );
      success(req, res, bagDetail, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      await service.removeProductFromBag(sub, req.params.id);
      success(req, res, 'Product deleted', 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
