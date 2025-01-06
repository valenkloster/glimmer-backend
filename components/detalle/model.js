import { Model, DataTypes } from 'sequelize';

const DETALLE_TABLE = 'Detalle';

const DetalleSchema = {
  id_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  tono_nombre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tono_color: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  tamanio: {
    type: DataTypes.STRING(50),
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
};

class Detalle extends Model {
  static associate(models) {
    this.belongsToMany(models.Producto, {
      through: models.Producto_Detalle,
      foreignKey: 'id_detalle',
      otherKey: 'id_producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLE_TABLE,
      modelName: 'Detalle',
      timestamps: false,
    };
  }
}

export { DETALLE_TABLE, DetalleSchema, Detalle };
