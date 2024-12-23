import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class DireccionService {
  constructor() {}

  async create(data) {
    const localidad = await models.Localidad.findByPk(data.id_localidad);
    if (!localidad) {
      throw boom.notFound('Localidad not found');
    }
    const nuevaDireccion = await models.Direccion.create(data);
    return nuevaDireccion;
  }

  async get() {
    const direcciones = await models.Direccion.findAll();
    return direcciones;
  }

  async getById(id) {
    const direccion = await models.Direccion.findByPk(id, {
      include: [
        {
          association: 'localidad', // Relación de la localidad
          include: [
            {
              association: 'provincia', // Relación de la provincia de la localidad
              include: ['pais'], // Relación del pais dentro de la provincia
            },
          ],
        },
      ],
    });
    if (!direccion) {
      throw boom.notFound('Direccion not found');
    }
    return direccion;
  }

  async update(id, changes) {
    const direccion = await this.getById(id);
    const updatedDireccion = await direccion.update(changes);
    return updatedDireccion;
  }

  async delete(id) {
    const direccion = await this.getById(id);
    await direccion.destroy();
    return { rta: true };
  }
}

export default DireccionService;
