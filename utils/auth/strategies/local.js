import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import UserService from '../../../components/user/service.js';
const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getByEmail(email);

      if (!user) {
        return done(boom.unauthorized(), false); // no autorizar
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(boom.unauthorized(), false); // no autorizar
      }

      delete user.dataValues.password;
      delete user.dataValues.recoveryToken;

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

export default LocalStrategy;
