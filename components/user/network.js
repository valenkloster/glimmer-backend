import express from 'express';
import { success } from '../../network/response.js';

import UserService from './service.js';
const service = new UserService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.get();
    success(req, res, users, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await service.getById(req.params.id);
    success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/email/:email', async (req, res, next) => {
  try {
    console.log('Email recibido en la ruta:', req.params.email); // Verifica el valor aquí
    const user = await service.getByEmail(req.params.email);
    success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    success(req, res, newUser, 200);
  } catch (error) {
    next(error);
  }
});

router.patch('/:email', async (req, res, next) => {
  try {
    await service.update(req.params.email, req.body);
    success(req, res, `User ${req.params.email} updated`, 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:email', async (req, res, next) => {
  try {
    await service.delete(req.params.email);
    success(req, res, `User ${req.params.email} has been deleted`, 200);
  } catch (error) {
    next(error);
  }
});

export default router;
