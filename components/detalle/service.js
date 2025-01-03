import ProductService from '../producto/service.js';
const product = new ProductService();

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

  async actualizarStock(filters, cantidad) {
    const { id_producto, tamanio, tono_color } = filters;

    if (!id_producto || !tamanio || !cantidad) {
      throw new Error(
        'Invalid parameters. Check product_id, size and quantity.',
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

    const nuevoStock = detalle.detalle.stock - cantidad;
    if (nuevoStock < 0) {
      throw new Error('El stock no puede ser negativo.');
    }
    detalle.detalle.stock = nuevoStock;
    await detalle.detalle.save();

    return detalle.detalle;
  }
}

export default ProductDetailService;
