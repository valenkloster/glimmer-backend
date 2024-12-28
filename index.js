import express from 'express';
import config from './config.js';
import routerApi from './network/routes.js';
import errors from './network/errors.js';
import cors from 'cors';
import boom from '@hapi/boom';

const app = express();

app.use(cors());

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

app.listen(config.port, () => {
  console.log('App listening on port ' + config.port + '!');
});
