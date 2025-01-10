import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;

class ReseniaService {
  async createResenia(id_producto, id_cliente, puntaje, descripcion) {
    try {
      const review = await models.Resenia.create({
        id_producto,
        id_cliente,
        descripcion,
        puntaje,
      });
      return review;
    } catch (error) {
      throw boom.badImplementation('Error creating the review');
    }
  }

  async getReseniasByProduct(id_producto) {
    try {
      const reviews = await models.Resenia.findAll({
        where: { id_producto },
        include: ['cliente'],
        order: [['fecha', 'DESC']],
      });
      if (reviews.length === 0) {
        throw boom.notFound('This product has no reviews');
      }
      return reviews;
    } catch (error) {
      throw boom.badImplementation('Error fetching reviews');
    }
  }
}

export default ReseniaService;
