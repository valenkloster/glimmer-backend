import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
import { Op } from '@sequelize/core';
const { models } = sequelize;

class ProductService {
  constructor() {}

  async create(data) {
    if (!data.codigo) {
      data.codigo = `PROD-${Date.now()}`;
    }
    const newProduct = await models.Producto.create(data);
    return newProduct;
  }

  async get(filters = {}) {
    const { name, minPrice, maxPrice, brand, tamanio } = filters;

    const options = {
      where: {},
    };

    // Filtros básicos
    if (name !== null) {
      options.where.nombre = { [Op.iLike]: `%${name}%` };
    }

    if (brand !== null) {
      options.where.marca = { [Op.iLike]: `%${brand}%` };
    }

    if (tamanio !== null) {
      options.where.tamanio = { [Op.iLike]: `%${tamanio}%` };
    }

    // Filtros de precio
    if (minPrice !== null || maxPrice !== null) {
      options.where.precio = {};

      if (minPrice !== null) {
        options.where.precio[Op.gte] = minPrice;
      }

      if (maxPrice !== null) {
        options.where.precio[Op.lte] = maxPrice;
      }
    }

    const products = await models.Producto.findAll(options);
    return products;
  }

  async getById(id) {
    const product = await models.Producto.findByPk(id);
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

  async search(query) {
    const products = await models.Producto.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${query}%` } },
          { descripcion: { [Op.iLike]: `%${query}%` } },
          { marca: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    return products;
  }

  async delete(id) {
    const product = await this.getById(id);
    await product.destroy();
  }

  async getStock() {
    const products = await models.Producto.findAll({
      // where: {
      //   stock: {
      //     [Op.lt]: 25,
      //   },
      // },
      attributes: [
        'id_producto',
        'codigo',
        'nombre',
        'marca',
        'imagen',
        'stock',
      ],
      order: [['stock', 'ASC']],
    });
    return products;
  }

  async updateStock(id, { stock }) {
    const product = await this.getById(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    const updatedProduct = await product.update({
      stock: Number(product.stock) + Number(stock),
    });
    return updatedProduct;
  }

  async updatePrice(id, { precio }) {
    const product = await this.getById(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    const updatedProduct = await product.update({
      precio: Number(precio),
    });
    return updatedProduct;
  }
}

export default ProductService;
