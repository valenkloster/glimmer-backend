import supertest from 'supertest';
import { app, server } from '../../index.js';
import { initialClientes, databaseDestroy } from '../helpers.js';
import sequelize from '../../libs/sequelize.js';
import ClienteService from '../../api/components/cliente/service.js';
const Cliente = new ClienteService();
const api = supertest(app);

beforeAll(async () => {
  await databaseDestroy(sequelize);

  for (const cliente of initialClientes) {
    await Cliente.create(cliente);
  }
});

afterAll(async () => {
  await sequelize.close();
  server.close();
});

describe('GET /clientes', () => {
  it('should return a list of clientes', async () => {
    const response = await api.get('/api/v1/clientes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.body)).toBe(true);
  });
});

describe('GET /cliente/:id', () => {
  it('should return a single cliente by Id', async () => {
    const response = await api.get('/api/v1/clientes/2');
    expect(response.status).toBe(200);
    expect(response.body.body.id_cliente).toBe('2');
  });
});

describe('POST /clientes/sign-up', () => {
  it('should create a new cliente', async () => {
    const newCliente = {
      id_cliente: '3',
      nombre: 'Julia',
      apellido: 'Rodriguez',
      user: {
        email: 'redriguezjulia@gmail.com',
        password: 'password123',
      },
    };
    const response = await api
      .post('/api/v1/clientes/sign-up')
      .send(newCliente);
    expect(response.status).toBe(201);
  });
});
