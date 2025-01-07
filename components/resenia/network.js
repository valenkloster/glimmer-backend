import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../middleware/auth.handler.js';

import ReseniaService from './service.js';
const service = new ReseniaService();

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const { id_producto, puntaje, descripcion } = req.body;
      const newReview = await service.createResenia(
        id_producto,
        sub,
        puntaje,
        descripcion,
      );
      success(req, res, newReview, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id_producto', async (req, res, next) => {
  try {
    const { id_producto } = req.params;
    const reviews = await service.getReseniasByProduct(id_producto);
    success(req, res, reviews, 200);
  } catch (error) {
    next(error);
  }
});

export default router;
