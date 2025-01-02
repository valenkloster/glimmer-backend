import { Model, DataTypes } from 'sequelize';
import { PRODUCTO_TABLE } from '../producto/model.js';

const PRODUCTO_DETALLE_TABLE = 'Producto_Detalle';

const ProductoDetalleSchema = {
  id_producto_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id_producto',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  tamanio: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class ProductoDetalle extends Model {
  static associate(models) {
    this.belongsTo(models.Producto, {
      as: 'producto',
      foreignKey: 'id_producto',
    });
    this.hasMany(models.ProductoDetalleTono, {
      as: 'detallesTonos',
      foreignKey: 'id_producto_detalle',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_DETALLE_TABLE,
      modelName: 'ProductoDetalle',
      timestamps: false,
    };
  }
}

export { PRODUCTO_DETALLE_TABLE, ProductoDetalleSchema, ProductoDetalle };
