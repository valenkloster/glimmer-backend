import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class DireccionService {
  constructor() {}

  async create(data) {
    // Find or create country
    const [country] = await models.Pais.findOrCreate({
      where: { nombre: data.localidad.provincia.pais.nombre },
      defaults: { nombre: data.localidad.provincia.pais.nombre },
    });

    // Find or create state
    const [province] = await models.Provincia.findOrCreate({
      where: {
        nombre: data.localidad.provincia.nombre,
        id_pais: country.id_pais,
      },
      defaults: {
        nombre: data.localidad.provincia.nombre,
        id_pais: country.id_pais,
      },
    });

    // Find or create place
    const [place] = await models.Localidad.findOrCreate({
      where: {
        nombre: data.localidad.nombre,
        id_provincia: province.id_provincia,
      },
      defaults: {
        nombre: data.localidad.nombre,
        id_provincia: province.id_provincia,
      },
    });

    // Address
    const newAddress = await models.Direccion.create({
      ...data,
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
