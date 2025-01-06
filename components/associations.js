import { Pais, PaisSchema } from './pais/model.js';
import { Provincia, ProvinciaSchema } from './provincia/model.js';
import { Localidad, LocalidadSchema } from './localidad/model.js';
import { Direccion, DireccionSchema } from './direccion/model.js';
import { Estado_Pedido, EstadoPedidoSchema } from './estado_pedido/model.js';
import { User, UserSchema } from './user/model.js';
import { Cliente, ClienteSchema } from './cliente/model.js';
import { Categoria, CategoriaSchema } from './categoria/model.js';
import { Detalle, DetalleSchema } from './detalle/model.js';
import { Producto, ProductoSchema } from './producto/model.js';
import {
  Producto_Detalle,
  ProductoDetalleSchema,
} from './producto_detalle/model.js';
import { Favoritos, FavoritosSchema } from './favoritos/model.js';
import {
  Cliente_Direccion,
  ClienteDireccionSchema,
} from './cliente_direccion/model.js';
import { Pedido, PedidoSchema } from './pedido/model.js';
import { Pedido_Detalle, PedidoDetalleSchema } from './pedido_detalle/model.js';
import { Carrito, CarritoSchema } from './carrito/model.js';
import {
  Carrito_Detalle,
  CarritoDetalleSchema,
} from './carrito_detalle/model.js';

const setupModels = (sequelize) => {
  Pais.init(PaisSchema, Pais.config(sequelize));
  Provincia.init(ProvinciaSchema, Provincia.config(sequelize));
  Localidad.init(LocalidadSchema, Localidad.config(sequelize));
  Direccion.init(DireccionSchema, Direccion.config(sequelize));
  Estado_Pedido.init(EstadoPedidoSchema, Estado_Pedido.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Cliente.init(ClienteSchema, Cliente.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Detalle.init(DetalleSchema, Detalle.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Producto_Detalle.init(
    ProductoDetalleSchema,
    Producto_Detalle.config(sequelize),
  );
  Favoritos.init(FavoritosSchema, Favoritos.config(sequelize));
  Cliente_Direccion.init(
    ClienteDireccionSchema,
    Cliente_Direccion.config(sequelize),
  );
  Pedido.init(PedidoSchema, Pedido.config(sequelize));
  Pedido_Detalle.init(PedidoDetalleSchema, Pedido_Detalle.config(sequelize));
  Carrito.init(CarritoSchema, Carrito.config(sequelize));
  Carrito_Detalle.init(CarritoDetalleSchema, Carrito_Detalle.config(sequelize));

  Pais.associate(sequelize.models);
  Provincia.associate(sequelize.models);
  Localidad.associate(sequelize.models);
  Direccion.associate(sequelize.models);
  User.associate(sequelize.models);
  Cliente.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Detalle.associate(sequelize.models);
  Producto.associate(sequelize.models);
  Producto_Detalle.associate(sequelize.models);
  Favoritos.associate(sequelize.models);
  Cliente_Direccion.associate(sequelize.models);
  Pedido.associate(sequelize.models);
  Pedido_Detalle.associate(sequelize.models);
  Estado_Pedido.associate(sequelize.models);
  Carrito.associate(sequelize.models);
  Carrito_Detalle.associate(sequelize.models);
};

export default setupModels;
