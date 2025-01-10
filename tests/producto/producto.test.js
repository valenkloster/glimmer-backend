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
    await Producto.createWithDetails(producto);
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

describe('GET /producto/:id', () => {
  it('should return a single producto by Id', async () => {
    const response = await api.get('/api/v1/productos/2');
    expect(response.status).toBe(200);
    expect(response.body.body.id_producto).toBe(2);
  });
});

describe('POST /productos', () => {
  it('should create a new product', async () => {
    const newProducto = {
      codigo: '12347',
      nombre: 'Labial Hidratante',
      marca: 'Loreal',
      descripcion: 'Labial hidratante.',
      imagen: 'labial_mate.jpg',
      id_categoria: 1,
      detalles: [
        {
          tono_nombre: 'Rojo',
          tono_color: '#DC9E88',
          tamanio: '1.0 oz',
          stock: 50,
          precio: 100,
        },
      ],
    };
    const response = await api.post('/api/v1/productos').send(newProducto);
    expect(response.status).toBe(201);
  });
});
