import { Pais, PaisSchema } from './pais/model.js';
import { Provincia, ProvinciaSchema } from './provincia/model.js';
import { Localidad, LocalidadSchema } from './localidad/model.js';
import { Direccion, DireccionSchema } from './direccion/model.js';
import { Estado_Pedido, EstadoPedidoSchema } from './estado_pedido/model.js';
import { User, UserSchema } from './user/model.js';
import { Cliente, ClienteSchema } from './cliente/model.js';
import { Categoria, CategoriaSchema } from './categoria/model.js';
import { Producto, ProductoSchema } from './producto/model.js';

// Inicializa todos los modelos
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

  // Ejecuto la asociacion
  Pais.associate(sequelize.models);
  Provincia.associate(sequelize.models);
  Localidad.associate(sequelize.models);
  Direccion.associate(sequelize.models);
  User.associate(sequelize.models);
  Cliente.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Producto.associate(sequelize.models);

  // Estado_Pedido.associate(sequelize.models);
};

export default setupModels;
