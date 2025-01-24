import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;

class DireccionService {
  constructor() {}

  async create(data) {
    // Verificar que existe la provincia
    const province = await models.Provincia.findByPk(
      data.localidad.provincia.id_provincia,
    );

    if (!province) {
      throw new Error('Provincia no encontrada');
    }

    // Create place
    const place = await models.Localidad.create({
      nombre: data.localidad.nombre,
      id_provincia: province.id_provincia,
    });

    // Create Address
    const newAddress = await models.Direccion.create({
      direccion: data.direccion,
      departamento: data.departamento,
      codigo_postal: data.codigo_postal,
      id_localidad: place.id_localidad,
    });

    return newAddress;
  }

  async get() {
    const address = await models.Direccion.findAll();
    return address;
  }

  async getById(id) {
    const address = await models.Direccion.findByPk(id, {
      include: [
        {
          association: 'localidad',
          include: [
            {
              association: 'provincia',
              include: ['pais'],
            },
          ],
        },
      ],
    });
    if (!address) {
      throw boom.notFound('Address not found');
    }
    return address;
  }

  async update(id, changes) {
    const address = await this.getById(id);
    const updatedAddress = await address.update(changes);
    return updatedAddress;
  }

  async delete(id) {
    const address = await this.getById(id);
    await address.destroy();
    return { rta: true };
  }
}

export default DireccionService;
