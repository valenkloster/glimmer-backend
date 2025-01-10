import boom from '@hapi/boom';
import sequelize from '../../../libs/sequelize.js';
const { models } = sequelize;
import bcrypt from 'bcrypt';

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async get() {
    const users = await models.User.findAll();
    const usersToReturn = users.map(
      ({ dataValues: { id_user, email, role } }) => ({
        id_user,
        email,
        role,
      }),
    );
    return usersToReturn;
  }

  async getById(id_user) {
    const user = await models.User.findOne({
      where: { id_user },
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async getByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });

    return user;
  }

  async update(email, userData) {
    const userToUpdate = await models.User.findOne({
      where: { email },
    });
    if (userToUpdate) {
      await userToUpdate.update(userData);
    }
  }

  async delete(email) {
    await models.User.destroy({
      where: { email },
    });
  }
}

export default UserService;
