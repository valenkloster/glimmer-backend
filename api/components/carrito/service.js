import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;

class CarritoService {
  async createBag(id_cliente) {
    const bag = await models.Carrito.create({
      id_cliente,
      monto_total: 0,
    });
    return bag;
  }

  async getBagByClient(id_cliente) {
    const bag = await models.Carrito.findOne({
      where: { id_cliente },
      include: ['detalles'],
    });
    if (!bag) {
      throw boom.notFound('Bag not found for this client');
    }
    return bag;
  }

  async addProductToBag(id_cliente, id_producto, cantidad = 1) {
    const product = await models.Producto.findByPk(id_producto);
    if (!product) {
      throw boom.notFound('Product detail not found');
    }
    const bag = await this.getBagByClient(id_cliente);
    if (!bag) {
      throw boom.notFound('Bag not found');
    }
    const id_carrito = bag.id_carrito;

    const existingDetail = await models.Carrito_Detalle.findOne({
      where: { id_carrito, id_producto },
    });
    if (existingDetail) {
      existingDetail.cantidad += cantidad;
      existingDetail.precio = product.precio * existingDetail.cantidad;
      await existingDetail.save();
    } else {
      await models.Carrito_Detalle.create({
        id_carrito,
        id_producto,
        cantidad,
        precio: product.precio * cantidad,
      });
    }

    bag.monto_total = await this.calculateTotalBagPrice(bag.id_carrito);
    await bag.save();
  }

  // Update product in the bag (quantity)
  async updateProductInBag(id_cliente, id_producto, cantidad) {
    const bag = await this.getBagByClient(id_cliente);
    if (!bag) {
      throw boom.notFound('Bag not found');
    }

    const bagDetail = await models.Carrito_Detalle.findOne({
      where: {
        id_producto: id_producto,
        id_carrito: bag.id_carrito,
      },
    });
    if (!bagDetail) {
      throw boom.notFound('Product not found');
    }

    const product = await models.Producto.findByPk(bagDetail.id_producto);
    if (!product) {
      throw boom.notFound('Product not found');
    }

    // Recalculate the price based on the new quantity
    const precio = product.precio * cantidad;
    bagDetail.cantidad = cantidad;
    bagDetail.precio = precio;
    await bagDetail.save();

    bag.monto_total = await this.calculateTotalBagPrice(bag.id_carrito);
    await bag.save();
    return bagDetail;
  }

  async removeProductFromBag(id_cliente, id_producto) {
    const bag = await this.getBagByClient(id_cliente);
    if (!bag) {
      throw boom.notFound('Bag not found');
    }

    const bagDetail = await models.Carrito_Detalle.findOne({
      where: {
        id_producto: id_producto,
        id_carrito: bag.id_carrito,
      },
    });
    if (!bagDetail) {
      throw boom.notFound('Product not found');
    }

    bag.monto_total -= bagDetail.precio;
    await bag.save();

    await bagDetail.destroy();
    return bag;
  }

  async calculateTotalBagPrice(id_carrito) {
    const bagDetails = await models.Carrito_Detalle.findAll({
      where: { id_carrito },
    });
    let totalPrice = 0;
    bagDetails.forEach((detail) => {
      totalPrice += Number(detail.precio);
    });
    return totalPrice;
  }
}

export default CarritoService;
