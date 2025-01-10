import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;
import bcrypt from 'bcrypt';
import UserService from '../user/service.js';
const service = new UserService();
import { v4 as uuidv4 } from 'uuid';

import CarritoService from '../carrito/service.js';
const carritoService = new CarritoService();

class CustomerService {
  constructor() {}

  async create(data) {
    let user = await service.getByEmail(data.user.email);
    if (user) {
      throw boom.conflict('Email must be unique');
    }
    const hash = await bcrypt.hash(data.user.password, 10);
    let uuid;
    if (data.id_cliente === undefined) {
      uuid = uuidv4();
    } else {
      uuid = data.id_cliente;
    }
    const newData = {
      id_cliente: uuid,
      ...data,
      user: {
        id_user: uuid,
        ...data.user,
        password: hash,
        role: 'cliente',
      },
    };
    const newCustomer = await models.Cliente.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    await carritoService.createBag(newCustomer.id_cliente);
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
