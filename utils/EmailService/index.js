import config from '../../config.js';
import nodemailer from 'nodemailer';

async function sendEmail(infoMail) {
  const transporter = nodemailer.createTransport({
    host: config.mailerHost,
    secure: true,
    port: config.mailerPort,
    auth: {
      user: config.mailerAddress,
      pass: config.mailerPass,
    },
  });
  await transporter.sendMail(infoMail);
  return { message: 'Email sent' };
}

export default {
  sendEmail,
};
