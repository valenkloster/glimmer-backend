import boom from '@hapi/boom';

// Vamos validar una propiedad del request
export default function validatorHandler(schema, property) {
  // Closures: retornamos una funcion que tenga el formato de un middleware
  return (req, res, next) => {
    const data = req[property];
    // Validamos la data con el schema
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error)); // Algo no esta bien en la req
    }
    next(); // Si no hay error segui
  };
}
