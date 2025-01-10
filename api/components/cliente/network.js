import express from 'express';
import { success } from '../../../network/response.js';

import CustomerService from './service.js';
const service = new CustomerService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.get();
    success(req, res, customers, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const customer = await service.getById(req.params.id);
    success(req, res, customer, 200);
  } catch (error) {
    next(error); // middleware
  }
});

router.post('/sign-up', async (req, res, next) => {
  try {
    const body = req.body;
    const newCustomer = await service.create(body);
    success(req, res, newCustomer, 201);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await service.update(req.params.id, req.body);
    success(req, res, `Customer updated`, 200);
  } catch (error) {
    next(error); // middleware
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    success(req, res, `Customer deleted`, 200);
  } catch (error) {
    next(error);
  }
});

export default router;
