import sequelize from '../libs/sequelize.js';
import '../components/associations.js';

import bcrypt from 'bcrypt';

const password = bcrypt.hashSync('asdasdasd', 10);

const Categorias = [
  {
    id_categoria: 1,
    nombre: 'Maquillaje',
    descripcion: null,
    id_categoria_padre: null,
  },
  {
    id_categoria: 2,
    nombre: 'Skin Care',
    descripcion: null,
    id_categoria_padre: null,
  },
  {
    id_categoria: 3,
    nombre: 'Labiales',
    descripcion: null,
    id_categoria_padre: 1,
  },
  {
    id_categoria: 4,
    nombre: 'Bases',
    descripcion: null,
    id_categoria_padre: 1,
  },
];

const Productos = [
  {
    id_producto: 1,
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
    id_producto: 2,
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
    id_detalle: 1,
    tono_nombre: 'Frío',
    tono_color: '#F4E1D2',
    tamanio: '1.0 oz',
    stock: 50,
  },
  {
    id_detalle: 2,
    tono_nombre: 'Neutro',
    tono_color: '#F5DEC9',
    tamanio: '2.0 oz',
    stock: 50,
  },
  {
    id_detalle: 3,
    tono_nombre: null,
    tono_color: null,
    tamanio: '2.0 oz',
    stock: 50,
  },
];

const Producto_Detalles = [
  {
    id_producto_detalle: 1,
    id_producto: 1,
    id_detalle: 1,
  },
  {
    id_producto_detalle: 2,
    id_producto: 1,
    id_detalle: 2,
  },
  {
    id_producto_detalle: 3,
    id_producto: 2,
    id_detalle: 3,
  },
];

const Paises = [
  {
    id_pais: 1,
    nombre: 'Argentina',
  },
];

const Provincias = [
  {
    id_provincia: 1,
    nombre: 'Buenos Aires',
    id_pais: 1,
  },
  {
    id_provincia: 2,
    nombre: 'Córdoba',
    id_pais: 1,
  },
];

const Localidades = [
  {
    id_localidad: 1,
    nombre: 'La Plata',
    id_provincia: 1,
  },
  {
    id_localidad: 2,
    nombre: 'CABA',
    id_provincia: 1,
  },
  {
    id_localidad: 3,
    nombre: 'Córdoba Capital',
    id_provincia: 2,
  },
];

const Direcciones = [
  {
    id_direccion: 1,
    direccion: 'Calle 123',
    departamento: 'A',
    codigo_postal: '1900',
    id_localidad: 1,
  },
  {
    id_direccion: 2,
    direccion: 'Calle 456',
    departamento: 'B',
    codigo_postal: '2000',
    id_localidad: 2,
  },
];

const Estado_Pedidos = [
  {
    id_estado_pedido: 1,
    descripcion: 'Cancelado',
  },
  {
    id_estado_pedido: 2,
    descripcion: 'Procesando',
  },
  {
    id_estado_pedido: 3,
    descripcion: 'Enviado',
  },
  {
    id_estado_pedido: 4,
    descripcion: 'Entregado',
  },
];

const Users = [
  {
    id_user: 1,
    email: 'cmendoza@cliente.com',
    password: password,
    role: 'cliente',
    recovery_token: null,
  },
  {
    id_user: 2,
    email: 'juanlopez@gmail.com',
    password: password,
    role: 'cliente',
    recovery_token: null,
  },
  {
    id_user: 3,
    email: 'valekloste18@gmail.com',
    password: password,
    role: 'admin',
    recovery_token: null,
  },
];

const Clientes = [
  {
    id_cliente: 1,
    nombre: 'Carlos',
    apellido: 'Mendoza',
    id_user: 1,
  },
  {
    id_cliente: 2,
    nombre: 'Juan',
    apellido: 'Lopez',
    id_user: 2,
  },
];

const Favoritos = [
  {
    id_favorito: 1,
    id_cliente: 1,
    id_producto: 1,
  },
  {
    id_favorito: 2,
    id_cliente: 1,
    id_producto: 2,
  },
];

const Usuario_Direcciones = [
  {
    id_usuario_direccion: 1,
    id_cliente: 1,
    id_direccion: 1,
  },
  {
    id_usuario_direccion: 2,
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
    await sequelize.models.Pais.bulkCreate(Paises);
    await sequelize.models.Provincia.bulkCreate(Provincias);
    await sequelize.models.Localidad.bulkCreate(Localidades);
    await sequelize.models.Direccion.bulkCreate(Direcciones);
    await sequelize.models.Estado_Pedido.bulkCreate(Estado_Pedidos);
    await sequelize.models.User.bulkCreate(Users);
    await sequelize.models.Cliente.bulkCreate(Clientes);
    await sequelize.models.Favoritos.bulkCreate(Favoritos);
    await sequelize.models.Usuario_Direccion.bulkCreate(Usuario_Direcciones);
    console.log('Database seeded 😁');
  } catch (error) {
    console.error(error);
  }
}

seed();
