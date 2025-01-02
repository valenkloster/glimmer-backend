import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
import { Op } from '@sequelize/core';
const { models } = sequelize;

class ProductService {
  constructor() {}

  async createWithDetails(data) {
    const { detalles } = data;
    if (!data.codigo) {
      data.codigo = `PROD-${Date.now()}`;
    }

    const product = await models.Producto.create(data);

    for (const detalle of detalles) {
      const { tono_nombre, tono_color, tamanio, stock } = detalle;

      // Crear detalle con valores opcionales de tono
      const newDetalle = await models.Detalle.create({
        tono_nombre: tono_nombre || null, // Si es null, se guarda como null
        tono_color: tono_color || null, // Si es null, se guarda como null
        tamanio,
        stock,
      });

      await models.ProductoDetalle.create({
        id_producto: product.id_producto,
        id_detalle: newDetalle.id_detalle,
      });
    }

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
    try {
      const producto = await models.Producto.findOne({
        where: { id_producto: id },
        include: [
          {
            model: models.Detalle,
            attributes: ['tono_nombre', 'tono_color', 'tamanio', 'stock'],
          },
        ],
      });

      if (!producto) {
        throw boom.notFound('Product not found');
      }

      return producto;
    } catch (error) {
      throw boom.boomify(error);
    }
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
        ],
      },
    });
    return products;
  }

  async getProductDetail(id_producto, tamanio, tono_color = null) {
    const detail = await models.ProductoDetalle.findOne({
      where: {
        id_producto: id_producto,
      },
      include: [
        {
          model: models.Producto,
          as: 'producto', // Alias definido en el modelo para Producto
          attributes: [
            'id_producto',
            'nombre',
            'marca',
            'descripcion',
            'precio',
            'imagen',
          ],
        },
        {
          model: models.Detalle,
          as: 'detalle', // Alias definido en el modelo para Detalle
          where: {
            tamanio: tamanio,
            ...(tono_color ? { tono_color: tono_color } : {}), // Filtra por color solo si se proporciona
          },
          attributes: ['tono_nombre', 'tono_color', 'tamanio', 'stock'],
        },
      ],
    });

    if (!detail) {
      throw boom.notFound('Product detail not found');
    }

    // Estructurar el resultado para devolver tanto la información del producto como el detalle
    return {
      id_producto: detail.producto.id_producto,
      nombre: detail.producto.nombre,
      marca: detail.producto.marca,
      descripcion: detail.producto.descripcion,
      precio: detail.producto.precio,
      imagen: detail.producto.imagen,
      tamanio: detail.detalle.tamanio,
      stock: detail.detalle.stock,
      tono_nombre: detail.detalle.tono_nombre,
      tono_color: detail.detalle.tono_color,
    };
  }

  // async updateStock(idProducto, { tamanio, tono_color, stock }) {
  //   try {
  //     const detalle = await models.Detalle.findOne({
  //       where: {
  //         tono_color,
  //         tamanio,
  //       },
  //     });

  //     if (!detalle) {
  //       throw new Error('Detalle no encontrado.');
  //     }

  //     // Actualizar el stock del detalle con el tono y tamaño especificados
  //     detalle.stock = stock;
  //     await detalle.save();

  //     return detalle;
  //   } catch (error) {
  //     throw boom.boomify(error);
  //   }
  // }

  async delete(id) {
    try {
      const product = await models.Producto.findByPk(id, {
        include: [
          {
            model: models.ProductoDetalle,
            as: 'detalles',
            include: [
              {
                model: models.Detalle,
                as: 'detalle',
              },
            ],
          },
        ],
      });

      if (!product) {
        throw boom.notFound('Product not found');
      }

      for (const productoDetalle of product.detalles) {
        await models.ProductoDetalle.destroy({
          where: { id_producto_detalle: productoDetalle.id_producto_detalle },
        });

        await models.Detalle.destroy({
          where: { id_detalle: productoDetalle.id_detalle },
        });
      }

      await models.Producto.destroy({
        where: { id_producto: id },
      });

      return { message: 'Product and related details deleted successfully' };
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

export default ProductService;
