import { error } from './response.js';

const errors = (err, req, res, next) => {
  console.error('[error]', err);
  const message = err.message || 'Internal Server Error';
  const status = err.statusCode || 500;
  error(req, res, message, status);
};

export default errors;
