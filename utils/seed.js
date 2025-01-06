import sequelize from '../libs/sequelize.js';
import '../components/associations.js';

import bcrypt from 'bcrypt';

const password = bcrypt.hashSync('asdasdasd', 10);

const Categorias = [
  {
    nombre: 'Maquillaje',
    descripcion: null,
    id_categoria_padre: null,
  },
  {
    nombre: 'Skin Care',
    descripcion: null,
    id_categoria_padre: null,
  },
  {
    nombre: 'Labiales',
    descripcion: null,
    id_categoria_padre: 1,
  },
  {
    nombre: 'Bases',
    descripcion: null,
    id_categoria_padre: 1,
  },
];

const Productos = [
  {
    codigo: '123456',
    nombre: 'Base de maquillaje Airbrush Flawless de larga duración',
    marca: 'Charlotte Tilbury',
    descripcion:
      'La base Airbrush Flawless Foundation de Charlotte es duradera, ligera y un híbrido entre base y cuidado de la piel: el secreto para una tez perfecta, sin poros y segura de sí misma.',
    precio: 4900,
    imagen: 'http://media.ulta.com/i/ulta/2624531?w=1080&h=1080&fmt=auto',
    id_categoria: 4,
  },
  {
    codigo: '654321',
    nombre: 'Labial líquido mate',
    marca: 'MAC',
    descripcion: 'Labial líquido mate de larga duración.',
    precio: 2500,
    imagen: 'http://media.ulta.com/i/ulta/2624531?w=1080&h=1080&fmt=auto',
    id_categoria: 3,
  },
];

const Detalles = [
  {
    tono_nombre: 'Frío',
    tono_color: '#F4E1D2',
    tamanio: '1.0 oz',
    stock: 50,
  },
  {
    tono_nombre: 'Neutro',
    tono_color: '#F5DEC9',
    tamanio: '2.0 oz',
    stock: 50,
  },
  {
    tono_nombre: null,
    tono_color: null,
    tamanio: '2.0 oz',
    stock: 50,
  },
];

const Producto_Detalles = [
  {
    id_producto: 1,
    id_detalle: 1,
  },
  {
    id_producto: 1,
    id_detalle: 2,
  },
  {
    id_producto: 2,
    id_detalle: 3,
  },
];

const Paises = [
  {
    nombre: 'Argentina',
  },
];

const Provincias = [
  {
    nombre: 'Buenos Aires',
    id_pais: 1,
  },
  {
    nombre: 'Córdoba',
    id_pais: 1,
  },
];

const Localidades = [
  {
    nombre: 'La Plata',
    id_provincia: 1,
  },
  {
    nombre: 'CABA',
    id_provincia: 1,
  },
  {
    nombre: 'Córdoba Capital',
    id_provincia: 2,
  },
];

const Direcciones = [
  {
    direccion: 'Calle 123',
    departamento: 'A',
    codigo_postal: '1900',
    id_localidad: 1,
  },
  {
    direccion: 'Calle 456',
    departamento: 'B',
    codigo_postal: '2000',
    id_localidad: 2,
  },
];

const Estado_Pedidos = [
  {
    descripcion: 'Cancelado',
  },
  {
    descripcion: 'Procesando',
  },
  {
    descripcion: 'Enviado',
  },
  {
    descripcion: 'Entregado',
  },
];

const Users = [
  {
    email: 'cmendoza@cliente.com',
    password: password,
    role: 'cliente',
    recovery_token: null,
  },
  {
    email: 'juanlopez@gmail.com',
    password: password,
    role: 'cliente',
    recovery_token: null,
  },
  {
    email: 'valekloste18@gmail.com',
    password: password,
    role: 'admin',
    recovery_token: null,
  },
];

const Clientes = [
  {
    nombre: 'Carlos',
    apellido: 'Mendoza',
    id_user: 1,
  },
  {
    nombre: 'Juan',
    apellido: 'Lopez',
    id_user: 2,
  },
];

const Favorito = [
  {
    id_cliente: 1,
    id_producto: 1,
  },
  {
    id_cliente: 1,
    id_producto: 2,
  },
];

const Cliente_Direcciones = [
  {
    id_cliente: 1,
    id_direccion: 1,
  },
  {
    id_cliente: 2,
    id_direccion: 2,
  },
];

async function seed() {
  try {
    console.log(sequelize.models);
    await sequelize.models.Categoria.bulkCreate(Categorias);
    await sequelize.models.Producto.bulkCreate(Productos);
    await sequelize.models.Detalle.bulkCreate(Detalles);
    await sequelize.models.Producto_Detalle.bulkCreate(Producto_Detalles);
    await sequelize.models.User.bulkCreate(Users);
    await sequelize.models.Cliente.bulkCreate(Clientes);
    await sequelize.models.Pais.bulkCreate(Paises);
    await sequelize.models.Provincia.bulkCreate(Provincias);
    await sequelize.models.Localidad.bulkCreate(Localidades);
    await sequelize.models.Direccion.bulkCreate(Direcciones);
    await sequelize.models.Estado_Pedido.bulkCreate(Estado_Pedidos);
    await sequelize.models.Favoritos.bulkCreate(Favorito);
    await sequelize.models.Cliente_Direccion.bulkCreate(Cliente_Direcciones);
    console.log('Database seeded 😁');
  } catch (error) {
    console.error(error);
  }
}

seed();
