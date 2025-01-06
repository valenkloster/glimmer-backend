import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import boom from '@hapi/boom';

import CarritoService from './service.js';
const service = new CarritoService();

const router = express.Router();

// Create a new cart for a client
router.post(
  '/create/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const cart = await service.createCart(sub);
      success(req, res, cart, 200);
    } catch (error) {
      next(error);
    }
  },
);

// Get cart by client ID
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const cart = await service.getCartByClient(sub);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },
);

// Add a product detail to the cart
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
      const cartDetail = await service.addProductToCart(
        sub,
        id_detalle,
        cantidad,
      );
      success(req, res, cartDetail, 200);
    } catch (error) {
      next(error);
    }
  },
);

// Update quantity product in the cart
router.patch(
  '/update/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_carrito_detalle, cantidad } = req.body;
      if (cantidad <= 0) {
        throw boom.badRequest('Quantity must be greater than zero');
      }
      const cartDetail = await service.updateProductInCart(
        id_carrito_detalle,
        cantidad,
      );
      success(req, res, cartDetail, 200);
    } catch (error) {
      next(error);
    }
  },
);

// Remove a product from the cart
router.delete(
  '/remove/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_carrito_detalle } = req.body;
      const cart = await service.removeProductFromCart(id_carrito_detalle);
      success(req, res, cart, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
