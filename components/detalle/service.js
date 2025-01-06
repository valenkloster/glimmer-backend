import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

import ProductService from '../producto/service.js';
const product = new ProductService();

import CarritoService from '../carrito/service.js';
const carrito = new CarritoService();

class ProductDetailService {
  constructor() {}

  async updateStock(filters, newStock) {
    const { id_producto, tamanio, tono_color } = filters;

    if (!id_producto || !tamanio || !newStock) {
      throw new Error(
        'Invalid parameters. Check product_id, size and newStock.',
      );
    }
    const productos = await product.get(filters);
    if (!productos.length) {
      throw new Error('Product not found.');
    }
    const producto = productos[0];
    const detalle = producto.detalles.find(
      (d) =>
        d.detalle.tamanio === tamanio &&
        (tono_color ? d.detalle.tono_color === tono_color : true),
    );

    if (!detalle) {
      throw new Error('Detail not found.');
    }

    detalle.detalle.stock = newStock;
    await detalle.detalle.save();
    return detalle.detalle;
  }

  async updatePrice(filters, newPrice) {
    const { id_producto, tamanio, tono_color } = filters;

    if (!id_producto || !tamanio || !newPrice) {
      throw new Error(
        'Invalid parameters. Check product_id, size and newPrice.',
      );
    }

    const productos = await product.get(filters);
    if (!productos.length) {
      throw new Error('Product not found.');
    }

    const producto = productos[0];
    const detalle = producto.detalles.find(
      (d) =>
        d.detalle.tamanio === tamanio &&
        (tono_color ? d.detalle.tono_color === tono_color : true),
    );

    if (!detalle) {
      throw new Error('Detail not found.');
    }

    detalle.detalle.precio = newPrice;
    await detalle.detalle.save();

    const cartDetails = await models.Carrito_Detalle.findAll({
      where: { id_detalle: detalle.detalle.id_detalle },
    });

    for (const cartDetail of cartDetails) {
      const newCartPrice = detalle.detalle.precio * cartDetail.cantidad;
      cartDetail.precio = newCartPrice;
      await cartDetail.save();
    }

    for (const cartDetail of cartDetails) {
      // Obtener el carrito relacionado con el detalle
      const cart = await models.Carrito.findByPk(cartDetail.id_carrito);
      if (cart) {
        // Utilizar la función calculateTotalCartPrice para obtener el monto total
        const totalAmount = await carrito.calculateTotalCartPrice(
          cart.id_carrito,
        );
        cart.monto_total = totalAmount;
        await cart.save();
      }
    }

    return detalle.detalle;
  }
}

export default ProductDetailService;
