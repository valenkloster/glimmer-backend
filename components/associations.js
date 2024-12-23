import { Product, ProductSchema } from './producto/model.js';
import { Pais, PaisSchema } from './pais/model.js';
import { Provincia, ProvinciaSchema } from './provincia/model.js';
import { Localidad, LocalidadSchema } from './localidad/model.js';
import { Direccion, DireccionSchema } from './direccion/model.js';
import { Estado_Pedido, EstadoPedidoSchema } from './estado_pedido/model.js';

// Inicializa todos los modelos
const setupModels = (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize));
  Pais.init(PaisSchema, Pais.config(sequelize));
  Provincia.init(ProvinciaSchema, Provincia.config(sequelize));
  Localidad.init(LocalidadSchema, Localidad.config(sequelize));
  Direccion.init(DireccionSchema, Direccion.config(sequelize));
  Estado_Pedido.init(EstadoPedidoSchema, Estado_Pedido.config(sequelize));

  // Ejecuto la asociacion
  Pais.associate(sequelize.models);
  Provincia.associate(sequelize.models);
  Localidad.associate(sequelize.models);
  Direccion.associate(sequelize.models);
  // Estado_Pedido.associate(sequelize.models);
};

export default setupModels;
