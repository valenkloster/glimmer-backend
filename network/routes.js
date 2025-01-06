import express from 'express';
import paises from '../components/pais/network.js';
import provincias from '../components/provincia/network.js';
import localidades from '../components/localidad/network.js';
import direcciones from '../components/direccion/network.js';
import estados_pedidos from '../components/estado_pedido/network.js';
import user from '../components/user/network.js';
import cliente from '../components/cliente/network.js';
import auth from '../components/auth/network.js';
import categoria from '../components/categoria/network.js';
import producto from '../components/producto/network.js';
import detalle from '../components/detalle/network.js';
import favoritos from '../components/favoritos/network.js';
import cliente_direcciones from '../components/cliente_direccion/network.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/paises', paises);
  router.use('/provincias', provincias);
  router.use('/localidades', localidades);
  router.use('/direcciones', direcciones);
  router.use('/estados_pedidos', estados_pedidos);
  router.use('/user', user);
  router.use('/clientes', cliente);
  router.use('/auth', auth);
  router.use('/categorias', categoria);
  router.use('/productos', producto);
  router.use('/detalles', detalle);
  router.use('/favoritos', favoritos);
  router.use('/cliente_direcciones', cliente_direcciones);
}

export default routerApi;
