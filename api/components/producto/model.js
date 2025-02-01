import { Model, DataTypes } from 'sequelize';
import { CATEGORIA_TABLE } from '../categoria/model.js';

const PRODUCTO_TABLE = 'Producto';

const ProductoSchema = {
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  codigo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [1, 100],
        msg: 'El nombre debe tener entre 1 y 100 caracteres',
      },
    },
  },
  marca: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      len: {
        args: [0, 500],
        msg: 'La descripción debe tener hasta 500 caracteres',
      },
    },
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tamanio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  altura: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ancho: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  largo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'El precio no puede ser negativo',
      },
    },
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CATEGORIA_TABLE,
      key: 'id_categoria',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Producto extends Model {
  static associate(models) {
    this.belongsTo(models.Categoria, {
      as: 'categoria',
      foreignKey: 'id_categoria',
    });
    this.hasMany(models.Favoritos, {
      as: 'favoritos',
      foreignKey: 'id_producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timestamps: false,
    };
  }
}

export { PRODUCTO_TABLE, ProductoSchema, Producto };
