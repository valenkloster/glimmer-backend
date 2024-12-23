import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;
import { Op } from '@sequelize/core';

class ProductsService {
  constructor() {}

  async find(query) {
    const options = {
      // include: ['category'],
      where: {}, // Cláusula where vacía
    };

    // Paginación
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    // Filtro por precio exacto
    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    // Filtro por rango de precios
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min, // mayor o igual a price_min
        [Op.lte]: price_max, // menor o igual a price_max
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { rta: true };
  }
}

export default ProductsService;
