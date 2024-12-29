import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import UserService from '../user/service.js';
import err from '../../utils/error.js';
import EmailService from '../../utils/EmailService/index.js';
import buildMail from '../../utils/emails/recovery.js';

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.getByEmail(email);
    if (!user) {
      throw err('User not found', 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw err('Invalid password', 401);
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '12h',
    });
    delete user.dataValues.recoveryToken;
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecretRecovery, {
      expiresIn: '15min',
    });
    const recoveryUrl = `${config.clientDomain}/cambio-de-contrasena?token=${token}`;
    const recoveryEmail = buildMail(recoveryUrl);
    await service.update(user.email, { recoveryToken: token });
    const mail = {
      from: config.mailerAddress,
      to: `${user.email}`,
      subject: 'Recupera tu contraseña',
      html: recoveryEmail,
    };
    const rta = await EmailService.sendEmail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      const user = await service.getById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }
      if (user.recoveryToken !== token) {
        throw new Error('Invalid token');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.email, { recoveryToken: null, password: hash });
      return { message: 'Password changed' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
