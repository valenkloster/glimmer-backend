import express from 'express';
import config from './config.js';
import routerApi from './network/routes.js';
import errors from './network/errors.js';
import cors from 'cors';
import boom from '@hapi/boom';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
}));

import './utils/auth/index.js';

app.use(express.json());

// Routes
routerApi(app);

// Error middleware
app.use(errors);

// Middleware for not founded routes
app.use((req, res, next) => {
  next(boom.notFound('Route not found'));
});

// const server = app.listen(config.port, () => {
//   console.log('App listening on port ' + config.port + '!');
// });

const port = process.env.PORT || config.port;

const server = app.listen(port, '0.0.0.0', () => {
  console.log('App listening on port ' + port);
});

export { app, server };
