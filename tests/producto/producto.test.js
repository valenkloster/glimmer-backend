import supertest from 'supertest';
import { app, server } from '../../index.js';
import {
  initialProducts,
  initialCategories,
  databaseDestroy,
} from '../helpers.js';
import sequelize from '../../libs/sequelize.js';
import { Categoria } from '../../api/components/categoria/model.js';
import ProductoService from '../../api/components/producto/service.js';
const Producto = new ProductoService();
const api = supertest(app);

beforeAll(async () => {
  await databaseDestroy(sequelize);

  for (const categoria of initialCategories) {
    await Categoria.create(categoria);
  }

  for (const producto of initialProducts) {
    await Producto.create(producto);
  }
});

afterAll(async () => {
  await sequelize.close();
  server.close();
});

describe('GET /productos', () => {
  it('should return a list of products', async () => {
    const response = await api.get('/api/v1/productos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.body)).toBe(true);
  });
});

describe('GET /productos/:id', () => {
  it('should return a single producto by Id', async () => {
    const response = await api.get('/api/v1/productos/2');
    expect(response.status).toBe(200);
    expect(response.body.body.id_producto).toBe(2);
  });
});

describe('POST /productos', () => {
  it('should create a new product', async () => {
    const newProducto = {
      codigo: '2606222',
      nombre: 'Limpiador Facial Espumoso con Glucósidos',
      marca: 'The Ordinary',
      descripcion:
        'Limpiador espumoso suave que limpia la piel de manera eficaz.',
      imagen: 'https://media.ulta.com/i/ulta/2606220?w=1080&h=1080&fmt=auto',
      tamanio: '5,0 oz',
      stock: 150,
      precio: 15000,
      id_categoria: 1,
    };
    const response = await api.post('/api/v1/productos').send(newProducto);
    expect(response.status).toBe(201);
  });
});
