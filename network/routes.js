import express from 'express';
import paises from '../api/components/pais/network.js';
import provincias from '../api/components/provincia/network.js';
import localidades from '../api/components/localidad/network.js';
import direcciones from '../api/components/direccion/network.js';
import estados_pedidos from '../api/components/estado_pedido/network.js';
import user from '../api/components/user/network.js';
import cliente from '../api/components/cliente/network.js';
import auth from '../api/components/auth/network.js';
import categoria from '../api/components/categoria/network.js';
import producto from '../api/components/producto/network.js';
import detalle from '../api/components/detalle/network.js';
import favoritos from '../api/components/favoritos/network.js';
import cliente_direcciones from '../api/components/cliente_direccion/network.js';
import carrito from '../api/components/carrito/network.js';
import pedido from '../api/components/pedido/network.js';
import resenia from '../api/components/resenia/network.js';

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
  router.use('/carrito', carrito);
  router.use('/pedidos', pedido);
  router.use('/resenias', resenia);
}

export default routerApi;
