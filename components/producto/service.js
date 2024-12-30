import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
import { Op } from '@sequelize/core';
const { models } = sequelize;

class ProductService {
  constructor() {}

  async create(data) {
    const product = await models.Producto.create(data);
    return product;
  }

  async get(filters = {}) {
    const { name, minPrice, maxPrice, brand } = filters;
    const options = {
      where: {},
    };

    if (name) {
      options.where.nombre = { [Op.iLike]: `%${name}%` };
    }

    if (minPrice) {
      if (!options.where.precio) options.where.precio = {};
      options.where.precio[Op.gte] = minPrice;
    }

    if (maxPrice) {
      if (!options.where.precio) options.where.precio = {};
      options.where.precio[Op.lte] = maxPrice;
    }

    if (brand) {
      options.where.marca = { [Op.iLike]: `%${brand}%` };
    }

    const products = await models.Producto.findAll(options);
    return products;
  }

  async getById(id) {
    const product = await models.Producto.findByPk(id, {
      include: ['categoria'],
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async getByCategory(categoryId) {
    const categories = await models.Categoria.findAll({
      where: {
        [Op.or]: [
          { id_categoria_padre: categoryId },
          { id_categoria: categoryId },
        ],
      },
    });

    const categoryIds = categories.map((category) => category.id_categoria);

    const products = await models.Producto.findAll({
      where: {
        id_categoria: {
          [Op.in]: categoryIds,
        },
      },
    });

    return products;
  }

  async update(id, changes) {
    const product = await this.getById(id);
    await product.update(changes);
  }

  async delete(id) {
    const product = await this.getById(id);
    await product.destroy();
  }

  // To search for products by keywords
  async search(query) {
    const products = await models.Producto.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${query}%` } },
          { descripcion: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    return products;
  }
}

export default ProductService;
