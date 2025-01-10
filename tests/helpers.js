const initialProducts = [
  {
    codigo: '12345',
    nombre: 'Labial Hidratante',
    marca: 'Maybeline',
    descripcion: 'Labial mate de larga duración.',
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
      {
        tono_nombre: 'Nude',
        tono_color: '#DC9E89',
        tamanio: '1.0 oz',
        stock: 70,
        precio: 14.5,
      },
    ],
  },
  {
    codigo: '12346',
    nombre: 'Crema Facial',
    marca: 'SkinGlow',
    descripcion: 'Crema hidratante para todo tipo de piel.',
    imagen: 'crema_facial.jpg',
    id_categoria: 2,
    detalles: [
      {
        tamanio: '1.0 oz',
        stock: 100,
        precio: 20,
      },
    ],
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

const initialDetails = [
  {
    id_producto_detalle: 1,
    id_producto: 1,
    tono_nombre: 'Nude',
    tono_color: '#F1C7A9',
    tamanio: '1.0 oz',
    stock: 150,
  },
  {
    id_producto_detalle: 2,
    id_producto: 1,
    tono_nombre: 'Rosa',
    tono_color: '#M1F7A8',
    tamanio: '1.0 oz',
    stock: 200,
  },
];

async function databaseDestroy(sequelize) {
  await sequelize.sync({ force: true });
}

export { initialProducts, initialCategories, initialDetails, databaseDestroy };
