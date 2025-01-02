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
        role: 'cliente',
      },
    };

    const newCustomer = await models.Cliente.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async get() {
    const customers = await models.Cliente.findAll();
    return customers;
  }

  async getById(id) {
    const customer = await models.Cliente.findByPk(id, {
      include: ['user'],
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customerToUpdate = await models.Cliente.findByPk(id);
    if (customerToUpdate) {
      await customerToUpdate.update(changes);
    }
  }

  async delete(id) {
    const customer = await models.Cliente.findByPk(id);
    await customer.destroy();
  }
}

export default CustomerService;
