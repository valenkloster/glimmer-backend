import express from 'express';
import { success } from '../../../network/response.js';
import ShippingService from './service.js';
const shippingService = new ShippingService();

const router = express.Router();

router.post('/rate', async (req, res, next) => {
  try {
    const { items, direction } = req.body;
    const shippingInfo = await shippingService.getCosts(items, direction);
    success(req, res, shippingInfo, 201);
  } catch (error) {
    next(error);
  }
});

export default router;
