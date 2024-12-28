import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;
import bcrypt from 'bcrypt';
import UserService from '../user/service.js';
const service = new UserService();

class CustomerService {
  constructor() {}

  async create(data) {
    let user = await service.getByEmail(data.user.email);
    if (user) {
      throw boom.conflict('Email must be unique');
    }

    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };

    // Se crea junto con el usuario
    const newCliente = await models.Cliente.create(newData, {
      include: ['user'],
    });
    delete newCliente.dataValues.user.dataValues.password;
    return newCliente;
  }

  async get() {
    const clientes = await models.Cliente.findAll();
    return clientes;
  }

  async getById(id) {
    const cliente = await models.Cliente.findByPk(id, {
      include: ['user'],
    });
    if (!cliente) {
      throw boom.notFound('product not found');
    }
    return cliente;
  }

  async update(id, changes) {
    const clienteToUpdate = await models.Cliente.findByPk(id);
    if (clienteToUpdate) {
      await clienteToUpdate.update(changes);
    }
  }

  async delete(id) {
    const customer = await models.Cliente.findByPk(id);
    await customer.destroy();
  }
}

export default CustomerService;
