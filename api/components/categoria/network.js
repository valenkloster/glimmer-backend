import express from 'express';
import { success } from '../../../network/response.js';
import passport from 'passport';
import { checkRoles } from '../../../middleware/auth.handler.js';

import CategoryService from './service.js';
const service = new CategoryService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.get();
    success(req, res, categories, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/padres', async (req, res, next) => {
  try {
    const categories = await service.getParents();
    success(req, res, categories, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/hijas', async (req, res, next) => {
  try {
    const { id } = req.params;
    const children = await service.getChildren(id);
    success(req, res, children, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await service.getById(req.params.id);
    success(req, res, category, 200);
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
      const body = req.body;
      const newCategory = await service.create(body);
      success(req, res, newCategory, 200);
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
      success(req, res, `Category updated`, 200);
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
      success(req, res, `Category deleted`, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
