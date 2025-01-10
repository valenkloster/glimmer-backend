import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;

import DireccionService from '../direccion/service.js';
const direccionService = new DireccionService();

class ClienteDireccionService {
  constructor() {}

  async create(id_cliente, direccionData) {
    const cliente = await models.Cliente.findByPk(id_cliente);
    if (!cliente) {
      throw boom.notFound('Client not found.');
    }
    const direccion = await direccionService.create(direccionData);
    const clienteDireccion = await models.Cliente_Direccion.create({
      id_cliente,
      id_direccion: direccion.id_direccion,
    });

    return { direccion, clienteDireccion };
  }

  async findByCliente(id_cliente) {
    const direcciones = await models.Cliente_Direccion.findAll({
      where: { id_cliente },
      include: ['direccion'],
    });
    return direcciones;
  }

  async delete(id_cliente, id_direccion) {
    const direccion = await models.Cliente_Direccion.findOne({
      where: { id_cliente, id_direccion },
    });
    if (!direccion) {
      throw boom.notFound('Direction not found.');
    }
    await direccion.destroy();
  }
}

export default ClienteDireccionService;
