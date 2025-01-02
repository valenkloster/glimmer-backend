import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
import { Op } from '@sequelize/core';
const { models } = sequelize;

class ProductService {
  constructor() {}

  async createWithDetails(data) {
    const { detalles } = data; // detalles: [{tamanio, stock, tonos}]
    if (!data.codigo) {
      data.codigo = `PROD-${Date.now()}`;
    }

    const product = await models.Producto.create(data);

    for (const detalle of detalles) {
      const { tamanio, stock, tonos } = detalle;

      const productoDetalle = await models.ProductoDetalle.create({
        id_producto: product.id_producto,
        tamanio,
        stock,
      });

      for (const tono of tonos) {
        const productoTono = await models.ProductoTono.create({
          tono_nombre: tono.tono_nombre,
          tono_color: tono.tono_color,
        });

        await models.ProductoDetalleTono.create({
          id_producto_detalle: productoDetalle.id_producto_detalle,
          id_producto_tono: productoTono.id_producto_tono,
        });
      }
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
    const product = await models.Producto.findByPk(id, {
      include: [
        {
          model: models.ProductoDetalle,
          as: 'detalles',
          include: [
            {
              model: models.ProductoDetalleTono,
              as: 'detallesTonos',
              include: [
                {
                  model: models.ProductoTono,
                  as: 'productoTono',
                },
              ],
            },
          ],
        },
      ],
    });

    if (!product) {
      throw boom.notFound('Product not found');
    }

    const detallesPorTamanio = product.detalles.reduce((acc, detalle) => {
      const { tamanio, stock, detallesTonos } = detalle;

      const tonos = detallesTonos.map((detalleTono) => ({
        id_producto_tono: detalleTono.productoTono.id_producto_tono,
        tono_nombre: detalleTono.productoTono.tono_nombre,
        tono_color: detalleTono.productoTono.tono_color,
      }));

      if (!acc[tamanio]) {
        acc[tamanio] = { tamanio, stock, tonos: [] };
      }
      acc[tamanio].tonos.push(...tonos);
      return acc;
    }, {});

    return {
      id_producto: product.id_producto,
      codigo: product.codigo,
      nombre: product.nombre,
      marca: product.marca,
      descripcion: product.descripcion,
      precio: product.precio,
      imagen: product.imagen,
      id_categoria: product.id_categoria,
      detalles: Object.values(detallesPorTamanio),
    };
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

  async getExactDetail(productId, size, color) {
    const detail = await models.ProductoDetalle.findOne({
      where: {
        id_producto: productId,
        tamanio: size,
      },
      include: [
        {
          model: models.ProductoDetalleTono,
          as: 'detallesTonos',
          include: [
            {
              model: models.ProductoTono,
              as: 'productoTono',
              where: {
                tono_color: color,
              },
            },
          ],
        },
      ],
    });

    if (!detail) {
      throw boom.notFound('Product detail not found');
    }

    const tono = detail.detallesTonos.find(
      (detalleTono) => detalleTono.productoTono.tono_color === color,
    );

    if (!tono) {
      throw boom.notFound('Tono not found for the specified color');
    }

    return {
      id_producto_detalle: detail.id_producto_detalle,
      id_producto: detail.id_producto,
      tamanio: detail.tamanio,
      stock: detail.stock,
      tono: {
        id_producto_tono: tono.productoTono.id_producto_tono,
        tono_nombre: tono.productoTono.tono_nombre,
        tono_color: tono.productoTono.tono_color,
      },
    };
  }

  async update(id, changes) {
    const productToUpdate = await models.Producto.findByPk(id);
    if (!productToUpdate) {
      throw boom.notFound('Product not found');
    }
    await productToUpdate.update(changes);
  }

  async updateStock(idProducto, { tamanio, tono_color, stock }) {
    try {
      // Obtener el detalle exacto del producto
      const productDetail = await this.getExactDetail(idProducto, tamanio, tono_color);

      // Verificar si el detalle existe
      if (!productDetail) {
        throw new Error('Product detail not found.');
      }

      // Buscar la relación ProductoDetalleTono correspondiente
      const productDetalleTono = await models.ProductoDetalleTono.findOne({
        where: {
          id_producto_detalle: productDetail.id_producto_detalle,
          id_producto_tono: productDetail.tono.id_producto_tono,
        },
      });

      if (!productDetalleTono) {
        throw new Error('Product detail and tone combination not found.');
      }

      // Actualizar el stock
      productDetalleTono.stock = stock;

      // Guardar el nuevo stock
      await productDetalleTono.save();

      return productDetail;  // Retornar el detalle actualizado con el stock
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  async delete(id) {
    try {
      const product = await this.getById(id);

      if (!product.detalles || product.detalles.length === 0) {
        throw boom.notFound('El producto no tiene detalles asociados');
      }

      // Delete colors
      for (const detalle of product.detalles) {
        if (detalle.tonos && detalle.tonos.length > 0) {
          for (const tono of detalle.tonos) {
            // Eliminar el tono relacionado con cada detalle
            await models.ProductoTono.destroy({
              where: {
                id_producto_tono: tono.id_producto_tono,
              },
            });
          }
        }
      }

      // Delete details
      await models.ProductoDetalle.destroy({
        where: {
          id_producto: id,
        },
      });

      // Delete product
      const productToDelete = await models.Producto.findByPk(id);
      if (!productToDelete) {
        throw boom.notFound('Product not found');
      }
      await productToDelete.destroy();
    } catch (error) {
      throw boom.boomify(error);
    }
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
