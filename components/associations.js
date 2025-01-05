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
  Usuario_Direccion,
  UsuarioDireccionSchema,
} from './usuario_direccion/model.js';

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
  Usuario_Direccion.init(
    UsuarioDireccionSchema,
    Usuario_Direccion.config(sequelize),
  );

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
  Usuario_Direccion.associate(sequelize.models);
};

export default setupModels;
