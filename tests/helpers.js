const initialProducts = [
  {
    codigo: '2606220',
    nombre: 'Limpiador Facial Espumoso con Glucósidos',
    marca: 'The Ordinary',
    descripcion:
      'El limpiador facial espumoso con glucósido de The Ordinary es un limpiador espumoso suave que limpia la piel de manera eficaz al tiempo que mantiene la barrera de humedad de la piel.',
    imagen: 'https://media.ulta.com/i/ulta/2606220?w=1080&h=1080&fmt=auto',
    tamanio: '5,0 oz',
    stock: 150,
    precio: 15000,
    id_categoria: 1,
  },
  {
    codigo: '2551159',
    nombre: 'Limpiador de Escualano para Pieles Secas',
    marca: 'The Ordinary',
    descripcion:
      'El limpiador Squalane para piel seca de The Ordinary es un producto de limpieza suave formulado para eliminar el maquillaje y dejar la piel suave e hidratada.',
    imagen: 'https://media.ulta.com/i/ulta/2551159?w=1080&h=1080&fmt=auto',
    tamanio: '5,0 oz',
    stock: 150,
    precio: 12500,
    id_categoria: 2,
  },
];

const initialCategories = [
  {
    id_categoria: 1,
    nombre: 'Labiales',
  },
  {
    id_categoria: 2,
    nombre: 'Cremas Faciales',
  },
];

const initialClientes = [
  {
    id_cliente: '1',
    nombre: 'Valentina',
    apellido: 'Kloster',
    user: {
      email: 'valekloster18@gmail.com',
      password: 'password123',
    },
  },
  {
    id_cliente: '2',
    nombre: 'Patricia',
    apellido: 'Pelegrin',
    user: {
      email: 'patricia_pelegrin@gmail.com',
      password: '123password',
    },
  },
];

async function databaseDestroy(sequelize) {
  await sequelize.sync({ force: true });
}

export { initialProducts, initialCategories, initialClientes, databaseDestroy };
