import express from 'express';
import passport from 'passport';
import { success } from '../../network/response.js';

import FavoritosService from './service.js';
const favoritosService = new FavoritosService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const favoritos = await favoritosService.findByCliente(sub);
      success(req, res, favoritos, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_producto } = req.body;
      const { sub } = req.user;
      const favorito = await favoritosService.create(sub, id_producto);
      success(req, res, favorito, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_producto } = req.body;
      const { sub } = req.user;

      await favoritosService.delete(sub, id_producto);
      success(req, res, 'Product deleted from favorites', 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
