import express from 'express';
import { success } from '../../../network/response.js';
import ShippingService from './service.js';
const shippingService = new ShippingService();

const router = express.Router();

router.post('/rate', async (req, res, next) => {
  try {
    const { items, direction } = req.body;
    const cost = await shippingService.getCosts(items, direction);
    success(req, res, cost, 201);
  } catch (error) {
    next(error);
  }
});

// router.post('/create', async (req, res, next) => {
//   try {
//     const shipment = await shippingService.createShipment(req.body);
//     success(req, res, shipment, 201);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:shipment_id', async (req, res, next) => {
//   try {
//     const shipment = await shippingService.getShipment(req.params.shipment_id);
//     success(req, res, shipment, 200);
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
