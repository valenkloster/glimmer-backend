import express from 'express';
import passport from 'passport';
import { success } from '../../network/response.js';

import UsuarioDireccionService from './service.js';
const usuarioDireccionService = new UsuarioDireccionService();

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { direccion, usuarioDireccion } =
        await usuarioDireccionService.create(req.user.sub, req.body);
      success(req, res, { direccion, usuarioDireccion }, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id_cliente = req.user.sub;
      const direcciones =
        await usuarioDireccionService.findByCliente(id_cliente);
      success(req, res, direcciones, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id_direccion } = req.body;
      const id_cliente = req.user.sub;
      await usuarioDireccionService.delete(id_cliente, id_direccion);
      success(req, res, 'Direction deleted', 200);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
