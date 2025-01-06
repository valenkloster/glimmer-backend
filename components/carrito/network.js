import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import boom from '@hapi/boom';

import CarritoService from './service.js';
const service = new CarritoService();

const router = express.Router();

// Get Bag by client ID
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

// Add a product detail to the Bag
router.post(
  '/add/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { id_detalle, cantidad = 1 } = req.body;

      if (cantidad <= 0) {
        throw boom.badRequest('Quantity must be greater than zero');
      }
      await service.addProductToBag(sub, id_detalle, cantidad);
      success(req, res, 'Product added', 200);
    } catch (error) {
      next(error);
    }
  },
);

// Update quantity product in the Bag
router.patch(
  '/update/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_carrito_detalle, cantidad } = req.body;
      if (cantidad <= 0) {
        throw boom.badRequest('Quantity must be greater than zero');
      }
      const bagDetail = await service.updateProductInBag(
        id_carrito_detalle,
        cantidad,
      );
      success(req, res, bagDetail, 200);
    } catch (error) {
      next(error);
    }
  },
);

// Remove a product from the Bag
router.delete(
  '/remove/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_carrito_detalle } = req.body;
      const bag = await service.removeProductFromBag(id_carrito_detalle);
      success(req, res, bag, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
