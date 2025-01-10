import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
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
      const { tono_nombre, tono_color, tamanio, stock, precio } = detalle;

      // Crear detalle con valores opcionales de tono
      const newDetalle = await models.Detalle.create({
        tono_nombre: tono_nombre || null, // Si es null, se guarda como null
        tono_color: tono_color || null, // Si es null, se guarda como null
        tamanio,
        stock,
        precio,
      });

      await models.Producto_Detalle.create({
        id_producto: product.id_producto,
        id_detalle: newDetalle.id_detalle,
      });
    }
    return product;
  }

  async get(filters = {}) {
    const {
      name,
      minPrice,
      maxPrice,
      brand,
      id_producto,
      tamanio,
      tono_color,
    } = filters;

    const options = {
      where: {},
      include: [],
    };

    // Filtros básicos
    if (name !== null) {
      options.where.nombre = { [Op.iLike]: `%${name}%` };
    }

    if (brand !== null) {
      options.where.marca = { [Op.iLike]: `%${brand}%` };
    }

    if (id_producto !== null || tamanio !== null || tono_color !== null) {
      const detalleInclude = {
        model: models.Producto_Detalle,
        as: 'detalles',
        include: [
          {
            model: models.Detalle,
            as: 'detalle',
            where: {},
            attributes: [
              'id_detalle',
              'tono_nombre',
              'tono_color',
              'tamanio',
              'stock',
              'precio',
            ],
            required: true,
          },
        ],
        required: true,
      };

      if (id_producto !== null) {
        detalleInclude.where = detalleInclude.where || {};
        detalleInclude.where.id_producto = { [Op.eq]: id_producto }; // Cambiado a igualdad
      }

      if (tamanio !== null) {
        detalleInclude.include[0].where = detalleInclude.include[0].where || {};
        detalleInclude.include[0].where.tamanio = {
          [Op.iLike]: `%${tamanio}%`,
        };
      }

      if (tono_color !== null) {
        detalleInclude.include[0].where = detalleInclude.include[0].where || {};
        detalleInclude.include[0].where.tono_color = {
          [Op.iLike]: `%${tono_color}%`,
        };
      }

      if (minPrice !== null) {
        detalleInclude.include[0].where.precio = {
          [Op.gte]: minPrice,
        };
      }

      if (maxPrice !== null) {
        detalleInclude.include[0].where.precio = {
          ...detalleInclude.include[0].where.precio,
          [Op.lte]: maxPrice,
        };
      }

      options.include.push(detalleInclude);
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
            as: 'detalles_completos',
            attributes: [
              'tono_nombre',
              'tono_color',
              'tamanio',
              'stock',
              'precio',
            ],
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
