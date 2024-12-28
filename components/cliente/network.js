import express from 'express';
import { success } from '../../network/response.js';

import CustomerService from './service.js';
const service = new CustomerService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const clientes = await service.get();
    success(req, res, clientes, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cliente = await service.getById(req.params.id);
    success(req, res, cliente, 200);
  } catch (error) {
    next(error); // middleware
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newCliente = await service.create(body);
    success(req, res, newCliente, 200);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await service.update(req.params.id, req.body);
    success(req, res, `Client updated`, 200);
  } catch (error) {
    next(error); // middleware
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, `Client deleted`, 200);
  } catch (error) {
    next(error);
  }
});

export default router;
