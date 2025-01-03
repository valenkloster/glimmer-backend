import ProductService from '../producto/service.js';
const product = new ProductService();

class ProductDetailService {
  constructor() {}

  async updateStock(filters, newStock) {
    const { id_producto, tamanio, tono_color } = filters;

    if (!id_producto || !tamanio || !newStock) {
      throw new Error(
        'Parámetros inválidos. Verifica id_producto, tamanio y newStock.',
      );
    }
    const productos = await product.get(filters);
    if (!productos.length) {
      throw new Error('Producto no encontrado.');
    }
    const producto = productos[0];
    const detalle = producto.detalles.find(
      (d) =>
        d.detalle.tamanio === tamanio &&
        (tono_color ? d.detalle.tono_color === tono_color : true),
    );

    if (!detalle) {
      throw new Error('Detalle del producto no encontrado.');
    }

    detalle.detalle.stock = newStock;
    await detalle.detalle.save();
    return detalle.detalle;
  }
}

export default ProductDetailService;
