# Glimmer Backend

> E-commerce API for premium international cosmetics in Argentina

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://postgresql.org)
[![Express](https://img.shields.io/badge/Express-4.21+-lightgrey.svg)](https://expressjs.com)

## Quick Start

```bash
# Clone and install
git clone https://github.com/valenkloster/glimmer-backend.git
cd glimmer-backend
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run
npm run dev
```

## Environment Variables

```env
# Server
PORT=3000

# Database
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=glimmer_db_dev
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret
JWT_SECRET_RECOVERY=your_recovery_secret

# Email
MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_ADDRESS=your_email@gmail.com
MAILER_PASS=your_gmail_app_password

# Client
CLIENT_DOMAIN=http://localhost:5173

# Mercado Pago
MP_ACCESS_TOKEN=your_mercadopago_access_token

# Zippin (Shipping)
ZIPPIN_API_KEY=your_zippin_api_key
ZIPPIN_API_SECRET=your_zippin_api_secret
```

## Tech Stack

- **Node.js** + Express.js
- **PostgreSQL** + Sequelize ORM
- **JWT** authentication
- **Mercado Pago** payments
- **Nodemailer** for emails
- **Zippin API** for shipping


## Scripts

```bash
npm run dev      # Development server
npm start        # Production server
npm run seed     # Seed database
npm test         # Run tests
```


## Related

- [Frontend Repository](https://github.com/valenkloster/glimmer-frontend)
