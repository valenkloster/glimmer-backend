import express from "express";
import ProductsService from "./service.js";
// Importamos el Middleware
import validatorHandler from "../../middleware/validator.handler.js";
// Importamos los Schema
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} from "./schema.js";

const router = express.Router();
const service = new ProductsService();

// GET products
router.get(
  "/",
  validatorHandler(queryProductSchema, "query"), // Antes de hacer la consulta quiero que valide los parametros query
  async (req, res, next) => {
    try {
      const products = await service.find(req.query); // le envío todos los parámetros query que llegan
      res.json(products);
    } catch (error) {
      next(error); // middleware
    }
  },
);

// GET product by id
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"), // El id viene de params
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error); // middleware
    }
  },
);

// POST to create a product
router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

// PATCH to update a product
router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"), // Primero validamos el id
  validatorHandler(updateProductSchema, "body"), // Despues validamos el body
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error); // middleware
    }
  },
);

// DELETE a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

export default router;
