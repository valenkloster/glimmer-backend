import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../../middleware/auth.handler.js';
import boom from '@hapi/boom';

import ProductService from './service.js';
const service = new ProductService();

const router = express.Router();

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
    const products = await service.get(filters);
    success(req, res, products, 200);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/low-stock',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const products = await service.getStock();
      success(req, res, products, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id', async (req, res, next) => {
  try {
    const product = await service.getById(req.params.id);
    success(req, res, product, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await service.create(data);
    success(req, res, newProduct, 201);
  } catch (error) {
    next(error);
  }
});

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

router.patch(
  '/:id/stock',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { stock } = req.body;
      if (!stock) {
        throw boom.badRequest('Stock is required');
      }
      const updatedProduct = await service.updateStock(req.params.id, {
        stock,
      });
      success(req, res, updatedProduct, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/price',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { precio } = req.body;
      if (!precio) {
        throw boom.badRequest('Price is required');
      }
      const updatedProduct = await service.updatePrice(req.params.id, {
        precio,
      });
      success(req, res, updatedProduct, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
