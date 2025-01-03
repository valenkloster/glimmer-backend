import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../middleware/auth.handler.js';

import DetailService from './service.js';
const service = new DetailService();

const router = express.Router();

router.patch(
  '/stock',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const {
        name = null,
        minPrice = null,
        maxPrice = null,
        brand = null,
        id_producto = null,
        tamanio = null,
        tono_color = null,
      } = req.query;

      const filters = {
        name,
        minPrice,
        maxPrice,
        brand,
        id_producto,
        tamanio,
        tono_color,
      };
      const { newStock } = req.query;
      const updatedDetalle = await service.updateStock(filters, newStock);

      success(req, res, updatedDetalle, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
