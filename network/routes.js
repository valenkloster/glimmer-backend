import express from 'express';
// import productsRouter from '../components/producto/network.js';
import paises from '../components/pais/network.js';
import provincias from '../components/provincia/network.js';
import localidades from '../components/localidad/network.js';
import direcciones from '../components/direccion/network.js';
import estados_pedidos from '../components/estado_pedido/network.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  // router.use('/products', productsRouter);
  router.use('/paises', paises);
  router.use('/provincias', provincias);
  router.use('/localidades', localidades);
  router.use('/direcciones', direcciones);
  router.use('/estados_pedidos', estados_pedidos);
}

export default routerApi;
