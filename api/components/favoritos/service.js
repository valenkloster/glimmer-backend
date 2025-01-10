import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;

class FavoritosService {
  constructor() {}

  async create(id_cliente, id_producto) {
    const producto = await models.Producto.findByPk(id_producto);
    if (!producto) {
      throw new Error('Product not found.');
    }

    const cliente = await models.Cliente.findByPk(id_cliente);
    if (!cliente) {
      throw new Error('Client not found.');
    }

    // Verificar si el producto ya es favorito del cliente
    const existeFavorito = await models.Favoritos.findOne({
      where: { id_cliente, id_producto },
    });
    if (existeFavorito) {
      throw new Error('The product is already in favorites.');
    }

    const favorito = await models.Favoritos.create({ id_cliente, id_producto });

    return favorito;
  }

  async findByCliente(id_cliente) {
    const favoritos = await models.Favoritos.findAll({
      where: { id_cliente },
      include: ['producto'],
    });
    return favoritos;
  }

  async delete(id_cliente, id_producto) {
    const favorito = await models.Favoritos.findOne({
      where: { id_cliente, id_producto },
    });
    if (!favorito) {
      throw new Error('Favorite not found.');
    }
    await favorito.destroy();
  }
}

export default FavoritosService;
