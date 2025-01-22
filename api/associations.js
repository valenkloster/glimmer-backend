import { Pais, PaisSchema } from './components/pais/model.js';
import { Provincia, ProvinciaSchema } from './components/provincia/model.js';
import { Localidad, LocalidadSchema } from './components/localidad/model.js';
import { Direccion, DireccionSchema } from './components/direccion/model.js';
import {
  Estado_Pedido,
  EstadoPedidoSchema,
} from './components/estado_pedido/model.js';
import { User, UserSchema } from './components/user/model.js';
import { Cliente, ClienteSchema } from './components/cliente/model.js';
import { Categoria, CategoriaSchema } from './components/categoria/model.js';
import { Producto, ProductoSchema } from './components/producto/model.js';
import { Favoritos, FavoritosSchema } from './components/favoritos/model.js';
import {
  Cliente_Direccion,
  ClienteDireccionSchema,
} from './components/cliente_direccion/model.js';
import { Pedido, PedidoSchema } from './components/pedido/model.js';
import {
  Pedido_Detalle,
  PedidoDetalleSchema,
} from './components/pedido_detalle/model.js';
import { Carrito, CarritoSchema } from './components/carrito/model.js';
import {
  Carrito_Detalle,
  CarritoDetalleSchema,
} from './components/carrito_detalle/model.js';
import { Resenia, ReseniaSchema } from './components/resenia/model.js';

const setupModels = (sequelize) => {
  Pais.init(PaisSchema, Pais.config(sequelize));
  Provincia.init(ProvinciaSchema, Provincia.config(sequelize));
  Localidad.init(LocalidadSchema, Localidad.config(sequelize));
  Direccion.init(DireccionSchema, Direccion.config(sequelize));
  Estado_Pedido.init(EstadoPedidoSchema, Estado_Pedido.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Cliente.init(ClienteSchema, Cliente.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Favoritos.init(FavoritosSchema, Favoritos.config(sequelize));
  Cliente_Direccion.init(
    ClienteDireccionSchema,
    Cliente_Direccion.config(sequelize),
  );
  Pedido.init(PedidoSchema, Pedido.config(sequelize));
  Pedido_Detalle.init(PedidoDetalleSchema, Pedido_Detalle.config(sequelize));
  Carrito.init(CarritoSchema, Carrito.config(sequelize));
  Carrito_Detalle.init(CarritoDetalleSchema, Carrito_Detalle.config(sequelize));
  Resenia.init(ReseniaSchema, Resenia.config(sequelize));

  Pais.associate(sequelize.models);
  Provincia.associate(sequelize.models);
  Localidad.associate(sequelize.models);
  Direccion.associate(sequelize.models);
  User.associate(sequelize.models);
  Cliente.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Producto.associate(sequelize.models);
  Favoritos.associate(sequelize.models);
  Cliente_Direccion.associate(sequelize.models);
  Pedido.associate(sequelize.models);
  Pedido_Detalle.associate(sequelize.models);
  Estado_Pedido.associate(sequelize.models);
  Carrito.associate(sequelize.models);
  Carrito_Detalle.associate(sequelize.models);
  Resenia.associate(sequelize.models);
};

export default setupModels;
