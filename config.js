import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  mailerHost: process.env.MAILER_HOST,
  mailerPort: process.env.MAILER_PORT,
  mailerAddress: process.env.MAILER_ADDRESS,
  mailerPass: process.env.MAILER_PASS,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  clientDomain: process.env.CLIENT_DOMAIN,
  mercadoPago: process.env.MP_ACCESS_TOKEN,
  zippinApiKey: process.env.ZIPPIN_API_KEY,
  zippinApiSecret: process.env.ZIPPIN_API_SECRET,
};

export default config;
