import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
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

  async addProductToBag(id_cliente, id_detalle, cantidad = 1) {
    const detalle = await models.Detalle.findByPk(id_detalle);
    if (!detalle) {
      throw boom.notFound('Product detail not found');
    }
    const bag = await this.getBagByClient(id_cliente);
    if (!bag) {
      throw boom.notFound('Bag not found');
    }
    const id_carrito = bag.id_carrito;

    const existingDetail = await models.Carrito_Detalle.findOne({
      where: { id_carrito, id_detalle },
    });
    if (existingDetail) {
      existingDetail.cantidad += cantidad;
      existingDetail.precio = detalle.precio * existingDetail.cantidad;
      await existingDetail.save();
    } else {
      await models.Carrito_Detalle.create({
        id_carrito,
        id_detalle,
        cantidad,
        precio: detalle.precio * cantidad,
      });
    }

    bag.monto_total = await this.calculateTotalBagPrice(bag.id_carrito);
    await bag.save();
  }

  // Update product in the bag (quantity)
  async updateProductInBag(id_carrito_detalle, cantidad) {
    const bagDetail = await models.Carrito_Detalle.findByPk(id_carrito_detalle);
    if (!bagDetail) {
      throw boom.notFound('Bag detail not found');
    }

    const detalle = await models.Detalle.findByPk(bagDetail.id_detalle);
    if (!detalle) {
      throw boom.notFound('Product detail not found');
    }

    // Recalculate the price based on the new quantity
    const precio = detalle.precio * cantidad;
    bagDetail.cantidad = cantidad;
    bagDetail.precio = precio;
    await bagDetail.save();

    // Update the total price of the Bag
    const bag = await models.Carrito.findByPk(bagDetail.id_carrito);
    if (!bag) {
      throw boom.notFound('Bag not found');
    }
    bag.monto_total = await this.calculateTotalBagPrice(bag.id_carrito);
    await bag.save();
    return bagDetail;
  }

  async removeProductFromBag(id_carrito_detalle) {
    const bagDetail = await models.Carrito_Detalle.findByPk(id_carrito_detalle);
    if (!bagDetail) {
      throw boom.notFound('Bag detail not found');
    }

    const bag = await models.Carrito.findByPk(bagDetail.id_carrito);
    if (!bag) {
      throw boom.notFound('Bag not found');
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
      totalPrice += parseFloat(detail.precio);
    });
    return totalPrice;
  }
}

export default CarritoService;
