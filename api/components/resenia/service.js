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
      // Si no hay reseñas, lanza un error 404.
      if (!reviews || reviews.length === 0) {
        return 'This product has no reviews';
      }

      return reviews;
    } catch (error) {
      // Si el error es un boom error (como `notFound`), lo relanzamos tal cual.
      if (boom.isBoom(error)) {
        throw error;
      }

      // Si es otro tipo de error, asumimos que es un problema interno.
      console.error('Error fetching reviews:', error); // Debug: Muestra el error real.
      throw boom.badImplementation('Error fetching reviews');
    }
  }
}

export default ReseniaService;
