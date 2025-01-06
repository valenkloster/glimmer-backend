import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class CarritoService {
  async createCart(id_cliente) {
    const cart = await models.Carrito.create({
      id_cliente,
      monto_total: 0,
    });
    return cart;
  }

  // Get cart by client ID
  async getCartByClient(id_cliente) {
    const cart = await models.Carrito.findOne({
      where: { id_cliente },
      include: ['detalles'],
    });
    if (!cart) {
      throw boom.notFound('Cart not found for this client');
    }
    return cart;
  }

  // Add a product detail to the cart
  async addProductToCart(id_cliente, id_detalle, cantidad = 1) {
    const detalle = await models.Detalle.findByPk(id_detalle);
    if (!detalle) {
      throw boom.notFound('Product detail not found');
    }
    const cart = await this.getCartByClient(id_cliente);
    if (!cart) {
      throw boom.notFound('Cart not found');
    }
    const id_carrito = cart.id_carrito;
    const precio = detalle.precio * cantidad;

    const cartDetail = await models.Carrito_Detalle.create({
      id_carrito,
      id_detalle,
      cantidad,
      precio,
    });

    cart.monto_total = await this.calculateTotalCartPrice(cart.id_carrito);
    await cart.save();
    return cartDetail;
  }

  // Update product in the cart (quantity)
  async updateProductInCart(id_carrito_detalle, cantidad) {
    const cartDetail =
      await models.Carrito_Detalle.findByPk(id_carrito_detalle);
    if (!cartDetail) {
      throw boom.notFound('Cart detail not found');
    }

    const detalle = await models.Detalle.findByPk(cartDetail.id_detalle);
    if (!detalle) {
      throw boom.notFound('Product detail not found');
    }

    // Recalculate the price based on the new quantity
    const precio = detalle.precio * cantidad;
    cartDetail.cantidad = cantidad;
    cartDetail.precio = precio;
    await cartDetail.save();

    // Update the total price of the cart
    const cart = await models.Carrito.findByPk(cartDetail.id_carrito);
    if (!cart) {
      throw boom.notFound('Cart not found');
    }
    cart.monto_total = await this.calculateTotalCartPrice(cart.id_carrito);
    await cart.save();
    return cartDetail;
  }

  // Remove a product from the cart
  async removeProductFromCart(id_carrito_detalle) {
    const cartDetail =
      await models.Carrito_Detalle.findByPk(id_carrito_detalle);
    if (!cartDetail) {
      throw boom.notFound('Cart detail not found');
    }

    const cart = await models.Carrito.findByPk(cartDetail.id_carrito);
    if (!cart) {
      throw boom.notFound('Cart not found');
    }

    cart.monto_total -= cartDetail.precio;
    await cart.save();

    await cartDetail.destroy();
    return cart;
  }

  // Calculate the total price of the cart
  async calculateTotalCartPrice(id_carrito) {
    const cartDetails = await models.Carrito_Detalle.findAll({
      where: { id_carrito },
    });
    let totalPrice = 0;
    cartDetails.forEach((detail) => {
      totalPrice += detail.precio;
    });
    return totalPrice;
  }
}

export default CarritoService;
