import express from 'express';
import { success } from '../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../middleware/auth.handler.js';

import ProductService from './service.js';
const service = new ProductService();

const router = express.Router();

router.get('/exact-detail', async (req, res, next) => {
  try {
    const { id_producto, tamanio, tono_color } = req.query;
    if (!id_producto || !tamanio || !tono_color) {
      return res.status(400).json({
        error: true,
        message: 'Required parameters: product_id, size and color.',
      });
    }
    const idProductoNumerico = parseInt(id_producto, 10);
    const detail = await service.getExactDetail(
      idProductoNumerico,
      tamanio,
      tono_color,
    );
    success(req, res, detail, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/busqueda', async (req, res, next) => {
  try {
    const { query } = req.query;
    const products = await service.search(query);
    success(req, res, products, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/categoria/:categoryId', async (req, res, next) => {
  try {
    const products = await service.getByCategory(req.params.categoryId);
    success(req, res, products, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { name, minPrice, maxPrice, brand } = req.query;
    const filters = { name, minPrice, maxPrice, brand };
    const products = await service.get(filters);
    success(req, res, products, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await service.getById(req.params.id);
    success(req, res, product, 200);
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
      const data = req.body;
      if (!data.detalles || !Array.isArray(data.detalles)) {
        return res.status(400).json({
          error: true,
          message: 'Details must be an array containing size and stock.',
        });
      }

      const newProduct = await service.createWithDetails(data);
      success(req, res, newProduct, 201);
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
      await service.update(req.params.id, req.body);
      success(req, res, 'Product updated', 200);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/stock',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { tamanio, tono_color, stock } = req.query;
      if (!tamanio || !tono_color || !stock) {
        return res.status(400).json({
          error: true,
          message: 'Required parameters: size, color tone, and stock.',
        });
      }
      const updatedStock = await service.updateStock(req.params.id, {
        tamanio,
        tono_color,
        stock,
      });
      success(req, res, updatedStock, 200);
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
      await service.delete(req.params.id);
      success(req, res, 'Product deleted', 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
