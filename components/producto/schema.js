import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  // Quiero que sea obligatorio siempre que me envien el min
  price_max: price_max.when('price_min', {
    is: Joi.exist(), // Solo verifica si 'price_min' está presente
    then: Joi.required(),
  }),
});
